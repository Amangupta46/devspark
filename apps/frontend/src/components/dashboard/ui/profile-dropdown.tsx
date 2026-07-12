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
        <button className="ring-offset-surface-ground flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-sm font-medium text-white ring-offset-2 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none active:scale-95">
          {userInitials}
        </button>
      </Popover.Trigger>

      <AnimatePresence>
        {open && (
          <Popover.Portal forceMount>
            <Popover.Content sideOffset={8} align="end" asChild>
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="border-border-default bg-surface-base glass-dropdown z-50 w-64 overflow-hidden rounded-xl border p-1 shadow-xl"
              >
                {/* User Info */}
                <div className="border-border-subtle mb-1 border-b px-3 py-3">
                  <p className="text-neutral-0 truncate text-sm font-medium">{userName}</p>
                  <p className="truncate text-xs text-neutral-400">{userEmail}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col">
                  <Link href="/dashboard/profile" onClick={() => setOpen(false)}>
                    <div className="hover:bg-surface-raised focus-visible:bg-surface-raised flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-300 transition-colors outline-none hover:text-neutral-50 focus-visible:text-neutral-50">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/billing" onClick={() => setOpen(false)}>
                    <div className="hover:bg-surface-raised focus-visible:bg-surface-raised flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-300 transition-colors outline-none hover:text-neutral-50 focus-visible:text-neutral-50">
                      <CreditCard className="h-4 w-4" />
                      <span>Billing</span>
                    </div>
                  </Link>
                  <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
                    <div className="hover:bg-surface-raised focus-visible:bg-surface-raised flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-300 transition-colors outline-none hover:text-neutral-50 focus-visible:text-neutral-50">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </Link>
                </div>

                <div className="border-border-subtle my-1 border-t" />

                <div className="flex flex-col">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-error-400 hover:bg-error-500/10 hover:text-error-400 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors outline-none"
                  >
                    <LogOut className="h-4 w-4" />
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
