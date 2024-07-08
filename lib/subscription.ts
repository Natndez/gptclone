// Util to check if user subscription is valid
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// A day in milliseconds
const DAY_IN_MS = 86_400_000;

// Function to check subscription (will return true/false)
export const checkSubscription = async () => {
    const { userId } = auth();

    // If there isnt a userId obviously we would return false
    if (!userId) {
        return false; 
    }

    // Getting needed userSubscription information from database
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        }
    });

    // We also return false if we cannot find a userSubscription model in the db (they never subscribed if this doesnt exist)
    if (!userSubscription) {
        return false;
    }

    // Checking if current subscription is valid (giving a full day of grace hence the DAY_IN_MS const)
    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
}