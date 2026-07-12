# Codebase Map

This document explains every important folder and file across the DevSpark monorepo.

## Root Directory
```text
devspark/
├── apps/                 # Contains the primary applications (Frontend/Backend)
├── docs/                 # Enterprise documentation suite
├── nginx/                # Dockerized NGINX reverse proxy configs
├── scripts/              # Utility scripts for CI/CD or local automation
├── .env.example          # Template for root environment variables
├── docker-compose.yml    # Local development container orchestration
├── docker-compose.prod.yml # Production container orchestration
├── package.json          # Turborepo / pnpm workspace configuration
└── turbo.json            # Monorepo build pipeline configuration
```

## Frontend Application (`apps/frontend/`)
Built with Next.js (App Router).

```text
frontend/
├── src/
│   ├── app/              # Next.js App Router (Pages & Layouts)
│   │   ├── (dashboard)/  # Authenticated routes (CRM, Projects, etc.)
│   │   ├── login/        # Public login page
│   │   └── register/     # Public registration page
│   ├── components/
│   │   ├── ui/           # Generic Radix UI / Tailwind primitives
│   │   └── features/     # Domain-specific components
│   ├── hooks/            # Custom React hooks (React Query wrappers)
│   ├── lib/              # Utility functions
│   │   └── api/          # Axios instance and interceptors (interceptors.ts)
│   └── store/            # Zustand global state (if any)
├── public/               # Static assets (images, icons)
├── .env.local            # Local Next.js environment variables (NEXT_PUBLIC_API_URL)
├── next.config.ts        # Next.js build and security headers configuration
└── tailwind.config.ts    # Tailwind CSS theme configuration
```

## Backend Application (`apps/backend/`)
Built with Django 5 and DRF.

```text
backend/
├── config/               # Django project-level settings
│   ├── settings/         # Split settings (base.py, local.py, production.py)
│   ├── urls.py           # Master URL router
│   └── wsgi.py / asgi.py # Deployment entrypoints
├── features/             # Domain-driven backend modules
│   ├── users/            # Auth, Profiles, JWT management
│   ├── crm/              # Leads, Companies, Contacts
│   ├── projects/         # Tasks, Timelogs
│   ├── quotes/           # Estimates, Service Catalog
│   ├── finance/          # Invoices, Payments
│   ├── team/             # Internal Org mapping
│   ├── client_portal/    # Read-only external APIs
│   └── notifications/    # Push/Email dispatch engine
├── .env.local            # Local Django environment variables (DB, Redis)
├── manage.py             # Django CLI
└── requirements.txt      # Python dependencies
```

### Typical Feature Module Structure
Inside `features/users/` (or any other module):
- `models.py`: Database schema.
- `services.py`: Business logic and database writes.
- `selectors.py`: Complex database reads.
- `serializers.py`: Data validation and JSON shape definition.
- `views.py`: HTTP request handling.
- `urls.py`: API route definitions.
