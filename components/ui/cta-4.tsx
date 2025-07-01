"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CtaProps {
  className?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function Cta({
  className,
  title = "Ready to get started?",
  description = "Join thousands of users who are already transforming their workflow with our AI-powered platform.",
  primaryButtonText = "Get Started Free",
  secondaryButtonText = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
}: CtaProps) {
  return (
    <section className={cn(
      "py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5",
      className
    )}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3"
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
