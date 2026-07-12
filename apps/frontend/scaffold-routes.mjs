import fs from "fs";
import path from "path";

const rootDir = path.join(process.cwd(), "apps", "frontend", "src", "app", "dashboard");

const modules = {
  crm: ["leads", "leads/[id]", "companies", "contacts", "meetings", "pipeline", "reports"],
  projects: ["board", "tasks", "calendar", "timeline", "milestones", "files", "reports"],
  finance: ["invoices", "payments", "expenses", "estimates", "subscriptions", "refunds", "reports"],
  team: ["members", "departments", "worklogs", "calendar", "leaves", "knowledge", "reviews"],
  quotes: ["builder", "calculator", "approvals", "history"],
  client: ["projects", "files", "approvals", "meetings", "messages"],
  notifications: ["center", "templates", "announcements", "preferences"],
  analytics: ["sales", "finance", "projects", "team", "crm", "executive"],
  settings: [
    "profile",
    "organization",
    "members",
    "roles",
    "permissions",
    "billing",
    "integrations",
    "security",
    "audit",
  ],
};

const boilerplate = {
  layout: (
    mod,
  ) => `export default function ${mod.charAt(0).toUpperCase() + mod.slice(1)}Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`,
  loading: () => `export default function Loading() {
  return <div className="p-8 text-neutral-400 animate-pulse">Loading module...</div>;
}`,
  error: () => `"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-error-400">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
  notFound: () => `export default function NotFound() {
  return <div className="p-8 text-neutral-400">Resource not found</div>;
}`,
  page: (name) => `"use client";
import { DashboardShell } from "@/components/dashboard/layout/shell";

export default function ${name.replace(/[^a-zA-Z0-9]/g, "")}Page() {
  // TODO: Add placeholder API hooks here (e.g. useRecords())
  
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-semibold text-neutral-0 capitalize">${name}</h1>
        <p className="text-neutral-400">Enterprise UI structure generated. Waiting for backend API hooks.</p>
      </div>
    </DashboardShell>
  );
}`,
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Create root modules and root boilerplate
Object.entries(modules).forEach(([mod, subRoutes]) => {
  const modPath = path.join(rootDir, mod);
  ensureDirSync(modPath);

  fs.writeFileSync(path.join(modPath, "layout.tsx"), boilerplate.layout(mod));
  fs.writeFileSync(path.join(modPath, "loading.tsx"), boilerplate.loading());
  fs.writeFileSync(path.join(modPath, "error.tsx"), boilerplate.error());
  fs.writeFileSync(path.join(modPath, "not-found.tsx"), boilerplate.notFound());
  fs.writeFileSync(path.join(modPath, "page.tsx"), boilerplate.page(mod));

  // 2. Create sub-routes
  subRoutes.forEach((sub) => {
    const subPath = path.join(modPath, sub);
    ensureDirSync(subPath);
    fs.writeFileSync(path.join(subPath, "page.tsx"), boilerplate.page(sub));
  });
});

console.log(
  "Successfully scaffolded " +
    Object.keys(modules).length +
    " enterprise modules with " +
    Object.values(modules).flat().length +
    " sub-routes.",
);
