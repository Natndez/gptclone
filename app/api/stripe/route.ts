import { auth, currentUser} from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

// Settings url!
const settingsUrl = absoluteUrl("/settings")

export async function GET(){
    try {
        // Getting userId from clerk auth
        const { userId } = auth();
        // Getting user from auth
        const user = await currentUser();

        if(!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Getting userSubscription from prisma
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        });

        // If both these things are found, that means the user already has a subscription, so we want to redirect them to the billings page, not the checkout page
        if (userSubscription && userSubscription.stripeCustomerId) {
            // Initiating a billing page session
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl, // Will return to this url afterwards
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // TODO: Set up checkout page next 

    } catch (error) {
        console.log("[STRIPE_ERROR] ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
