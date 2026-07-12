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
    <div className="custom-scrollbar flex items-center gap-3 overflow-x-auto pb-2">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="border-border-default bg-surface-base hover:bg-surface-raised flex h-9 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-medium text-neutral-200 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
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
            className="border-border-default bg-surface-base glass-dropdown z-50 w-72 rounded-xl border p-4 shadow-xl outline-none"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-heading text-neutral-0 text-sm font-semibold">Active Filters</h4>
              {activeCount > 0 && (
                <button
                  onClick={onClearAll}
                  className="hover:text-neutral-0 text-xs text-neutral-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="custom-scrollbar max-h-[300px] space-y-4 overflow-y-auto pr-2">
              {groups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <h5 className="text-xs font-medium text-neutral-400">{group.label}</h5>
                  <div className="flex flex-col gap-1">
                    {group.options.map((option) => {
                      const isActive = activeFilters[group.id]?.includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className="hover:bg-surface-raised flex cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors"
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded border transition-colors",
                              isActive
                                ? "border-indigo-500 bg-indigo-500 text-white"
                                : "border-border-default bg-surface-ground",
                            )}
                          >
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
                      );
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
          const group = groups.find((g) => g.id === groupId);
          if (!group) return null;

          return selectedIds.map((optId) => {
            const option = group.options.find((o) => o.id === optId);
            if (!option) return null;

            return (
              <motion.div
                key={`${groupId}-${optId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0 }}
                className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 pr-1.5 pl-3 text-xs font-medium text-indigo-400"
              >
                <span>
                  {group.label}: {option.label}
                </span>
                <button
                  onClick={() => onChange(groupId, optId)}
                  className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-indigo-500/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            );
          });
        })}
      </AnimatePresence>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
