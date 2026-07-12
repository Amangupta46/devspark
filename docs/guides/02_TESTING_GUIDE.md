# 02. Testing Guide

## Backend Testing (Pytest)
We use `pytest` and `pytest-django` for backend unit and integration testing.

1. **Running Tests:**
   ```bash
   cd apps/backend
   pytest
   ```
2. **Coverage Report:**
   ```bash
   pytest --cov=. --cov-report=html
   ```
3. **Writing Tests:**
   Place tests in a `tests/` directory within the respective feature app. Structure tests to mock Celery delays and external API calls. Use `mixer` or `factory-boy` for fixture generation.

## API Testing (Postman)
A Postman collection `DevSpark.postman_collection.json` (Planned) will reside in the root directory. It contains parameterized endpoints for testing local and staging environments seamlessly.

## Frontend Testing
- **Unit Tests:** `jest` and `@testing-library/react`.
- **E2E Tests:** `Playwright` is planned for end-to-end integration tests mimicking actual user clicks across the complete request flow.

## Manual QA Checklist
Before a PR is merged, the developer must manually verify:
- [ ] No Hydration Errors in Next.js terminal.
- [ ] Responsive design works on Mobile (375px) and Desktop (1440px).
- [ ] Light/Dark mode toggles without visual glitches.
- [ ] Login and Registration flows succeed without 404/500 errors.
- [ ] Django Admin loads successfully.
- [ ] Redux/Zustand state doesn't leak between route changes.
