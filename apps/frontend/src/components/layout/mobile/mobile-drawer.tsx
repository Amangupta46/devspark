"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { marketingNavigation } from "@/config/navigation";
import { CTAButton } from "@/components/shared/cta-button";
import { drawerVariants, overlayVariants, itemVariants } from "@/motion/navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    // Set initial focus
    firstElement.focus();

    window.addEventListener("keydown", handleTab);
    return () => {
      window.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  return (
    <>
      {/* Background Overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 md:hidden"
        variants={overlayVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <motion.div
        ref={drawerRef}
        className="border-border-subtle bg-surface-base fixed inset-y-0 right-0 z-45 w-full max-w-sm border-l px-6 py-24 shadow-2xl md:hidden"
        variants={drawerVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        data-component="mobile-drawer"
        data-section="header"
      >
        <nav className="flex h-full flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            {marketingNavigation.map((item) => (
              <motion.div key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="hover:text-neutral-0 text-lg font-semibold text-neutral-200 transition-colors focus:outline-none focus-visible:text-amber-400"
                  data-component="drawer-nav-item"
                  data-section="header"
                  data-analytics={item.analyticsId}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="border-border-subtle border-t pt-8">
            <CTAButton
              href="#contact"
              label="Start a Project"
              analyticsId="nav_mobile_cta"
              section="header"
              className="h-12 w-full text-base"
            />
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}
