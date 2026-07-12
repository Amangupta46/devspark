"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onDragEnd?: () => void; // Placeholder for actual dnd logic
}

export function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="custom-scrollbar flex h-full w-full gap-6 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div
          key={col.id}
          className="bg-surface-base border-border-default flex h-full max-w-[320px] min-w-[320px] flex-col rounded-xl border p-3"
        >
          {/* Column Header */}
          <div className="mb-4 flex items-center justify-between px-1">
            <h3 className="font-heading font-semibold text-neutral-200">
              {col.title}{" "}
              <span className="ml-2 text-xs font-normal text-neutral-500">{col.items.length}</span>
            </h3>
            <button className="bg-surface-raised flex h-6 w-6 items-center justify-center rounded text-neutral-400 transition-colors hover:text-neutral-50">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Droppable Area */}
          <div className="custom-scrollbar flex min-h-[150px] flex-1 flex-col gap-3 overflow-y-auto">
            <AnimatePresence>
              {col.items.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                  className="group border-border-subtle bg-surface-ground hover:border-border-prominent relative flex cursor-grab flex-col gap-2 rounded-lg border p-4 shadow-sm transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm leading-snug font-medium text-neutral-200">
                      {item.title}
                    </h4>
                    <GripVertical className="h-4 w-4 text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {item.description && (
                    <p className="line-clamp-2 text-xs text-neutral-400">{item.description}</p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-raised inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
