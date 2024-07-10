import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import Configuration from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


// Configuraing openai with our api key (obtained from openai)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI();

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        // If no user
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Check for API key not being configured
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }
        // If no message submitted
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // Checking if user is on a free trial
        const freeTrial = await checkApiLimit();

        // Check if pro
        const isPro = await checkSubscription();

        // Return status 403 if no more free trial
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        // Our chat response will use gpt-3.5-turbo for now
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        // Increment count if not a pro user
        if (!isPro) {
            await increaseApiLimit();
        }

        // Return response.choices[0].message to return the message from the model
        return NextResponse.json(response.choices[0].message);
        // Catching any other errors
    } catch (error) {
        console.log("[CHAT_ERROR]", error);
        return new NextResponse("Internal error", { status: 500})
    }
}