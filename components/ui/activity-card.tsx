"use client";

import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CreditInfo {
    remaining: number;
    total: number;
    label: string;
    resetDate?: string;
}

interface ActivityCardProps {
    category?: string;
    title?: string;
    creditInfo?: CreditInfo;
    className?: string;
}

export function ActivityCard({
    category = "Credits",
    title = "Remaining Credits",
    creditInfo,
    className
}: ActivityCardProps) {
    const percentage = creditInfo ? Math.round((creditInfo.remaining / creditInfo.total) * 100) : 0;
    const isLowCredits = percentage < 20;

    return (
        <div
            className={cn(
                "relative h-full rounded-3xl p-6",
                "bg-background dark:bg-zinc-900",
                "border border-border",
                "hover:border-zinc-300 dark:hover:border-zinc-700",
                "transition-all duration-300",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <CreditCard className="size-8 text-pcolor" />
                <div>
                    <h3 className="text-xl font-semibold text-foreground">
                        {title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {category}
                    </p>
                </div>
            </div>

            {/* Credits Ring - Single Circle */}
            {creditInfo && (
                <div className="flex justify-center">
                    <div className="relative flex justify-center gap-2 items-center">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 rounded-full border-4 border-zinc-200 dark:border-zinc-800/50" />
                            <div
                                className="absolute inset-0 rounded-full border-4 transition-all duration-500"
                                style={{
                                    borderColor: isLowCredits ? "#FF2D55" : "#2CD758",
                                    clipPath: `polygon(0 0, 100% 0, 100% ${percentage}%, 0 ${percentage}%)`,
                                }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                                    {creditInfo.remaining}
                                </span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    of {creditInfo.total}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className={cn(
                                "text-base font-medium",
                                isLowCredits ? "text-red-500" : "text-zinc-500"
                            )}>
                                {percentage}% remaining
                            </span>
                            {creditInfo.resetDate && (
                                <span className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                                    Resets {creditInfo.resetDate}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
