# 01. Setup and Run Guide

## Prerequisites
- Node.js (v20+)
- Python (3.12+)
- Docker Desktop (for Redis/Postgres)
- pnpm (latest)

## Environment Setup
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd devspark
   ```
2. **Backend Environment Variables:**
   Copy `.env.example` to `.env.local` inside `apps/backend/`.
   Ensure `DJANGO_SETTINGS_MODULE=config.settings.local` is set.
3. **Frontend Environment Variables:**
   Copy `.env.example` to `.env.local` inside `apps/frontend/`.
   Set `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1` to ensure local traffic resolves to IPv4.

## Docker Infrastructure
Start the required background services (Postgres, Redis):
```bash
docker-compose up -d db redis
```

## Backend Setup
1. **Virtual Environment:**
   ```bash
   cd apps/backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. **Database Migrations:**
   ```bash
   python manage.py migrate
   ```
3. **Run Django Server:**
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
4. **Run Celery Worker (in a new terminal):**
   ```bash
   celery -A config worker -l info
   ```

## Frontend Setup
1. **Install Dependencies:**
   ```bash
   cd apps/frontend
   pnpm install
   ```
2. **Run Next.js Dev Server:**
   ```bash
   pnpm dev
   ```
   The frontend will be available at `http://localhost:3000`.
