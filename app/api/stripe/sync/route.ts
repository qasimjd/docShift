import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { syncStripeDataToDB } from '@/lib/stripe-utils';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await db.select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentUser = user[0];
    const stripeCustomerId = currentUser.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'No Stripe customer found' }, { status: 404 });
    }

    const subData = await syncStripeDataToDB(stripeCustomerId);
    return NextResponse.json(subData);
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}