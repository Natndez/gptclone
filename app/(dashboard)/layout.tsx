import Navbar from "@/components/navbar"

// Setting up layout for our dashboard

const DashboardLayout = ({
    // Setting up children so we can load (routes)/dashboard/page.tsx inside this page
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        // Layout design
        <div className="h-full relative">
            {/* Sidebar Hidden by default for smaller devices, md: classes for bigger screens */}
            <div className="hidden h-full md:flex md:w-72
            md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <div>
                    {/* Creating sidebar here */}
                    Hello Sidebar
                </div>
            </div>
            {/* Setting up main content */}
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
