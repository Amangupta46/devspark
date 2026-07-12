"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/motion/variants";
import { User, Bell, Shield, Palette } from "lucide-react";

const SETTINGS_SECTIONS = [
  {
    title: "Profile",
    description: "Manage your personal information and preferences.",
    icon: User,
    fields: [
      { label: "Full Name", value: "Alex Johnson", type: "text" },
      { label: "Email", value: "alex@devspark.dev", type: "email" },
      { label: "Role", value: "Admin", type: "text" },
    ],
  },
  {
    title: "Notifications",
    description: "Configure how you receive notifications.",
    icon: Bell,
    toggles: [
      { label: "Email Notifications", enabled: true },
      { label: "Push Notifications", enabled: false },
      { label: "In-App Notifications", enabled: true },
      { label: "Weekly Digest", enabled: true },
    ],
  },
  {
    title: "Security",
    description: "Manage your security settings and sessions.",
    icon: Shield,
    fields: [
      { label: "Password", value: "••••••••", type: "password" },
      { label: "Two-Factor Auth", value: "Enabled", type: "text" },
    ],
  },
  {
    title: "Appearance",
    description: "Customize the look and feel of DevSpark.",
    icon: Palette,
    toggles: [
      { label: "Dark Mode", enabled: true },
      { label: "Compact Sidebar", enabled: false },
      { label: "Animations", enabled: true },
    ],
  },
];

export default function SettingsPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={staggerItem}>
        <h1 className="font-heading text-neutral-0 text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-neutral-400">Manage your account and preferences.</p>
      </motion.div>

      {SETTINGS_SECTIONS.map((section) => (
        <motion.div
          key={section.title}
          variants={staggerItem}
          className="border-border-default bg-surface-base rounded-xl border p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-surface-raised flex h-10 w-10 items-center justify-center rounded-lg text-indigo-400">
              <section.icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-neutral-0 text-lg font-semibold">{section.title}</h2>
              <p className="text-sm text-neutral-500">{section.description}</p>
            </div>
          </div>

          {section.fields && (
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div
                  key={field.label}
                  className="border-border-subtle bg-surface-ground flex items-center justify-between rounded-lg border p-4"
                >
                  <span className="text-sm font-medium text-neutral-400">{field.label}</span>
                  <span className="text-sm text-neutral-200">{field.value}</span>
                </div>
              ))}
            </div>
          )}

          {section.toggles && (
            <div className="space-y-3">
              {section.toggles.map((toggle) => (
                <div
                  key={toggle.label}
                  className="border-border-subtle bg-surface-ground flex items-center justify-between rounded-lg border p-4"
                >
                  <span className="text-sm font-medium text-neutral-400">{toggle.label}</span>
                  <div
                    className={`h-6 w-11 rounded-full transition-colors ${toggle.enabled ? "bg-indigo-500" : "bg-neutral-700"}`}
                  >
                    <div
                      className={`h-5 w-5 translate-y-0.5 rounded-full bg-white shadow-sm transition-transform ${toggle.enabled ? "translate-x-5.5" : "translate-x-0.5"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
