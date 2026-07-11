import { useQuery } from '@tanstack/react-query';
"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";
import { AdvancedTable } from "@/components/enterprise/tables/advanced-table";
import { FilterPanel } from "@/components/enterprise/filters/filter-panel";
import { pageTransition } from "@/motion/variants";
import { motion } from "framer-motion";

const columns = [
  { id: "name", header: "Name", sortable: true },
  { id: "status", header: "Status", sortable: true, accessor: (row: Record<string, unknown>) => (
    <span className="inline-flex items-center rounded-full bg-surface-raised px-2 py-0.5 text-xs font-medium text-neutral-300">
      {row.status}
    </span>
  )},
  { id: "date", header: "Date", sortable: true },
];

export default function CalculatorList() {
  return (
    <DashboardShell>
      <motion.div 
        variants={pageTransition} initial="initial" animate="animate" exit="exit"
        className="flex flex-col gap-6 p-6 lg:p-10 w-full"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold font-heading text-neutral-0 capitalize">calculator</h1>
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

        const { data, isLoading } = useQuery({ queryKey: ['quotes'], queryFn: async () => [] });

        <AdvancedTable data={data || []} isLoading={isLoading} columns={columns} title="All Records" />
      </motion.div>
    </DashboardShell>
  );
}