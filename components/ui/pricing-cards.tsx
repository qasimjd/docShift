import { Check} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description?: string;
    features: {
        title: string;
        description?: string;
    }[];
    buttonText: string;
    buttonVariant?: "default" | "outline";
    buttonIcon?: React.ReactNode;
    isPopular?: boolean;
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
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <p>{feature.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant={plan.buttonVariant || "outline"} className="gap-4 mt-auto">
                                        {plan.buttonText} {plan.buttonIcon}
                                    </Button>
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
