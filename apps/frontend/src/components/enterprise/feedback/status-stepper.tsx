"use client";

import React from "react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  description?: string;
  status: "complete" | "current" | "pending";
}

interface StatusStepperProps {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
}

export function StatusStepper({ steps, orientation = "horizontal" }: StatusStepperProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div className={cn(
      "flex",
      isHorizontal ? "w-full flex-row" : "flex-col"
    )}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isComplete = step.status === "complete";
        const isCurrent = step.status === "current";

        return (
          <div 
            key={step.id} 
            className={cn(
              "relative flex flex-1",
              isHorizontal ? "flex-col" : "flex-row gap-4"
            )}
          >
            {/* Connector Line */}
            {!isLast && (
              <div 
                className={cn(
                  "absolute bg-border-default transition-colors duration-500",
                  isHorizontal 
                    ? "left-6 right-[-24px] top-4 h-0.5" 
                    : "left-[15px] top-10 bottom-[-16px] w-0.5",
                  isComplete && "bg-indigo-500"
                )} 
              />
            )}

            {/* Node Container */}
            <div className={cn(
              "flex items-center",
              isHorizontal ? "flex-col gap-3" : "flex-row gap-4 h-full"
            )}>
              <div 
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isComplete 
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]" 
                    : isCurrent
                      ? "border-indigo-500 bg-surface-base text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                      : "border-border-default bg-surface-ground text-neutral-500"
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : isCurrent ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Labels */}
              <div className={cn(
                "flex flex-col",
                isHorizontal ? "text-center items-center" : "pt-1 pb-6"
              )}>
                <span className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  isComplete || isCurrent ? "text-neutral-0" : "text-neutral-400"
                )}>
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-neutral-500 mt-1 max-w-[120px]">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
