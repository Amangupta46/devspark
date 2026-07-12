"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export type TimelineStatus = "completed" | "current" | "upcoming";

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: TimelineStatus;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function ActivityTimeline({ events, className }: ActivityTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical Line */}
      <div className="bg-border-default absolute top-4 bottom-4 left-[15px] w-px" />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-col space-y-6"
      >
        <AnimatePresence>
          {events.map((event, index) => {
            const isCompleted = event.status === "completed";
            const isCurrent = event.status === "current";

            return (
              <motion.div key={event.id} variants={staggerItem} className="relative flex gap-6">
                {/* Timeline Node */}
                <div className="bg-surface-ground relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                  ) : isCurrent ? (
                    <div className="flex h-5 w-5 items-center justify-center">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    </div>
                  ) : (
                    <Circle className="h-4 w-4 text-neutral-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col pt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isUpcoming(event.status) ? "text-neutral-400" : "text-neutral-50",
                      )}
                    >
                      {event.title}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Clock className="h-3 w-3" />
                      {event.timestamp}
                    </span>
                  </div>

                  {event.description && (
                    <p className="mt-1 text-sm text-neutral-400">{event.description}</p>
                  )}

                  {event.user && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-[10px] text-white">
                        {event.user.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-neutral-300">
                        {event.user.name}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function isUpcoming(status: TimelineStatus) {
  return status === "upcoming";
}
