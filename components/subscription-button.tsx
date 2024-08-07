"use client";

import { Button } from "@/components/ui/button";
import { ERROR_MESSAGE } from "@/constants";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// Interface for subscription button component props
interface SubscriptionButtonProps {
    isPro: boolean;
};

// To be used on settings page
export const SubscriptionButton = ({
    isPro = false,
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe"); // api can check if user isPro or not so no need to adjust anything here

            window.location.href = response.data.url;
        } catch (error) {
            toast.error(ERROR_MESSAGE);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button disabled={loading} variant={isPro ? "default": "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
        </Button>
    );
}