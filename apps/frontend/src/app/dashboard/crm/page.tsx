"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { DataTable, Column } from "@/components/dashboard/ui/data-table";
import { Users, Building2, Target, TrendingUp } from "lucide-react";

interface LeadRow {
  id: string;
  title: string;
  status: string;
  value: string;
  company: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400",
  Contacted: "bg-amber-500/10 text-amber-400",
  Qualified: "bg-emerald-500/10 text-emerald-400",
  Lost: "bg-red-500/10 text-red-400",
};

const SAMPLE_LEADS: LeadRow[] = [
  {
    id: "1",
    title: "Enterprise Deal",
    status: "Qualified",
    value: "$45,000",
    company: "Acme Corp",
    created_at: "2026-07-01",
  },
  {
    id: "2",
    title: "SaaS Migration",
    status: "New",
    value: "$12,000",
    company: "TechStart",
    created_at: "2026-07-05",
  },
  {
    id: "3",
    title: "Mobile App Build",
    status: "Contacted",
    value: "$28,000",
    company: "InnovateCo",
    created_at: "2026-07-08",
  },
  {
    id: "4",
    title: "API Integration",
    status: "Qualified",
    value: "$8,500",
    company: "DataFlow",
    created_at: "2026-07-10",
  },
  {
    id: "5",
    title: "Cloud Infrastructure",
    status: "New",
    value: "$65,000",
    company: "ScaleUp Inc",
    created_at: "2026-07-11",
  },
];

const columns: Column<LeadRow>[] = [
  { header: "Lead", accessorKey: "title", sortable: true },
  {
    header: "Status",
    accessorKey: "status",
    cell: (item) => (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status] || "bg-surface-raised text-neutral-400"}`}
      >
        {item.status}
      </span>
    ),
  },
  { header: "Value", accessorKey: "value", sortable: true },
  { header: "Company", accessorKey: "company" },
  { header: "Created", accessorKey: "created_at" },
];

export default function CRMPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">CRM</h1>
        <p className="mt-1 text-sm text-neutral-400">Manage your leads, contacts, and companies.</p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Total Leads"
          value="127"
          trend={15.2}
          icon={<Target className="h-5 w-5" />}
        />
        <MetricsCard
          title="Companies"
          value="48"
          trend={6.8}
          icon={<Building2 className="h-5 w-5" />}
        />
        <MetricsCard
          title="Contacts"
          value="312"
          trend={22.1}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricsCard
          title="Pipeline Value"
          value="$1.2M"
          trend={9.4}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">Recent Leads</h2>
        <DataTable<LeadRow>
          data={SAMPLE_LEADS}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </motion.div>
    </motion.div>
  );
}
