import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustedBySection } from "@/components/sections/trusted-by";
import dynamic from "next/dynamic";

const ServicesSection = dynamic(() =>
  import("@/components/sections/services-section").then((mod) => mod.ServicesSection),
);
const WhyChooseUsSection = dynamic(() =>
  import("@/components/sections/why-choose-us").then((mod) => mod.WhyChooseUsSection),
);
const PortfolioSection = dynamic(() =>
  import("@/components/sections/portfolio").then((mod) => mod.PortfolioSection),
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/process").then((mod) => mod.ProcessSection),
);
const TechStackSection = dynamic(() =>
  import("@/components/sections/tech-stack").then((mod) => mod.TechStackSection),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials").then((mod) => mod.TestimonialsSection),
);
const PricingSection = dynamic(() =>
  import("@/components/sections/pricing").then((mod) => mod.PricingSection),
);
const FAQSection = dynamic(() => import("@/components/sections/faq").then((mod) => mod.FAQSection));
const CTASection = dynamic(() => import("@/components/sections/cta").then((mod) => mod.CTASection));

export default function Home() {
  return (
    <div className="bg-surface-ground flex min-h-screen flex-col text-neutral-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TrustedBySection />
        <ServicesSection />
        <WhyChooseUsSection />
        <PortfolioSection />
        <ProcessSection />
        <TechStackSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
