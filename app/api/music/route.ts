import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Configuring Replicate AI
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        // If no user
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        // If no message submitted
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        
        // Checking if user is on a free trial
        const freeTrial = await checkApiLimit();

        const isPro = await checkSubscription();

        // Return status 403 if no more free trial
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }
        
        // Input for replicate AI
        const input = {
            prompt_a: prompt
        };


        // Getting our response
        const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });
        
        if (!isPro) {
            await increaseApiLimit();
        }

        // Displaying response to 
        console.log(response)
        
        return NextResponse.json(response);
        // Catching any other errors
    } catch (error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("Internal error", { status: 500})
    }
}