# Consistency Audit Review — DevSpark Specifications

This document outlines the findings of a cross-document consistency audit performed on the following system specifications:
1. `PROJECT.md`
2. `DESIGN_SYSTEM.md`
3. `ARCHITECTURE.md`
4. `MOTION_SYSTEM.md`
5. `TASKS.md`
6. `SPRINTS.md`

---

## 1. Issues Found

### Issue 1.1: Missing UI Primitives in Sprints Schedule
*   **Description:** While the UI primitive components (Button `M2-005`, Input/Textarea `M2-006`, Checkbox/Radio/Switch `M2-007`, Select/Dropdown `M2-008`, Badge/Chip `M2-010`, and Dialog/Drawer `M2-012`) are defined in `TASKS.md`, they are completely omitted from the "Tasks Included" arrays in `SPRINTS.md`. 
*   **Impact:** Developers reaching Sprint 4 (Navigation) and Sprint 5 (Hero Section) will attempt to import buttons and inputs that have not been scheduled to be built.
*   **Severity:** **CRITICAL**

### Issue 1.2: React 19 vs. React Three Fiber (R3F) Compatibility
*   **Description:** The relocated `apps/frontend/package.json` specifies Next.js `16.2.9` and React `19.2.4`. However, R3F (`@react-three/fiber` and `@react-three/drei`) does not natively support React 19 peer dependencies in stable versions without overrides.
*   **Impact:** Package installation via `pnpm` will fail due to peer dependency mismatches unless peer-dependency checks are bypassed, or version downgrades are implemented.
*   **Severity:** **HIGH**

### Issue 1.3: Tailwind CSS v4 vs. tailwind.config.ts Strategy
*   **Description:** The current `apps/frontend/package.json` imports Tailwind CSS v4.0.0. However, `DESIGN_SYSTEM.md` and `ARCHITECTURE.md` rely heavily on configuring a traditional `tailwind.config.ts` file. Tailwind v4 does not use a config file by default, preferring CSS `@theme` variables inside the global CSS entry point.
*   **Impact:** Building a traditional `tailwind.config.ts` will have no effect unless Tailwind is configured with the legacy compatibility PostCSS plugin.
*   **Severity:** **HIGH**

### Issue 1.4: Missing Core Package Installation Tasks
*   **Description:** `TASKS.md` lists implementation tasks for components utilizing third-party libraries (e.g., `framer-motion` in `M2-004`, `lenis` in `M3-004`, and `three` in `M3-005`) but does not contain a dedicated task to install these packages in the frontend workspace.
*   **Impact:** Devs will run into compilation errors from missing package imports.
*   **Severity:** **MEDIUM**

### Issue 1.5: PostgreSQL Host Port Allocation Conflict
*   **Description:** `docker-compose.yml` defaults PostgreSQL to host port 5432. However, local environments frequently run system-level PostgreSQL services on port 5432, preventing the container from binding.
*   **Impact:** Port allocation collision during container boot.
*   **Severity:** **MEDIUM** (Already resolved in code via port 5433 mapping, but needs documentation alignment).

---

## 2. Recommendations

### Recommendation 2.1: Re-Schedule Primitives in Sprint 2
*   Include all baseline UI primitive tasks (`M2-005` through `M2-008`, `M2-010`, `M2-012`) in the scope of **Sprint 2: Core Design System**. This ensures all basic blocks exist before building layouts and page sections.
*   Update the `SPRINTS.md` Sprint 2 definition to:
    ```markdown
    Tasks Included: M2-001, M2-002, M2-003, M2-004, M2-005, M2-006, M2-007, M2-008, M2-010, M2-012
    ```

### Recommendation 2.2: Add Next.js 15 & React 18 Downgrade or pnpm Overrides
*   To ensure stable, production-grade integration with React Three Fiber, Drei, and standard shadcn/ui components, either:
    1.  Downgrade `apps/frontend/package.json` to Next.js `15.x` and React `18.x`, or
    2.  Add `pnpm.peerDependencyRules` or `pnpm.overrides` to the root `package.json` to force resolution of React 19 peer dependencies:
        ```json
        "pnpm": {
          "overrides": {
            "react": "19.2.4",
            "react-dom": "19.2.4"
          }
        }
        ```
*   *Preferred Choice:* Downgrade to Next.js 15 + React 18 for full stable WebGL compatibility.

### Recommendation 2.3: Adopt Tailwind CSS v4 CSS-First Configuration
*   Instead of creating `tailwind.config.ts`, align the CSS mappings with Tailwind v4 standards. Define theme variables directly inside `apps/frontend/src/styles/globals.css` under the `@theme` directive, keeping design tokens aligned.

### Recommendation 2.4: Create Task M2-000 for Library Installation
*   Add a setup task `M2-000` to install all design, component, and animation libraries:
    ```bash
    pnpm --filter frontend add framer-motion @studio-freight/lenis lucide-react clsx tailwind-merge class-variance-authority three @react-three/fiber @react-three/drei
    ```

### Recommendation 2.5: Document Port 5433 Mapping
*   Update the backend configuration guides to note that the local database runs on port 5433, with host connections configured via `apps/backend/.env`.

---

## 3. Final Approval Checklist

Before declaring the specifications fully frozen for execution, ensure the following checklist is completed:

- [ ] UI primitives (`M2-005`, `M2-006`, etc.) are assigned to Sprint 2 in `SPRINTS.md`.
- [ ] React 19 vs R3F compatibility resolution path is locked (Downgrade vs Overrides).
- [ ] Tailwind CSS v4 design token migration pattern is selected.
- [ ] Base library installation task is added to `TASKS.md`.
- [ ] Default PostgreSQL host port is updated to 5433 across all documentation configs.
