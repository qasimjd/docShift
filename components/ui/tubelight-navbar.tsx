"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ThemeTogel from "../ThemeTogel"
import Logo from "../logo"
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

export function NavBar({ items }: NavBarProps) {
    const [activeTab, setActiveTab] = useState(items[0].name)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100 // Offset for navbar height

            if (scrollPosition < 200) {
                setActiveTab(items[0].name) // Set to "Home"
                return
            }

            const sections = items.slice(1).map(item => ({
                name: item.name,
                element: item.url.startsWith('#') ? document.querySelector(item.url) : null
            }))

            for (const section of sections) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect()
                    const elementTop = rect.top + window.pageYOffset
                    const elementBottom = elementTop + rect.height

                    if (scrollPosition >= elementTop - 200 && scrollPosition < elementBottom - 200) {
                        setActiveTab(section.name)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)

        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [items])

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (url.startsWith('#')) {
            e.preventDefault()

            if (url === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
                return
            }

            const target = document.querySelector(url)
            if (target) {
                const navbarHeight = 80 // Approximate navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        }
    }

    return (
        <>
            {/* Mobile Top Bar - Branding and Sign In */}
            <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="flex items-center justify-between px-6 py-3">
                    <Link href="/" className="font-bold text-primary bg-background/5 border border-border backdrop-blur-lg from-brand to-brand-foregroun shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 rounded-lg flex items-center py-1 px-2 gap-1">
                        <Logo width={22} height={22} className="inline-block" />
                        <span>DocSift</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeTogel />

                        <SignedOut>
                            <Button variant="glow" asChild className="rounded-full">
                                <Link href="/sign-in">
                                    Sign-In
                                </Link>
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden mb-4 px-6">
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-4 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                        {items.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.name

                            return (
                                <Link
                                    key={item.name}
                                    href={item.url}
                                    onClick={(e) => {
                                        handleSmoothScroll(e, item.url)
                                    }}
                                    className={cn(
                                        "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                                        "text-foreground/80 hover:text-primary",
                                        isActive && "bg-background/5 border border-border backdrop-blur-lg from-brand to-brand-foreground text-black dark:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
                                    )}
                                >
                                    <Icon size={18} strokeWidth={2.5} />
                                    {isActive && (
                                        <motion.div
                                            layoutId="lamp-mobile"
                                            className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        >
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                                                <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                                <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                                <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 pt-6 px-6">
                <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
                    <Link href="/" className="flex items-center justify-center text-lg font-bold text-primary bg-background/5 border border-border backdrop-blur-lg from-brand to-brand-foregroun shadow-lg rounded-full px-3">
                        <Logo width={40} height={40} className="inline-block" />
                        <span>DocSift</span>
                    </Link>

                    <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                        {items.map((item) => {
                            const isActive = activeTab === item.name

                            return (
                                <Link
                                    key={item.name}
                                    href={item.url}
                                    onClick={(e) => {
                                        handleSmoothScroll(e, item.url)
                                    }}
                                    className={cn(
                                        "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                        "text-foreground/80 hover:text-primary",
                                        isActive && "bg-background/5 border border-border backdrop-blur-lg from-brand to-brand-foreground text-black dark:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
                                    )}
                                >
                                    <span className="inline">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="lamp-desktop"
                                            className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        >
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                                                <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                                <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                                <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeTogel />
                        <SignedOut>
                            <Button variant="glow" asChild className="rounded-full">
                                <Link href="/sign-in">
                                    Sign-In
                                </Link>
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                    </div>
                </div>
            </div>
        </>
    )
}
