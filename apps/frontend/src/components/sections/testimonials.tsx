import React from "react";
import { Section, MaxWidth, ContentWrapper, BackgroundLayer } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { PremiumCard } from "@/components/ui/premium-card";
import { ScrollReveal } from "@/experience/motion/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Star, Quote, Building2, UserCircle2 } from "lucide-react";

// Dummy testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Chief Product Officer",
    company: "NexusHealth",
    rating: 5,
    text: "DevSpark didn't just build our platform; they redefined our entire digital strategy. The attention to detail in the glassmorphism UI and the buttery smooth 60fps animations elevated our brand instantly.",
    category: "Healthcare SaaS",
    year: "2025",
    color: "hsla(210,100%,60%,0.2)",
    delay: 0.1,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "VP of Engineering",
    company: "AeroDynamics",
    rating: 5,
    text: "The engineering excellence is palpable. They delivered a complex WebGL analytics dashboard that performs flawlessly across devices. Their architectural decisions saved us months of technical debt.",
    category: "Enterprise Analytics",
    year: "2026",
    color: "hsla(37,93%,55%,0.2)",
    delay: 0.2,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Founder & CEO",
    company: "FinTech Nova",
    rating: 5,
    text: "Working with this team feels like having an in-house elite strike force. The seamless integration of motion, accessible design, and rock-solid Next.js architecture resulted in a record-breaking launch.",
    category: "Financial Platform",
    year: "2025",
    color: "hsla(280,80%,60%,0.2)",
    delay: 0.3,
  },
];

// Marquee logos
const logos = [
  "Acme Corp",
  "GlobalNet",
  "NexusHealth",
  "AeroDynamics",
  "FinTech Nova",
  "Quantum AI",
  "Zephyr Systems",
  "Vanguard Web",
  "Acme Corp",
  "GlobalNet",
  "NexusHealth",
  "AeroDynamics",
  "FinTech Nova",
  "Quantum AI",
  "Zephyr Systems",
  "Vanguard Web", // duplicated for smooth loop
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" background="darker" className="relative overflow-hidden py-32">
      {/* LAYER 1: Background Atmosphere */}
      <BackgroundLayer showNoise />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 mix-blend-screen blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[800px] w-[800px] translate-x-1/4 translate-y-1/4 rounded-full bg-purple-500/5 mix-blend-screen blur-[150px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/80 to-[#050505]" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 4rem;
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-card {
            animation: none !important;
          }
        }
      `,
        }}
      />

      <MaxWidth className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            subheading="Client Impact"
            title="Trusted by ambitious leaders."
            description="The most innovative teams choose us to architect their most critical digital assets. Here is what they have to say."
          />
        </ScrollReveal>

        {/* LAYER 2: Testimonial Cards */}
        <ContentWrapper className="mt-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-center">
            {testimonials.map((item, index) => {
              const isCenter = index === 1;
              const animationDuration = 6 + index;
              return (
                <div key={item.id} className={`col-span-1 ${isCenter ? "lg:-mt-8 lg:mb-8" : ""}`}>
                  <ScrollReveal delay={item.delay}>
                    <div
                      className="floating-card"
                      style={{
                        animation: `subtle-float ${animationDuration}s ease-in-out infinite`
                      }}
                    >
                      <PremiumCard
                        glowColor={item.color}
                        className={`group relative h-full ${isCenter ? "lg:min-h-[500px]" : "lg:min-h-[450px]"}`}
                      >
                        <div className="flex h-full flex-col justify-between p-8 lg:p-10">
                          {/* Top: Quote icon & Rating */}
                          <div
                            className="mb-8 flex items-start justify-between"
                            style={{ transform: "translateZ(20px)" }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-700/50 bg-neutral-800/50 text-neutral-400 shadow-inner transition-colors duration-500 group-hover:border-neutral-600 group-hover:text-white">
                              <Quote className="h-5 w-5" />
                            </div>
                            <div className="flex gap-1">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                              ))}
                            </div>
                          </div>

                          {/* Middle: Text */}
                          <div className="mb-8 flex-1" style={{ transform: "translateZ(30px)" }}>
                            <p
                              className={`leading-relaxed font-medium text-neutral-300 transition-colors duration-300 group-hover:text-white ${isCenter ? "text-lg md:text-xl" : "text-base md:text-lg"}`}
                            >
                              &quot;{item.text}&quot;
                            </p>
                          </div>

                          {/* Bottom: Author & Meta */}
                          <div
                            className="flex items-center justify-between border-t border-neutral-800/50 pt-6"
                            style={{ transform: "translateZ(15px)" }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 shadow-lg ring-2 ring-neutral-800 transition-all duration-300 group-hover:ring-neutral-500">
                                <UserCircle2 className="h-6 w-6 text-neutral-400" />
                                <div
                                  className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                                  style={{ backgroundColor: item.color }}
                                />
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white">{item.name}</h4>
                                <p className="text-sm text-neutral-400">{item.role}</p>
                              </div>
                            </div>
                          </div>

                          {/* Decorative Meta Tags */}
                          <div
                            className="mt-6 flex flex-wrap gap-2"
                            style={{ transform: "translateZ(10px)" }}
                          >
                            <span className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-medium text-neutral-400">
                              <Building2 className="h-3 w-3" />
                              {item.category}
                            </span>
                            <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-medium text-neutral-400">
                              {item.year}
                            </span>
                          </div>
                        </div>
                      </PremiumCard>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </ContentWrapper>

        {/* LAYER 3: Trust Indicators (Marquee) */}
        <ScrollReveal delay={0.5}>
          <div className="mt-32 border-y border-neutral-800/50 bg-neutral-900/20 py-10 backdrop-blur-sm">
            <p className="mb-8 text-center text-sm font-semibold tracking-widest text-neutral-500 uppercase">
              Trusted by innovative teams worldwide
            </p>
            <div
              className="marquee-container mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent) w-full overflow-hidden select-none"
              aria-label="Trusted companies marquee"
            >
              <div className="marquee-track px-4 py-4" aria-hidden="true">
                {logos.map((logo, index) => (
                  <span
                    key={index}
                    className="text-xl font-bold text-neutral-600 transition-colors duration-300 hover:text-neutral-300"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* LAYER 4: Social Proof Counters */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20">
            <div className="grid grid-cols-2 gap-8 divide-x divide-neutral-800/50 rounded-3xl border border-neutral-800/50 bg-neutral-900/30 p-8 shadow-2xl backdrop-blur-xl lg:grid-cols-4">
              <AnimatedCounter value={50} label="Projects" suffix="+" />
              <AnimatedCounter value={25} label="Clients" suffix="+" />
              <AnimatedCounter value={98} label="Satisfaction" suffix="%" />
              <AnimatedCounter value={4.9} label="Avg Rating" suffix="★" />
            </div>
          </div>
        </ScrollReveal>
      </MaxWidth>
    </Section>
  );
}
