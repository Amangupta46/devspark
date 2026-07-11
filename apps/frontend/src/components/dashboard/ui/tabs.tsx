"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  badge?: number | string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex space-x-1 border-b border-border-default", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-medium transition-colors outline-none",
              isActive 
                ? "text-neutral-0" 
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            <div className="flex items-center gap-2">
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={cn(
                  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  isActive 
                    ? "bg-indigo-500 text-white" 
                    : "bg-surface-raised text-neutral-400"
                )}>
                  {tab.badge}
                </span>
              )}
            </div>

            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
