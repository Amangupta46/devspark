"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileDropdown } from "../ui/profile-dropdown";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-default bg-surface-ground/80 px-4 md:px-6 backdrop-blur-md">
      {/* Left section: Mobile menu & Breadcrumbs (Placeholder) */}
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-50 hover:bg-surface-raised md:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="hidden md:flex items-center text-sm text-neutral-400">
          <span className="hover:text-neutral-50 cursor-pointer transition-colors">DevSpark</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-0 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Right section: Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Search Trigger (Mock) */}
        <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-border-default bg-surface-base text-neutral-400 hover:bg-surface-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:w-64">
          <Search className="w-4 h-4" />
          <span className="text-sm hidden md:inline-block">Search...</span>
          <div className="ml-auto hidden md:flex items-center gap-1">
            <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border-default bg-surface-ground px-1.5 font-mono text-[10px] font-medium text-neutral-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-9 h-9 rounded-full border border-border-default bg-surface-base text-neutral-400 hover:text-neutral-50 hover:bg-surface-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-surface-base" />
        </motion.button>

        {/* Profile Dropdown */}
        <ProfileDropdown userInitials="JD" userName="John Doe" userEmail="john.doe@devspark.dev" />
      </div>
    </header>
  );
}
