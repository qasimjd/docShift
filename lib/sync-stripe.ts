import { stripe } from "./stripe";
import { kv } from "@/lib/kv";
import type { STRIPE_SUB_CACHE } from "@/types/stripe";

export async function syncStripeDataToKV(customerId: string) {
    try {
        // Fetch latest subscription data from Stripe
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            limit: 1,
            status: "all",
            expand: ["data.default_payment_method"],
        });

        if (subscriptions.data.length === 0) {
            const subData = { status: "none" };
            await kv.set(`stripe:customer:${customerId}`, subData);
            return subData;
        }

        // If a user can have multiple subscriptions, that's your problem
        const subscription = subscriptions.data[0];

        // Store complete subscription state
        const subData = {
            subscriptionId: subscription.id,
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            currentPeriodEnd: subscription.ended_at,
            currentPeriodStart: subscription.start_date,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            paymentMethod:
                subscription.default_payment_method &&
                    typeof subscription.default_payment_method !== "string"
                    ? {
                        brand: subscription.default_payment_method.card?.brand ?? null,
                        last4: subscription.default_payment_method.card?.last4 ?? null,
                    }
                    : null,
        };

        await kv.set(`stripe:customer:${customerId}`, subData);
        return subData;
    } catch (error) {
        console.error("[syncStripeDataToKV] Failed to sync subscription data:", error);
        const fallbackData: STRIPE_SUB_CACHE = { status: "none" };
        await kv.set(`stripe:customer:${customerId}`, fallbackData);
        return fallbackData;
    }
}
