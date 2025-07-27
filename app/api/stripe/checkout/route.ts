import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createStripeCustomer } from '@/lib/stripe-utils';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const user = await db.select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentUser = user[0];

    let stripeCustomerId = currentUser.stripeCustomerId;

    if (!stripeCustomerId) {
      // Create new Stripe customer using helper function
      const newCustomer = await createStripeCustomer(
        currentUser.email,
        currentUser.fullName,
        currentUser.id,
        userId
      );

      stripeCustomerId = newCustomer.id;
      
      // Update user with stripe customer ID
      await db.update(usersTable)
        .set({ stripeCustomerId })
        .where(eq(usersTable.id, currentUser.id));
    }

    // Create checkout session with Basil API improvements
    // Note: In Basil, checkout sessions have improved latency and new semantics
    const checkout = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/pricing`,
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          userId: currentUser.id,
          clerkId: userId,
        },
      },
      // Basil API: Enable customer update for better UX
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      // Remove automatic_tax for now - you can enable it later after configuring tax settings
      // automatic_tax: {
      //   enabled: true,
      // },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}