# DevSpark Project Roadmap

## 🟢 Completed
- [x] Initial Monorepo Setup (Next.js + Django).
- [x] Dockerization of Postgres, Redis, and NGINX.
- [x] Core Authentication Models and simpleJWT integration.
- [x] Frontend routing scaffolding with App Router.
- [x] Local environment API networking fix (IPv4 explicit routing).

## 🟡 Current Sprint
- [ ] Stabilize the CRM module (Endpoints for Leads and Companies).
- [ ] Connect Next.js CRM views to the backend via React Query.
- [ ] Flesh out Project and Task serializers.

## 🔵 Next Sprint
- [ ] Quotes and Estimates generation.
- [ ] PDF generation for Quotes via Celery.
- [ ] Client Portal read-only views for active projects.

## 🟣 Future Vision
- [ ] Complete Finance Module (Invoicing and Stripe/Payment Gateway Integration).
- [ ] Advanced Analytics Dashboards (Burndown charts, Revenue graphs).
- [ ] Real-time WebSockets for In-App Notifications.
- [ ] Full E2E Test Coverage with Playwright.
