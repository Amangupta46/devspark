import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-surface-elevated/80 animate-pulse rounded", className)} {...props} />
  );
}

// 1. Text Skeleton (lines of text)
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("w-full space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4 w-full",
            i === lines - 1 && lines > 1 ? "w-[75%]" : "", // Make last line slightly shorter for layout realism
          )}
        />
      ))}
    </div>
  );
}

// 2. Card Skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border-subtle bg-surface-base/40 space-y-4 rounded-lg border p-6",
        className,
      )}
    >
      <Skeleton className="h-40 w-full rounded" />
      <Skeleton className="h-6 w-2/3" />
      <TextSkeleton lines={2} />
    </div>
  );
}

// 3. Table Skeleton
export function TableSkeleton({ rows = 4, className }: { rows?: number; className?: string }) {
  return (
    <div
      className={cn(
        "border-border-default w-full space-y-4 overflow-hidden rounded-lg border p-4",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border-subtle flex gap-4 border-b pb-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      {/* Rows */}
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Hero Skeleton
export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center justify-center space-y-6 py-24 text-center",
        className,
      )}
    >
      <Skeleton className="h-6 w-32 rounded-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-4/5" />
      <Skeleton className="h-6 w-2/3" />
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-12 w-32 rounded-md" />
        <Skeleton className="h-12 w-32 rounded-md" />
      </div>
    </div>
  );
}

// 5. Dashboard Skeleton
export function DashboardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Title block */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      {/* Cards Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="border-border-subtle space-y-3 rounded-lg border p-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="border-border-subtle space-y-3 rounded-lg border p-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="border-border-subtle space-y-3 rounded-lg border p-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      {/* Charts & Content Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="border-border-subtle h-80 rounded-lg border p-6 md:col-span-2">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="border-border-subtle space-y-4 rounded-lg border p-6">
          <Skeleton className="h-5 w-24" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
