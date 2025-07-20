"use client"

import Logo from './logo'
import { Button } from './ui/button'
import ThemeTogel from './ThemeToggle'
import Link from 'next/link'
import { SignedIn, UserButton } from '@clerk/nextjs'

function DashboardNav() {
    return (
        <>
            {/* Mobile Top Bar - Branding and Sign In */}
            <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="flex items-center justify-between px-6 py-3">
                    <Link href="/" className="font-bold text-primary bg-background/5 border border-border backdrop-blur-lg from-brand to-brand-foregroun shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 rounded-lg flex items-center py-1 px-2 gap-1">
                        <Logo width={22} height={22} className="inline-block" />
                        <span className="">DocSift </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeTogel />
                        <Button
                            variant="glow"
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            onClick={() => alert("Sign In Clicked")} >
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block max-w-7xl mx-auto fixed bg-background/5 border border-border backdrop-blur-lg py-1 px-8 rounded-full shadow-lg top-0 left-0 right-0 z-50 mt-6">
                <div className="flex items-center justify-between mx-auto w-full">
                    <Link href="/" className="flex items-center justify-center text-lg font-bold text-primary">
                        <Logo width={44} height={44} className="inline-block" />
                        <span className="text-xl">DocSift</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeTogel />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardNav
