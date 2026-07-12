# 03. Troubleshooting Guide

## Common Errors & Fixes

### 404 Not Found (Frontend fetching API)
**Symptom:** Next.js requests to `http://localhost:8000/api/...` fail with 404.
**Root Cause:** On Windows/WSL, Node.js prioritizes resolving `localhost` to the IPv6 address `[::1]`. If a WSL Relay or Docker Desktop instance is squatting on port 8000 via IPv6, the request bypasses Django (which binds to IPv4 `127.0.0.1:8000`) and hits the wrong service.
**Fix:** Set `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1` in `.env.local` to explicitly force IPv4 loopback routing.

### 401 Unauthorized
**Symptom:** API requests return `401`.
**Root Cause:** Expired JWT access token or missing `Authorization` header.
**Fix:** Ensure the Axios interceptor in `src/lib/api/interceptors.ts` is correctly attaching the token from cookies. If the refresh token is also expired, the user must log in again.

### 403 Forbidden
**Symptom:** Request returns `403`.
**Root Cause:** The user lacks the required RBAC permissions (e.g., trying to access Admin endpoints without `is_staff=True`).
**Fix:** Check the Django View's `permission_classes`.

### 500 Internal Server Error
**Symptom:** Request fails with `500`.
**Root Cause:** Unhandled Python exception in a Service or View.
**Fix:** Check the Django terminal output. Look for stack traces. Ensure you aren't passing invalid data types to the ORM.

### Hydration Errors (React)
**Symptom:** Browser console logs "Text content does not match server-rendered HTML."
**Root Cause:** Next.js SSR rendered something different than the browser. Usually caused by accessing `window` or `localStorage` during initial render.
**Fix:** Wrap browser-specific code in a `useEffect`, or dynamically import components with `ssr: false`.

### Redis/Celery Errors
**Symptom:** Celery tasks hang or crash with connection errors.
**Root Cause:** Redis is not running or misconfigured in `.env`.
**Fix:** Ensure Docker is running and `docker-compose up -d redis` is active. Verify `CELERY_BROKER_URL` points to the correct container IP or localhost.

### Database Migration Errors
**Symptom:** `psycopg2.errors.UndefinedTable: relation "X" does not exist`.
**Root Cause:** Migrations haven't been applied or DB state is desynced.
**Fix:** Run `python manage.py migrate`. If completely corrupted locally, drop the postgres container volume and rebuild.
