"use client";
import { useState } from "react";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Typewriter } from "@/components/functional/typewriter"

import { formSchema } from "./constants";


const VideoPage = () => {
    // Creating router
    const router = useRouter();
    // Music state
    const [music, setMusic] = useState<string>() // Using string instead of array



    // Adding <z.infer<typeof formSchema>> before parenthesis to enforce particular types
    const form = useForm<z.infer<typeof formSchema>>({
        // Resolver to resolve conflicts with schema
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    // To check loading status
    const isLoading = form.formState.isSubmitting;

    // Submit function (submits to API here)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try{
            setMusic(undefined);

            // API call
            const response = await axios.post("/api/video", values);

            setMusic(response.data.audio);

            // Clearing input
            form.reset()
        } catch (error: any){
            // TODO: OPEN PRO MODAL TO UPGRADE ACCOUNT
            console.log("HERE IS THE ERROR ----->", error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            {/* Assigning Props to conform to our HeadingProps interface */}
            <Heading
                title="Video Generation"
                description="Ask Genie to show you a vision"
                icon={Video}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10" 
            />
            <div className="px-4 lg:px-8">
                <div>
                    {/* ...form is an easier way to pass those parameters */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                            rounded-lg
                            border
                            w-full
                            p-4
                            px-3
                            md:px-6
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                            "
                        >
                            <FormField 
                                // Controls our prompt
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="I wish to see a coral reef..."
                                                // Handles onChange 
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Wish!
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {/* Setting up conditional for what renders */}
                    {isLoading && ( // Use true instead of isLoading to verify functionality 
                        <div className="p-8 rounded-lg w-full lfex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && ( <Empty label="Make your first wish - Unleash Genie's talent" /> )}
                    {music && (
                        // LOOKS FAR BETTER ON CHROME THAN OTHER BROWSERS (TRY TO RECONCILE)
                        <audio controls className="w-full mt-8">
                            <source src={music}/>
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;