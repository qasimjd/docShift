"use client"

import { Sparkles, Workflow, DollarSign, MessageCircle, Home } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Features', url: '#features', icon: Sparkles },
    { name: 'How It Works', url: '#how-it-works', icon: Workflow },
    { name: 'Testimonials', url: '#testimonials', icon: MessageCircle },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
  ];

  return <NavBar items={navItems} />
}
