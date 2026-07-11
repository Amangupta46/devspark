"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";
import { KanbanBoard } from "@/components/dashboard/ui/kanban-board";
import { pageTransition } from "@/motion/variants";
import { motion } from "framer-motion";

const mockColumns = [
  { id: "1", title: "To Do", items: [{ id: "t1", title: "Review requirements", tags: ["High Priority"] }] },
  { id: "2", title: "In Progress", items: [{ id: "t2", title: "Develop UI components", tags: ["Frontend"] }] },
  { id: "3", title: "Done", items: [{ id: "t3", title: "Setup infrastructure", tags: ["DevOps"] }] }
];

export default function BoardPipeline() {
  return (
    <DashboardShell>
      <motion.div 
        variants={pageTransition} initial="initial" animate="animate" exit="exit"
        className="flex flex-col gap-6 p-6 lg:p-10 w-full h-[calc(100vh-64px)] overflow-hidden"
      >
        <div className="flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-semibold font-heading text-neutral-0 capitalize">board Board</h1>
          <button className="h-9 px-4 rounded-md bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-500/20">Add Task</button>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
           <KanbanBoard columns={mockColumns} />
        </div>
      </motion.div>
    </DashboardShell>
  );
}