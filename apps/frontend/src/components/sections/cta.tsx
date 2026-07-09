import React from "react";
import Link from "next/link";
import { Section, MaxWidth, BackgroundLayer } from "@/components/layout/primitives";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";
import { PremiumOrbitIllustration } from "./premium-orbit-illustration";

export function CTASection() {
  return (
    <Section
      id="cta"
      background="darker"
      className="relative flex min-h-screen items-center overflow-hidden py-24 md:py-32"
    >
      {/* Premium Background Ambience */}
      <BackgroundLayer showNoise />

      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div
          className="absolute top-1/2 left-1/4 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 h-[700px] w-[700px] translate-x-1/4 -translate-y-1/2 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 60%)",
          }}
        />
        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#050505_85%)]" />
      </div>

      <MaxWidth className="relative z-20 mx-auto">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* LEFT: Content */}
          <div className="flex flex-col items-start justify-center text-left">
            <ScrollReveal>
              <h2 className="mb-6 max-w-2xl text-[2.75rem] leading-[1.1] font-extrabold tracking-tighter text-white md:text-6xl lg:text-7xl xl:text-[5rem]">
                Ready to build something{" "}
                <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-600 bg-clip-text text-transparent">
                  extraordinary?
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mb-12 max-w-lg text-lg leading-relaxed text-neutral-400 md:text-xl">
                Let&apos;s discuss how we can accelerate your digital transformation with
                high-performance architecture and premium design.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Primary Button */}
                <Link href="/contact" className="group relative outline-none">
                  <PremiumCard
                    glowColor="rgba(245, 158, 11, 0.4)"
                    className="rounded-full p-0 transition-transform duration-500 ease-out hover:scale-105"
                  >
                    <div className="relative flex items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-10 py-5">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                      {/* Shine Sweep */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                      <span className="relative z-10 text-lg font-bold tracking-wide text-white">
                        Start a Project
                      </span>
                    </div>
                  </PremiumCard>
                </Link>

                {/* Secondary Button */}
                <Link href="#portfolio" className="group relative outline-none">
                  <div className="relative flex items-center justify-center overflow-hidden rounded-full border border-neutral-700/80 bg-neutral-900/40 px-10 py-5 transition-all duration-500 hover:scale-105 hover:border-neutral-400/80 hover:bg-neutral-800/80 focus-visible:ring-2 focus-visible:ring-amber-500 md:backdrop-blur-md">
                    <span className="relative z-10 text-lg font-semibold tracking-wide text-neutral-300 transition-colors group-hover:text-white">
                      View Our Work
                    </span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </Link>
              </div>
            </ScrollReveal>

            {/* Premium Trust Metrics */}
            <ScrollReveal delay={0.3}>
              <div className="mt-20 grid grid-cols-2 gap-x-12 gap-y-8 border-t border-neutral-800/50 pt-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    50+
                  </div>
                  <div className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                    Projects Delivered
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    25+
                  </div>
                  <div className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                    Happy Clients
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    98%
                  </div>
                  <div className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                    Client Satisfaction
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    4.9<span className="align-top text-2xl text-amber-500">★</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                    Average Rating
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Premium Animated Orbit Illustration */}
          <div className="relative flex w-full items-center justify-center">
            <PremiumOrbitIllustration />
          </div>
        </div>
      </MaxWidth>
    </Section>
  );
}
