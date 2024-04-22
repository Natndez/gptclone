"use client";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { formSchema } from "./constants";




const ChatPage = () => {
    // Creating some functions for our form
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
        // try{

        // } catch (error: any){
        //     console.log(error);
        // } finally {
            
        // }
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
                    Messages content (Rendering messages here)
                </div>
            </div>
        </div>
    );
}

export default ChatPage;