"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { Logo } from "./logo";
import { DesktopNav } from "../navigation/desktop-nav";
import { MenuButton } from "../mobile/menu-button";
import { MobileDrawer } from "../mobile/mobile-drawer";
import { CTAButton } from "@/components/shared/cta-button";
import { headerVariants } from "@/motion/navigation";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollDirection, scrollPhase } = useScrollDirection();

  // Determine visibility states based on scroll directions
  const isHidden = scrollDirection === "down" && !isMobileOpen;

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={isHidden ? "hidden" : "visible"}
        initial="visible"
        className="duration-normal fixed top-0 right-0 left-0 z-50 w-full transition-transform ease-out"
        data-component="header"
        data-section="header"
      >
        {/* Composited Background Layer */}
        <div
          className="bg-surface-base/90 border-border-default pointer-events-none absolute inset-0 -z-10 border-b shadow-md transition-opacity duration-300 md:backdrop-blur-lg"
          style={{ opacity: scrollPhase === 0 ? 0 : scrollPhase === 1 ? 0.7 : 1 }}
        />

        <div className="max-w-container-xl relative z-10 mx-auto flex h-18 items-center justify-between px-6 md:px-8">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Links */}
          <DesktopNav />

          {/* Desktop Call to Action */}
          <div className="hidden md:block">
            <CTAButton
              href="/contact"
              label="Start a Project"
              analyticsId="nav_header_cta"
              section="header"
              className="h-10 px-5"
            />
          </div>

          {/* Mobile Menu Toggler */}
          <MenuButton isOpen={isMobileOpen} onClick={() => setIsMobileOpen(!isMobileOpen)} />
        </div>
      </motion.header>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <MobileDrawer isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
