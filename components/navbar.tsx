// Setting up Navbar Component
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Figure out some aesthetic details

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="flex items-center p-4">
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            {/* Adding UserButton from Clerk */}
            <div className="flex w-full justify-end">
                {/* Setting path back to '/' after signing out */}
                <UserButton afterSignOutUrl="/"/>

            </div>
        </div>
    )
}

export default Navbar;