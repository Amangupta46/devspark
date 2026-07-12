# DevSpark Enterprise Monorepo

Welcome to **DevSpark**, the premier SaaS platform tailored for development agencies. DevSpark unifies CRM, project management, quoting, finance, and client collaboration into a single, high-performance, and visually stunning web application.

## Overview
DevSpark eliminates the need for fragmented toolchains by providing a single pane of glass for an agency's entire lifecycle. From closing a lead to delivering the final product via the Client Portal, DevSpark handles it all.

## Architecture
- **Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion, React Query.
- **Backend**: Django 5, DRF, PostgreSQL, Celery, Redis.
- **Proxy**: NGINX.

## Core Features
- **Authentication**: JWT-based stateless secure auth.
- **CRM**: Track leads and client organizations.
- **Projects**: Task assignments, timelines, and worklogs.
- **Quotes**: Generate estimates and maintain service catalogs.
- **Finance**: Generate invoices based on billing milestones.
- **Client Portal**: Dedicated interfaces for clients to review and approve work.

## Screenshots
*(Placeholder for UI screenshots)*
`![Dashboard UI](./docs/assets/dashboard_placeholder.png)`

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd devspark
   ```
2. **Environment Variables**
   Ensure `.env.local` files exist in both `apps/frontend/` and `apps/backend/`. (See `docs/deployment/01_SETUP_AND_RUN.md` for details).
3. **Start the Database & Redis**
   ```bash
   docker-compose up -d db redis
   ```

## Run Locally

**Backend (Django):**
```bash
cd apps/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

**Frontend (Next.js):**
```bash
cd apps/frontend
pnpm install
pnpm dev
```

## Build for Production
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## Documentation Links
Comprehensive documentation is available in the `docs/` directory. Start here: [Documentation Index](./docs/index.md)

## Roadmap
See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for current sprint priorities and future vision.

## Contributors
- Lead Developers

## License
Proprietary - Do Not Distribute.
