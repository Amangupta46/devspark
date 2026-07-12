"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/motion/variants";
import { usePathname } from "next/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="bg-surface-ground flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="custom-scrollbar relative flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              className="mx-auto min-h-full w-full max-w-7xl p-6 md:p-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
