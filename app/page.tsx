import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Features } from "@/components/sections/features";
import { UseCases } from "@/components/sections/use-cases";
import { SocialProof } from "@/components/sections/social-proof";
import { FAQ } from "@/components/sections/faq";
import { Blog } from "@/components/sections/blog";
import { BinForm } from "@/components/sections/bin-form";
import { FinalCTA } from "@/components/sections/final-cta";
import { LeafBackground } from "@/components/ui/leaf-background";
import { Particles } from "@/components/ui/particles";
import { SectionTransition } from "@/components/ui/section-transition";
import { ServiceChecker } from "@/components/sections/service-checker";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      {/* Leaf background covers all sections below hero */}
      <div className="relative bg-background transition-colors duration-500">
        <LeafBackground />
        <Particles count={70} className="opacity-60 dark:opacity-80" />
        <SectionTransition>
          <Problem />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Solution />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Features />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <UseCases />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <SocialProof />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <ServiceChecker />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Blog />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <FAQ />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <BinForm />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <FinalCTA />
        </SectionTransition>
      </div>
    </main>
  );
}
