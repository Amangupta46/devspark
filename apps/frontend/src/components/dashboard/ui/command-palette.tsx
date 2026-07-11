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

  const filteredGroups = groups.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.items.length > 0);

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
                className="fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 rounded-xl border border-border-default bg-surface-base shadow-2xl overflow-hidden glass-modal"
              >
                {/* Search Input */}
                <div className="flex items-center border-b border-border-default px-4">
                  <Search className="h-5 w-5 text-neutral-400 shrink-0" />
                  <input
                    className="flex h-14 w-full rounded-md bg-transparent px-4 py-3 text-sm outline-none placeholder:text-neutral-500 text-neutral-0"
                    placeholder="Type a command or search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border-default bg-surface-ground px-1.5 font-mono text-[10px] font-medium text-neutral-400">
                      ESC
                    </kbd>
                  </div>
                </div>

                {/* Results List */}
                <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                  {filteredGroups.length === 0 ? (
                    <div className="py-14 text-center text-sm text-neutral-500 flex flex-col items-center">
                      <Command className="w-8 h-8 mb-4 text-neutral-600" />
                      <p>No results found.</p>
                    </div>
                  ) : (
                    filteredGroups.map((group) => (
                      <div key={group.heading} className="mb-4 last:mb-0">
                        <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                          {group.heading}
                        </div>
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              item.onSelect();
                              onOpenChange(false);
                            }}
                            className="group flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-sm text-neutral-300 hover:bg-indigo-500/10 hover:text-indigo-400 focus:bg-indigo-500/10 focus:text-indigo-400 focus:outline-none transition-colors"
                          >
                            {item.icon && (
                              <div className="text-neutral-400 group-hover:text-indigo-400 transition-colors">
                                {item.icon}
                              </div>
                            )}
                            <span className="flex-1 text-left">{item.label}</span>
                            
                            {/* Hover Arrow indicator */}
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-200" />

                            {item.shortcut && (
                              <div className="flex items-center gap-1 ml-auto">
                                {item.shortcut.map((key) => (
                                  <kbd key={key} className="inline-flex h-5 items-center gap-1 rounded border border-border-default bg-surface-ground px-1.5 font-mono text-[10px] font-medium text-neutral-400">
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
                <div className="border-t border-border-default bg-surface-ground p-3 flex items-center justify-between">
                  <div className="text-xs text-neutral-500 flex items-center gap-2">
                    <span>Navigation</span>
                    <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border-default px-1.5 font-mono text-[10px] font-medium">↑↓</kbd>
                    <span>to navigate</span>
                    <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border-default px-1.5 font-mono text-[10px] font-medium">↵</kbd>
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
