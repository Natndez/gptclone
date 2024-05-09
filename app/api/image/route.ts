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
        const { prompt, amount = 1, resolution = "512x512" } = body; // Setting default amount and resolution

        // If no user
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Check for API key not being configured
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }
        // If no prompt submitted
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        // If no amount submitted
        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }
        // If no prompt submitted
        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }
        
        const imageResponse = await openai.images.generate({
           // model: "dall-e-3",  Defaults to dall-e-2 (if wanting to use dall-e-3 only n=1 is supported)
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        // Return response.choices[0].message to return the message from the model
        return NextResponse.json(imageResponse.data);
        // Catching any other errors
    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500})
    }
}