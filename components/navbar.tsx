// Setting up Navbar for reusability

import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react"

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <Button variant="ghost" size="icon"
            className="md:hidden">
                <Menu />
            </Button>
            {/* Adding UserButton from Clerk */}
            <div className="flex w-full justify-end">
                {/* Setting path back to '/' after signing out */}
                <UserButton afterSignOutUrl="/"/>

            </div>
        </div>
    )
}

export default Navbar;