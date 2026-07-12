"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { DataTable, Column } from "@/components/dashboard/ui/data-table";
import { Users, CalendarDays, GitPullRequest, Clock } from "lucide-react";

interface MemberRow {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  joined: string;
}

const ROLE_COLORS: Record<string, string> = {
  Admin: "bg-purple-500/10 text-purple-400",
  Manager: "bg-blue-500/10 text-blue-400",
  Developer: "bg-emerald-500/10 text-emerald-400",
  Designer: "bg-amber-500/10 text-amber-400",
};

const SAMPLE_MEMBERS: MemberRow[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Manager",
    department: "Product",
    status: "Active",
    joined: "2024-03-22",
  },
  {
    id: "3",
    name: "Marcus Williams",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    joined: "2024-06-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Designer",
    department: "Design",
    status: "Active",
    joined: "2025-01-08",
  },
  {
    id: "5",
    name: "James Wilson",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    joined: "2025-04-15",
  },
];

const columns: Column<MemberRow>[] = [
  { header: "Name", accessorKey: "name", sortable: true },
  {
    header: "Role",
    accessorKey: "role",
    cell: (item) => (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_COLORS[item.role] || "bg-surface-raised text-neutral-400"}`}
      >
        {item.role}
      </span>
    ),
  },
  { header: "Department", accessorKey: "department" },
  { header: "Status", accessorKey: "status" },
  { header: "Joined", accessorKey: "joined" },
];

export default function TeamPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Team</h1>
        <p className="mt-1 text-sm text-neutral-400">Manage team members, reviews, and worklogs.</p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Team Members"
          value="24"
          trend={4.2}
          icon={<Users className="h-5 w-5" />}
        />
        <MetricsCard title="Pending Leaves" value="3" icon={<CalendarDays className="h-5 w-5" />} />
        <MetricsCard
          title="Code Reviews"
          value="12"
          trend={22.0}
          icon={<GitPullRequest className="h-5 w-5" />}
        />
        <MetricsCard
          title="Avg Hours/Week"
          value="38.5"
          trend={2.1}
          icon={<Clock className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">Team Members</h2>
        <DataTable<MemberRow>
          data={SAMPLE_MEMBERS}
          columns={columns}
          keyExtractor={(item) => item.id}
        />
      </motion.div>
    </motion.div>
  );
}
