"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { marketingNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav
      className="hidden items-center gap-1 md:flex"
      data-component="desktop-nav"
      data-section="header"
    >
      {marketingNavigation.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "focus-visible:ring-offset-surface-ground relative rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
              isActive ? "text-amber-400" : "hover:text-neutral-0 text-neutral-300",
            )}
            data-component="nav-item"
            data-section="header"
            data-analytics={item.analyticsId}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="bg-surface-elevated/60 absolute inset-0 -z-10 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </AnimatePresence>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
