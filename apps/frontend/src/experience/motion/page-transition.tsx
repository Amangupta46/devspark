"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants } from "./presets";

export function PageTransition({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
        className="relative w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
