# 04. API Request & Data Flow

This document details the exact sequence of events when a client makes a request to the DevSpark backend.

## Complete Request Lifecycle

```mermaid
sequenceDiagram
    participant UI as Next.js UI
    participant RQ as React Query
    participant Axios as Axios Client
    participant Interceptor as Axios Interceptor
    participant Nginx as Nginx Proxy
    participant JWT as DRF JWT Middleware
    participant View as Django View (API)
    participant Serializer as DRF Serializer
    participant Service as Business Service
    participant Selector as Data Selector
    participant Model as Django Model
    participant DB as PostgreSQL Database

    Note over UI, Axios: 1. Outbound Request Phase
    UI->>RQ: useMutation() / useQuery()
    RQ->>Axios: Execute Promise
    Axios->>Interceptor: Request intercept
    Interceptor->>Interceptor: Inject Bearer Token
    Interceptor->>Nginx: HTTP POST / GET

    Note over Nginx, DB: 2. Server Processing Phase
    Nginx->>JWT: Forward to backend:8000
    JWT->>JWT: Validate Signature & Expiry
    JWT->>View: request.user populated
    View->>Serializer: pass request.data
    Serializer->>Serializer: is_valid() check
    Serializer->>Service: execute(validated_data)
    Service->>Selector: get_related_entities()
    Selector->>Model: ORM Query
    Model->>DB: SQL SELECT
    DB-->>Model: Result Set
    Model-->>Selector: Instances
    Selector-->>Service: Validated Instances
    Service->>Model: ORM Insert / Update
    Model->>DB: SQL COMMIT
    DB-->>Model: Success

    Note over DB, UI: 3. Inbound Response Phase
    Service-->>Serializer: Returned Object
    Serializer-->>View: Serialized Data (JSON)
    View-->>Nginx: HTTP 200/201 Response
    Nginx-->>Interceptor: HTTP Response
    Interceptor-->>Axios: Intercept Response (Handle 401s if needed)
    Axios-->>RQ: Resolve Promise
    RQ-->>UI: Cache Updated, Trigger Re-render
```

## Description of Layers

1. **Next.js UI**: The user interacts with a React component (e.g., clicking "Save").
2. **React Query**: `useMutation` triggers the API call and handles `isPending` state.
3. **Axios & Interceptor**: The request is intercepted locally in `src/lib/api/interceptors.ts` to attach the JWT access token from cookies.
4. **NGINX**: The Docker NGINX service receives the request on port 80/443 and reverse proxies `/api/*` to the Django backend on port 8000.
5. **Django Middleware / JWT**: DRF SimpleJWT validates the token and attaches the `User` object to the `request`.
6. **Django View**: The endpoint receives the request and instantiates a Serializer.
7. **Serializer**: Validates incoming payload shapes, types, and constraints.
8. **Service Layer (`services.py`)**: Responsible for writing data. Implements core business logic (e.g., `RegisterService.execute()`).
9. **Selector Layer**: Responsible for reading data. Keeps the views clean from complex ORM queries.
10. **Model / DB**: Django ORM translates Python objects to raw SQL queries against PostgreSQL.

The response follows the exact reverse path, culminating in React Query updating its cache and the Next.js UI automatically re-rendering to reflect the new state.
