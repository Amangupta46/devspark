# 02. Database Schema

## Overview
DevSpark uses PostgreSQL as its primary data store. The schema is highly normalized and relies heavily on Foreign Keys and `UUIDField` primary keys.

## Entity Relationship Diagram

```mermaid
erDiagram
    CustomUser {
        UUID id PK
        string email
        string first_name
        string last_name
        string status
        boolean email_verified
    }
    
    Company {
        UUID id PK
        string name
        string industry
        string status
    }
    
    Contact {
        UUID id PK
        UUID company_id FK
        string first_name
        string last_name
        string email
    }

    Project {
        UUID id PK
        UUID client_id FK
        string name
        string status
    }
    
    Task {
        UUID id PK
        UUID project_id FK
        UUID assignee_id FK
        string title
        string status
    }

    TimeLog {
        UUID id PK
        UUID task_id FK
        UUID user_id FK
        decimal hours
    }
    
    Estimate {
        UUID id PK
        UUID client_id FK
        UUID project_id FK
        string status
        decimal total
    }

    Invoice {
        UUID id PK
        UUID client_id FK
        UUID project_id FK
        UUID quote_id FK
        decimal total
        decimal balance
        string status
    }

    Payment {
        UUID id PK
        UUID invoice_id FK
        decimal amount
        string status
    }

    %% Relationships
    Company ||--o{ Contact : "has"
    Company ||--o{ Project : "commissions"
    Project ||--o{ Task : "contains"
    Task ||--o{ TimeLog : "logs"
    CustomUser ||--o{ Task : "assigned to"
    CustomUser ||--o{ TimeLog : "logs"
    Company ||--o{ Estimate : "receives"
    Estimate ||--o| Project : "converts to"
    Company ||--o{ Invoice : "billed via"
    Invoice ||--o{ Payment : "receives"
```

## Indexes & Constraints
- `email` fields across the board are unique and indexed.
- Soft deletes are implemented using `is_deleted = models.BooleanField(default=False)`. Most API queries must filter by `is_deleted=False` (often handled automatically via a custom model Manager).
- UUIDs are used for all Primary Keys to prevent URL enumeration attacks.
