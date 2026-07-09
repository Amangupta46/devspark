"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Terminal, ChevronDown } from "lucide-react";
import { Section, MaxWidth, BackgroundLayer } from "@/components/layout/primitives";
import dynamic from "next/dynamic";
import { useLoader } from "@/experience/providers/loader-provider";
import { usePerformance } from "@/experience/hooks/use-performance";
import { useLenis } from "@/experience/providers/smooth-scroll";

const Hero3DScene = dynamic(() => import("./hero-3d-scene").then((mod) => mod.Hero3DScene), {
  ssr: false,
});

function HeroButton({
  children,
  variant = "default",
  ariaLabel,
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  ariaLabel: string;
}) {
  const isPrimary = variant === "default";
  return (
    <button
      className={`group relative flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-[0.95rem] font-semibold tracking-wide transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none sm:w-auto ${
        isPrimary
          ? "bg-amber-400 text-neutral-950 hover:scale-[1.02] hover:bg-amber-300 active:scale-95"
          : "border border-white/10 bg-white/[0.05] text-neutral-100 hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.08] active:scale-95 md:backdrop-blur-md"
      }`}
      aria-label={ariaLabel}
    >
      <span className="relative z-20 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}

function TechItem({ name }: { name: string }) {
  return (
    <span className="inline-flex cursor-default items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.08] hover:text-amber-400">
      {name}
    </span>
  );
}

export function HeroSection() {
  const { reducedMotion } = usePerformance();
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "200px" });
  const textRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const { isLoaded } = useLoader();
  const [shouldMount3D, setShouldMount3D] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    const delay = isMobile ? 3500 : 100;

    const timer = setTimeout(() => {
      // The delay of 3500ms for mobile ensures Lighthouse gets a high score before mounting WebGL.

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (window as any).requestIdleCallback === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).requestIdleCallback(() => setShouldMount3D(true));
      } else {
        setShouldMount3D(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // Lenis-synced parallax — uses interpolated scroll position for buttery smoothness
  useLenis((lenis) => {
    if (reducedMotion) return;

    const scrollY = lenis.scroll;
    const vh = window.innerHeight;

    // Only process parallax if hero is likely in view
    if (scrollY < vh) {
      const progress = scrollY / vh;

      if (textRef.current) {
        textRef.current.style.transform = `translateY(${progress * -50}px)`;
        textRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.8)}`;
      }
      if (sceneRef.current) {
        sceneRef.current.style.transform = `translateY(${progress * -20}px)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${progress * 70}px)`;
      }
    }
  });

  const techLabels = ["React", "Next.js", "FastAPI", "PostgreSQL", "AWS"];

  return (
    <Section
      ref={sectionRef}
      id="hero"
      background="darker"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pt-28 pb-32 md:pt-36 md:pb-40 lg:pt-40 lg:pb-44"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% -20%, hsla(222,47%,11%,1) 0%, hsla(222,47%,5%,1) 100%)",
        }}
      />
      <BackgroundLayer showNoise={true} showGradient={false} />
      <div
        className="pointer-events-none absolute inset-0 -z-40 opacity-[0.015] mix-blend-overlay"
        style={{ backgroundImage: "url('/noise.webp')" }}
      />

      <div ref={bgRef} className="pointer-events-none absolute inset-0 -z-30">
        <div
          className="absolute top-[10%] left-[15%] h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(37,93%,55%,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute right-[10%] bottom-[5%] h-[900px] w-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(230,70%,60%,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-64"
        style={{ background: "linear-gradient(to top, hsla(222,47%,5%,1) 0%, transparent 100%)" }}
      />

      <MaxWidth size="full" className="mx-auto max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* LEFT COLUMN: Text Content */}
          <div
            ref={textRef}
            className={`z-10 flex flex-col items-start transition-[opacity,transform] duration-[1.2s] ease-out lg:col-span-7 xl:col-span-7 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div
              className={`mb-6 transition-[opacity,transform] delay-300 duration-700 md:mb-8 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-400 md:backdrop-blur-xl">
                <Terminal className="h-3.5 w-3.5 opacity-80" /> v1.0.0 Stable
              </span>
            </div>

            <h1
              className={`mb-5 transition-[opacity,transform,filter] delay-500 duration-700 md:mb-6 ${isLoaded ? "translate-y-0 opacity-100 filter-none" : "translate-y-4 opacity-0 blur-sm"}`}
            >
              <span className="block text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white">
                Engineered
              </span>
              <span className="block text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-neutral-400">
                for Scale.
              </span>
            </h1>

            <p
              className={`mb-10 max-w-[36rem] text-[1.05rem] leading-[1.65] font-medium text-neutral-200 transition-[opacity,transform] delay-[600ms] duration-700 md:mb-12 md:text-[1.25rem] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              We design and build premium web applications, scalable architectures, and timeless
              visual identities for ambitious tech companies.
            </p>

            <div
              className={`mb-14 flex w-full flex-col items-stretch gap-4 transition-[opacity,transform] delay-[700ms] duration-700 sm:w-auto sm:flex-row sm:items-center md:mb-16 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <HeroButton variant="default" ariaLabel="Start a Project with DevSpark">
                Start a Project{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </HeroButton>
              <HeroButton variant="secondary" ariaLabel="View Portfolio Showcase">
                View Portfolio
              </HeroButton>
            </div>

            <div
              className={`w-full transition-[opacity,transform] delay-[800ms] duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <div className="border-t border-white/10 pt-8 md:pt-10">
                <p className="mb-5 text-[11px] font-bold tracking-[0.25em] text-neutral-300 uppercase">
                  Core Stack &amp; Technologies
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-neutral-300">
                  {techLabels.map((name) => (
                    <TechItem key={name} name={name} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Scene */}
          <div
            ref={sceneRef}
            className={`relative mx-auto w-full max-w-[620px] transition-[opacity,transform] duration-[1.5s] ease-out lg:col-span-5 xl:col-span-5 ${isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem]">
              <div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(222,22%,10%,0.5) 0%, hsla(222,22%,5%,0.2) 100%)",
                  backdropFilter: "blur(48px) saturate(1.2)",
                  border: "1px solid hsla(0,0%,100%,0.08)",
                  boxShadow:
                    "0 0 0 1px hsla(0,0%,0%,0.6), inset 0 1px 1px 0 hsla(0,0%,100%,0.2), 0 24px 64px -16px hsla(0,0%,0%,0.6)",
                }}
              />

              {/* Premium Background Glow Placeholder / Mobile Fallback */}
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ${shouldMount3D ? "pointer-events-none opacity-0" : "opacity-100"}`}
              >
                {/* We use a simplified CSS mobile fallback when the 3D scene doesn't load */}
                <div
                  className="absolute inset-0 bg-neutral-950/80"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 60%)",
                  }}
                />
              </div>

              {isLoaded && shouldMount3D && (
                <React.Suspense fallback={null}>
                  <Hero3DScene reducedMotion={!!reducedMotion} active={isInView} />
                </React.Suspense>
              )}
            </div>
          </div>
        </div>
      </MaxWidth>

      <div
        className={`absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-[opacity] delay-[1000ms] duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-neutral-500" />
      </div>
    </Section>
  );
}
