import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


const DashboardPage = () => {
    return (
        <div>
            <p>Dashboard Page (Protected)</p>
            {/* ADDING USERBUTTON AND SETTING ROUTE TO BE DEFAULT PAGE AFTER SIGNING OUT */}
            <UserButton afterSignOutUrl="/"/>    
        </div>
        
    );
}

export default DashboardPage;