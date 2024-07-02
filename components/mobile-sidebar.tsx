"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
}

// TODO: Fix color issues on sidebar (e.g. close button)
const MobileSidebar = ({
    apiLimitCount
}: MobileSidebarProps) => {
    
    // To handle Hydration Error associated with MobileSidebar (can be used to fix most components giving hydration errors)
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }
 
    return (
        // Wrap all Sheet component
        <Sheet>
            {/* Button is the trigger for the sheet */}
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            {/* Conent within the sheet is our sidebar component */}
            <SheetContent side="left" className="p-0">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;