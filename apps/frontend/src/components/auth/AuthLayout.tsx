"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

const AnimatedGrid = dynamic(
  () => import("@/components/ui/animated-grid").then((m) => m.AnimatedGrid),
  { ssr: false },
);

function FloatingOrb({
  color,
  size,
  top,
  right,
  bottom,
  left,
}: {
  color: string;
  size: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-[100px]"
      style={{
        width: size,
        height: size,
        background: color,
        top,
        right,
        bottom,
        left,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FeatureBadge({
  icon: Icon,
  text,
  delay,
}: {
  icon: LucideIcon;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 text-sm text-neutral-400"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10">
        <Icon className="h-4 w-4 text-amber-400" />
      </div>
      {text}
    </motion.div>
  );
}

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });
  const cardRotateX = useTransform(springY, [0, 1], [3, -3]);
  const cardRotateY = useTransform(springX, [0, 1], [-3, 3]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-left-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power4.out", delay: 0.2 },
      );
    },
    { scope: containerRef },
  );

  return (
    <div className="bg-surface-ground flex min-h-screen flex-col text-neutral-50">
      <Header />
      <main className="relative flex flex-grow items-center overflow-hidden pt-18">
        <div className="pointer-events-none absolute inset-0 z-0">
          <AnimatedGrid />
          <FloatingOrb
            color="radial-gradient(circle, hsla(37,93%,55%,0.5) 0%, transparent 70%)"
            size={600}
            top="-10%"
            right="-5%"
          />
          <FloatingOrb
            color="radial-gradient(circle, hsla(200,90%,60%,0.4) 0%, transparent 70%)"
            size={500}
            bottom="-10%"
            left="-5%"
          />
          <FloatingOrb
            color="radial-gradient(circle, hsla(270,80%,60%,0.2) 0%, transparent 70%)"
            size={400}
            top="40%"
            left="30%"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(222,22%,5%)_85%)]" />
        </div>

        <div
          ref={containerRef}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:justify-center">
              <div className="gsap-left-item mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                  Premium Platform
                </span>
              </div>

              <h1 className="gsap-left-item mb-4 text-5xl leading-[1.05] font-extrabold tracking-tighter text-white xl:text-6xl">
                {title}
              </h1>

              <p className="gsap-left-item mb-10 max-w-md text-lg leading-relaxed text-neutral-400">
                {subtitle}
              </p>

              <div className="gsap-left-item mb-12 h-px w-20 bg-gradient-to-r from-amber-400 to-transparent" />

              <div className="flex flex-col gap-4">
                <FeatureBadge
                  icon={ShieldCheck}
                  text="Enterprise-grade security & SSO support"
                  delay={0.5}
                />
                <FeatureBadge
                  icon={Zap}
                  text="Real-time project tracking & analytics"
                  delay={0.6}
                />
                <FeatureBadge
                  icon={Sparkles}
                  text="AI-assisted code reviews & insights"
                  delay={0.7}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-5"
              >
                <p className="mb-4 text-sm leading-relaxed text-neutral-400 italic">
                  &ldquo;DevSpark transformed our development workflow. We shipped 3x faster and the
                  quality is unmatched.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs font-bold text-amber-400">
                    JS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-200">Jordan Smith</p>
                    <p className="text-xs text-neutral-500">CTO @ Nexus Labs</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Card Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <motion.div
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
                className="w-full max-w-md"
              >
                <div className="glass-modal relative overflow-hidden rounded-3xl px-8 py-10 md:px-10">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

                  <div className="mb-8 text-center">
                    <Link href="/" className="inline-block">
                      <span className="font-mono text-2xl font-bold tracking-tight text-white">
                        dev<span className="text-amber-400">spark</span>
                      </span>
                    </Link>
                  </div>

                  {children}

                  <p className="mt-6 text-center text-xs text-neutral-600">
                    Protected by enterprise-grade encryption.{" "}
                    <Link
                      href="#"
                      className="text-amber-400/60 transition-colors hover:text-amber-400"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
