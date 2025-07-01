"use client"

import { HeroSection } from "@/components/ui/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "Now live in beta!",
        action: {
          text: "Try it free",
          href: "/signup",
        },
      }}
      title="Summarize Any Document in Seconds"
      description="DocSift helps you turn long reports, research papers, and contracts into clear, concise summaries — powered by AI and ready to use instantly."
      actions={[
        {
          text: "Get Started Free",
          href: "/signup",
          variant: "pcolor",
        },
        {
          text: "GitHub",
          href: "https://github.com/qasimjd/docSift",
          variant: "github",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "/a.png",
        dark: "/b.png",
        alt: "DocSift Summary Preview",
      }}
    />
  )
}