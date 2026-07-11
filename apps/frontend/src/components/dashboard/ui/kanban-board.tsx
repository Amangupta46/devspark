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
    <div className="flex h-full w-full gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {columns.map((col) => (
        <div key={col.id} className="flex h-full min-w-[320px] max-w-[320px] flex-col rounded-xl bg-surface-base border border-border-default p-3">
          {/* Column Header */}
          <div className="mb-4 flex items-center justify-between px-1">
            <h3 className="font-heading font-semibold text-neutral-200">
              {col.title} <span className="ml-2 text-xs text-neutral-500 font-normal">{col.items.length}</span>
            </h3>
            <button className="flex h-6 w-6 items-center justify-center rounded bg-surface-raised text-neutral-400 hover:text-neutral-50 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Droppable Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 min-h-[150px]">
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
                  className="group relative flex cursor-grab flex-col gap-2 rounded-lg border border-border-subtle bg-surface-ground p-4 shadow-sm hover:border-border-prominent transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-neutral-200 leading-snug">
                      {item.title}
                    </h4>
                    <GripVertical className="h-4 w-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {item.description && (
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded bg-surface-raised px-1.5 py-0.5 text-[10px] font-medium text-neutral-300">
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
