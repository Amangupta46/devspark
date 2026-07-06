import {
  Section,
  MaxWidth,
  ContentWrapper,
  BackgroundLayer,
  Grid,
} from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { PremiumCard } from "@/components/ui/premium-card";

export function PricingSection() {
  return (
    <Section id="pricing" background="dark">
      <BackgroundLayer showNoise />
      <MaxWidth>
        <SectionHeader
          subheading="Pricing Plans"
          title="Transparent Agency Engagement"
          description="Select a subscription retainer or project-based outline that fits your current requirements."
        />
        <ContentWrapper>
          <Grid cols={1} colsMd={3} gap={6}>
            <PremiumCard glowColor="hsla(37,93%,55%,0.15)">
              <div className="flex flex-col space-y-4 p-8">
                <h3
                  className="text-neutral-0 text-lg font-bold"
                  style={{ transform: "translateZ(10px)" }}
                >
                  Starter Project
                </h3>
                <div
                  className="text-neutral-0 text-2xl font-extrabold"
                  style={{ transform: "translateZ(20px)" }}
                >
                  $5K
                </div>
                <p className="text-xs text-neutral-300" style={{ transform: "translateZ(5px)" }}>
                  Basic landing pages and visual templates.
                </p>
              </div>
            </PremiumCard>
            <PremiumCard glowColor="hsla(37,93%,55%,0.15)">
              <div className="flex flex-col space-y-4 p-8">
                <h3
                  className="text-neutral-0 text-lg font-bold"
                  style={{ transform: "translateZ(10px)" }}
                >
                  Retainer
                </h3>
                <div
                  className="text-neutral-0 text-2xl font-extrabold"
                  style={{ transform: "translateZ(20px)" }}
                >
                  $10K/mo
                </div>
                <p className="text-xs text-neutral-300" style={{ transform: "translateZ(5px)" }}>
                  Continuous custom development and support pipelines.
                </p>
              </div>
            </PremiumCard>
            <PremiumCard glowColor="hsla(37,93%,55%,0.15)">
              <div className="flex flex-col space-y-4 p-8">
                <h3
                  className="text-neutral-0 text-lg font-bold"
                  style={{ transform: "translateZ(10px)" }}
                >
                  Enterprise builds
                </h3>
                <div
                  className="text-neutral-0 text-2xl font-extrabold"
                  style={{ transform: "translateZ(20px)" }}
                >
                  Custom
                </div>
                <p className="text-xs text-neutral-300" style={{ transform: "translateZ(5px)" }}>
                  Fully tailored AI pipelines and integrations.
                </p>
              </div>
            </PremiumCard>
          </Grid>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
