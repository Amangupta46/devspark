"use client";

import React, { useState } from "react";
import { Filter, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterPanelProps {
  groups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onChange: (groupId: string, optionId: string) => void;
  onClearAll: () => void;
}

export function FilterPanel({ groups, activeFilters, onChange, onClearAll }: FilterPanelProps) {
  const activeCount = Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-border-default bg-surface-base px-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            <Filter className="h-4 w-4 text-neutral-400" />
            Filters
            {activeCount > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] text-white">
                {activeCount}
              </span>
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content 
            align="start" 
            sideOffset={8}
            className="z-50 w-72 rounded-xl border border-border-default bg-surface-base p-4 shadow-xl glass-dropdown outline-none"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-heading text-sm font-semibold text-neutral-0">Active Filters</h4>
              {activeCount > 0 && (
                <button 
                  onClick={onClearAll}
                  className="text-xs text-neutral-400 hover:text-neutral-0 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {groups.map(group => (
                <div key={group.id} className="space-y-2">
                  <h5 className="text-xs font-medium text-neutral-400">{group.label}</h5>
                  <div className="flex flex-col gap-1">
                    {group.options.map(option => {
                      const isActive = activeFilters[group.id]?.includes(option.id);
                      return (
                        <label 
                          key={option.id}
                          className="flex items-center gap-2 rounded-md p-1.5 hover:bg-surface-raised cursor-pointer transition-colors"
                        >
                          <div className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border transition-colors",
                            isActive 
                              ? "border-indigo-500 bg-indigo-500 text-white" 
                              : "border-border-default bg-surface-ground"
                          )}>
                            {isActive && <CheckIcon className="h-3 w-3" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={isActive}
                            onChange={() => onChange(group.id, option.id)}
                          />
                          <span className="text-sm text-neutral-200">{option.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* Render Active Filter Chips */}
      <AnimatePresence>
        {Object.entries(activeFilters).map(([groupId, selectedIds]) => {
          if (selectedIds.length === 0) return null;
          const group = groups.find(g => g.id === groupId);
          if (!group) return null;

          return selectedIds.map(optId => {
            const option = group.options.find(o => o.id === optId);
            if (!option) return null;

            return (
              <motion.div
                key={`${groupId}-${optId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0 }}
                className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 pl-3 pr-1.5 text-xs font-medium text-indigo-400"
              >
                <span>{group.label}: {option.label}</span>
                <button
                  onClick={() => onChange(groupId, optId)}
                  className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-indigo-500/20 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            )
          })
        })}
      </AnimatePresence>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
