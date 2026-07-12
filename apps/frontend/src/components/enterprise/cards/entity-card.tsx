"use client";

import React, { memo } from "react";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EntityCardProps {
  title: string;
  subtitle?: string;
  avatarInitials?: string;
  status?: {
    label: string;
    variant: "success" | "warning" | "error" | "info" | "default";
  };
  metadata?: {
    icon: React.ElementType<{ className?: string }>;
    value: string;
  }[];
  onClick?: () => void;
  onActionClick?: (e: React.MouseEvent) => void;
}

const statusStyles = {
  success: "bg-success-500/10 text-success-400",
  warning: "bg-warning-500/10 text-warning-400",
  error: "bg-error-500/10 text-error-400",
  info: "bg-info-500/10 text-info-400",
  default: "bg-surface-raised text-neutral-400",
};

export const EntityCard = memo(function EntityCard({
  title,
  subtitle,
  avatarInitials,
  status,
  metadata,
  onClick,
  onActionClick,
}: EntityCardProps) {
  return (
    <motion.div
      whileHover={onClick ? { y: -2, transition: { type: "spring", stiffness: 300 } } : undefined}
      onClick={onClick}
      className={cn(
        "group border-border-default bg-surface-base relative flex flex-col rounded-xl border p-4 transition-colors",
        onClick && "hover:border-border-prominent cursor-pointer",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {avatarInitials && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-sm font-semibold text-white">
              {avatarInitials}
            </div>
          )}
          <div className="flex flex-col">
            <h4 className="font-heading text-neutral-0 leading-tight font-semibold">{title}</h4>
            {subtitle && <p className="mt-0.5 text-xs text-neutral-400">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
                statusStyles[status.variant],
              )}
            >
              {status.label}
            </span>
          )}

          {onActionClick && (
            <button
              onClick={onActionClick}
              className="hover:bg-surface-raised hover:text-neutral-0 inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {metadata && metadata.length > 0 && (
        <div className="border-border-subtle mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-3">
          {metadata.map((meta, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-400">
              <meta.icon className="h-3.5 w-3.5" />
              <span>{meta.value}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
});
