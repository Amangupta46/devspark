"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { Bell, CheckCircle, Clock, Megaphone } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  category: string;
  is_read: boolean;
  created_at: string;
}

const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "New lead assigned",
    content: "Enterprise Deal has been assigned to you.",
    category: "CRM",
    is_read: false,
    created_at: "2 minutes ago",
  },
  {
    id: "2",
    title: "Invoice paid",
    content: "INV-2026-001 has been marked as paid by Acme Corp.",
    category: "Finance",
    is_read: false,
    created_at: "1 hour ago",
  },
  {
    id: "3",
    title: "Project milestone reached",
    content: "DevSpark Platform v2 reached Phase 3 milestone.",
    category: "Projects",
    is_read: true,
    created_at: "3 hours ago",
  },
  {
    id: "4",
    title: "Code review requested",
    content: "Sarah Chen requested your review on PR #247.",
    category: "Team",
    is_read: true,
    created_at: "5 hours ago",
  },
  {
    id: "5",
    title: "Quote accepted",
    content: "Enterprise Platform Build quote was accepted.",
    category: "Quotes",
    is_read: true,
    created_at: "1 day ago",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  CRM: "bg-blue-500/10 text-blue-400",
  Finance: "bg-emerald-500/10 text-emerald-400",
  Projects: "bg-purple-500/10 text-purple-400",
  Team: "bg-amber-500/10 text-amber-400",
  Quotes: "bg-cyan-500/10 text-cyan-400",
};

export default function NotificationsPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Notifications</h1>
        <p className="mt-1 text-sm text-neutral-400">Stay updated on all activities.</p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <MetricsCard title="Unread" value="2" icon={<Bell className="h-5 w-5" />} />
        <MetricsCard title="Total Today" value="8" icon={<Clock className="h-5 w-5" />} />
        <MetricsCard title="Resolved" value="42" icon={<CheckCircle className="h-5 w-5" />} />
        <MetricsCard title="Announcements" value="3" icon={<Megaphone className="h-5 w-5" />} />
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-3">
        <h2 className="font-heading text-neutral-0 text-lg font-semibold">Recent</h2>
        {SAMPLE_NOTIFICATIONS.map((notification) => (
          <motion.div
            key={notification.id}
            whileHover={{ x: 4 }}
            className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
              notification.is_read
                ? "border-border-subtle bg-surface-base"
                : "border-indigo-500/30 bg-indigo-500/5"
            }`}
          >
            <div
              className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${notification.is_read ? "bg-transparent" : "bg-indigo-400"}`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-neutral-0 text-sm font-medium">{notification.title}</h3>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[notification.category] || "bg-surface-raised text-neutral-400"}`}
                >
                  {notification.category}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-neutral-400">{notification.content}</p>
              <p className="mt-1 text-xs text-neutral-600">{notification.created_at}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
