// Ported from jnsahaj/tweakcn app/page.tsx (Apache-2.0). Adapted via CreatorHub; see SOURCE-NOTICE.md.
import { Hero } from "./home/hero";
import { Features } from "./home/features";
import { HowItWorks } from "./home/how-it-works";
import { FAQ } from "./home/faq";
import { CTA } from "./home/cta";
import { Footer } from "./home/footer";
import Showcase from "./components/LandingShowcase";
import { Community } from "./home/community";

export default function Landing() {
  return (
    <div className="tweak-home ch:bg-background ch:text-foreground ch:flex ch:min-h-[calc(100dvh-4rem)] ch:flex-col ch:items-center ch:justify-items-center">
      <main id="main" className="landing-page ch:w-full ch:flex-1">
        <Hero />
        <Showcase />
        <Features />
        <HowItWorks />
        <CTA />
        <Community />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
