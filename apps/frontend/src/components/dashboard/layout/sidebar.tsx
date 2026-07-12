"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  TrendingUp,
  UsersRound,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "CRM", href: "/dashboard/crm", icon: Users },
  { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { label: "Quotes", href: "/dashboard/quotes", icon: FileText },
  { label: "Finance", href: "/dashboard/finance", icon: CreditCard },
  { label: "Team", href: "/dashboard/team", icon: UsersRound },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { label: "Client Portal", href: "/dashboard/client-portal", icon: Globe },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="border-border-default bg-surface-base relative z-20 flex h-screen flex-col border-r"
    >
      {/* Header / Logo */}
      <div className="border-border-default flex h-16 items-center justify-between border-b px-4">
        <AnimatePresence mode="popLayout">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center space-x-2 overflow-hidden"
            >
              <div className="font-heading flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 font-bold text-white">
                D
              </div>
              <span className="font-heading text-neutral-0 text-lg font-semibold whitespace-nowrap">
                DevSpark
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <div className="flex w-full justify-center">
            <div className="font-heading flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 font-bold text-white">
              D
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="custom-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="group outline-none">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex h-10 items-center rounded-md px-3 transition-colors duration-200",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "hover:bg-surface-raised text-neutral-400 hover:text-neutral-50",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 overflow-hidden text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Footer Settings */}
      <div className="border-border-default border-t p-3">
        <Link href="/dashboard/settings" className="group outline-none">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hover:bg-surface-raised flex h-10 items-center rounded-md px-3 text-neutral-400 transition-colors duration-200 hover:text-neutral-50"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 overflow-hidden text-sm font-medium whitespace-nowrap"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="border-border-default bg-surface-raised hover:bg-surface-floating absolute top-20 -right-3 z-30 flex h-6 w-6 items-center justify-center rounded-full border text-neutral-400 transition-colors hover:text-neutral-50 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </motion.aside>
  );
}
