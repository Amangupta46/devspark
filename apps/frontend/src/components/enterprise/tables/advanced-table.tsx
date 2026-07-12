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
  isLoading,
}: AdvancedTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleAll = () => {
    if (selected.size === data.length && data.length > 0) setSelected(new Set());
    else setSelected(new Set(data.map((d) => d.id)));
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
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(colId);
      setSortDir("asc");
    }
  };

  return (
    <div className="border-border-default bg-surface-base flex w-full flex-col overflow-hidden rounded-xl border shadow-sm">
      {/* Table Toolbar */}
      <div className="border-border-default bg-surface-ground/50 flex items-center justify-between border-b p-4">
        <h3 className="font-heading text-neutral-0 font-semibold">{title || "Data Table"}</h3>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <span className="mr-2 rounded bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400">
              {selected.size} selected
            </span>
          )}
          <button className="border-border-default bg-surface-base hover:bg-surface-raised flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium text-neutral-300 transition-colors">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
          <button className="border-border-default bg-surface-base hover:bg-surface-raised flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium text-neutral-300 transition-colors">
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
          {onExportCsv && (
            <button
              onClick={onExportCsv}
              className="border-border-default bg-surface-base hover:bg-surface-raised flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium text-neutral-300 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Table Container - Enables internal scroll for sticky headers */}
      <div className="custom-scrollbar relative max-h-[600px] w-full overflow-x-auto overflow-y-auto">
        <table className="w-full text-left text-sm text-neutral-400">
          <thead className="bg-surface-ground sticky top-0 z-10 text-xs text-neutral-500 uppercase shadow-[0_1px_0_0_var(--color-border-default)]">
            <tr>
              <th scope="col" className="bg-surface-ground sticky left-0 z-20 w-12 p-4">
                <div
                  onClick={toggleAll}
                  className={cn(
                    "flex h-4 w-4 cursor-pointer items-center justify-center rounded border transition-colors",
                    selected.size === data.length && data.length > 0
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-border-default hover:border-indigo-500",
                  )}
                >
                  {selected.size === data.length && data.length > 0 && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  style={{ width: col.width }}
                  className={cn(
                    "group px-6 py-4 font-medium tracking-wider whitespace-nowrap",
                    col.sortable && "cursor-pointer transition-colors hover:text-neutral-200",
                  )}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      <span
                        className={cn(
                          "text-indigo-400 transition-opacity",
                          sortCol === col.id ? "opacity-100" : "opacity-0 group-hover:opacity-50",
                        )}
                      >
                        {sortCol === col.id && sortDir === "desc" ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronUp className="h-3.5 w-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-border-subtle bg-surface-base divide-y">
            <AnimatePresence>
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skel-${i}`}>
                    <td className="bg-surface-base sticky left-0 p-4">
                      <div className="bg-surface-raised h-4 w-4 animate-pulse rounded" />
                    </td>
                    {columns.map((c) => (
                      <td key={c.id} className="px-6 py-4">
                        <div className="bg-surface-raised h-4 w-3/4 animate-pulse rounded" />
                      </td>
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
                        "hover:bg-surface-raised/50 group transition-colors",
                        isSelected && "bg-indigo-500/5",
                      )}
                    >
                      <td className="group-hover:bg-surface-raised/50 bg-surface-base sticky left-0 z-10 p-4 transition-colors">
                        <div
                          onClick={(e) => toggleRow(row.id, e)}
                          className={cn(
                            "flex h-4 w-4 cursor-pointer items-center justify-center rounded border transition-colors",
                            isSelected
                              ? "border-indigo-500 bg-indigo-500 text-white"
                              : "border-border-default hover:border-indigo-500",
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td key={col.id} className="px-6 py-4 font-medium text-neutral-300">
                          {col.accessor
                            ? col.accessor(row)
                            : ((row as Record<string, unknown>)[String(col.id)] as React.ReactNode)}
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
      <div className="border-border-default bg-surface-ground flex items-center justify-between border-t px-4 py-3">
        <span className="text-xs text-neutral-500">
          Showing <span className="font-medium text-neutral-300">{data.length}</span> results
        </span>
        <div className="flex gap-2">
          <button
            disabled
            className="border-border-default bg-surface-base cursor-not-allowed rounded-md border px-3 py-1.5 text-xs font-medium text-neutral-500"
          >
            Previous
          </button>
          <button
            disabled
            className="border-border-default bg-surface-base cursor-not-allowed rounded-md border px-3 py-1.5 text-xs font-medium text-neutral-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
