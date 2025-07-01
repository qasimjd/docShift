
import { HeroSectionDemo } from "@/components/ui/hero-section-demo";
import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo";
import DemoOne from "@/components/ui/grid-feature-cards-demo";
import Testimonials from "@/components/ui/testimonials-demo";

function HomePage() {
  return (
    <>
      <NavBarDemo />
      <HeroSectionDemo />
      <DemoOne />
      <Testimonials />
    </>
  )
}

export default HomePage
