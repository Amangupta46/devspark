"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check, Download, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

interface AdvancedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  onExportCsv?: () => void;
  isLoading?: boolean;
}

export function AdvancedTable<T extends { id: string }>({ 
  data, 
  columns, 
  title, 
  onExportCsv,
  isLoading
}: AdvancedTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleAll = () => {
    if (selected.size === data.length && data.length > 0) setSelected(new Set());
    else setSelected(new Set(data.map(d => d.id)));
  };

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleSort = (colId: string) => {
    if (sortCol === colId) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(colId);
      setSortDir('asc');
    }
  };

  return (
    <div className="w-full flex flex-col rounded-xl border border-border-default bg-surface-base shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border-default bg-surface-ground/50">
        <h3 className="font-heading font-semibold text-neutral-0">{title || "Data Table"}</h3>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <span className="text-xs font-medium text-indigo-400 mr-2 bg-indigo-500/10 px-2 py-1 rounded">
              {selected.size} selected
            </span>
          )}
          <button className="flex h-8 items-center gap-2 rounded-md border border-border-default bg-surface-base px-3 text-xs font-medium text-neutral-300 hover:bg-surface-raised transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <button className="flex h-8 items-center gap-2 rounded-md border border-border-default bg-surface-base px-3 text-xs font-medium text-neutral-300 hover:bg-surface-raised transition-colors">
            <Search className="w-3.5 h-3.5" />
            Search
          </button>
          {onExportCsv && (
            <button 
              onClick={onExportCsv}
              className="flex h-8 items-center gap-2 rounded-md border border-border-default bg-surface-base px-3 text-xs font-medium text-neutral-300 hover:bg-surface-raised transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Table Container - Enables internal scroll for sticky headers */}
      <div className="w-full overflow-x-auto custom-scrollbar max-h-[600px] overflow-y-auto relative">
        <table className="w-full text-left text-sm text-neutral-400">
          <thead className="sticky top-0 z-10 bg-surface-ground text-xs uppercase text-neutral-500 shadow-[0_1px_0_0_var(--color-border-default)]">
            <tr>
              <th scope="col" className="p-4 w-12 sticky left-0 z-20 bg-surface-ground">
                <div 
                  onClick={toggleAll}
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border cursor-pointer transition-colors",
                    selected.size === data.length && data.length > 0
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-border-default hover:border-indigo-500"
                  )}
                >
                  {selected.size === data.length && data.length > 0 && <Check className="h-3 w-3" />}
                </div>
              </th>
              {columns.map((col) => (
                <th 
                  key={col.id} 
                  scope="col" 
                  style={{ width: col.width }}
                  className={cn(
                    "px-6 py-4 font-medium tracking-wider whitespace-nowrap group",
                    col.sortable && "cursor-pointer hover:text-neutral-200 transition-colors"
                  )}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      <span className={cn(
                        "text-indigo-400 transition-opacity",
                        sortCol === col.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                      )}>
                        {sortCol === col.id && sortDir === 'desc' 
                          ? <ChevronDown className="w-3.5 h-3.5" /> 
                          : <ChevronUp className="w-3.5 h-3.5" />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-surface-base">
            <AnimatePresence>
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skel-${i}`}>
                    <td className="p-4 sticky left-0 bg-surface-base"><div className="w-4 h-4 rounded bg-surface-raised animate-pulse" /></td>
                    {columns.map(c => (
                      <td key={c.id} className="px-6 py-4"><div className="h-4 bg-surface-raised rounded animate-pulse w-3/4" /></td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="py-12 text-center text-neutral-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => {
                  const isSelected = selected.has(row.id);
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02, duration: 0.2 }}
                      className={cn(
                        "hover:bg-surface-raised/50 transition-colors group",
                        isSelected && "bg-indigo-500/5"
                      )}
                    >
                      <td className="p-4 sticky left-0 z-10 transition-colors group-hover:bg-surface-raised/50 bg-surface-base">
                        <div 
                          onClick={(e) => toggleRow(row.id, e)}
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border cursor-pointer transition-colors",
                            isSelected
                              ? "border-indigo-500 bg-indigo-500 text-white"
                              : "border-border-default hover:border-indigo-500"
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td key={col.id} className="px-6 py-4 font-medium text-neutral-300">
                          {col.accessor ? col.accessor(row) : (row as any)[col.id]}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border-default bg-surface-ground">
        <span className="text-xs text-neutral-500">
          Showing <span className="font-medium text-neutral-300">{data.length}</span> results
        </span>
        <div className="flex gap-2">
          <button disabled className="px-3 py-1.5 rounded-md border border-border-default bg-surface-base text-xs font-medium text-neutral-500 cursor-not-allowed">
            Previous
          </button>
          <button disabled className="px-3 py-1.5 rounded-md border border-border-default bg-surface-base text-xs font-medium text-neutral-500 cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
