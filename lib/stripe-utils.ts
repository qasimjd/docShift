import { stripe } from './stripe';
import { db } from '@/db';
import { usersTable, subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

export type STRIPE_SUB_CACHE =
  | {
    subscriptionId: string;
    status: Stripe.Subscription.Status;
    priceId: string;
    currentPeriodStart: number;
    currentPeriodEnd: number;
    cancelAtPeriodEnd: boolean;
    paymentMethod: {
      brand: string | null;
      last4: string | null;
    } | null;
  }
  | {
    status: "none";
  };

export async function syncStripeDataToDB(customerId: string) {
  try {
    // Fetch latest subscription data from Stripe
    // Note: In Basil API, we need to be more explicit about expansions
    const subscriptions_data = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: "all",
      expand: ["data.default_payment_method", "data.items.data.price"],
    });

    // Get user by stripe customer ID
    const user = await db.select()
      .from(usersTable)
      .where(eq(usersTable.stripeCustomerId, customerId))
      .limit(1);

    if (user.length === 0) {
      throw new Error(`User not found for Stripe customer ID: ${customerId}`);
    }

    const userId = user[0].id;

    if (subscriptions_data.data.length === 0) {
      // No subscriptions - delete existing subscription records and update user
      await db.delete(subscriptions).where(eq(subscriptions.userId, userId));

      await db.update(usersTable)
        .set({
          plan: 'free',
          stripeSubscriptionId: null,
          stripePriceId: null,
        })
        .where(eq(usersTable.id, userId));

      return { status: "none" } as const;
    }

    const subscription = subscriptions_data.data[0];

    // Extract price ID - in Basil API, the structure might be slightly different
    const priceId = subscription.items.data[0]?.price?.id;
    if (!priceId) {
      throw new Error('No price ID found in subscription');
    }

    // Store complete subscription state
    const subData: STRIPE_SUB_CACHE = {
      subscriptionId: subscription.id,
      status: subscription.status,
      priceId: priceId,
      currentPeriodEnd: (subscription as any).current_period_end ?? 0,
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

    // Update subscription in database using upsert pattern for Basil API
    await db.insert(subscriptions).values({
      userId,
      subscriptionId: subData.subscriptionId,
      status: subData.status,
      priceId: subData.priceId,
      cancelAtPeriodEnd: subData.cancelAtPeriodEnd,
      currentPeriodStart: new Date(subData.currentPeriodStart * 1000),
      currentPeriodEnd: new Date(subData.currentPeriodEnd * 1000),
    }).onConflictDoUpdate({
      target: subscriptions.subscriptionId,
      set: {
        status: subData.status,
        priceId: subData.priceId,
        cancelAtPeriodEnd: subData.cancelAtPeriodEnd,
        currentPeriodStart: new Date(subData.currentPeriodStart * 1000),
        currentPeriodEnd: new Date(subData.currentPeriodEnd * 1000),
      },
    });

    // Update user plan based on price ID and subscription status
    const plan = getActivePlanFromSubscription(subData.priceId, subData.status);
    await db.update(usersTable)
      .set({
        plan,
        stripeSubscriptionId: subData.subscriptionId,
        stripePriceId: subData.priceId,
      })
      .where(eq(usersTable.id, userId));

    return subData;
  } catch (error) {
    console.error('Error syncing Stripe data:', error);
    throw error;
  }
}

function getActivePlanFromSubscription(priceId: string, status: Stripe.Subscription.Status): string {
  // Only set paid plan if subscription is active
  if (status !== 'active' && status !== 'trialing') {
    return 'free';
  }

  switch (priceId) {
    case process.env.STRIPE_PRICE_ID_BASIC:
      return 'basic';
    case process.env.STRIPE_PRICE_ID_PRO:
      return 'pro';
    default:
      return 'free';
  }
}

// Helper function to get user's current subscription from database
export async function getUserSubscription(clerkUserId: string) {
  const result = await db.select({
    user: usersTable,
    subscription: subscriptions,
  })
    .from(usersTable)
    .leftJoin(subscriptions, eq(usersTable.id, subscriptions.userId))
    .where(eq(usersTable.clerkId, clerkUserId))
    .limit(1);

  return result[0] || null;
}

// Helper function to check if user has active subscription
export async function hasActiveSubscription(clerkUserId: string): Promise<boolean> {
  const userSub = await getUserSubscription(clerkUserId);

  if (!userSub?.subscription) return false;

  const now = new Date();
  const isActive = userSub.subscription.status === 'active' &&
    userSub.subscription.currentPeriodEnd > now;

  return isActive;
}

// Helper function to create Stripe customer with improved error handling for Basil API
export async function createStripeCustomer(userEmail: string, userName: string | null, userId: string, clerkId: string) {
  try {
    const customer = await stripe.customers.create({
      email: userEmail,
      name: userName || undefined,
      metadata: {
        userId: userId,
        clerkId: clerkId,
      },
    });

    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw new Error('Failed to create Stripe customer');
  }
}