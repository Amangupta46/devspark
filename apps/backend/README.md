# DevSpark Enterprise Backend

## Architecture
- Django 5 + DRF
- PostgreSQL
- Redis + Celery
- JWT Authentication + RBAC
- Docker Orchestration

## Getting Started

1. Copy `.env.example` to `.env`
2. Run `docker-compose up -d --build`
3. Access API at `http://localhost:8000/api/v1/`
4. Access Swagger at `http://localhost:8000/api/docs/`
5. Access PGAdmin at `http://localhost:5050`
6. Access Flower at `http://localhost:5555`

## Development Guide
- All business logic goes in `services.py`
- All queries go in `selectors.py`
- No logic in `views.py`

## Testing
`pytest`
