"use client";

// Imports
import { useState } from "react";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { ERROR_MESSAGE } from "@/constants";

// TODO: FIND A WAY TO USE DALL-E-3 AS WELL

const ImagePage = () => {
    // Getting proModal
    const proModal = useProModal();

    // Creating some functions for our form
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    // Adding <z.infer<typeof formSchema>> before parenthesis to enforce particular types
    const form = useForm<z.infer<typeof formSchema>>({
        // Resolver to resolve conflicts with schema
        resolver: zodResolver(formSchema),
        // Default values in our useForm hook
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    // To check loading status
    const isLoading = form.formState.isSubmitting;

    // Submit function (submits to API here)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try{
            
            //throw new Error("Error");
            
            
            setImages([]); // Resets photos everytime submit is clicked


            // API response
            const response = await axios.post("/api/image", values); // (can pass values without adjusting, modifying server-side)

            // Getting Image urls from response and storing in an array
            const urls = response.data.map((image: { url: string }) => image.url);

            // Passing urls to setImages urls is an array so no need to include '[]'
            setImages(urls)

            // log response status for debugging
            console.log("Reponse from api: ", response.status);

            // Clearing input
            form.reset()
        } catch (error: any){
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
            else {
                toast.error(ERROR_MESSAGE);
            }
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
                            {/* Prompt Field */}
                            <FormField 
                                // Controls our prompt
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
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
                            {/* Amount of images field */}
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            {/* Resolution of images field */}
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && ( <Empty label="Make your first image wish - Unleash the Genie's creativity" /> 
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        alt="Image"
                                        fill
                                        src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                        <Button onClick={() => window.open(src)} variant="outline" className="w-full">
                                            <Download className="h-4 w-4 mr-2"/>
                                            Download
                                        </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;