"use client";

// Creating tools object (for various functionalities of the "Genie")
const tools = [
    {
        label: "Chat",
        icon: MessageCircle,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/chat"
    },
    {
        label: "Image Generator",
        icon: ImageIcon,
        color: "text-sky-600",
        bgColor: "bg-sky-600/10",
        href: "/image" 
    },
    {
        label: "Video Generator",
        icon: VideoIcon,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10",
        href: "/video" 
    },
    {
        label: "Music Generator",
        icon: Music,
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        href: "/music" 
    },
    {
        label: "Code Creation",
        icon: Code,
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        href: "/code" 
    },
]

import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ImageIcon, MessageCircle, Music, VideoIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";



const DashboardPage = () => {
    return (
        // Dashboard page JSX
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Your wish is my command
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Make a wish to Genie - Experience the magic of AI
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {/* "Mapping" through tools object and rendering each component */}
                {tools.map((tool) => (
                    // shadcn card component
                    <Card
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        {/* Icon and Label container */}
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        {/* lucide arrow icon */}
                        <ArrowRight className="w-5 h-5"/>
                    </Card>
                ))}
            </div>
        </div>
        
    );
}

export default DashboardPage;