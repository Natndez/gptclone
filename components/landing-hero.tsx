"use client";

import { useAuth } from "@clerk/nextjs";

export const LandingHero = () => {
    // True if user is signed in
    const { isSignedIn } = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            This is the hero for now
        </div>
    );
}