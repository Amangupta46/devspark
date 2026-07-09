"use client";

import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";
import { Zap, ShieldCheck, Sparkles } from "lucide-react";

export function WhyChooseUsSection() {
  const features = [
    {
      title: "Lighthouse 95+",
      description:
        "We optimize every line of code to achieve near-perfect speed metrics, ensuring instantaneous load times.",
      icon: Zap,
      glowColor: "hsla(37,93%,55%,0.3)", // Amber
    },
    {
      title: "Radix Accessibility",
      description:
        "All modules map to fully compliant semantic structure outlines, guaranteeing access for all users.",
      icon: ShieldCheck,
      glowColor: "hsla(210,100%,60%,0.3)", // Blue
    },
    {
      title: "Apple-Grade Motion",
      description:
        "Tactile spring interactions built directly on core GPU processors for perfectly fluid animations.",
      icon: Sparkles,
      glowColor: "hsla(280,80%,60%,0.3)", // Purple
    },
  ];

  return (
    <Section id="why-choose-us" className="relative z-10">
      <BackgroundLayer showNoise />
      <MaxWidth>
        <ScrollReveal>
          <SectionHeader
            subheading="Why Choose Us"
            title="Engineered for Performance"
            description="We combine senior developers, visual design, and clean code to ship fast, optimized products."
            align="center"
          />
        </ScrollReveal>

        <ContentWrapper className="mt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} className="flex h-full">
                <PremiumCard glowColor={feature.glowColor} tiltIntensity={10} className="w-full">
                  <div className="flex h-full flex-col p-8 md:p-10">
                    <div
                      className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] md:backdrop-blur-md"
                      style={{ boxShadow: `0 8px 32px -8px ${feature.glowColor}` }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="text-base leading-relaxed text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            ))}
          </div>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
