import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncStripeDataToDB } from '@/lib/stripe-utils';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function SuccessPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Get user from database
  const user = await db.select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, userId))
    .limit(1);

  if (user.length === 0) {
    redirect('/');
  }

  const currentUser = user[0];
  const stripeCustomerId = currentUser.stripeCustomerId;

  if (stripeCustomerId) {
    // Sync the latest data from Stripe to database
    await syncStripeDataToDB(stripeCustomerId);
  }

  redirect('/dashboard');
};