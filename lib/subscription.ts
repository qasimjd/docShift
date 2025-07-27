// lib/subscription.ts
import { auth } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";

export async function getSubscriptionStatus() {
  const { userId } = await auth();
  if (!userId) return null;

  const sub = await kv.get<{
    status: string;
    priceId: string;
    currentPeriodStart: number;
    currentPeriodEnd: number;
  }>(`user-subscription:${userId}`);

  return sub;
}
