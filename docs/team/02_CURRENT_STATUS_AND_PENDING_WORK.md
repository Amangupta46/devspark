# 02. Current Status and Pending Work

## Overview
This document serves as the ground truth for the current state of the DevSpark monorepo. It outlines completed modules, active development, and outstanding technical debt.

## Module Status Table

| Module / Feature | Status | Priority | Estimated Remaining Work |
|---|---|---|---|
| **Authentication Flow (Reg/Login)** | `Implemented` | High | 0 days |
| **User Settings & Preferences** | `Partially Implemented` | Medium | 3 days |
| **CRM (Leads, Companies, Contacts)** | `Partially Implemented` | High | 7 days |
| **Projects (Tasks, Timelogs)** | `Partially Implemented` | High | 10 days |
| **Quotes (Estimates, Catalog)** | `Partially Implemented` | High | 5 days |
| **Finance (Invoices, Payments)** | `Planned` | High | 14 days |
| **Team (Org, Leaves, Roles)** | `Partially Implemented` | Medium | 5 days |
| **Client Portal** | `Partially Implemented` | High | 10 days |
| **Analytics (Dashboards)** | `Planned` | Low | 7 days |
| **Notifications (Push/Email)** | `Partially Implemented` | Medium | 4 days |

## Known Bugs
- No severe blocking bugs currently known in `Implemented` modules.
- *Resolved:* The `404 Not Found` issue during frontend API fetching on Windows was resolved by forcing `NEXT_PUBLIC_API_URL` to `http://127.0.0.1:8000/api/v1`, avoiding Docker/WSL IPv6 conflicts on `localhost`.

## Technical Debt
- **React Query Mutations:** Missing optimistic UI updates in some newer components.
- **Backend Tests:** Pytest coverage is currently non-existent for the newer CRM and Project endpoints.
- **API Documentation:** DRF Spectacular is installed but requires extensive `@extend_schema` annotations to generate an accurate Swagger UI.

## Deployment Blockers
- **Email Delivery:** Celery is configured, but no SMTP backend is connected yet (using console backend locally).
- **Secrets Management:** Need to formalize `.env.prod` secure injection via CI/CD pipelines before an AWS or Railway deployment.

## Testing Status
- **Frontend:** `Implemented` (Basic Next.js scaffolding tests). E2E `Planned`.
- **Backend:** `Partially Implemented` (Test suite structure exists, needs business logic tests).

## Pre-Production Requirements
Exactly what remains before production:
1. Complete the core CRUD operations for CRM, Projects, and Quotes.
2. Wire up the Next.js UI to the backend endpoints for the above modules.
3. Configure a production-grade SMTP server (e.g., Postmark or SendGrid).
4. Achieve at least 80% test coverage on `services.py` backend files.
5. Setup GitHub Actions for automated linting, testing, and Docker builds.
