"use client";
import { useState } from "react";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";



// ChatCompletionMessage Interface
interface ChatCompletionMessage {
    role: string;
    content: string;
}

const ImagePage = () => {
    // Creating some functions for our form
    const router = useRouter();

    // ChatCompletionRequestMessage is deprecated, creating our own interface above
    // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    
    // Using self-made interface for messages component
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);


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
            // Creating userMessage
            const userMessage: ChatCompletionMessage = {
                role: "user",
                content: values.prompt,
            };
            // Adding messages to chat
            const newMessages = [...messages, userMessage];

            // API call
            const response = await axios.post("/api/chat", {
                messages: newMessages,
            }, {
                timeout: 4000,
            });

            // Updating setMessages
            setMessages((current) => [...current, userMessage, response.data]);

            // log response status for debugging
            console.log("Reponse from api: ", response.status);

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
                title="Image Creation"
                description="Unleash your imagination - Here wishes meet creations"
                icon={ImageIcon}
                iconColor="text-sky-600"
                bgColor="bg-sky-500/10" 
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
                                                placeholder="I wish to see..."
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
                    {messages.length === 0 && !isLoading && ( <Empty label="Make your first wish - Unleash the Genie" /> )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                                key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-zinc-200 border border-black/10"
                                )}
                            >   
                                    {/* Display Avatar based on role */}
                                    {message.role === "user" ? <UserAvatar/> : <BotAvatar /> }
                                    <p className="text-sm">
                                    {/* Use typing effect only for bot messages */}
                                        {message.role === "user" ? message.content : <Typewriter text={message.content} speed={15}/> }
                                    </p>
                                    
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;