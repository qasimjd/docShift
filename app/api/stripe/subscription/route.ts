import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserSubscription } from '@/lib/stripe-utils';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userSubscription = await getUserSubscription(userId);
    
    if (!userSubscription) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userSubscription);
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}