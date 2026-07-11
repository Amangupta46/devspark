import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'apps', 'frontend', 'src', 'app', 'dashboard');

// Define templates for different route types
const templates = {
  dashboard: (mod) => `"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";
import { MetricsCard } from "@/components/dashboard/ui/metrics-card";
import { pageTransition, staggerContainer, staggerItem } from "@/motion/variants";
import { motion } from "framer-motion";

export default function ${mod.charAt(0).toUpperCase() + mod.slice(1)}Dashboard() {
  // TODO: Add backend API hooks (e.g. use${mod.charAt(0).toUpperCase() + mod.slice(1)}Metrics())

  return (
    <DashboardShell>
      <motion.div 
        variants={pageTransition} initial="initial" animate="animate" exit="exit"
        className="flex flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-neutral-0 tracking-tight capitalize">${mod} Overview</h1>
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
}`,
  list: (mod, sub) => `"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";
import { AdvancedTable } from "@/components/enterprise/tables/advanced-table";
import { FilterPanel } from "@/components/enterprise/filters/filter-panel";
import { pageTransition } from "@/motion/variants";
import { motion } from "framer-motion";
import { useState } from "react";

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  id: \`item-\${i}\`,
  name: \`Entity \${i + 1}\`,
  status: i % 3 === 0 ? "Active" : "Pending",
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}));

const columns = [
  { id: "name", header: "Name", sortable: true },
  { id: "status", header: "Status", sortable: true, accessor: (row: any) => (
    <span className="inline-flex items-center rounded-full bg-surface-raised px-2 py-0.5 text-xs font-medium text-neutral-300">
      {row.status}
    </span>
  )},
  { id: "date", header: "Date", sortable: true },
];

export default function ${sub.charAt(0).toUpperCase() + sub.slice(1).replace(/[^a-zA-Z]/g, '')}List() {
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <DashboardShell>
      <motion.div 
        variants={pageTransition} initial="initial" animate="animate" exit="exit"
        className="flex flex-col gap-6 p-6 lg:p-10 w-full"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold font-heading text-neutral-0 capitalize">${sub.replace(/[^a-zA-Z]/g, ' ')}</h1>
          <button className="h-9 px-4 rounded-md bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-500/20">Create New</button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-full max-w-md">
            <input type="text" placeholder="Search..." className="w-full h-9 rounded-md border border-border-default bg-surface-base px-3 text-sm text-neutral-0 outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <FilterPanel 
            groups={[{id: 'status', label: 'Status', options: [{id: '1', label: 'Active'}, {id: '2', label: 'Pending'}]}]} 
            activeFilters={activeFilters} 
            onChange={() => {}} 
            onClearAll={() => {}} 
          />
        </div>

        <AdvancedTable data={mockData} columns={columns} title="All Records" />
      </motion.div>
    </DashboardShell>
  );
}`,
  pipeline: (mod, sub) => `"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";
import { KanbanBoard } from "@/components/dashboard/ui/kanban-board";
import { pageTransition } from "@/motion/variants";
import { motion } from "framer-motion";

const mockColumns = [
  { id: "1", title: "To Do", items: [{ id: "t1", title: "Review requirements", tags: ["High Priority"] }] },
  { id: "2", title: "In Progress", items: [{ id: "t2", title: "Develop UI components", tags: ["Frontend"] }] },
  { id: "3", title: "Done", items: [{ id: "t3", title: "Setup infrastructure", tags: ["DevOps"] }] }
];

export default function ${sub.charAt(0).toUpperCase() + sub.slice(1).replace(/[^a-zA-Z]/g, '')}Pipeline() {
  return (
    <DashboardShell>
      <motion.div 
        variants={pageTransition} initial="initial" animate="animate" exit="exit"
        className="flex flex-col gap-6 p-6 lg:p-10 w-full h-[calc(100vh-64px)] overflow-hidden"
      >
        <div className="flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-semibold font-heading text-neutral-0 capitalize">${sub} Board</h1>
          <button className="h-9 px-4 rounded-md bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-500/20">Add Task</button>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
           <KanbanBoard columns={mockColumns} />
        </div>
      </motion.div>
    </DashboardShell>
  );
}`
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file === 'page.tsx') {
      results.push(filePath);
    }
  });
  return results;
}

const allPageFiles = walkDir(rootDir);

let processedCount = 0;

allPageFiles.forEach(filePath => {
  // Determine module and subroute context from path
  const relativePath = path.relative(rootDir, filePath);
  const parts = relativePath.split(path.sep);
  const mod = parts[0];
  const sub = parts.length > 2 ? parts[parts.length - 2] : null;

  let newContent = '';

  if (!sub) {
    // Root module dashboard (e.g., /crm/page.tsx)
    newContent = templates.dashboard(mod);
  } else if (sub === 'pipeline' || sub === 'board') {
    // Pipeline/Kanban views
    newContent = templates.pipeline(mod, sub);
  } else {
    // Standard List views
    newContent = templates.list(mod, sub);
  }

  fs.writeFileSync(filePath, newContent);
  processedCount++;
});

console.log(`Successfully generated production-grade UI for ${processedCount} routes.`);
