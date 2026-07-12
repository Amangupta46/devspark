"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { DataTable, Column } from "@/components/dashboard/ui/data-table";
import { FileText, CheckCircle2, Send, DollarSign } from "lucide-react";

interface QuoteRow {
  id: string;
  title: string;
  status: string;
  client: string;
  amount: string;
  valid_until: string;
}

const STATUS_COLORS: Record<string, string> = {
  Draft: "bg-neutral-500/10 text-neutral-400",
  Sent: "bg-blue-500/10 text-blue-400",
  Accepted: "bg-emerald-500/10 text-emerald-400",
  Rejected: "bg-red-500/10 text-red-400",
};

const SAMPLE_QUOTES: QuoteRow[] = [
  {
    id: "1",
    title: "Enterprise Platform Build",
    status: "Accepted",
    client: "Acme Corp",
    amount: "$145,000",
    valid_until: "2026-08-01",
  },
  {
    id: "2",
    title: "Mobile App Development",
    status: "Sent",
    client: "TechStart",
    amount: "$72,000",
    valid_until: "2026-07-25",
  },
  {
    id: "3",
    title: "DevOps Consulting",
    status: "Draft",
    client: "CloudFirst",
    amount: "$28,000",
    valid_until: "2026-08-15",
  },
  {
    id: "4",
    title: "UI/UX Redesign",
    status: "Accepted",
    client: "BrandCo",
    amount: "$35,000",
    valid_until: "2026-07-30",
  },
  {
    id: "5",
    title: "API Gateway Setup",
    status: "Rejected",
    client: "DataFlow",
    amount: "$18,500",
    valid_until: "2026-07-20",
  },
];

const columns: Column<QuoteRow>[] = [
  { header: "Quote", accessorKey: "title", sortable: true },
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
  { header: "Client", accessorKey: "client" },
  { header: "Amount", accessorKey: "amount", sortable: true },
  { header: "Valid Until", accessorKey: "valid_until" },
];

export default function QuotesPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Quotes</h1>
        <p className="mt-1 text-sm text-neutral-400">Create and manage proposals and estimates.</p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Total Quotes"
          value="42"
          trend={18.3}
          icon={<FileText className="h-5 w-5" />}
        />
        <MetricsCard
          title="Accepted"
          value="28"
          trend={10.5}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricsCard title="Pending" value="9" icon={<Send className="h-5 w-5" />} />
        <MetricsCard
          title="Total Revenue"
          value="$892K"
          trend={14.7}
          icon={<DollarSign className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">Recent Quotes</h2>
        <DataTable<QuoteRow>
          data={SAMPLE_QUOTES}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </motion.div>
    </motion.div>
  );
}
