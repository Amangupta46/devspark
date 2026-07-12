"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { DataTable, Column } from "@/components/dashboard/ui/data-table";
import { CreditCard, DollarSign, Receipt, Wallet } from "lucide-react";

interface InvoiceRow {
  id: string;
  invoice_number: string;
  client: string;
  amount: string;
  status: string;
  due_date: string;
}

const STATUS_COLORS: Record<string, string> = {
  Paid: "bg-emerald-500/10 text-emerald-400",
  Sent: "bg-blue-500/10 text-blue-400",
  Overdue: "bg-red-500/10 text-red-400",
  Draft: "bg-neutral-500/10 text-neutral-400",
};

const SAMPLE_INVOICES: InvoiceRow[] = [
  {
    id: "1",
    invoice_number: "INV-2026-001",
    client: "Acme Corp",
    amount: "$45,000",
    status: "Paid",
    due_date: "2026-06-30",
  },
  {
    id: "2",
    invoice_number: "INV-2026-002",
    client: "TechStart",
    amount: "$12,000",
    status: "Sent",
    due_date: "2026-07-15",
  },
  {
    id: "3",
    invoice_number: "INV-2026-003",
    client: "InnovateCo",
    amount: "$28,500",
    status: "Overdue",
    due_date: "2026-07-01",
  },
  {
    id: "4",
    invoice_number: "INV-2026-004",
    client: "DataFlow",
    amount: "$8,200",
    status: "Draft",
    due_date: "2026-07-20",
  },
  {
    id: "5",
    invoice_number: "INV-2026-005",
    client: "ScaleUp Inc",
    amount: "$65,000",
    status: "Paid",
    due_date: "2026-06-15",
  },
];

const columns: Column<InvoiceRow>[] = [
  { header: "Invoice #", accessorKey: "invoice_number", sortable: true },
  { header: "Client", accessorKey: "client" },
  { header: "Amount", accessorKey: "amount", sortable: true },
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
  { header: "Due Date", accessorKey: "due_date" },
];

export default function FinancePage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Finance</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Invoices, payments, expenses & revenue tracking.
        </p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Total Revenue"
          value="$248,700"
          trend={18.4}
          icon={<DollarSign className="h-5 w-5" />}
          sparkline={[30, 45, 38, 52, 48, 60, 72]}
        />
        <MetricsCard
          title="Outstanding"
          value="$40,500"
          trend={-8.2}
          icon={<Receipt className="h-5 w-5" />}
        />
        <MetricsCard
          title="Invoices Sent"
          value="52"
          trend={12.0}
          icon={<CreditCard className="h-5 w-5" />}
        />
        <MetricsCard
          title="Expenses"
          value="$34,100"
          trend={4.6}
          icon={<Wallet className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">Recent Invoices</h2>
        <DataTable<InvoiceRow>
          data={SAMPLE_INVOICES}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </motion.div>
    </motion.div>
  );
}
