# DevSpark — Architecture Specification

> The architectural blueprint for DevSpark.
> This document defines the engineering standards, infrastructure, and structural patterns required to build, deploy, and scale the DevSpark platform to millions of users.
> It serves as the single source of truth for the engineering team.

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Monorepo Strategy](#2-monorepo-strategy)
3. [Folder Structure](#3-folder-structure)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [API Architecture](#6-api-architecture)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Database Design](#8-database-design)
9. [State Management](#9-state-management)
10. [Caching Strategy](#10-caching-strategy)
11. [Image & Media Strategy](#11-image--media-strategy)
12. [SEO Strategy](#12-seo-strategy)
13. [Security](#13-security)
14. [Environment Variables](#14-environment-variables)
15. [Naming & Code Conventions](#15-naming--code-conventions)
16. [Shared Resources](#16-shared-resources)
17. [Error Handling](#17-error-handling)
18. [Testing Strategy](#18-testing-strategy)
19. [Git Workflow & Branch Strategy](#19-git-workflow--branch-strategy)
20. [CI/CD Pipeline](#20-cicd-pipeline)
21. [Deployment & Infrastructure](#21-deployment--infrastructure)
22. [Logging & Monitoring](#22-logging--monitoring)
23. [Performance Budgets](#23-performance-budgets)
24. [Scalability](#24-scalability)
25. [Future Microservice Strategy](#25-future-microservice-strategy)

---

## 1. System Architecture Overview

The DevSpark platform utilizes a decoupled, API-first architecture designed for high availability, low latency, and massive scale. 

**Core Components:**
*   **CDN & Edge Security:** Cloudflare
*   **Frontend:** Next.js 15 (React, TypeScript) hosted on Vercel or containerized on AWS ECS/EKS
*   **Backend:** Django & Django REST Framework (Python) containerized via Docker on AWS
*   **Primary Database:** PostgreSQL (AWS RDS/Aurora)
*   **Cache & Message Broker:** Redis (AWS ElastiCache)
*   **Asynchronous Workers:** Celery
*   **Object Storage:** AWS S3 (Documents, Backups) + Cloudinary (Images/Video)

**Data Flow:**
1. User requests hit Cloudflare (Edge Cache & WAF).
2. Static assets and cached RSC (React Server Components) payloads are served directly from the CDN.
3. Dynamic requests reach the Next.js frontend.
4. Next.js server components securely fetch data from the Django API via internal networking.
5. Django validates auth via JWT, queries PostgreSQL or Redis, and returns JSON.
6. Heavy background tasks (emails, report generation) are queued via Redis and executed by Celery workers.

---

## 2. Monorepo Strategy

We will use a Monorepo approach managed by **Turborepo** or **pnpm workspaces** (if Node-only tooling is preferred, though Python exists alongside). The repository will contain the frontend, backend, and infrastructure code to ensure synchronized deployments and single-PR feature completeness.

```text
devspark/
├── apps/
│   ├── frontend/        # Next.js App
│   └── backend/         # Django App
├── packages/            # Shared logic (if applicable in future, e.g., shared TS types from OpenAPI)
│   ├── eslint-config/
│   └── ts-config/
├── infrastructure/      # Terraform / CloudFormation scripts
├── .github/             # GitHub Actions workflows
└── docker-compose.yml   # Local development orchestration
```

*Rule:* Frontend and Backend run independently. The Monorepo is for developer velocity and version synchronization, not tight code coupling.

---

## 3. Folder Structure

### 3.1 Frontend (Next.js)

We utilize a **Feature-Based Structure** inside the Next.js `app` router. This prevents the "file hunt" problem in large codebases.

```text
apps/frontend/
├── src/
│   ├── app/                    # Next.js App Router (Routing only)
│   │   ├── (marketing)/        # Route group for website
│   │   ├── (dashboard)/        # Route group for SaaS app
│   │   ├── api/                # Next.js Route Handlers (BFF pattern)
│   │   └── layout.tsx
│   ├── features/               # Feature-based modules (The core of the app)
│   │   ├── auth/               # e.g., Authentication feature
│   │   │   ├── components/     # UI components specific to Auth
│   │   │   ├── actions/        # Server Actions
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── types.ts        # TypeScript interfaces
│   │   │   └── api.ts          # API fetch wrappers
│   │   ├── projects/
│   │   └── invoices/
│   ├── components/             # Global/Shared UI (shadcn/ui, design system)
│   │   ├── ui/                 # Primitives (buttons, inputs)
│   │   ├── shared/             # Complex shared components (cards, nav)
│   │   └── three/              # R3F WebGL components
│   ├── lib/                    # Core utilities (fetch client, formatting)
│   ├── stores/                 # Global state (Zustand)
│   ├── styles/                 # Global CSS, Tailwind config
│   └── types/                  # Global TypeScript types
```

### 3.2 Backend (Django)

We utilize standard Django apps, but strictly enforce decoupling between apps.

```text
apps/backend/
├── core/                       # Core Django project settings
│   ├── settings/               # Split settings (base, local, prod)
│   ├── urls.py
│   └── wsgi.py / asgi.py
├── apps/                       # Feature modules (Django Apps)
│   ├── users/                  # Custom user model, auth, profiles
│   ├── projects/               # Projects, tasks, milestones
│   ├── billing/                # Invoices, payments, subscriptions
│   └── communications/         # Chat, support tickets
├── common/                     # Shared utilities across apps
│   ├── exceptions.py           # Standardized API exceptions
│   ├── pagination.py           # Custom DRF pagination
│   └── models.py               # Abstract base models (e.g., TimeStampedModel)
├── requirements/               # Split requirements (base.txt, prod.txt)
├── Dockerfile
└── manage.py
```

---

## 4. Frontend Architecture

### 4.1 Next.js App Router Strategy

*   **Route Groups:** Use `(folder_name)` to separate layout logic without affecting the URL path. Separate `(marketing)` from `(dashboard)` and `(auth)`.
*   **Parallel Routing & Interception:** Use `@folder` and `(..)` for complex dashboard layouts and modals (e.g., viewing a task detail in a modal without losing board context).
*   **Loading UI:** Enforce `loading.tsx` at every major route segment using the Skeleton loaders defined in the Design System.
*   **Error Handling:** Use `error.tsx` and `global-error.tsx` to catch boundaries.

### 4.2 Server Components Strategy (RSC)

**Default to Server Components.**
*   *Why:* Zero bundle size impact, direct backend API access, improved SEO, secure credential handling.
*   *When to use:* Data fetching, layout structuring, SEO metadata generation, static marketing pages, read-only dashboard views.
*   *Data Fetching:* Fetch data directly in the Server Component using `fetch()` with appropriate `next.revalidate` tags. Do not use `useEffect` for initial data load.

### 4.3 Client Components Strategy

**Use the `"use client"` directive sparingly and push it down the tree.**
*   *Why:* Minimizes JavaScript sent to the browser, improving TTI (Time to Interactive).
*   *When to use:* Interactivity (onClick, onChange), state hooks (useState, useReducer), browser APIs (window, localStorage), Framer Motion animations, React Three Fiber canvases.
*   *Pattern:* If a Server Component needs a client-side button, extract *only* the button to a Client Component and pass server-fetched data as props.

---

## 5. Backend Architecture

### 5.1 Django & DRF

*   **Django as an API:** Django is used exclusively as a JSON API via Django REST Framework. No Django templates.
*   **Fat Models, Thin Views:** Business logic belongs in models or dedicated service classes, not in views/viewsets.
*   **Service Layer Pattern:** For complex business logic (e.g., "Create Project & Notify Team & Generate Invoice"), abstract logic into a `services.py` file within the app to keep views clean and testable.
*   **Serializers:** Use serializers strictly for input validation and output formatting.

### 5.2 Asynchronous Tasks (Celery + Redis)

*   **Never block the request cycle.** Any operation taking > 300ms must be offloaded to Celery.
*   *Use cases:* Sending emails, generating PDF invoices, processing webhooks, heavy analytics aggregation, image optimization (if not using Cloudinary).
*   *Broker:* Redis.

---

## 6. API Architecture

### 6.1 RESTful Principles

*   **Resource-Oriented:** Endpoints represent resources (`/api/v1/projects/`), not actions (`/api/v1/get_projects/`).
*   **Nesting:** Max 1 level of nesting (`/api/v1/projects/{id}/tasks/`). Beyond that, use query parameters on the root resource (`/api/v1/tasks/?project={id}`).
*   **HTTP Verbs:** Strict adherence to GET, POST, PUT, PATCH, DELETE.

### 6.2 Standardized Responses

All API responses must follow a consistent envelope (especially for errors):

**Success (Collection):**
```json
{
  "count": 142,
  "next": "https://api.devspark.com/v1/projects/?page=3",
  "previous": "https://api.devspark.com/v1/projects/?page=1",
  "results": [ { ... } ]
}
```

**Error:**
```json
{
  "error": {
    "code": "validation_failed",
    "message": "Invalid input data.",
    "details": {
      "email": ["This field is required."]
    }
  }
}
```

### 6.3 API Versioning

*   **URL Versioning:** Required from Day 1. Example: `/api/v1/...`
*   No breaking changes are allowed within a major version. Additive changes only.

### 6.4 Pagination & Filtering

*   **Pagination:** Cursor-based pagination for high-velocity feeds (activity feed), Limit-Offset pagination for standard data tables.
*   **Filtering:** Use `django-filter` for standardized query parameter filtering (`?status=active&sort=-created_at`).

---

## 7. Authentication & Authorization

### 7.1 Authentication (AuthN)

*   **JWT (JSON Web Tokens):** Used for stateless authentication.
*   **Token Lifecycle:**
    *   Access Token: Short-lived (15 minutes).
    *   Refresh Token: Long-lived (7 days), stored securely.
*   **Storage:** 
    *   Frontend: Access tokens in memory (or secure `HttpOnly` cookie for BFF pattern). Refresh tokens *must* be in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Never store tokens in `localStorage` to prevent XSS exfiltration.
*   **Next.js Auth:** Utilize NextAuth.js (Auth.js) with a custom credentials provider connecting to the Django API, or handle manual cookie management via Next.js Route Handlers.

### 7.2 Authorization (AuthZ)

*   **Role-Based Access Control (RBAC):** Users are assigned Roles (Admin, Team Lead, Employee, Client, Guest).
*   **Backend Enforced:** DRF Permissions classes (`IsAdminUser`, `IsProjectOwner`, `HasRole`). Never trust the frontend for authorization.
*   **Frontend Gating:** Use standard hooks/HOCs or layout checks to hide UI elements the user cannot access, preventing 403 errors.

---

## 8. Database Design

### 8.1 PostgreSQL Setup

*   **Managed Service:** AWS RDS or Aurora Serverless for auto-scaling and high availability.
*   **Connection Pooling:** Use PgBouncer to manage database connections from horizontally scaled Django instances.

### 8.2 Schema Principles

*   **UUIDs:** Use UUIDv4 for all primary keys. Integers leak scale and business intelligence (e.g., user #10 implies a new startup).
*   **Soft Deletes:** Implement an `is_deleted` boolean or `deleted_at` timestamp for critical models (Projects, Invoices, Users). Do not physically `DELETE` rows.
*   **Audit Trails:** Use `created_at` and `updated_at` on *every* table via an abstract `TimeStampedModel`.
*   **Indexes:** Add indexes to foreign keys, frequently filtered columns (status), and columns used for sorting (`created_at`).

---

## 9. State Management

### 9.1 The Triad of State

1.  **Server State (React Server Components / Fetch):** The source of truth. Use Next.js native `fetch` caching and Server Components for most data.
2.  **Client Server-Cache (React Query / SWR):** If data must be fetched on the client (e.g., polling, infinite scroll, optimistic updates), use React Query. Do not use `useEffect` for data fetching.
3.  **Client UI State (Zustand):** For global UI state (sidebar open/closed, current theme, active modal). Avoid Redux; it is too heavy. Use Zustand for a lightweight, hook-based store.
4.  **Local State (useState):** Component-specific state (form inputs, toggle states).

---

## 10. Caching Strategy

### 10.1 Frontend Caching (Next.js)

*   **Route Cache:** Static marketing pages are generated at build time (SSG) and cached at the CDN edge.
*   **Data Cache:** Use `fetch('...', { next: { revalidate: 3600 } })` for content that changes rarely (Blog posts, Services).
*   **On-Demand Revalidation:** Trigger `revalidatePath` or `revalidateTag` via Server Actions or Webhooks when backend data changes.

### 10.2 Backend Caching (Redis)

*   **Query Caching:** Cache expensive database queries (e.g., dashboard statistics, complex aggregations) in Redis.
*   **Rate Limiting Data:** Store rate limit counters in Redis.

### 10.3 CDN Caching (Cloudflare)

*   Cache all static assets (`/_next/static/*`, images, fonts) with infinite TTL at the edge.

---

## 11. Image & Media Strategy

*   **Delivery:** Cloudinary for all user-uploaded images and dynamic transformations (resizing, WebP/AVIF conversion, cropping on the fly).
*   **Storage:** AWS S3 as the permanent source of truth for assets.
*   **Frontend Implementation:** Next.js `<Image />` component exclusively. 
    *   Must define `width` and `height`.
    *   Must use `placeholder="blur"` for hero images.
    *   Set `priority={true}` for LCP (Largest Contentful Paint) images above the fold.

---

## 12. SEO Strategy

*   **Metadata API:** Use Next.js 15 `generateMetadata` for dynamic titles, descriptions, and OpenGraph tags per page.
*   **Sitemap & Robots:** Generate dynamic `sitemap.xml` and `robots.txt` via Next.js route handlers.
*   **Structured Data:** Inject JSON-LD schemas into the `<head>` for Articles, LocalBusiness, Breadcrumbs, and FAQs.
*   **Canonical URLs:** Explicitly define canonical URLs to prevent duplicate content issues.

---

## 13. Security

*   **HTTPS Only:** HSTS enforced.
*   **WAF (Web Application Firewall):** Cloudflare configured to block SQLi, XSS, and known botnets.
*   **CORS (Cross-Origin Resource Sharing):** Django configured to only accept API requests from the exact Next.js production domains.
*   **CSRF (Cross-Site Request Forgery):** If using cookies for auth, strict CSRF protection must be implemented.
*   **XSS Protection:** React natively escapes variables. Use Content Security Policy (CSP) headers to restrict inline scripts and unauthorized domains.
*   **Rate Limiting:** Enforce via Cloudflare (global) and Django (per-endpoint/user via DRF throttle classes). Example: Login endpoint limited to 5 attempts/minute.

---

## 14. Environment Variables

*   **Validation:** Use `zod` on the frontend (e.g., `t3-env`) to parse and validate environment variables at build/start time. If a variable is missing, the app should crash immediately, not fail silently in production.
*   **Prefixing:** `NEXT_PUBLIC_` for variables safe to expose to the browser.
*   **Backend Validation:** Use `django-environ` to cast and validate `.env` values in Django settings.

---

## 15. Naming & Code Conventions

### 15.1 Frontend (React/TS)

*   **Files:** `kebab-case.tsx` (e.g., `glass-card.tsx`).
*   **Components:** `PascalCase` (e.g., `GlassCard`).
*   **Hooks:** `camelCase` starting with `use` (e.g., `useScrollPosition`).
*   **Types/Interfaces:** `PascalCase` (e.g., `ProjectStatus`, `User`). Do not prefix with `I` or `T`.
*   **Props:** Component props named `[ComponentName]Props` (e.g., `GlassCardProps`).

### 15.2 Backend (Django/Python)

*   **PEP 8:** Strict adherence via `black` and `flake8`.
*   **Classes/Models:** `PascalCase` (e.g., `Project`, `InvoiceCreateView`).
*   **Functions/Variables:** `snake_case` (e.g., `calculate_total`, `active_users`).
*   **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_LOGIN_ATTEMPTS`).

---

## 16. Shared Resources

### 16.1 Reusable Libraries

*   `date-fns`: Date manipulation.
*   `zod`: Schema validation (frontend forms and API responses).
*   `clsx` + `tailwind-merge`: Dynamic class string construction.
*   `lucide-react`: Iconography.

### 16.2 Shared Hooks

*   `useMediaQuery`: Responsive JS checks.
*   `useLocalStorage`: Typed local storage syncing.
*   `useDebounce`: For search inputs and fast-firing events.
*   `useIntersectionObserver`: For scroll animations.

---

## 17. Error Handling

### 17.1 Frontend

*   **Global Error Boundaries:** `error.tsx` at route segment levels to prevent the whole app from crashing.
*   **API Error Interceptors:** A wrapper around `fetch` or Axios/React Query that globally handles 401s (trigger token refresh or redirect to login) and formats 400s into user-friendly messages.
*   **Toast Notifications:** UI feedback for localized errors (e.g., "Failed to save project").

### 17.2 Backend

*   **Custom Exception Handler:** Override DRF's default exception handler to return the standardized error envelope (defined in §6.2).
*   **500 Errors:** Never expose stack traces in API responses. Log the trace and return a generic "Internal Server Error" with a tracking ID.

---

## 18. Testing Strategy

*   **Unit Tests:** 
    *   Frontend: Vitest + React Testing Library (focus on complex utilities and hooks).
    *   Backend: Pytest + pytest-django (focus on models, services, serializers). Minimum 80% coverage for business logic.
*   **Integration Tests:** API endpoint testing in Django (DRF APITestCase).
*   **E2E Tests:** Playwright. Test critical user journeys (Registration, Quote Submission, Invoice Payment).
*   **Visual Regression:** Percy or Chromatic for storybook components (ensure Design System remains pixel-perfect).

---

## 19. Git Workflow & Branch Strategy

**GitHub Flow (Modified):**
*   `main` — Production branch. Deploys to production automatically. Must be protected.
*   `staging` — Pre-production environment.
*   `feat/ticket-id-description` — Feature branches branching from `main`.
*   `fix/ticket-id-description` — Bug fixes.

**Commit Convention:**
Strict adherence to Conventional Commits (e.g., `feat: add kanban board drag and drop`, `fix: resolve auth token expiration bug`). Enforced via Husky and commitlint.

---

## 20. CI/CD Pipeline

**GitHub Actions:**
*   **On Pull Request:**
    *   Linting (ESLint, Black).
    *   Type Checking (TypeScript `tsc --noEmit`, Mypy).
    *   Unit & Integration Tests.
    *   Build verification (ensure Next.js builds successfully).
*   **On Merge to `main`:**
    *   Build Docker images.
    *   Push to Container Registry (ECR).
    *   Deploy to production infrastructure.
    *   Run database migrations (`python manage.py migrate`).

---

## 21. Deployment & Infrastructure

**Architecture:**
*   **Frontend:** Vercel (preferred for Next.js features) OR AWS ECS Fargate + CloudFront.
*   **Backend:** AWS ECS (Fargate) for serverless container execution.
*   **Workers:** AWS ECS (Fargate) running Celery workers.
*   **Database:** AWS RDS PostgreSQL Multi-AZ.
*   **Cache:** AWS ElastiCache (Redis).
*   **Storage:** AWS S3.

**Infrastructure as Code (IaC):**
Use Terraform to define all AWS resources. No manual clicking in the AWS console.

---

## 22. Logging & Monitoring

*   **Application Errors:** Sentry. Both frontend (React) and backend (Django) configured. Captures stack traces, user context, and breadcrumbs.
*   **Performance Monitoring:** Datadog or New Relic for APM (Application Performance Monitoring) to track slow SQL queries and API latencies.
*   **Log Aggregation:** Route Django logs to AWS CloudWatch or Datadog.
*   **Web Vitals:** Vercel Analytics or custom reporting to monitor real-user metrics (LCP, INP, CLS).

---

## 23. Performance Budgets

Enforced in CI/CD via Lighthouse CI and Bundle Analyzer:
*   **Largest Contentful Paint (LCP):** < 2.5s on mobile 3G.
*   **Interaction to Next Paint (INP):** < 200ms.
*   **Cumulative Layout Shift (CLS):** < 0.1.
*   **Initial JS Payload:** < 150kb (gzipped) for marketing pages.
*   **API Response Time:** 95th percentile < 200ms for read operations.

---

## 24. Scalability

Designed to support millions of users:
1.  **Stateless Compute:** Django and Next.js nodes share no state. They can scale horizontally infinitely via auto-scaling groups based on CPU/Memory utilization.
2.  **Database Read Replicas:** When read traffic spikes, implement PostgreSQL read replicas. Django routes read queries to replicas and writes to the primary.
3.  **Asynchronous Heavy Lifting:** CPU-bound tasks (exports, heavy data processing) are never executed in the web cycle. Celery workers scale independently based on queue length in Redis.
4.  **CDN Edge Serving:** 90% of static marketing traffic never reaches our servers, absorbed entirely by Cloudflare.

---

## 25. Future Microservice Strategy

We begin as a **Modular Monolith**. 

Do NOT start with microservices. The overhead of network boundaries, distributed transactions, and deployment complexity will kill developer velocity.

**The Evolution Plan:**
1.  **Phase 1 (Current):** Strict folder separation inside Django and Next.js. Avoid cross-domain database joins (e.g., don't join `Billing` tables directly with `Chat` tables).
2.  **Phase 2 (Scale):** When a specific domain requires independent scaling (e.g., the AI generation features require heavy GPU resources, or Chat requires WebSockets), extract *only* that domain into a separate service.
3.  **Phase 3 (Enterprise):** Introduce an API Gateway (Kong or AWS API Gateway) to route requests between the core monolith and the new microservices. 

> **Last Updated:** June 28, 2026
> **Document Owner:** DevSpark Architecture Team
> **Review Cadence:** Quarterly or upon major framework updates
