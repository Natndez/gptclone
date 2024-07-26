import { Button } from "@/components/ui/button";
import Link from "next/link";

// The Login/Sign-Up page for Genie
const LandingPage = () => {
    return (
        <div>
            Landing Page (Open)
            <div>
                <Link href="/sign-in">
                    <Button>
                        Login
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button>
                        Register
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;