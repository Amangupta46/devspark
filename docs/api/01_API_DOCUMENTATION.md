# 01. API Documentation

## Overview
All DevSpark APIs are versioned under `/api/v1/`. They consume and produce `application/json`.
Authentication is handled via JWT passed in the `Authorization: Bearer <token>` header.

## Authentication Endpoints

### 1. Register User
- **Method:** `POST`
- **URL:** `/api/v1/users/register/`
- **Authentication:** None
- **Permissions:** AllowAny
- **Request:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "StrongPassword123!",
    "company_name": "Acme Corp"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Registration successful. Please check your email for verification."
  }
  ```

### 2. Login User
- **Method:** `POST`
- **URL:** `/api/v1/users/login/`
- **Authentication:** None
- **Permissions:** AllowAny
- **Request:**
  ```json
  {
    "email": "john@example.com",
    "password": "StrongPassword123!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "refresh": "eyJhb...",
    "access": "eyJhb...",
    "user_id": "uuid-string"
  }
  ```
- **Errors:**
  - `401 Unauthorized`: "Invalid credentials." or "Please verify your email before logging in."

## Modules Endpoints
*(Note: These modules are Partially Implemented. The routes exist but business logic is under construction).*

- **CRM:** `/api/v1/crm/`
- **Quotes:** `/api/v1/quotes/`
- **Projects:** `/api/v1/projects/`
- **Team:** `/api/v1/team/`
- **Client Portal:** `/api/v1/client-portal/`

### Example: Fetch Projects
- **Method:** `GET`
- **URL:** `/api/v1/projects/`
- **Authentication:** Required (JWT)
- **Permissions:** IsAuthenticated, IsOrganizationMember
- **Response (200 OK):**
  ```json
  [
    {
      "id": "uuid",
      "name": "Website Redesign",
      "status": "active"
    }
  ]
  ```

## Standard Status Codes
- `200 OK`: Successful GET, PUT, PATCH.
- `201 Created`: Successful POST.
- `204 No Content`: Successful DELETE.
- `400 Bad Request`: Invalid payload shape or validation failure.
- `401 Unauthorized`: Missing or invalid JWT.
- `403 Forbidden`: Valid JWT, but lacking role-based permissions.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Unhandled backend exception.
