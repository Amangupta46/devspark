"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  forgotPasswordLink?: React.ReactNode;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, label = "Password", forgotPasswordLink, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="group relative">
        {(label || forgotPasswordLink) && (
          <div className="mb-1.5 flex items-center justify-between">
            {label && (
              <label className="text-xs font-medium tracking-wider text-neutral-500 uppercase">
                {label}
              </label>
            )}
            {forgotPasswordLink}
          </div>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white/[0.03] px-4 py-3 pr-12 text-sm text-neutral-100 transition-all duration-300 outline-none placeholder:text-neutral-600 md:backdrop-blur-sm",
              error
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 hover:border-white/20 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-500/20",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-300 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
