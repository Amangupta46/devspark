# 01. Frontend Documentation

## Overview
The DevSpark frontend is built with Next.js 16 and React 19. It focuses on providing a highly interactive, responsive, and visually premium interface using Tailwind CSS and Framer Motion.

## Feature Modules Status

*Status Definitions:*
- **Implemented:** Code is present, functioning, and actively used.
- **Partially Implemented:** Scaffolding exists, but business logic or UI is incomplete.
- **Planned:** Documented architectural intent, but no code exists.
- **Not Implemented:** Not started.

| Module | Purpose | Current Status | Backend Support |
|---|---|---|---|
| **Authentication** | Registration, Login, and secure session management. | **Implemented** | JWT / users app |
| **CRM** | Manage incoming leads, companies, and contacts. | **Partially Implemented** | CRM models/endpoints |
| **Projects** | Track deliverables, tasks, and project timelines. | **Partially Implemented** | Project models/endpoints |
| **Quotes** | Create and send estimates/proposals to clients. | **Partially Implemented** | Quotes models/endpoints |
| **Finance** | Invoicing and payment integrations. | **Planned** | Finance models/endpoints |
| **Team** | Internal directory, leaves, and time tracking. | **Partially Implemented** | Team models/endpoints |
| **Analytics** | Dashboard charts and reporting. | **Planned** | None |
| **Notifications** | Push, email, and in-app alerts. | **Partially Implemented** | Notifications app |
| **Settings** | User preferences and app configurations. | **Partially Implemented** | UserSettings model |
| **Client Portal** | External viewing for clients to approve quotes/invoices. | **Partially Implemented** | client_portal endpoints |
| **Admin** | Django auto-generated admin panel. | **Implemented** | Django Admin |

## State Management
We use **React Query (TanStack Query v5)** for server state. 

### Core Concepts
1. **Query Keys:** Arrays identifying the data (e.g., `['projects', projectId]`).
2. **Mutations:** Used for POST/PUT/DELETE requests.
3. **Invalidation:** Automatically re-fetching lists when a mutation succeeds (e.g., `queryClient.invalidateQueries({ queryKey: ['projects'] })`).

## Components
All generic, reusable components are stored in `src/components/ui/` (using Radix UI primitives). 
Feature-specific components belong in `src/components/features/`.

## Styling Conventions
- Always use utility classes (`className="flex flex-col gap-4"`).
- Use `clsx` and `tailwind-merge` (often wrapped in a `cn()` utility) to dynamically join classes without conflicts.
- Colors should reference CSS variables (e.g., `bg-primary`, `text-muted-foreground`) to support Dark Mode natively.
