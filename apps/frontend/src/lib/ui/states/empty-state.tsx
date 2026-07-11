import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/20 p-8 text-center", className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-neutral-800/50 p-4 text-neutral-400">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-neutral-200">{title}</h3>
      {description && <p className="mb-6 max-w-sm text-sm text-neutral-400">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
