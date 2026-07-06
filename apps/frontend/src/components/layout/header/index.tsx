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
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();

  // Determine visibility states based on scroll directions
  const isHidden = scrollDirection === "down" && !isMobileOpen;

  // Determine class styles matching scroll offsets
  const getHeaderStyles = () => {
    if (scrollY <= 50) {
      return "bg-transparent border-transparent shadow-none";
    }
    if (scrollY > 50 && scrollY <= 200) {
      return "bg-surface-base/60 backdrop-blur-md border-border-subtle shadow-sm";
    }
    return "bg-surface-base/90 backdrop-blur-lg border-border-default shadow-md";
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={isHidden ? "hidden" : "visible"}
        initial="visible"
        className={cn(
          "duration-normal fixed top-0 right-0 left-0 z-50 w-full border-b transition-all ease-out",
          getHeaderStyles(),
        )}
        data-component="header"
        data-section="header"
      >
        <div className="max-w-container-xl mx-auto flex h-18 items-center justify-between px-6 md:px-8">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Links */}
          <DesktopNav />

          {/* Desktop Call to Action */}
          <div className="hidden md:block">
            <CTAButton
              href="#contact"
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
