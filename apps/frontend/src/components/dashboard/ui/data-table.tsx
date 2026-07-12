"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MoreHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string;
}

export function DataTable<T>({ data, columns, onRowClick, keyExtractor }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(
    null,
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(keyExtractor)));
    }
  };

  const toggleRowSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className="border-border-default bg-surface-base w-full overflow-x-auto rounded-xl border">
      <table className="w-full text-left text-sm text-neutral-400">
        <thead className="bg-surface-ground border-border-default border-b text-xs text-neutral-500 uppercase">
          <tr>
            <th scope="col" className="w-12 p-4">
              <div
                onClick={toggleSelectAll}
                className={cn(
                  "flex h-4 w-4 cursor-pointer items-center justify-center rounded border transition-colors",
                  selectedRows.size === data.length && data.length > 0
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-border-default hover:border-indigo-500",
                )}
              >
                {selectedRows.size === data.length && data.length > 0 && (
                  <Check className="h-3 w-3" />
                )}
              </div>
            </th>
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className={cn(
                  "px-6 py-4 font-medium tracking-wider",
                  col.sortable && "cursor-pointer transition-colors hover:text-neutral-300",
                )}
                onClick={() => col.sortable && handleSort(col.accessorKey as string)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortConfig?.key === col.accessorKey && (
                    <span className="text-indigo-400">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th scope="col" className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((item, idx) => {
              const id = keyExtractor(item);
              const isSelected = selectedRows.has(id);

              return (
                <motion.tr
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.2 }}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    "border-border-subtle hover:bg-surface-raised group border-b transition-colors",
                    onRowClick && "cursor-pointer",
                    isSelected && "bg-indigo-500/5",
                  )}
                >
                  <td className="p-4">
                    <div
                      onClick={(e) => toggleRowSelect(id, e)}
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

                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 font-medium text-neutral-300">
                      {col.cell
                        ? col.cell(item)
                        : ((item as Record<string, unknown>)[
                            String(col.accessorKey)
                          ] as React.ReactNode)}
                    </td>
                  ))}

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="hover:bg-surface-floating hover:text-neutral-0 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-12 text-center text-sm text-neutral-500">No data available.</div>
      )}
    </div>
  );
}
