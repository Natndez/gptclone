"use client"; // Client component

// Global imports
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

// Personal imports
import { cn } from "@/lib/utils";

// Monterrat font
const montserrat = Montserrat({ weight: "600", subsets: ["latin"]});

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
                    <h1 className={cn("text-2xl font-bold",
                        montserrat.className)}>
                        Genie
                    </h1>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;