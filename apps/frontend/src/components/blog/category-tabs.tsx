"use client";

import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: { name: string; count: number }[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
          activeCategory === null
            ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
            : "bg-surface-base border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
        )}
      >
        All Articles
      </button>

      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
            activeCategory === cat.name
              ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
              : "bg-surface-base border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
          )}
        >
          {cat.name} <span className="ml-1.5 text-xs opacity-60">({cat.count})</span>
        </button>
      ))}
    </div>
  );
}
