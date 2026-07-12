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
    <header className="border-border-default bg-surface-ground/80 sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 backdrop-blur-md md:px-6">
      {/* Left section: Mobile menu & Breadcrumbs (Placeholder) */}
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="hover:bg-surface-raised flex items-center justify-center rounded-md p-2 text-neutral-400 transition-colors hover:text-neutral-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="hidden items-center text-sm text-neutral-400 md:flex">
          <span className="cursor-pointer transition-colors hover:text-neutral-50">DevSpark</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-0 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Right section: Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Search Trigger (Mock) */}
        <button className="border-border-default bg-surface-base hover:bg-surface-raised flex h-9 items-center gap-2 rounded-md border px-3 text-neutral-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none md:w-64">
          <Search className="h-4 w-4" />
          <span className="hidden text-sm md:inline-block">Search...</span>
          <div className="ml-auto hidden items-center gap-1 md:flex">
            <kbd className="border-border-default bg-surface-ground inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-neutral-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-border-default bg-surface-base hover:bg-surface-raised relative flex h-9 w-9 items-center justify-center rounded-full border text-neutral-400 transition-colors hover:text-neutral-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
        >
          <Bell className="h-4 w-4" />
          <span className="ring-surface-base absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-500 ring-2" />
        </motion.button>

        {/* Profile Dropdown */}
        <ProfileDropdown userInitials="JD" userName="John Doe" userEmail="john.doe@devspark.dev" />
      </div>
    </header>
  );
}
