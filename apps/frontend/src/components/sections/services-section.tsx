import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { ServicesGrid } from "@/components/sections/services-grid";

export function ServicesSection() {
  return (
    <Section
      id="services"
      background="dark"
      className="relative border-y border-neutral-900 bg-neutral-950/20"
    >
      {/* Background System & Ambient Gradients */}
      <BackgroundLayer showNoise={true} showGradient={false} />

      {/* Ambient lighting/glows in the background to match Hero theme */}
      <div className="pointer-events-none absolute top-1/3 left-1/3 -z-20 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.02) 0%, transparent 60%)" }} />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-20 h-[500px] w-[500px]" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.015) 0%, transparent 60%)" }} />

      <MaxWidth>
        <SectionHeader
          subheading="Core Capabilities"
          title="Everything you need to dominate your market."
          description="From foundational architecture to pixel-perfect interfaces, we deliver end-to-end solutions that drive real business impact."
          align="center"
          className="mx-auto text-center"
        />
        <ContentWrapper spacing="lg">
          <ServicesGrid />
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
