import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// Setting up interface for Heading Properties
interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string; // iconColor is an optional property
    bgColor?: string;   // bgColor as well
}

export const Heading = ({
    title,
    description,
    icon: Icon, // Remapping to captial I
    iconColor,
    bgColor
}: HeadingProps) => {
    
    return (
        // Wrapping in fragment
        <>
            <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
                <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                    <Icon className={cn("w-10 h-10", iconColor)} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">
                        {title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>    
        </>
    )
}