import { HeroSectionDemo } from "@/components/ui/hero-section-demo";
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo";
import DemoOne from "@/components/ui/grid-feature-cards-demo";
import { BentoGridDemo } from "@/components/ui/bento-grid-demo";
import Testimonials from "@/components/ui/testimonials-demo";
import { PricingDemo } from "@/components/ui/pricing-cards-demo";
import { FooterDemo } from "@/components/ui/footer-demo";

function HomePage() {
  return (
    <>
      <NavBarDemo />
      <HeroSectionDemo />
      <DemoOne />
      <BentoGridDemo />
      <Testimonials />
      <PricingDemo />
      <FooterDemo />
    </>
  )
}

export default HomePage
