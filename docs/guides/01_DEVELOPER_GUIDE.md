# 01. Developer Guide

## Coding Conventions & Best Practices
- **Strict Typing:** TypeScript in the frontend; Type Hints in Python.
- **Linters & Formatters:** `eslint` and `prettier` in the frontend; `black`, `isort`, and `flake8` in the backend. These run automatically on pre-commit hooks.
- **Naming Conventions:**
  - Frontend components: `PascalCase.tsx`
  - Backend models: `PascalCase`
  - Backend fields/variables: `snake_case`
  - Endpoints: Kebab-case (`/api/v1/client-portal/`)

## Adding a New Backend Feature
1. **Create the App:**
   ```bash
   cd apps/backend/features/
   django-admin startapp new_feature
   ```
2. **Add to Settings:**
   Add `features.new_feature` to `INSTALLED_APPS` in `config.settings.local` and `config.settings.production`.
3. **Models (`models.py`):** Define the DB schema. Inherit from a base model that includes `id` (UUID), `created_at`, `updated_at`, and `is_deleted`.
4. **Services (`services.py`):** Implement business logic.
5. **Selectors (`selectors.py`):** Implement database read queries.
6. **Serializers (`serializers.py`):** Define input/output shapes.
7. **Views (`views.py`):** Wire it all up into a DRF view.
8. **Routes (`urls.py`):** Expose the endpoint and include it in `config/urls.py`.

## Adding a New Frontend Feature
1. **API Client:** Add the endpoint definitions inside `src/lib/api/` or co-locate it with the feature.
2. **React Query:** Create a custom hook wrapping `useQuery` or `useMutation` in `src/hooks/`.
3. **Component:** Build the UI in `src/components/features/new_feature/`. Ensure you use existing UI primitives from `src/components/ui/`.
4. **Page:** Add a new route in `src/app/(dashboard)/new-feature/page.tsx`.

## State Management Rules
- Do **not** use `useState` or `useEffect` for fetching data. Rely entirely on React Query.
- Use `Zustand` only for global UI state (e.g., sidebar toggles, theme preferences) that does not interact with the server.

## Managing Migrations
Never alter the database manually. Always create migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```
Ensure migrations are committed to version control.
