"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";

import { Zap, Check, Code, ImageIcon, MessageCircle, Music, VideoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ERROR_MESSAGE } from "@/constants";

// Creating tools object (for various functionalities of the "Genie")
const tools = [
    {
        label: "Chat",
        icon: MessageCircle,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generator",
        icon: ImageIcon,
        color: "text-sky-600",
        bgColor: "bg-sky-600/10",
    },
    {
        label: "Video Generator",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
    },
    {
        label: "Music Generator",
        icon: Music,
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
    },
    {
        label: "Code Creation",
        icon: Code,
        color: "text-red-400",
        bgColor: "bg-red-400/10",
    },
]

// Pro modal component
export const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    // Arrow function to use when subscribing
    const onSubscribe = async () => {
        try {
            setLoading(true); // set loading state to true
            
            // ONE OPTION
            // const response = axios.get("/api/stripe"); // using get because our stripe API route uses GET
            // window.location.href = (await response).data.url;
            
            // PREFERRED METHOD
            // Using axios to get response (Will be a URL for both cases [SEE api/stripe/route.ts])
            const response = await axios.get("/api/stripe");

            // Tells browser to navigate to given URL (in this case our stripe url)
            window.location.href = response.data.url;


        } catch (error) {
            toast.error(ERROR_MESSAGE);

            console.log(error, "STRIPE_CLIENT_ERROR"); // Log error if theres an issue subscribing
        } finally {
            setLoading(false); // set loading state back to false
        }
    }
    
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Genie
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-800 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between "
                            >
                                <div className="flex items-center gap-x-4 ">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        disabled={loading}
                        onClick={onSubscribe}
                        size="lg"
                        variant="premium"
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}