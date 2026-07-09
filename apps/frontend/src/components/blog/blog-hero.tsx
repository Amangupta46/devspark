"use client";

import { motion } from "framer-motion";
import { BackgroundLayer } from "@/components/layout/primitives";

interface BlogHeroProps {
  totalCount: number;
  categoryCount: number;
}

export function BlogHero({ totalCount, categoryCount }: BlogHeroProps) {
  return (
    <div className="relative overflow-hidden py-24 lg:py-32">
      <BackgroundLayer showNoise />

      {/* Premium animated gradient orb */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 40, ease: "linear" },
            scale: { repeat: Infinity, duration: 15, ease: "easeInOut" },
          }}
          className="absolute -top-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-500/10 mix-blend-screen blur-[150px]"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 30, ease: "linear" },
            scale: { repeat: Infinity, duration: 20, ease: "easeInOut" },
          }}
          className="absolute top-[10%] right-[10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 mix-blend-screen blur-[150px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/80 to-[#050505]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            The DevSpark Blog
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-neutral-50 md:text-6xl lg:text-7xl">
            Insights, Engineering <br className="hidden md:block" /> & Innovation
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
            Deep-dives into modern web architecture, performance optimization, and AI integration
            for elite engineering teams.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex gap-8 border-t border-neutral-800/50 pt-8"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">{totalCount}</span>
            <span className="text-sm font-medium text-neutral-500">Published Articles</span>
          </div>
          <div className="h-12 w-px bg-neutral-800" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">{categoryCount}</span>
            <span className="text-sm font-medium text-neutral-500">Categories</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
