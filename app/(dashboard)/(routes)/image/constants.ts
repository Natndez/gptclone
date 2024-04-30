// Setting up our constants

// Importing zod to handle our form schema
import * as z from "zod";

// Setting up schema for our form
export const formSchema = z.object({
    // Must have following properties when used on pages
    // Prompt must be at least 1 character long, obviously
    prompt: z.string().min(1, {
        message: "Image prompt is required",
    }),
    amount: z.string().min(1), // Number of images to generate
    resolution: z.string().min(1) // Image resolution
});

// Creating an array of objects for our amount of images options
export const amountOptions = [
    {
        value: "1",
        label: "1 Photo",
    },
    {
        value: "2",
        label: "2 Photos",
    },
    {
        value: "3",
        label: "3 Photos",
    },
    {
        value: "4",
        label: "4 Photos",
    },
    {
        value: "5",
        label: "5 Photos",
    },
];

// Creating an array of objects for resolution options
export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    }
];