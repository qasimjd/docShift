"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroAction {
    text: string;
    href: string;
    icon?: React.ReactNode;
    variant?: "default" | "pcolor" | "glow" | "github";
}

interface HeroProps {
    badge?: {
        text: string;
        action: {
            text: string;
            href: string;
        };
    };
    title: string;
    description: string;
    actions: HeroAction[];
    image: {
        light: string;
        dark: string;
        alt: string;
    };
}

export function HeroSection({
    badge,
    title,
    description,
    actions,
    image,
}: HeroProps) {
    const { resolvedTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // During SSR and initial client render, use light theme to prevent hydration mismatch
    const imageSrc = mounted 
        ? (resolvedTheme === "dark" || (resolvedTheme === "system" && systemTheme === "dark")) 
            ? image.dark 
            : image.light
        : image.light;

    return (
        <section
            className={cn(
                "bg-background text-foreground",
                "py-20 sm:py-24 md:py-32 px-4",
                "fade-bottom overflow-hidden pb-0"
            )}
        >
            <div className="mx-auto flex max-w-container flex-col gap-12 pt-4 sm:gap-24">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
                    {/* Badge */}
                    {badge && (
                        <Badge variant="outline" className="animate-appear gap-2 bg-muted">
                            <span className="text-muted-foreground">{badge.text}</span>
                            <a href={badge.action.href} className="flex items-center gap-1">
                                {badge.action.text}
                                <ArrowRightIcon className="h-3 w-3" />
                            </a>
                        </Badge>
                    )}

                    {/* Title */}
                    <h1 className="relative z-10 inline-block animate-appear bg-foreground bg-clip-text  text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
                        {actions.map((action, index) => (
                            <Link key={index} href={action.href}>
                                <Button variant={action.variant} size="lg" className="flex items-center gap-2">
                                    {action.icon}
                                    {action.text}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    {/* Image with Glow */}
                    <div className="relative pt-12">
                        <MockupFrame
                            className="animate-appear opacity-0 delay-700"
                            size="small"
                        >
                            <Mockup type="responsive">
                                <Image
                                    src={imageSrc}
                                    alt={image.alt}
                                    width={1248}
                                    height={765}
                                    priority
                                />
                            </Mockup>
                        </MockupFrame>
                        <Glow
                            variant="top"
                            className="animate-appear-zoom opacity-0 delay-1000"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
