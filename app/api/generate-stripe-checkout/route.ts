import { stripe } from "@/lib/stripe";
import { kv } from "@/lib/kv";
import { getUserId } from "@/actions/user.action";


export async function GET() {
    const user = await getUserId();
    const userId = user?.id;

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const userEmail = user?.email;

    let customerId = await kv.get<string>(`stripe:user:${userId}`);

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: userEmail,
            metadata: { userId },
        });
        await kv.set(`stripe:user:${userId}`, customer.id);
        customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID!,
                quantity: 1,
            },
        ],
        mode: "subscription",
    });

    return Response.redirect(session.url!, 303);
}
