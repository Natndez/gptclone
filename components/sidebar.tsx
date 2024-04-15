"use client"; // Client component

// Global imports
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Code, ImageIcon, LayoutDashboard, MessageCircle, Music, Settings, VideoIcon } from "lucide-react";

// More imports
import { cn } from "@/lib/utils";


// Monterrat font
const montserrat = Montserrat({ weight: "600", subsets: ["latin"]});

// Setting up array of objects for our routes
// TODO: Come up with "Genie" themed names for each route"
const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-pink-500",
    },
    {
        label: "Chat",
        icon: MessageCircle,
        href: "/chat",
        color: "text-violet-500",
    },
    {
        label: "Image Generator",
        icon: ImageIcon,
        href: "/image",
        color: "text-sky-600",
    },
    {
        label: "Video Generator",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generator",
        icon: Music,
        href: "/music",
        color: "text-emerald-400",
    },
    {
        label: "Code Generator",
        icon: Code,
        href: "/code",
        color: "text-red-400",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-white-900",
    },
];

const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full
        bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="logo"
                            src="/logo.png"
                        />
                    </div>
                    {/* Using 'cn' to use our montserrat font... use the following convention to do so while still using shadcn classes */}
                    {/* cn allows for dynamic class name's for tailwind elements */}
                    <h1 className={cn("text-2xl font-bold",
                        montserrat.className)}>
                        Genie
                    </h1>
                </Link>
                <div className="space-y-1">
                    {/* Setting up routes map */}
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className="text-sm group flex p-3 w-full
                            justify-start font-medium cursor-pointer
                            hover:text-white hover:bg-white/10 rounded-lg
                            transition"
                        >
                            {/* Setting up logo and label for each route */}
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", 
                                route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;