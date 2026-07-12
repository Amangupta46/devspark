"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-neutral-400">
      <Link
        href="/dashboard"
        className="hover:bg-surface-raised flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:text-neutral-50"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={item.label}>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-600" />
            {isLast || !item.href ? (
              <span
                className={cn(
                  "max-w-[150px] truncate font-medium md:max-w-none",
                  isLast ? "text-neutral-0" : "text-neutral-400",
                )}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="decoration-border-interactive max-w-[150px] truncate underline-offset-4 transition-all hover:text-neutral-50 hover:underline md:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
