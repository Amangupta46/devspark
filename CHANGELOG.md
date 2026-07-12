# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-07-12
### Fixed
- **Networking:** Fixed frontend 404 issue caused by Node.js prioritizing IPv6 `[::1]` on Windows. Explicitly set `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1` to force IPv4 routing to the Django backend.
- **Frontend Config:** Updated `next.config.ts` to strictly enforce Content-Security-Policy (CSP) and other security headers.

## [0.1.0] - 2026-07-01
### Added
- Initial monorepo configuration using Turborepo / pnpm workspace.
- Next.js 16 scaffolding with App Router and Tailwind CSS.
- Django 5 project initialization with DRF and custom `users` app.
- Basic JWT Authentication layer (`rest_framework_simplejwt`).
- NGINX proxy Docker configuration.
