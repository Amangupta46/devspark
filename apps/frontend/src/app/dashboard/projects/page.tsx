"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { DataTable, Column } from "@/components/dashboard/ui/data-table";
import { Briefcase, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface ProjectRow {
  id: string;
  name: string;
  status: string;
  client: string;
  budget: string;
  end_date: string;
}

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400",
  Planning: "bg-blue-500/10 text-blue-400",
  "On Hold": "bg-amber-500/10 text-amber-400",
  Completed: "bg-neutral-500/10 text-neutral-400",
};

const SAMPLE_PROJECTS: ProjectRow[] = [
  {
    id: "1",
    name: "DevSpark Platform v2",
    status: "Active",
    client: "Internal",
    budget: "$120,000",
    end_date: "2026-09-30",
  },
  {
    id: "2",
    name: "E-Commerce Rebuild",
    status: "Active",
    client: "RetailMax",
    budget: "$85,000",
    end_date: "2026-08-15",
  },
  {
    id: "3",
    name: "Mobile Banking App",
    status: "Planning",
    client: "FinSecure",
    budget: "$200,000",
    end_date: "2026-12-01",
  },
  {
    id: "4",
    name: "CRM Integration",
    status: "On Hold",
    client: "SalesPro",
    budget: "$35,000",
    end_date: "2026-10-20",
  },
  {
    id: "5",
    name: "Analytics Dashboard",
    status: "Completed",
    client: "DataViz",
    budget: "$50,000",
    end_date: "2026-06-30",
  },
];

const columns: Column<ProjectRow>[] = [
  { header: "Project", accessorKey: "name", sortable: true },
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
  { header: "Budget", accessorKey: "budget", sortable: true },
  { header: "Due Date", accessorKey: "end_date" },
];

export default function ProjectsPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Projects</h1>
        <p className="mt-1 text-sm text-neutral-400">Track and manage all your projects.</p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Total Projects"
          value="18"
          trend={5.6}
          icon={<Briefcase className="h-5 w-5" />}
        />
        <MetricsCard title="Active" value="8" trend={12.0} icon={<Clock className="h-5 w-5" />} />
        <MetricsCard
          title="Completed"
          value="7"
          trend={3.2}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricsCard
          title="At Risk"
          value="3"
          trend={-15.0}
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">All Projects</h2>
        <DataTable<ProjectRow>
          data={SAMPLE_PROJECTS}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </motion.div>
    </motion.div>
  );
}
