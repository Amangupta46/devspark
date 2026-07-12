"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react";

const PIPELINE_STAGES = [
  { name: "Discovery", count: 12, value: "$180K", pct: 100 },
  { name: "Proposal", count: 8, value: "$120K", pct: 67 },
  { name: "Negotiation", count: 5, value: "$85K", pct: 42 },
  { name: "Closed Won", count: 3, value: "$45K", pct: 25 },
];

const TASK_STATUS = [
  { status: "To Do", count: 24, color: "bg-neutral-500" },
  { status: "In Progress", count: 18, color: "bg-blue-500" },
  { status: "Review", count: 8, color: "bg-amber-500" },
  { status: "Done", count: 45, color: "bg-emerald-500" },
];

export default function AnalyticsPage() {
  const totalTasks = TASK_STATUS.reduce((sum, s) => sum + s.count, 0);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Revenue, pipeline, and performance insights.
        </p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Revenue (YTD)"
          value="$248,700"
          trend={18.4}
          icon={<DollarSign className="h-5 w-5" />}
          sparkline={[30, 45, 38, 52, 48, 60, 72]}
        />
        <MetricsCard
          title="Pipeline Value"
          value="$1.2M"
          trend={9.4}
          icon={<Target className="h-5 w-5" />}
          sparkline={[80, 85, 82, 90, 95, 100, 120]}
        />
        <MetricsCard
          title="Conversion Rate"
          value="24.8%"
          trend={3.2}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricsCard
          title="Avg Deal Size"
          value="$38.5K"
          trend={6.1}
          icon={<BarChart3 className="h-5 w-5" />}
        />
      </motion.div>

      {/* Pipeline Funnel */}
      <motion.div
        variants={staggerItem}
        className="border-border-default bg-surface-base rounded-xl border p-6"
      >
        <h2 className="font-heading text-neutral-0 mb-6 text-lg font-semibold">Sales Pipeline</h2>
        <div className="space-y-4">
          {PIPELINE_STAGES.map((stage) => (
            <div key={stage.name} className="flex items-center gap-4">
              <span className="w-28 text-sm font-medium text-neutral-400">{stage.name}</span>
              <div className="flex-1">
                <div className="bg-surface-raised h-8 w-full overflow-hidden rounded-lg">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex h-full items-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-400 px-3"
                  >
                    <span className="text-xs font-medium text-white">{stage.count} deals</span>
                  </motion.div>
                </div>
              </div>
              <span className="w-20 text-right text-sm font-medium text-neutral-300">
                {stage.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Task Distribution */}
      <motion.div
        variants={staggerItem}
        className="border-border-default bg-surface-base rounded-xl border p-6"
      >
        <h2 className="font-heading text-neutral-0 mb-6 text-lg font-semibold">
          Task Distribution
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TASK_STATUS.map((item) => (
            <div key={item.status} className="text-center">
              <div className="bg-surface-raised mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl">
                <span className="font-heading text-neutral-0 text-2xl font-bold">{item.count}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${item.color}`} />
                <span className="text-xs text-neutral-400">{item.status}</span>
              </div>
              <p className="mt-0.5 text-xs text-neutral-600">
                {((item.count / totalTasks) * 100).toFixed(0)}%
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
