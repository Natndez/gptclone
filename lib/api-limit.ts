// Need User auth
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
    const { userId } = auth(); // Gettingt userId

    if(!userId) {
        return;
    }

    // Getting users api data from db
    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    // If they have a limit stored already, update count
    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: { userId: userId },
            data: { count: userApiLimit.count + 1}, // Update count
        });
    } else { // Creating table for this user if doesnt already exist
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1 }
        });
    }
};

// To check if limit as maxed (returns true if limit is maxed)
export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
}

export const getApiLimitCount = async () => {
    
    // Get users id from clerk auth
    const { userId } = auth();

    // Return 0 if there is no user logged in
    if (!userId) {
        return 0;
    }
}