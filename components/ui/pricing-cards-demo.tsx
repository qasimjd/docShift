import { Pricing } from "@/components/ui/pricing-cards"
import { MoveRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "/ month",
    isFree: true,
    features: [
      {
        title: "5 document summaries per month"
      },
      {
        title: "Basic AI-generated summaries"
      },
      {
        title: "Upload PDF files"
      },
      {
        title: "No Q&A or on document"
      },
      {
        title: "No history tracking"
      }
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    buttonIcon: <MoveRight className="w-4 h-4" />,
    isPopular: false
  },
  {
    name: "Pro Plan (Monthly)",
    price: "$8",
    period: "/ month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC!,
    features: [
      {
        title: "Unlimited document summaries"
      },
      {
        title: "AI-powered Q&A over your documents"
      },
      {
        title: "AI Summary"
      },
      {
        title: "AI powered chat over your documents"
      },
      {
        title: "Priority processing speed"
      },
      {
        title: "Early access to new features"
      }
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const,
    buttonIcon: <MoveRight className="w-4 h-4" />,
    isPopular: true
  },
  {
    name: "Pro Plan (Yearly)",
    price: "$90",
    period: "/ year",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO!,
    features: [
      {
        title: "Everything in the Pro Monthly plan"
      },
      {
        title: "Billed annually at a discounted rate"
      },
      {
        title: "You save $6 compared to monthly billing"
      }
    ],
    buttonText: "Save with Annual",
    buttonVariant: "outline" as const,
    buttonIcon: <MoveRight className="w-4 h-4" />,
    isPopular: false
  }
];

function PricingDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto" id='pricing'>
      <Pricing 
        title="Choose Your Perfect Plan"
        subtitle="Transform your documents into actionable insights with our AI-powered platform. Start free, upgrade anytime."
        plans={pricingPlans}
      />
    </div>
  );
}

export { PricingDemo };