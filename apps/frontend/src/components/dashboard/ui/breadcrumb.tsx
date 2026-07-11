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
        className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-surface-raised hover:text-neutral-50 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={item.label}>
            <ChevronRight className="h-4 w-4 text-neutral-600 flex-shrink-0" />
            {isLast || !item.href ? (
              <span className={cn(
                "font-medium truncate max-w-[150px] md:max-w-none",
                isLast ? "text-neutral-0" : "text-neutral-400"
              )}>
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-neutral-50 hover:underline underline-offset-4 decoration-border-interactive transition-all truncate max-w-[150px] md:max-w-none"
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
