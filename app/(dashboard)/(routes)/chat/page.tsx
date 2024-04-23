"use client";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";

import { formSchema } from "./constants";
import { useState } from "react";



// ChatCompletionMessage Interface
interface ChatCompletionMessage {
    role: string;
    content: string;
}

const ChatPage = () => {
    // Creating some functions for our form
    const router = useRouter();

    // ChatCompletionRequestMessage is deprecated, creating our own interface above
    // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    
    // Using self-made interface for component
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

    // Submit function (will eventually submit to API here)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try{
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

            // Clearing input
            form.reset()
        } catch (error: any){
            // TODO: OPEN PRO MODAL TO UPGRADE ACCOUNT
            console.log("HERE IS THE ERRORRRRRR:", error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            {/* Assigning Props to conform to our HeadingProps interface */}
            <Heading
                title="Chat"
                description="Ask Genie anything"
                icon={MessageCircle}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10" 
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
                                                placeholder="I wish..."
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
                    {messages.length === 0 && !isLoading && (
                        <Empty />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div key={message.content}>
                                {message.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;