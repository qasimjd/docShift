"use client"

import { Sparkles, Workflow, DollarSign, MessageCircle } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
   { name: 'Features', url: '#features', icon: Sparkles },
  { name: 'How It Works', url: '#how-it-works', icon: Workflow },
  { name: 'Pricing', url: '#pricing', icon: DollarSign },
  { name: 'Testimonials', url: '#testimonials', icon: MessageCircle },
];

  return <NavBar items={navItems} />
}
