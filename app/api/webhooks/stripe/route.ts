import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { syncStripeDataToDB } from '@/lib/stripe-utils';
import Stripe from 'stripe';

const allowedEvents: Stripe.Event.Type[] = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "customer.subscription.paused",
  "customer.subscription.resumed",
  "customer.subscription.pending_update_applied",
  "customer.subscription.pending_update_expired",
  "customer.subscription.trial_will_end",
  "invoice.paid",
  "invoice.payment_failed",
  "invoice.payment_action_required",
  "invoice.upcoming",
  "invoice.marked_uncollectible",
  "invoice.payment_succeeded",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "payment_intent.canceled",
];

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Process event asynchronously
    processEvent(event).catch(console.error);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[STRIPE WEBHOOK] Error processing event', error);
    return NextResponse.json({}, { status: 400 });
  }
}

async function processEvent(event: Stripe.Event) {
  // Skip processing if the event isn't one we're tracking
  if (!allowedEvents.includes(event.type)) return;

  // All the events we track have a customerId
  const { customer: customerId } = event?.data?.object as {
    customer: string;
  };

  if (typeof customerId !== "string") {
    throw new Error(
      `[STRIPE WEBHOOK] Customer ID isn't string. Event type: ${event.type}`
    );
  }

  return await syncStripeDataToDB(customerId);
}