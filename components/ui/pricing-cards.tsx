import { Check } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SubscribeButton } from "./subscribe-button";

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description?: string;
    priceId?: string;
    features: {
        title: string;
        description?: string;
    }[];
    buttonText: string;
    buttonVariant?: "default" | "outline";
    buttonIcon?: React.ReactNode;
    isPopular?: boolean;
    isFree?: boolean;
}

interface PricingProps {
    title?: string;
    subtitle?: string;
    plans: PricingPlan[];
}

function Pricing({
    title = "Prices that make sense!",
    subtitle = "Managing a small business today is already tough.",
    plans
}: PricingProps) {
    return (
        <div className="py-16 md:py-28 w-full">
            <div className="mx-auto space-y-8 px-4">
                <div className="flex gap-2 flex-col">
                    <h2 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
                        {title}
                    </h2>
                    <p className="text-center mt-5 opacity-75">
                        {subtitle}
                    </p>
                </div>
                <div className="grid pt-12 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`w-full bg-muted backdrop-blur-lg shadow-lg hover:shadow-xl transform hover:scale-103 transition-all duration-200 rounded-md flex flex-col ${plan.isPopular ? 'shadow-2xl ring-2 ring-primary' : ''}`}
                        >
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                        {plan.name}
                                        {plan.isPopular && (
                                            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                                Popular
                                            </span>
                                        )}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1">
                                <div className="flex flex-col gap-8 justify-start flex-1">
                                    <p className="flex flex-row items-center gap-2 text-xl">
                                        <span className="text-4xl">{plan.price}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {plan.period}
                                        </span>
                                    </p>
                                    <div className="flex flex-col gap-4 justify-start flex-1">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex flex-row gap-4">
                                                <Check className="w-5 h-5 mt-2 text-primary" />
                                                <p>{feature.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <SignedOut>
                                        <Button variant={plan.buttonVariant || "outline"} className="gap-4 mt-auto" asChild>
                                            <Link href="/sign-up">
                                                {plan.buttonText} {plan.buttonIcon}
                                            </Link>
                                        </Button>
                                    </SignedOut>
                                    
                                    <SignedIn>
                                        {plan.isFree ? (
                                            <Button variant={plan.buttonVariant || "outline"} className="gap-4 mt-auto" asChild>
                                                <Link href="/dashboard">
                                                    {plan.buttonText} {plan.buttonIcon}
                                                </Link>
                                            </Button>
                                        ) : plan.priceId ? (
                                            <SubscribeButton 
                                                priceId={plan.priceId} 
                                                planName={plan.name}
                                                buttonText={plan.buttonText}
                                                buttonVariant={plan.buttonVariant || "outline"}
                                                buttonIcon={plan.buttonIcon}
                                            />
                                        ) : (
                                            <Button variant={plan.buttonVariant || "outline"} className="gap-4 mt-auto" disabled>
                                                Coming Soon {plan.buttonIcon}
                                            </Button>
                                        )}
                                    </SignedIn>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Pricing, type PricingProps, type PricingPlan };