"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { LayoutDashboard, Users, Briefcase, CreditCard, FileText, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Welcome back. Here&apos;s an overview of your workspace.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Revenue (YTD)"
          value="$124,500"
          trend={12.5}
          icon={<TrendingUp className="h-5 w-5" />}
          sparkline={[40, 55, 45, 60, 50, 70, 80]}
        />
        <MetricsCard
          title="Active Clients"
          value="34"
          trend={8.2}
          icon={<Users className="h-5 w-5" />}
          sparkline={[20, 25, 22, 30, 28, 32, 34]}
        />
        <MetricsCard
          title="Open Projects"
          value="12"
          trend={-2.1}
          icon={<Briefcase className="h-5 w-5" />}
          sparkline={[14, 13, 15, 12, 14, 13, 12]}
        />
        <MetricsCard
          title="Pending Invoices"
          value="$18,200"
          trend={5.3}
          icon={<CreditCard className="h-5 w-5" />}
          sparkline={[10, 15, 12, 18, 14, 16, 18]}
        />
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">Quick Access</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "CRM",
              desc: "Manage leads, contacts & companies",
              href: "/dashboard/crm",
              icon: Users,
              color: "text-blue-400",
            },
            {
              title: "Projects",
              desc: "Track tasks and deliverables",
              href: "/dashboard/projects",
              icon: Briefcase,
              color: "text-emerald-400",
            },
            {
              title: "Quotes",
              desc: "Create proposals and estimates",
              href: "/dashboard/quotes",
              icon: FileText,
              color: "text-amber-400",
            },
            {
              title: "Finance",
              desc: "Invoices, payments & expenses",
              href: "/dashboard/finance",
              icon: CreditCard,
              color: "text-purple-400",
            },
            {
              title: "Analytics",
              desc: "Revenue, pipeline & performance",
              href: "/dashboard/analytics",
              icon: TrendingUp,
              color: "text-rose-400",
            },
            {
              title: "Team",
              desc: "Members, reviews & worklogs",
              href: "/dashboard/team",
              icon: LayoutDashboard,
              color: "text-cyan-400",
            },
          ].map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group border-border-default bg-surface-base hover:border-border-prominent flex items-start gap-4 rounded-xl border p-5 transition-colors"
            >
              <div
                className={`bg-surface-raised flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-neutral-0 font-medium">{item.title}</h3>
                <p className="mt-0.5 text-xs text-neutral-500">{item.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
