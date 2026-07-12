# 03. Tech Stack

## Frontend Technologies

| Technology | Version | Purpose | Alternative | Pros | Cons |
|---|---|---|---|---|---|
| **Next.js** | 16.2.9 | React meta-framework for routing, SSR, and API endpoints. | Vite / Create React App | Excellent SEO, built-in routing, App Router. | Steeper learning curve, opinionated caching. |
| **React** | 19.2.4 | UI Component rendering. | Vue / Angular | Massive ecosystem, strong community. | Boilerplate heavy for state management without external libs. |
| **React Query** | 5.101 | Server state management and caching. | SWR / Redux Toolkit | Auto-caching, retry logic, background fetching. | Adds bundle size. |
| **Tailwind CSS** | 4.x | Utility-first styling. | Styled Components / SASS | Rapid prototyping, zero runtime cost. | HTML clutter. |
| **Axios** | 1.18.1 | Promise-based HTTP client for interceptors. | Native `fetch` | Easy global interceptors for JWTs. | Slightly larger than `fetch`. |
| **Framer Motion** | 12.42 | High-performance React animations. | GSAP (Also used) | Declarative physics-based animations. | Heavy bundle size. |
| **GSAP / Three.js** | 3.15 / 0.185 | Advanced micro-animations and 3D rendering. | Lottie | Industry-standard animation precision. | Commercial license required for some features (GSAP). |

## Backend Technologies

| Technology | Version | Purpose | Alternative | Pros | Cons |
|---|---|---|---|---|---|
| **Django** | 5.x | High-level Python web framework. | FastAPI / Flask | Batteries included, excellent ORM, Admin panel. | Monolithic, can be slow for high-concurrency websocket apps. |
| **DRF** | 3.15 | REST API generation. | Django-Ninja | Seamless Django integration, serializing. | Heavy, complex overriding. |
| **PostgreSQL** | 15+ | Relational database. | MySQL / SQLite | Acid compliant, JSONB support, highly scalable. | More complex setup than SQLite. |
| **Celery** | 5.3 | Distributed task queue for async jobs. | RQ / Hue | Highly scalable, crontab support. | Complex configuration, requires broker. |
| **Redis** | 5.0 | In-memory message broker for Celery and caching. | RabbitMQ | Lightning fast, easy setup. | Data must fit in memory. |
| **SimpleJWT** | - | Stateless JWT generation and verification. | Sessions | Truly stateless, mobile-friendly. | Token revocation requires a blocklist DB table. |

## Infrastructure

| Technology | Version | Purpose | Alternative | Pros | Cons |
|---|---|---|---|---|---|
| **Docker / Compose** | 24+ | Containerization and environment parity. | Podman / Vagrant | Consistent environments, easy teardown. | High memory usage locally. |
| **NGINX** | Latest | Reverse proxy, static file serving, routing. | Traefik / Caddy | Extremely fast, battle-tested. | Configuration syntax can be tricky. |
