"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { pageTransition, staggerContainer, staggerItem } from "@/motion/variants";
import { motion } from "framer-motion";

export default function TeamDashboard() {
  // TODO: Add backend API hooks (e.g. useTeamMetrics())

  return (
    <DashboardShell>
      <motion.div 
        variants={pageTransition} initial="initial" animate="animate" exit="exit"
        className="flex flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-neutral-0 tracking-tight capitalize">team Overview</h1>
            <p className="text-sm text-neutral-400 mt-1">Monitor your primary KPIs and recent activity.</p>
          </div>
          <div className="flex gap-3">
            <button className="h-9 px-4 rounded-md border border-border-default bg-surface-base text-sm font-medium text-neutral-200 hover:bg-surface-raised transition-colors">Export Report</button>
            <button className="h-9 px-4 rounded-md bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-500/20">New Action</button>
          </div>
        </div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={staggerItem}><MetricsCard title="Total Volume" value="12,450" trend={14.5} sparkline={[10,20,15,30,25,40,35]} /></motion.div>
          <motion.div variants={staggerItem}><MetricsCard title="Active Items" value="1,204" trend={-2.4} sparkline={[40,30,35,25,20,15,10]} /></motion.div>
          <motion.div variants={staggerItem}><MetricsCard title="Completion Rate" value="94.2%" trend={4.1} sparkline={[10,12,15,20,30,35,40]} /></motion.div>
          <motion.div variants={staggerItem}><MetricsCard title="Pending Review" value="84" trend={0} sparkline={[10,10,10,10,10,10,10]} /></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface-base p-6 min-h-[400px] flex items-center justify-center">
             <span className="text-neutral-500">Chart Placeholder (Recharts)</span>
          </div>
          <div className="rounded-xl border border-border-default bg-surface-base p-6 min-h-[400px] flex items-center justify-center">
             <span className="text-neutral-500">Activity Timeline Placeholder</span>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}