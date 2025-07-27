// components/ui/subscribe-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SubscribeButtonProps {
  priceId: string;
  planName: string;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  buttonIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function SubscribeButton({ 
  priceId, 
  buttonText, 
  buttonVariant = "outline",
  buttonIcon,
  disabled,
  className 
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to start subscription process'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={disabled || loading}
      variant={buttonVariant}
      className={`gap-4 mt-auto ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {buttonText} {buttonIcon}
        </>
      )}
    </Button>
  );
}