# 01. Team Handoff Guide

## Welcome to DevSpark!
This document is designed to get any new teammate up to speed within 1–2 hours. Read this top-to-bottom.

**CRITICAL RULE FOR ALL MAINTAINERS:** Every statement in this documentation suite has been verified from the actual repository. Do NOT infer. Do NOT hallucinate. If a feature is incomplete, explicitly mark it as `Planned`, `Partially Implemented`, `Implemented`, or `Not Implemented`. Never mark unfinished work as complete.

## Project Purpose
DevSpark is a premium, unified SaaS platform for development agencies to manage their entire lifecycle: from CRM and quoting to project execution, time tracking, and client portal delivery.

## Architecture Highlights
- **Frontend Architecture:** Next.js 16 (App Router), React 19, Tailwind CSS, Framer Motion, and React Query. Highly interactive, premium UI.
- **Backend Architecture:** Django 5, DRF, PostgreSQL, Celery, and Redis. Features are strictly isolated in `apps/backend/features/*` enforcing a Service/Selector pattern to keep Views and Models thin.
- **Authentication:** JWT-based (`rest_framework_simplejwt`). Tokens are intercepted and injected via Axios.

## Core Folder Structure
```text
devspark/
├── apps/
│   ├── backend/ (Django 5 API)
│   └── frontend/ (Next.js 16 UI)
├── docs/ (You are here)
└── nginx/ (Reverse Proxy configuration)
```
*For an exhaustive map, see `CODEBASE_MAP.md`.*

## Environment Setup
1. Copy `.env.example` to `.env.local` in both `apps/frontend` and `apps/backend`.
2. Ensure `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1` to prevent IPv6 routing bugs on Windows.
3. Start Postgres and Redis via Docker Compose.
4. Run `pnpm install` and `pnpm dev` for frontend.
5. Run `python manage.py runserver` for backend.

## API Flow
Every request follows this strict path:
Next.js UI → React Query → Axios (Interceptor adds JWT) → NGINX Reverse Proxy → DRF View → Serializer → Service Layer (Business Logic & DB Writes) / Selector Layer (DB Reads) → PostgreSQL Database.

## Current Bugs & Pending Work
- **Known Bugs:** Localhost resolution on Windows hitting IPv6 `[::1]:8000` causing 404s (Patched via explicit `127.0.0.1` routing).
- **Pending Work:** Most modules (CRM, Projects, Quotes) are currently `Partially Implemented` (DB schema and URLs exist, but frontend logic and backend services are incomplete). Finance and Analytics are `Planned`.
- *For a complete list, see `02_CURRENT_STATUS_AND_PENDING_WORK.md`.*

## Future Roadmap
- Complete the core CRM and Quote-to-Cash workflow.
- Implement comprehensive E2E testing (Playwright).
- Deploy to a highly available AWS / Railway cluster.

## Coding Conventions
1. **Frontend:** Use `clsx` and `tailwind-merge` for dynamic classes. Do not use `useEffect` for data fetching; use React Query.
2. **Backend:** Do not put business logic in Views or Models. Use `services.py`. All DB reads must go through `selectors.py`.

## Deployment Steps
Handled via `docker-compose.prod.yml`. Requires setting production secrets and migrating the Postgres database. (See `DEPLOYMENT_GUIDE.md`).

## Important Files
- `apps/frontend/src/lib/api/interceptors.ts` (JWT handling)
- `apps/backend/config/urls.py` (Master API routing)
- `apps/frontend/next.config.ts` (Security Headers)

## Contact (Placeholder)
- **Lead Architect:** [Name] ([Email])
- **Product Manager:** [Name] ([Email])
