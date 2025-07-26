import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { kv } from "./kv";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function createStripeBillingPortalLink() {
  const { userId } = await auth();
  if (!userId) return null;

  const customerId = await kv.get<string>(`stripe-user-id:${userId}`);
  if (!customerId) return null;

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  });

  return session.url;
}