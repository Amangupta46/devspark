"use client";

import { motion } from "framer-motion";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  // SVG morph variations
  const variantLineTop = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 },
  };

  const variantLineMiddle = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const variantLineBottom = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 },
  };

  const transitionSettings = {
    type: "spring",
    stiffness: 260,
    damping: 25,
  } as const;

  return (
    <button
      onClick={onClick}
      className="border-border-default hover:bg-surface-elevated hover:text-neutral-0 focus-visible:ring-offset-surface-ground flex h-10 w-10 items-center justify-center rounded-md border bg-transparent text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      data-component="menu-toggle"
      data-section="header"
      data-analytics="nav_mobile_toggle"
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0 1H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={variantLineTop}
          animate={isOpen ? "open" : "closed"}
          transition={transitionSettings}
        />
        <motion.path
          d="M0 7H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={variantLineMiddle}
          animate={isOpen ? "open" : "closed"}
          transition={transitionSettings}
        />
        <motion.path
          d="M0 13H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          variants={variantLineBottom}
          animate={isOpen ? "open" : "closed"}
          transition={transitionSettings}
        />
      </svg>
    </button>
  );
}
