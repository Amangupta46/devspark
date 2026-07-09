import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
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
          <div className="flex w-full justify-center">
            <PremiumCard glowColor="hsla(37,93%,55%,0.15)">
              <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-6 p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
                  <svg
                    className="h-8 w-8 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-neutral-0 text-2xl font-bold"
                  style={{ transform: "translateZ(10px)" }}
                >
                  Pricing Locked
                </h3>
                <p
                  className="text-base leading-relaxed text-neutral-300"
                  style={{ transform: "translateZ(5px)" }}
                >
                  Login will unlock pricing once backend authentication is connected.
                </p>
                <a
                  href="/login"
                  className="mt-4 rounded-lg bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Sign In
                </a>
              </div>
            </PremiumCard>
          </div>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
