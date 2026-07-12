# 02. System Architecture

## Architecture Overview
DevSpark utilizes a decoupled, modern web application architecture consisting of a Next.js React frontend, a Django Python backend, a PostgreSQL relational database, and an NGINX reverse proxy. 

## Component Breakdown

### Frontend
- **Framework**: Next.js 16 (App Router), React 19.
- **State Management**: React Query for server state caching and synchronization.
- **Network Layer**: Axios with custom interceptors for attaching JWTs and handling token refreshes.
- **Styling**: Tailwind CSS for utility-first styling, enhanced with Framer Motion and GSAP for micro-animations.

### Backend
- **Framework**: Django 5 and Django Rest Framework (DRF).
- **Architecture**: Modular application design under `apps/backend/features/*` isolating business logic.
- **Authentication**: `rest_framework_simplejwt` for stateless JSON Web Tokens.
- **RBAC**: Custom permissions and role-based access controls managed at the API view level.

### Database
- **Primary Datastore**: PostgreSQL.
- **ORM**: Django ORM.

### Background Processing
- **Message Broker**: Redis.
- **Worker**: Celery (Used for sending emails and heavy background processing).

### Infrastructure
- **Proxy**: NGINX acts as a reverse proxy, handling rate limiting and security headers, routing `/api/` to the backend and `/` to the frontend.
- **Containerization**: Docker and Docker Compose orchestrate the local and production environments.

## Request Flow

```mermaid
sequenceDiagram
    participant User as Browser / Client
    participant Nginx as NGINX Proxy
    participant NextJS as Next.js (Frontend)
    participant Django as Django (Backend)
    participant DB as PostgreSQL
    
    User->>Nginx: GET /
    Nginx->>NextJS: Reverse Proxy (Port 3000)
    NextJS-->>Nginx: HTML/JS Bundle
    Nginx-->>User: Render UI
    
    User->>Nginx: POST /api/v1/users/register/
    Nginx->>Django: Reverse Proxy (Port 8000)
    Django->>DB: ORM Insert
    DB-->>Django: Success
    Django-->>Nginx: 201 Created (JSON)
    Nginx-->>User: 201 Created
```

## Data Flow (React Query -> Django)

```mermaid
graph LR
    UI[Next.js Component] -->|useQuery| RQ[React Query Cache]
    RQ -->|Cache Miss| Axios[Axios Interceptor]
    Axios -->|Attach JWT| API[NGINX / DRF API]
    API -->|Fetch Data| DB[(Postgres)]
    DB -->|Return JSON| API
    API -->|Response| Axios
    Axios -->|Hydrate| RQ
    RQ -->|Re-render| UI
```
