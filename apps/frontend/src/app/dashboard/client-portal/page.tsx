"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { Folder, MessageSquare, Package, Star } from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  status: string;
  deliverables: number;
  messages: number;
}

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400",
  Review: "bg-amber-500/10 text-amber-400",
  Completed: "bg-blue-500/10 text-blue-400",
};

const SAMPLE_PROJECTS: ProjectItem[] = [
  { id: "1", name: "DevSpark Platform v2", status: "Active", deliverables: 5, messages: 12 },
  { id: "2", name: "E-Commerce Rebuild", status: "Active", deliverables: 3, messages: 8 },
  { id: "3", name: "Mobile Banking App", status: "Review", deliverables: 7, messages: 15 },
  { id: "4", name: "Analytics Dashboard", status: "Completed", deliverables: 4, messages: 6 },
];

export default function ClientPortalPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Client Portal</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Manage client-facing projects, deliverables, and communication.
        </p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard
          title="Active Projects"
          value="6"
          trend={8.0}
          icon={<Folder className="h-5 w-5" />}
        />
        <MetricsCard
          title="Pending Deliverables"
          value="14"
          icon={<Package className="h-5 w-5" />}
        />
        <MetricsCard
          title="Unread Messages"
          value="5"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <MetricsCard
          title="Avg Satisfaction"
          value="4.8"
          trend={2.1}
          icon={<Star className="h-5 w-5" />}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <h2 className="font-heading text-neutral-0 mb-4 text-lg font-semibold">Client Projects</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SAMPLE_PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -2 }}
              className="border-border-default bg-surface-base hover:border-border-prominent rounded-xl border p-5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-neutral-0 font-medium">{project.name}</h3>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[project.status] || "bg-surface-raised text-neutral-400"}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" /> {project.deliverables} deliverables
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" /> {project.messages} messages
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
