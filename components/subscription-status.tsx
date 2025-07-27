"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Crown, Calendar, AlertCircle, Sparkles, ArrowUpRight } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/stripe/subscription');
        if (response.ok) {
          const data = await response.json();
          setSubscription(data);
        } else {
          throw new Error('Failed to fetch subscription data');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setError('Failed to load subscription information');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading) {
    return (
      <Card className="w-full p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-16 rounded-full ml-auto" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full p-6 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-red-900 dark:text-red-100">
              Subscription Error
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              {error}. Please try refreshing the page or contact support if the issue persists.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="w-full p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="flex items-start gap-3">
          <Crown className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-slate-900 dark:text-slate-100">
              Subscription Status
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Please sign in to view your subscription details and manage your plan.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const isActive = subscription.subscription?.status === 'active';
  const isPro = subscription.user.plan === 'pro';
  const isFree = subscription.user.plan === 'free';
  const isCanceling = subscription.subscription?.cancelAtPeriodEnd;

  const getStatusVariant = () => {
    if (isActive && !isCanceling) return 'default';
    if (isCanceling) return 'destructive';
    return 'secondary';
  };

  const getStatusText = () => {
    if (isActive && !isCanceling) return 'Active';
    if (isCanceling) return 'Ending Soon';
    return subscription.subscription?.status || 'Free';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Card className="w-full p-6 gradient-card transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {isPro ? (
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <Crown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
              <Sparkles className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {subscription.user.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current subscription
            </p>
          </div>
        </div>
        
        <Badge variant={getStatusVariant()} className="text-xs">
          {getStatusText()}
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-5">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {isPro ? (
            <>
              You're currently on the <strong>Pro plan</strong> with access to all premium features, 
              priority support, and unlimited usage.
            </>
          ) : (
            <>
              You're on the <strong>Free plan</strong> with basic features. Upgrade to Pro to unlock 
              advanced capabilities, priority support, and remove limitations.
            </>
          )}
        </p>

        {subscription.subscription && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-400">
              {isCanceling ? 'Access ends' : 'Renews'} on{' '}
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {formatDate(subscription.subscription.currentPeriodEnd)}
              </span>
            </span>
          </div>
        )}

        {isCanceling && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 dark:text-amber-200">
                Your subscription has been canceled but remains active until the end of your billing period.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      {isFree && (
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Link href="/#pricing" className="flex items-center justify-center gap-2">
            Upgrade to Pro
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      )}

      {isPro && !isCanceling && (
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage billing and subscription in your account settings
          </p>
        </div>
      )}
    </Card>
  );
}