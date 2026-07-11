"use client";

import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, CreditCard } from "lucide-react";
import Link from "next/link";

interface ProfileDropdownProps {
  userInitials: string;
  userName: string;
  userEmail: string;
}

export function ProfileDropdown({ userInitials, userName, userEmail }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ring-offset-2 ring-offset-surface-ground transition-transform hover:scale-105 active:scale-95">
          {userInitials}
        </button>
      </Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content 
              sideOffset={8}
              align="end"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="z-50 w-64 rounded-xl border border-border-default bg-surface-base shadow-xl glass-dropdown p-1 overflow-hidden"
              >
                {/* User Info */}
                <div className="px-3 py-3 border-b border-border-subtle mb-1">
                  <p className="text-sm font-medium text-neutral-0 truncate">{userName}</p>
                  <p className="text-xs text-neutral-400 truncate">{userEmail}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col">
                  <Link href="/dashboard/profile" onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-neutral-50 hover:bg-surface-raised rounded-md transition-colors cursor-pointer outline-none focus-visible:bg-surface-raised focus-visible:text-neutral-50">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/billing" onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-neutral-50 hover:bg-surface-raised rounded-md transition-colors cursor-pointer outline-none focus-visible:bg-surface-raised focus-visible:text-neutral-50">
                      <CreditCard className="w-4 h-4" />
                      <span>Billing</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-neutral-50 hover:bg-surface-raised rounded-md transition-colors cursor-pointer outline-none focus-visible:bg-surface-raised focus-visible:text-neutral-50">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </div>
                  </Link>
                </div>

                <div className="my-1 border-t border-border-subtle" />

                <div className="flex flex-col">
                  <button 
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error-400 hover:bg-error-500/10 hover:text-error-400 rounded-md transition-colors cursor-pointer outline-none"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
