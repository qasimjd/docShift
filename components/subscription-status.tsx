"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SubscriptionData {
  user: {
    plan: string;
    stripeCustomerId: string | null;
  };
  subscription: {
    status: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  } | null;
}

export function SubscriptionStatus() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('/api/stripe/subscription');
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading) {
    return <div>Loading subscription info...</div>;
  }

  if (!subscription) {
    return null;
  }

  const isActive = subscription.subscription?.status === 'active';
  const plan = subscription.user.plan;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Current Plan</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="capitalize">{plan} Plan</span>
            <Badge variant={isActive ? "default" : "secondary"}>
              {subscription.subscription?.status || 'Free'}
            </Badge>
          </div>
        </div>
        
        {subscription.subscription && (
          <div className="text-right text-sm text-muted-foreground">
            <div>
              {subscription.subscription.cancelAtPeriodEnd 
                ? 'Cancels' 
                : 'Renews'} on{' '}
              {new Date(subscription.subscription.currentPeriodEnd).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
      
      {plan === 'free' && (
        <div className="mt-4">
          <Button asChild>
            <Link href="#pricing">Upgrade to Pro</Link>
          </Button>
        </div>
      )}
    </Card>
  );
}