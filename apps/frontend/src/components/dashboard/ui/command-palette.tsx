"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, ArrowRight, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onSelect: () => void;
}

interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
}

export function CommandPalette({ isOpen, onOpenChange, groups }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  // Handle Cmd+K global shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="border-border-default bg-surface-base glass-modal fixed top-[15%] left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border shadow-2xl"
              >
                {/* Search Input */}
                <div className="border-border-default flex items-center border-b px-4">
                  <Search className="h-5 w-5 shrink-0 text-neutral-400" />
                  <input
                    className="text-neutral-0 flex h-14 w-full rounded-md bg-transparent px-4 py-3 text-sm outline-none placeholder:text-neutral-500"
                    placeholder="Type a command or search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                  <div className="flex shrink-0 items-center gap-1">
                    <kbd className="border-border-default bg-surface-ground inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-neutral-400">
                      ESC
                    </kbd>
                  </div>
                </div>

                {/* Results List */}
                <div className="custom-scrollbar max-h-[300px] overflow-y-auto p-2">
                  {filteredGroups.length === 0 ? (
                    <div className="flex flex-col items-center py-14 text-center text-sm text-neutral-500">
                      <Command className="mb-4 h-8 w-8 text-neutral-600" />
                      <p>No results found.</p>
                    </div>
                  ) : (
                    filteredGroups.map((group) => (
                      <div key={group.heading} className="mb-4 last:mb-0">
                        <div className="px-2 py-1.5 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                          {group.heading}
                        </div>
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              item.onSelect();
                              onOpenChange(false);
                            }}
                            className="group flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-indigo-500/10 hover:text-indigo-400 focus:bg-indigo-500/10 focus:text-indigo-400 focus:outline-none"
                          >
                            {item.icon && (
                              <div className="text-neutral-400 transition-colors group-hover:text-indigo-400">
                                {item.icon}
                              </div>
                            )}
                            <span className="flex-1 text-left">{item.label}</span>

                            {/* Hover Arrow indicator */}
                            <ArrowRight className="h-4 w-4 -translate-x-2 transform opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />

                            {item.shortcut && (
                              <div className="ml-auto flex items-center gap-1">
                                {item.shortcut.map((key) => (
                                  <kbd
                                    key={key}
                                    className="border-border-default bg-surface-ground inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-neutral-400"
                                  >
                                    {key}
                                  </kbd>
                                ))}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="border-border-default bg-surface-ground flex items-center justify-between border-t p-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>Navigation</span>
                    <kbd className="border-border-default inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium">
                      ↑↓
                    </kbd>
                    <span>to navigate</span>
                    <kbd className="border-border-default inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium">
                      ↵
                    </kbd>
                    <span>to select</span>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
