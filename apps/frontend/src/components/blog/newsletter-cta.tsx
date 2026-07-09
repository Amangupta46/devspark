"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import { PremiumCard } from "@/components/ui/premium-card";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-20 md:px-0">
      <PremiumCard glowColor="hsla(240,100%,60%,0.3)" tiltIntensity={5}>
        <div className="relative overflow-hidden rounded-3xl p-8 text-center md:p-16">
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-neutral-900/40 to-amber-900/20" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-neutral-50 md:text-4xl">
              Stay ahead with engineering insights.
            </h3>
            <p className="mb-8 text-lg text-neutral-300">
              Join 15,000+ engineers receiving our monthly deep-dives into modern web architecture,
              performance optimization, and AI integration.
            </p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-green-400"
                >
                  <CheckCircle2 className="h-8 w-8" />
                  <p className="font-medium">You&apos;re in! Keep an eye on your inbox.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1 rounded-xl border border-neutral-700 bg-neutral-900/50 px-5 py-4 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-4 font-semibold text-neutral-950 transition-all hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-neutral-950 border-t-transparent"
                        />
                        Joining...
                      </span>
                    ) : (
                      <>
                        Subscribe
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="mt-4 text-xs text-neutral-500">
              No spam. Unsubscribe at any time. Read our{" "}
              <Link href="/#privacy" className="underline hover:text-neutral-300">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
}
