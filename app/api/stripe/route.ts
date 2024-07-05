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

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"], // Settings for allowed payment types 
            mode: "subscription", // Payment mode
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress, // User comes from clerk
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Genie Pro",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 2000,  // 2000 is equivalent to 20 dollars
                        recurring: {
                            interval: "month", // Payment happens monthly
                        }, 
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId, // passing in userId as metadata ensures the system knows which user is getting the premium subscription
            },
        });

        // Return this stripeSession URL
        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        console.log("[STRIPE_ERROR] ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
