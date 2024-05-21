// Setting up our constants
import * as z from "zod";

// Setting up schema for our form
export const formSchema = z.object({
    // Must have following properties when used on pages
    prompt: z.string().min(1, {
        message: "Video prompt is required",
    }),
});