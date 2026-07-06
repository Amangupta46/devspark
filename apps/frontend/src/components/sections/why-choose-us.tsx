import {
  Section,
  MaxWidth,
  ContentWrapper,
  BackgroundLayer,
  Grid,
} from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassCard } from "@/components/shared/glass-card";

export function WhyChooseUsSection() {
  return (
    <Section id="why-choose-us" background="darker">
      <BackgroundLayer showNoise showGradient gradientPosition="bottom-left" gradientColor="teal" />
      <MaxWidth>
        <SectionHeader
          subheading="Why Choose Us"
          title="Engineered for Performance"
          description="We combine senior developers, visual design, and clean code to ship fast, optimized products."
        />
        <ContentWrapper>
          <Grid cols={1} colsMd={3} gap={6}>
            <GlassCard>
              <h3 className="text-neutral-0 text-lg font-bold">Lighthouse 95+</h3>
              <p className="mt-2 text-sm text-neutral-300">
                We optimize every line of code to achieve near-perfect speed metrics.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-neutral-0 text-lg font-bold">Radix Accessibility</h3>
              <p className="mt-2 text-sm text-neutral-300">
                All modules map fully compliant semantic structure outlines.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="text-neutral-0 text-lg font-bold">Apple-Grade Motion</h3>
              <p className="mt-2 text-sm text-neutral-300">
                Tactile spring interactions built directly on core GPU processors.
              </p>
            </GlassCard>
          </Grid>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
