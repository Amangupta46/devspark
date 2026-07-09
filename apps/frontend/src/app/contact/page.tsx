"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Clock,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

// Import the sections directly since this is a client component anyway,
// or we can use dynamic imports. The previous code didn't import them, so we will.
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { FAQSection } from "@/components/sections/faq";
import { Section, MaxWidth } from "@/components/layout/primitives";

gsap.registerPlugin(useGSAP);

const AnimatedGrid = dynamic(
  () => import("@/components/ui/animated-grid").then((m) => m.AnimatedGrid),
  { ssr: false },
);

// ─── Zod Schema ──────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(20, "Please describe your project (min. 20 characters)"),
});

type ContactForm = z.infer<typeof contactSchema>;

// ─── Floating Label Input ─────────────────────────────────────────────────────
function FloatingInput({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value) || Boolean(props.defaultValue);

  return (
    <div className={cn("group relative", className)}>
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "peer w-full rounded-xl border bg-white/[0.03] px-4 pt-6 pb-2 text-sm text-neutral-100 transition-all duration-300 outline-none md:backdrop-blur-sm",
          "placeholder-transparent",
          error
            ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
        )}
        placeholder={label}
      />
      <label
        className={cn(
          "pointer-events-none absolute left-4 text-neutral-500 transition-all duration-200",
          focused || hasValue ? "top-2 text-[10px] font-medium tracking-wider" : "top-4 text-sm",
          focused && !error ? "text-amber-400" : "",
          error ? "text-red-400" : "",
        )}
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Floating Label Select ────────────────────────────────────────────────────
function FloatingSelect({
  label,
  error,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value) && props.value !== "";

  return (
    <div className="group relative">
      <select
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "peer w-full appearance-none rounded-xl border bg-white/[0.03] px-4 pt-6 pb-2 text-sm text-neutral-100 transition-all duration-300 outline-none md:backdrop-blur-sm",
          error
            ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
          !hasValue ? "text-neutral-500" : "",
        )}
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-neutral-900 text-neutral-100">
            {o.label}
          </option>
        ))}
      </select>
      <label
        className={cn(
          "pointer-events-none absolute left-4 text-neutral-500 transition-all duration-200",
          focused || hasValue ? "top-2 text-[10px] font-medium tracking-wider" : "top-4 text-sm",
          focused && !error ? "text-amber-400" : "",
          error ? "text-red-400" : "",
        )}
      >
        {label}
      </label>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Floating Label Textarea ──────────────────────────────────────────────────
function FloatingTextarea({
  label,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(props.value);

  return (
    <div className="group relative">
      <textarea
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "peer w-full resize-none rounded-xl border bg-white/[0.03] px-4 pt-7 pb-3 text-sm text-neutral-100 transition-all duration-300 outline-none md:backdrop-blur-sm",
          "placeholder-transparent",
          error
            ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
            : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
        )}
        rows={5}
        placeholder={label}
      />
      <label
        className={cn(
          "pointer-events-none absolute left-4 text-neutral-500 transition-all duration-200",
          focused || hasValue ? "top-2 text-[10px] font-medium tracking-wider" : "top-4 text-sm",
          focused && !error ? "text-amber-400" : "",
          error ? "text-red-400" : "",
        )}
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-amber-400 to-amber-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Info Card ────────────────────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  delay,
  glowColor,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  delay: number;
  glowColor: string;
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.06] md:backdrop-blur-sm"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${glowColor}20`, boxShadow: `0 0 20px ${glowColor}30` }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wider text-neutral-500 uppercase">{label}</p>
        <p className="mt-1 text-base font-semibold text-neutral-200">{value}</p>
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} className="block h-full">
      {content}
    </a>
  ) : (
    <div className="h-full">{content}</div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const orb1X = useTransform(springX, [0, 1], [-40, 40]);
  const orb1Y = useTransform(springY, [0, 1], [-40, 40]);
  const orb2X = useTransform(springX, [0, 1], [40, -40]);
  const orb2Y = useTransform(springY, [0, 1], [40, -40]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: "", budget: "" },
  });

  // Mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  // GSAP entrance timeline
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".gsap-badge", { opacity: 0, y: 20, duration: 0.6 })
        .from(".gsap-title-line", { opacity: 0, y: 40, stagger: 0.12, duration: 0.9 }, "-=0.3")
        .from(".gsap-subtitle", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from(".gsap-divider", { scaleX: 0, duration: 0.8, transformOrigin: "left" }, "-=0.4");
    },
    { scope: heroRef },
  );

  const onSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const projectTypes = [
    { value: "web-app", label: "Web Application" },
    { value: "mobile-app", label: "Mobile App" },
    { value: "saas", label: "SaaS Platform" },
    { value: "ai-integration", label: "AI Integration" },
    { value: "ui-ux", label: "UI/UX Design" },
    { value: "other", label: "Other" },
  ];

  const budgets = [
    { value: "5-15k", label: "$5K – $15K" },
    { value: "15-50k", label: "$15K – $50K" },
    { value: "50-100k", label: "$50K – $100K" },
    { value: "100k+", label: "$100K+" },
  ];

  return (
    <div className="bg-surface-ground flex min-h-screen flex-col text-neutral-50">
      <Header />

      <main className="relative flex-grow overflow-hidden pt-18">
        {/* ── Ambient Background ── */}
        <div className="pointer-events-none absolute inset-0 z-0 h-[120vh]">
          <AnimatedGrid />
          {/* Orb 1 — amber top right */}
          <motion.div
            style={{
              x: orb1X,
              y: orb1Y,
              background: "radial-gradient(circle, hsla(37,93%,55%,0.4) 0%, transparent 70%)",
            }}
            className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full opacity-30 blur-[120px]"
            aria-hidden="true"
          />
          {/* Orb 2 — teal bottom left */}
          <motion.div
            style={{
              x: orb2X,
              y: orb2Y,
              background: "radial-gradient(circle, hsla(200,90%,50%,0.5) 0%, transparent 70%)",
            }}
            className="absolute top-80 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
            aria-hidden="true"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(222,22%,5%)_90%)]" />
        </div>

        {/* 1. Hero Section */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 md:pt-28 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* ── LEFT: Hero Copy ── */}
            <div ref={heroRef} className="flex flex-col">
              <div className="gsap-badge mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                  Let&apos;s Collaborate
                </span>
              </div>

              <h1 className="mb-6 text-5xl leading-[1.05] font-extrabold tracking-tighter md:text-6xl xl:text-7xl">
                <span className="gsap-title-line block text-white">Let&apos;s Build</span>
                <span className="gsap-title-line block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Something
                </span>
                <span className="gsap-title-line block text-white">Extraordinary.</span>
              </h1>

              <p className="gsap-subtitle mb-8 max-w-md text-lg leading-relaxed text-neutral-400">
                Tell us about your vision. We&apos;ll craft a tailored strategy and get back to you
                within 24 hours.
              </p>

              <div className="gsap-divider h-px w-16 bg-gradient-to-r from-amber-400 to-transparent lg:hidden" />
            </div>

            {/* ── RIGHT: Info Grid ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard
                icon={Mail}
                label="Email Us"
                value="hello@devspark.dev"
                href="mailto:hello@devspark.dev"
                delay={0.4}
                glowColor="#f59e0b"
              />
              <InfoCard
                icon={Phone}
                label="Call Us"
                value="+1 (555) 000-0000"
                href="tel:+15550000000"
                delay={0.5}
                glowColor="#38bdf8"
              />
              <InfoCard
                icon={MapPin}
                label="Based In"
                value="San Francisco, CA"
                delay={0.6}
                glowColor="#a78bfa"
              />
              <InfoCard
                icon={Clock}
                label="Response Time"
                value="Within 24 hours"
                delay={0.7}
                glowColor="#34d399"
              />
            </div>
          </div>
        </div>

        {/* 2. Why Choose DevSpark */}
        <WhyChooseUsSection />

        {/* 3. Contact Form */}
        <Section id="contact-form" className="relative z-10 py-20">
          <MaxWidth className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass-modal relative overflow-hidden rounded-3xl p-8 md:p-12">
                {/* Card top glow */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── Success State ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="flex min-h-[480px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10"
                      >
                        <CheckCircle2 className="h-10 w-10 text-green-400" />
                      </motion.div>
                      <h2 className="mb-3 text-3xl font-bold text-white">Message Sent!</h2>
                      <p className="mb-8 max-w-sm text-neutral-400">
                        Thank you for reaching out. We&apos;ll review your project and get back to
                        you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-neutral-200 transition-all hover:bg-white/10 hover:text-white"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="flex flex-col gap-5"
                    >
                      <div className="mb-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                          Start a Project
                        </h2>
                        <p className="mt-2 text-neutral-400">
                          Fill out the form and our team will be in touch.
                        </p>
                      </div>

                      {/* Row 1 */}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FloatingInput
                          label="Full Name *"
                          error={errors.name?.message}
                          {...register("name")}
                          /* eslint-disable-next-line react-hooks/incompatible-library */
                          value={watch("name") || ""}
                        />
                        <FloatingInput
                          label="Work Email *"
                          type="email"
                          error={errors.email?.message}
                          {...register("email")}

                          value={watch("email") || ""}
                        />
                      </div>

                      {/* Company */}
                      <FloatingInput
                        label="Company (optional)"
                        {...register("company")}

                        value={watch("company") || ""}
                      />

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FloatingSelect
                          label="Project Type *"
                          error={errors.projectType?.message}
                          options={projectTypes}
                          {...register("projectType")}

                          value={watch("projectType") || ""}
                        />
                        <FloatingSelect
                          label="Budget Range *"
                          error={errors.budget?.message}
                          options={budgets}
                          {...register("budget")}

                          value={watch("budget") || ""}
                        />
                      </div>

                      {/* Message */}
                      <FloatingTextarea
                        label="Tell us about your project *"
                        error={errors.message?.message}
                        {...register("message")}

                        value={watch("message") || ""}
                      />

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                        className="group relative mt-4 flex h-14 w-full items-center justify-center overflow-hidden rounded-xl font-semibold text-neutral-950 transition-all duration-300 disabled:opacity-70"
                      >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-all duration-500 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-300" />
                        {/* Shine sweep */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="relative z-10 flex items-center gap-2 text-base">
                          {submitting ? (
                            <>
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              Sending…
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </motion.button>

                      <p className="mt-2 text-center text-xs text-neutral-600">
                        By submitting, you agree to our{" "}
                        <Link
                          href="#privacy"
                          className="text-amber-400/70 transition-colors hover:text-amber-400"
                        >
                          Privacy Policy
                        </Link>
                        . We never share your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </MaxWidth>
        </Section>

        {/* 4. FAQ Section */}
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
