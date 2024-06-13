import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

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
        
        // ******All parameters for video gen******
        // const input = {
        //     fps: 24,
        //     width: 1024,
        //     height: 576,
        //     prompt: "Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic",
        //     guidance_scale: 17.5,
        //     negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        // };

        // Our input to Zeroscope-v2
        const input = {
            prompt: prompt
        };

        // Checking if user is on a free trial
        const freeTrial = await checkApiLimit();

        // Return status 403 if no more free trial
        if (!freeTrial) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        // Getting our response
        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
        
        await increaseApiLimit();

        // Displaying response to 
        console.log(response)
        
        return NextResponse.json(response);
        // Catching any other errors
    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500})
    }
}