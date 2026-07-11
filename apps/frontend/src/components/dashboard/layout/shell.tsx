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
    <div className="flex h-screen w-full bg-surface-ground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
