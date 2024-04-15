"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";


// TODO: Fix color issues on sidebar (e.g. close button)
const MobileSidebar = () => {
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
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;