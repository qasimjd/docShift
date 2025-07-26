import { kv } from "@/lib/kv";
import { syncStripeDataToKV } from "@/lib/sync-stripe";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
    const { userId } = await auth();
    const customerId = await kv.get<string>(`stripe:user:${userId}`);
    if (!customerId) return redirect("/");

    await syncStripeDataToKV(customerId);
    return redirect("/dashboard");
}
