import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import Configuration from "openai";


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
        // Our chat response will use gpt-3.5-turbo for now
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });
        // Return response.choices[0].message to return the message from the model
        return NextResponse.json(response.choices[0].message);
        // Catching any other errors
    } catch (error) {
        console.log("[CHAT_ERROR]", error);
        return new NextResponse("Internal error", { status: 500})
    }
}