import { Github, Instagram, Mail } from "lucide-react"
import { Footer } from "@/components/ui/footer"
import Logo from "../logo"

function FooterDemo() {
  return (
    <div className="w-full py-12">
      <Footer
        logo={<Logo className="h-6 w-auto" />}
        brandName="DocSift"
        socialLinks={[
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com/qasimjd",
            label: "GitHub",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://instagram.com/qasimjd8",
            label: "Instagram",
          },
          {
            icon: <Mail className="h-5 w-5" />,
            href: "mailto:qasimjd8@gmail.com",
            label: "Email",
          },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/cookies", label: "Cookie Policy" },
        ]}
        copyright={{
          text: "© 2025 DocSift",
          license: "Transform your documents with AI",
        }}
      />
    </div>
  )
}

export { FooterDemo }
