# 01. Backend Documentation

## Overview
The DevSpark backend is powered by Python 3.12+ and Django 5.x. It exposes RESTful endpoints using the Django Rest Framework (DRF) and leverages PostgreSQL for relational data storage, while Redis and Celery handle asynchronous processing.

## Project Structure
The backend follows a domain-driven structure isolated within the `apps/backend/features/` folder. This avoids the traditional Django "fat models" anti-pattern by splitting concerns into strictly bounded contexts.

## Module Breakdown

| Feature App | Purpose | Status |
|---|---|---|
| `users` | Auth, JWT generation, User profiles. | **Implemented** |
| `crm` | Lead, Contact, and Company tracking. | **Partially Implemented** |
| `projects` | Tasks, Timelogs, Project Boards. | **Partially Implemented** |
| `quotes` | Estimates, Catalogs, Tax profiles. | **Partially Implemented** |
| `finance` | Invoicing, Milestones, Payments. | **Implemented** |
| `team` | Internal organization mapping, leave tracking. | **Partially Implemented** |
| `client_portal` | Dedicated read-only views for clients. | **Partially Implemented** |
| `notifications` | Async event dispatch (Email/Push). | **Partially Implemented** |

## Design Patterns

### Thin Views, Fat Services
We follow the Service Layer pattern.
- **Views (`views.py`)**: Only responsible for HTTP request handling, instantiating serializers, and returning HTTP responses. No business logic resides here.
- **Serializers (`serializers.py`)**: Only responsible for data validation and shape transformation.
- **Services (`services.py`)**: All business logic (e.g., `RegisterService.execute()`) lives here. Services are atomic and handle database writes.
- **Selectors (`selectors.py`)**: All complex ORM queries (reads) should be extracted into functions in `selectors.py` to keep views clean.

## Async Workers (Celery)
We use Celery with Redis for long-running tasks.
- **Usage**: Sending emails, generating PDFs for quotes/invoices, synchronizing with third-party APIs.
- **Execution**: Tasks are fired from `services.py` using `.delay()` (e.g., `send_verification_email.delay(user.id)`).
