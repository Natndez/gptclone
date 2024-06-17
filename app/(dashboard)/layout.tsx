import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { getApiLimitCount } from "@/lib/api-limit";

// Setting up layout for our dashboard

const DashboardLayout = async ({
    // Setting up children so we can load (routes)/dashboard/page.tsx inside this page (and subsequent pages)
    children
}: {
    children: React.ReactNode;
}) => {
    // Getting api limit count from database
    const apiLimitCount = await getApiLimitCount();

    return (
        // Layout design
        <div className="h-full relative">
            {/* Sidebar Hidden by default for smaller devices, md: classes for bigger screens */}
            <div className="hidden h-full md:flex md:w-72
            md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </div>
            {/* Render Navbar component instead of Sidebar component for devices with smaller screens */}
            <main className="md:pl-72">
                {/* Rendering navbar to page */}
                <Navbar />
                 {/* Rendering individual page's content */}
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
