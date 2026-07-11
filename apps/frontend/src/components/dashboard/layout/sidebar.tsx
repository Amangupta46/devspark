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
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "CRM", href: "/dashboard/crm", icon: Users },
  { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { label: "Quotes", href: "/dashboard/quotes", icon: FileText },
  { label: "Finance", href: "/dashboard/finance", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-screen border-r border-border-default bg-surface-base z-20"
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border-default">
        <AnimatePresence mode="popLayout">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center space-x-2 overflow-hidden"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold font-heading">
                D
              </div>
              <span className="font-heading font-semibold text-neutral-0 text-lg whitespace-nowrap">
                DevSpark
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold font-heading">
              D
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="group outline-none">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center h-10 rounded-md px-3 transition-colors duration-200",
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400" 
                    : "text-neutral-400 hover:text-neutral-50 hover:bg-surface-raised"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 font-medium whitespace-nowrap overflow-hidden text-sm"
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
      <div className="p-3 border-t border-border-default">
        <Link href="/dashboard/settings" className="group outline-none">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center h-10 rounded-md px-3 text-neutral-400 hover:text-neutral-50 hover:bg-surface-raised transition-colors duration-200"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 font-medium whitespace-nowrap overflow-hidden text-sm"
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
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border-default bg-surface-raised text-neutral-400 hover:text-neutral-50 hover:bg-surface-floating transition-colors z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </motion.aside>
  );
}
