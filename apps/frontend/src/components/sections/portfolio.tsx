import React from "react";
import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";
import { Parallax } from "@/experience/motion/parallax";
import {
  ArrowRight,
  Smartphone,
  Globe,
  LayoutDashboard,
  BarChart3,
  Bot,
  Activity,
} from "lucide-react";

export function PortfolioSection() {
  return (
    <Section id="portfolio" background="dark" className="relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <BackgroundLayer showNoise />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/4 h-[500px] w-[500px] mix-blend-screen md:blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] mix-blend-screen md:blur-[150px]"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-[800px] w-[200px] -translate-x-1/2 -translate-y-1/2 rotate-45 md:blur-[150px]"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <MaxWidth className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            subheading="Proven Results"
            title="Products that define their category."
            description="Explore how we've helped industry leaders transform complex challenges into intuitive, high-performance digital experiences."
          />
        </ScrollReveal>

        <ContentWrapper>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {/* FEATURED PROJECT - Large (col-span-6) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-6">
              <ScrollReveal delay={0.1}>
                <PremiumCard
                  glowColor="hsla(210, 100%, 60%, 0.2)"
                  className="group h-auto min-h-[500px] lg:h-[600px]"
                >
                  <div className="flex h-full flex-col lg:flex-row">
                    {/* Content Left */}
                    <div className="flex flex-1 flex-col justify-center p-8 lg:p-12">
                      <div
                        className="mb-4 flex items-center gap-3"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                          Web Platform
                        </span>
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          Live
                        </span>
                      </div>
                      <h3
                        className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        Enterprise Ecosystem
                      </h3>
                      <p
                        className="mb-8 max-w-md text-base leading-relaxed text-neutral-400"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        A complete overhaul of a legacy financial system into a modern, real-time
                        dashboard with predictive AI integration. Achieved a 400% increase in
                        workflow efficiency.
                      </p>

                      <div
                        className="mb-8 flex flex-wrap gap-2"
                        style={{ transform: "translateZ(15px)" }}
                      >
                        {["Next.js", "WebGL", "TypeScript", "Tailwind"].map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-neutral-800/50 px-2.5 py-1 text-xs text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div
                        className="mt-auto flex items-center font-semibold text-blue-400 transition-colors group-hover:text-blue-300"
                        style={{ transform: "translateZ(25px)" }}
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Visual Right (MacBook Mockup + Parallax) */}
                    <div className="relative flex flex-1 items-center justify-center overflow-hidden p-8 lg:p-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <Parallax speed={0.2}>
                        <div
                          className="relative aspect-video w-full max-w-lg rounded-xl border border-neutral-700/50 bg-neutral-900/80 p-2 shadow-2xl md:backdrop-blur-xl"
                          style={{ transform: "translateZ(40px)" }}
                        >
                          {/* Browser Top Bar */}
                          <div className="mb-2 flex items-center gap-1.5 px-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                            <div className="ml-2 h-4 flex-1 rounded bg-neutral-800/50" />
                          </div>
                          {/* Inner Screen */}
                          <div className="relative h-[calc(100%-24px)] w-full overflow-hidden rounded bg-neutral-950">
                            <div className="absolute inset-0 flex flex-col p-4">
                              <div className="mb-4 h-8 w-1/3 rounded bg-blue-500/20" />
                              <div className="flex gap-4">
                                <div className="h-24 flex-1 rounded bg-neutral-800/50" />
                                <div className="h-24 flex-1 rounded bg-neutral-800/50" />
                                <div className="h-24 flex-1 rounded bg-neutral-800/50" />
                              </div>
                              <div className="mt-4 flex-1 rounded bg-neutral-800/30" />
                            </div>

                            {/* Animated floating stats using Tailwind CSS animation */}
                            <div className="absolute top-1/4 -right-4 rounded-lg border border-neutral-700/50 bg-neutral-900/90 p-3 shadow-xl motion-safe:animate-[bounce_4s_infinite] md:backdrop-blur-md">
                              <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-emerald-400" />
                                <span className="text-xs font-bold text-white">+400%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Parallax>
                    </div>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>

            {/* MEDIUM PROJECT 1 (col-span-3) */}
            <div className="col-span-1 lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <PremiumCard glowColor="hsla(280, 80%, 60%, 0.15)" className="group h-[450px]">
                  <div className="flex h-full flex-col p-8">
                    <div
                      className="mb-6 flex justify-between"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <Smartphone className="h-8 w-8 text-neutral-400" />
                      <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                        Mobile App
                      </span>
                    </div>

                    {/* Visual */}
                    <div
                      className="relative mb-8 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-neutral-800/50 bg-neutral-900/30"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <div className="h-40 w-24 rounded-2xl border-4 border-neutral-800 bg-neutral-950 shadow-inner">
                        <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-neutral-800" />
                        <div className="mt-4 flex flex-col gap-2 p-2">
                          <div className="h-8 w-full rounded bg-purple-500/20" />
                          <div className="h-16 w-full rounded bg-neutral-800/50" />
                        </div>
                      </div>
                    </div>

                    <div style={{ transform: "translateZ(25px)" }}>
                      <h3 className="mb-2 text-xl font-bold text-white">Fitness Companion</h3>
                      <p className="text-sm text-neutral-400">
                        Cross-platform mobile application tracking daily metrics with real-time
                        sync.
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>

            {/* MEDIUM PROJECT 2 (col-span-3) */}
            <div className="col-span-1 lg:col-span-3">
              <ScrollReveal delay={0.3}>
                <PremiumCard glowColor="hsla(10, 80%, 60%, 0.15)" className="group h-[450px]">
                  <div className="flex h-full flex-col p-8">
                    <div
                      className="mb-6 flex justify-between"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <Globe className="h-8 w-8 text-neutral-400" />
                      <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400">
                        SaaS Application
                      </span>
                    </div>

                    {/* Visual */}
                    <div
                      className="relative mb-8 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-neutral-800/50 bg-neutral-900/30"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <div className="h-32 w-56 rounded-lg border border-neutral-800 bg-neutral-950 p-2 shadow-inner">
                        <div className="mb-2 flex gap-2">
                          <div className="h-4 w-12 rounded bg-neutral-800" />
                          <div className="h-4 w-12 rounded bg-neutral-800" />
                        </div>
                        <div className="flex gap-2">
                          <div className="h-20 w-16 rounded bg-rose-500/20" />
                          <div className="h-20 flex-1 rounded bg-neutral-800/50" />
                        </div>
                      </div>
                    </div>

                    <div style={{ transform: "translateZ(25px)" }}>
                      <h3 className="mb-2 text-xl font-bold text-white">Marketing Automation</h3>
                      <p className="text-sm text-neutral-400">
                        Streamlined workflow engine for complex multi-channel marketing campaigns.
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>

            {/* SMALL PROJECT 1 (col-span-2) */}
            <div className="col-span-1 lg:col-span-2">
              <ScrollReveal delay={0.4}>
                <PremiumCard glowColor="hsla(160, 80%, 50%, 0.15)" className="group h-[300px]">
                  <div className="flex h-full flex-col justify-between p-8">
                    <div
                      className="flex items-center gap-3"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <LayoutDashboard className="h-6 w-6 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">Internal Tool</span>
                    </div>
                    <div style={{ transform: "translateZ(25px)" }}>
                      <h3 className="mb-2 text-lg font-bold text-white">Data Analytics</h3>
                      <p className="text-sm text-neutral-400">
                        Real-time metrics viewer with customizable widget boards.
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>

            {/* SMALL PROJECT 2 (col-span-2) */}
            <div className="col-span-1 lg:col-span-2">
              <ScrollReveal delay={0.5}>
                <PremiumCard glowColor="hsla(40, 90%, 50%, 0.15)" className="group h-[300px]">
                  <div className="flex h-full flex-col justify-between p-8">
                    <div
                      className="flex items-center gap-3"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <BarChart3 className="h-6 w-6 text-amber-400" />
                      <span className="text-xs font-medium text-amber-400">E-Commerce</span>
                    </div>
                    <div style={{ transform: "translateZ(25px)" }}>
                      <h3 className="mb-2 text-lg font-bold text-white">Global Storefront</h3>
                      <p className="text-sm text-neutral-400">
                        High-conversion headless storefront built on Shopify and Next.js.
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>

            {/* SMALL PROJECT 3 (col-span-2) */}
            <div className="col-span-1 lg:col-span-2">
              <ScrollReveal delay={0.6}>
                <PremiumCard glowColor="hsla(300, 80%, 60%, 0.15)" className="group h-[300px]">
                  <div className="flex h-full flex-col justify-between p-8">
                    <div
                      className="flex items-center gap-3"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <Bot className="h-6 w-6 text-fuchsia-400" />
                      <span className="text-xs font-medium text-fuchsia-400">AI Agent</span>
                    </div>
                    <div style={{ transform: "translateZ(25px)" }}>
                      <h3 className="mb-2 text-lg font-bold text-white">Customer Support</h3>
                      <p className="text-sm text-neutral-400">
                        Automated ticket resolution using advanced LLM pipelines.
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>
          </div>
        </ContentWrapper>
      </MaxWidth>
    </Section>
  );
}
