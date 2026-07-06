# DevSpark — Master Implementation Tasks

This document contains the complete engineering task list (Jira-style tickets) required to build the DevSpark platform from the ground up, following the rules specified in `PROJECT.md`, `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, and `MOTION_SYSTEM.md`.

---

## Milestone 1: Project Foundation

### Phase 1.1: Repository & Environment Scaffolding

#### Task ID: M1-001
*   **Title:** Setup Monorepo Structure with PNPM and Turborepo
*   **Description:** Initialize a pnpm monorepo structure with Turborepo to host the frontend (Next.js), backend (Django), and infrastructure config files.
*   **Why this task exists:** Establishes the workspace for unified build, lint, test, and type-checking pipelines.
*   **Dependencies:** None
*   **Files likely affected:**
    *   [NEW] `/package.json`
    *   [NEW] `/pnpm-workspace.yaml`
    *   [NEW] `/turbo.json`
*   **Acceptance Criteria:**
    *   `pnpm install` successfully runs at root.
    *   `turbo run build` correctly coordinates workspace building.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M1-002
*   **Title:** Initialize Next.js 15 Frontend Application
*   **Description:** Initialize the frontend app inside `apps/frontend` using Next.js 15 with TypeScript, Tailwind CSS, ESLint, and shadcn/ui prerequisite files.
*   **Why this task exists:** Establishes the client-facing codebase.
*   **Dependencies:** M1-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/package.json`
    *   [NEW] `/apps/frontend/tsconfig.json`
    *   [NEW] `/apps/frontend/tailwind.config.ts`
    *   [NEW] `/apps/frontend/src/app/layout.tsx`
*   **Acceptance Criteria:**
    *   Frontend builds successfully with `pnpm --filter frontend build`.
    *   Tailwind CSS loads properly and TypeScript compiles without errors.
*   **Estimated Complexity:** S
*   **Estimated Time:** 2 hours
*   **Priority:** Critical

#### Task ID: M1-003
*   **Title:** Initialize Django & Django REST Framework Backend Application
*   **Description:** Set up a clean Django project inside `apps/backend` running Python 3.11+, using Django 5.x and Django REST Framework. Configure settings to run dynamically from environment variables.
*   **Why this task exists:** Establishes the API engine codebase.
*   **Dependencies:** M1-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/manage.py`
    *   [NEW] `/apps/backend/requirements.txt`
    *   [NEW] `/apps/backend/core/settings.py`
    *   [NEW] `/apps/backend/core/urls.py`
*   **Acceptance Criteria:**
    *   Django server starts locally via virtualenv or python execution.
    *   DRF response wrapper functions return correctly at `/api/`.
*   **Estimated Complexity:** S
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

#### Task ID: M1-004
*   **Title:** Configure Docker Compose for Local Development Services
*   **Description:** Create `docker-compose.yml` to orchestrate PostgreSQL 16, Redis 7 (for cache/Celery), and pgAdmin.
*   **Why this task exists:** Ensures a reproducible local database and cache environment for all developers.
*   **Dependencies:** M1-003
*   **Files likely affected:**
    *   [NEW] `/docker-compose.yml`
    *   [NEW] `/.env.example`
*   **Acceptance Criteria:**
    *   `docker compose up -d` boots PostgreSQL and Redis.
    *   Database accepts local connections on port 5432.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M1-005
*   **Title:** Configure Django Database Connections & Initial Migrations
*   **Description:** Install `psycopg2-binary` and configure Django’s `DATABASES` settings to connect to the PostgreSQL instance launched via Docker Compose.
*   **Why this task exists:** Plugs the backend app into the persistent database.
*   **Dependencies:** M1-003, M1-004
*   **Files likely affected:**
    *   `/apps/backend/core/settings.py`
    *   `/apps/backend/requirements.txt`
*   **Acceptance Criteria:**
    *   `python manage.py migrate` executes successfully without connection faults.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** Critical

#### Task ID: M1-006
*   **Title:** Setup Celery Integration inside Django App
*   **Description:** Configure Celery inside the Django app using Redis as the message broker, integrating settings in Django's core folder.
*   **Why this task exists:** Enables queueing background asynchronous tasks.
*   **Dependencies:** M1-003, M1-004
*   **Files likely affected:**
    *   [NEW] `/apps/backend/core/celery.py`
    *   `/apps/backend/core/__init__.py`
    *   `/apps/backend/core/settings.py`
*   **Acceptance Criteria:**
    *   Celery worker starts locally and successfully connects to Redis.
    *   A test task can be dispatched from a Django shell and processed asynchronously by the worker.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

---

## Milestone 2: Design System

### Phase 2.1: Foundation Settings & Utility Layer

#### Task ID: M2-001
*   **Title:** Import Typography Fonts and Setup Layout Class Providers
*   **Description:** Import `Inter` and `JetBrains Mono` variable fonts using Next.js `next/font/google`. Configure CSS variable hooks for body/mono usage.
*   **Why this task exists:** Implements Design System Section 4 requirements for variables and typography.
*   **Dependencies:** M1-002
*   **Files likely affected:**
    *   `/apps/frontend/src/app/layout.tsx`
    *   `/apps/frontend/src/styles/globals.css`
*   **Acceptance Criteria:**
    *   Inter renders for sans-serif text.
    *   JetBrains Mono displays correctly for code blocks.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** High

#### Task ID: M2-002
*   **Title:** Map Global Theme Variables to CSS & Tailwind Config
*   **Description:** Add all CSS variables from Design System Section 38 (Neutrals, Amber, Teal, Semantic colors, Spacing, Radii, Shadows, Glows) into the global CSS file and link them to `tailwind.config.ts`.
*   **Why this task exists:** Connects tokenized styling constants to Tailwind utility classes.
*   **Dependencies:** M1-002, M2-001
*   **Files likely affected:**
    *   `/apps/frontend/tailwind.config.ts`
    *   `/apps/frontend/src/styles/globals.css`
*   **Acceptance Criteria:**
    *   Tailwind compiler supports classes like `bg-surface-raised`, `text-amber-400`, `shadow-xl`, and `rounded-xl`.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M2-003
*   **Title:** Install Lucide Icons & Setup Custom Sizing Classes
*   **Description:** Configure Lucide React icons library and set up standard sizing classes corresponding to Design System Section 14 (xs: 14px, sm: 16px, md: 20px, lg: 24px, xl: 32px).
*   **Why this task exists:** Ensures icon sizing stays uniform and complies with the visual guidelines.
*   **Dependencies:** M1-002
*   **Files likely affected:**
    *   `/apps/frontend/package.json`
    *   [NEW] `/apps/frontend/src/components/shared/icon-helper.tsx`
*   **Acceptance Criteria:**
    *   Icons load dynamically with matching stroke weights and heights based on sizing props.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 1.5 hours
*   **Priority:** Medium

#### Task ID: M2-004
*   **Title:** Create Motion Tokens and Animation Config Helper
*   **Description:** Define easing curves, spring profiles, duration variables, and entrance stagger presets in a unified `motion.ts` utility file.
*   **Why this task exists:** Implements Motion System Section 3, 5, and 35.4 parameters in code.
*   **Dependencies:** M1-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/lib/motion.ts`
*   **Acceptance Criteria:**
    *   Variables export correct cubic-bezier strings and spring config objects.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** High

### Phase 2.2: Primitives & Shared Component Scaffolding

#### Task ID: M2-005
*   **Title:** Build Button & Icon Button Components
*   **Description:** Create the core `Button` component supporting variants (Primary, Secondary, Ghost, Danger, Link) and sizes (xs, sm, md, lg, xl) with built-in transition timers.
*   **Why this task exists:** Implements Design System Section 19 and Motion System Section 8 button specifications.
*   **Dependencies:** M2-002, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/ui/button.tsx`
*   **Acceptance Criteria:**
    *   Active/press applies scale(0.97).
    *   Primary button transitions with translateY(-1px) on hover.
    *   Spinner states work correctly.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M2-006
*   **Title:** Build Input, Textarea, and Form Label Primitive Components
*   **Description:** Implement standard `Input`, `Textarea`, and validation error helpers with state indicators (Focus, Error, Disabled, Success).
*   **Why this task exists:** Implements Design System Section 20 inputs.
*   **Dependencies:** M2-002, M2-005
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/ui/input.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/textarea.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/form-label.tsx`
*   **Acceptance Criteria:**
    *   Focus ring displays `--amber-400` with glow.
    *   Errors trigger a slide-down animation and display the error message.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M2-007
*   **Title:** Build Checkbox, Radio, and Toggle/Switch Components
*   **Description:** Implement `Checkbox`, `RadioGroup`, and `Switch` components matching design guidelines.
*   **Why this task exists:** Completes interactive form primitive set.
*   **Dependencies:** M2-002, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/ui/checkbox.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/radio-group.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/switch.tsx`
*   **Acceptance Criteria:**
    *   Switch toggle slides smoothly with a spring curve overshoot on release.
    *   Selected borders match style specifications.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M2-008
*   **Title:** Build Select / Dropdown Trigger & Popover Component
*   **Description:** Create custom accessible Select controls and Popover menus styled with translucent borders.
*   **Why this task exists:** Implements Design System Section 20.3 dropdown layout.
*   **Dependencies:** M2-002, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/ui/select.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/popover.tsx`
*   **Acceptance Criteria:**
    *   Popovers open with a scale-up (0.96 -> 1.0) and fade-in transition.
    *   Select overlays close when clicked outside.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M2-009
*   **Title:** Build GlassCard Shared Component
*   **Description:** Implement a reusable card wrapper component applying CSS backdrop blurs and translucent borders.
*   **Why this task exists:** Implements Design System Section 18.2 glass card specs.
*   **Dependencies:** M2-002, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/shared/glass-card.tsx`
*   **Acceptance Criteria:**
    *   Card lifts smoothly on hover (`translateY(-4px)`) and glows with amber or teal glow.
    *   Fallback runs correctly on browsers that don't support backdrop blurs.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M2-010
*   **Title:** Build Badge & Chip Components
*   **Description:** Implement Status, Count, and Tech Badges alongside Filter and Dismissible Tag Chips.
*   **Why this task exists:** Implements Design System Section 21 & 22 specs.
*   **Dependencies:** M2-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/shared/badge.tsx`
    *   [NEW] `/apps/frontend/src/components/shared/chip.tsx`
*   **Acceptance Criteria:**
    *   Status badges render using 15% opacity fills.
    *   Dismissible chips show click interactions and trigger parent callbacks.
*   **Estimated Complexity:** S
*   **Estimated Time:** 2.5 hours
*   **Priority:** Medium

#### Task ID: M2-011
*   **Title:** Build Tooltip, Accordion, and Skeleton Components
*   **Description:** Build standard components for Tooltips (with hover delays), Accordions (with sliding height reveals), and Skeletons (with linear shimmers).
*   **Why this task exists:** Completes content layout primitives for dashboards and tables.
*   **Dependencies:** M2-002, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/ui/tooltip.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/accordion.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/skeleton.tsx`
*   **Acceptance Criteria:**
    *   Tooltip delays display for 200ms when hovered.
    *   Accordion chevrons rotate 180 degrees when expanded.
    *   Skeleton loops infinite shimmers.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M2-012
*   **Title:** Build Dialog / Modal & Drawer Panels
*   **Description:** Implement standard Modal Dialog overlay systems and slide-in side Drawer wrappers.
*   **Why this task exists:** Implements Dialog/Drawer components defined in Motion System Section 25 & 26.
*   **Dependencies:** M2-002, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/ui/dialog.tsx`
    *   [NEW] `/apps/frontend/src/components/ui/drawer.tsx`
*   **Acceptance Criteria:**
    *   Modal triggers focus traps on open.
    *   Escape closes modal, return returns focus.
    *   Drawers slide in from correct viewport directions.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

---

## Milestone 3: Homepage

### Phase 3.1: Global Marketing Layout & Frame

#### Task ID: M3-001
*   **Title:** Build Marketing Header Layout & Desktop Nav Transitions
*   **Description:** Implement the main navigation header. Support transparent styling at scroll offset 0, switching to a blurred, bordered header on scroll.
*   **Why this task exists:** Implements marketing header states defined in Motion System Section 10.1.
*   **Dependencies:** M2-005, M2-009
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/layout/header.tsx`
*   **Acceptance Criteria:**
    *   Nav collapses vertical padding and gains background blur after scrolling down 50px.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M3-002
*   **Title:** Build Mobile Navigation Slide Drawer & Hamburger Morph
*   **Description:** Implement the mobile menu overlay and slide animation, including the SVG morph transition for the hamburger icon.
*   **Why this task exists:** Implements navigation drawer requirements on mobile viewports.
*   **Dependencies:** M2-012, M3-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/layout/mobile-nav.tsx`
*   **Acceptance Criteria:**
    *   Hamburger transforms to an X on open.
    *   Menu drawer slides out from the right on mobile layouts.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M3-003
*   **Title:** Build Marketing Footer Component
*   **Description:** Implement the global footer component containing multi-column links, social feeds, and newsletter subscriptions.
*   **Why this task exists:** Establishes page completion footer.
*   **Dependencies:** M2-006
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/layout/footer.tsx`
*   **Acceptance Criteria:**
    *   Responsive columns adjust layouts on mobile screens.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** Medium

### Phase 3.2: Homepage Sections

#### Task ID: M3-004
*   **Title:** Implement Hero Section 2D Layout & Sequence Entrance
*   **Description:** Layout the hero section (Headlines, Subheadline, CTA Buttons, Trust Chips) and orchestrate staggered load-in timings.
*   **Why this task exists:** Implements Hero section sequence defined in Motion System Section 11.1.
*   **Dependencies:** M2-004, M2-005, M3-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/sections/hero-section.tsx`
    *   `/apps/frontend/src/app/(marketing)/page.tsx`
*   **Acceptance Criteria:**
    *   Hero headline displays immediately on first render.
    *   Subheadline, CTA buttons, and trust chips stagger fade-in correctly.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M3-005
*   **Title:** Setup Three.js WebGL Hero Canvas & Background Gradient Fallback
*   **Description:** Create the dynamic Three.js canvas wrapper inside a React suspense container with an active CSS background gradient.
*   **Why this task exists:** Implements lazy loading and WebGL fallbacks defined in Motion System Section 32 & 33.
*   **Dependencies:** M3-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/three/hero-canvas.tsx`
*   **Acceptance Criteria:**
    *   WebGL canvas loads dynamically.
    *   Gradient displays when WebGL is loading or unsupported.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M3-006
*   **Title:** Implement 3D Ambient Particles & interactive Orb Scene
*   **Description:** Code the floating WebGL particles and morphing orb using React Three Fiber, binding camera rotation slightly to mouse movements.
*   **Why this task exists:** Implements interactive WebGL animation specs.
*   **Dependencies:** M3-005
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/three/orb-scene.tsx`
*   **Acceptance Criteria:**
    *   3D object tilts slightly on mouse moves.
    *   Frame rate stays at 60fps on mid-range devices.
*   **Estimated Complexity:** L
*   **Estimated Time:** 8 hours
*   **Priority:** Medium

#### Task ID: M3-007
*   **Title:** Implement TrustedBy Logo Banner Section
*   **Description:** Build the grid displaying client logos. Apply a grayscale filter and low opacity by default, transitioning to full color on hover.
*   **Why this task exists:** Implements the company credibility banner.
*   **Dependencies:** M2-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/sections/trusted-by-section.tsx`
*   **Acceptance Criteria:**
    *   Hovering logos transitions opacity over 300ms.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** Medium

#### Task ID: M3-008
*   **Title:** Implement Services Grid Section
*   **Description:** Build the Services summary display. Showcase three featured cards that lift on hover and activate accent glows.
*   **Why this task exists:** Implements home service showcases.
*   **Dependencies:** M2-009
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/sections/services-section.tsx`
*   **Acceptance Criteria:**
    *   Hovering a services card activates a translation offset and shadow glows.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M3-009
*   **Title:** Implement WhyChoose Section with Geometric Reveals
*   **Description:** Build the feature comparison list. Stagger entrances as the elements enter the viewport.
*   **Why this task exists:** Implements homepage core features.
*   **Dependencies:** M2-011, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/sections/why-choose-section.tsx`
*   **Acceptance Criteria:**
    *   Scroll reveals play when the element is scrolled 100px into the viewport.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

#### Task ID: M3-010
*   **Title:** Implement Testimonials Carousel Section
*   **Description:** Build the testimonial display slider. Support sliding animations and swipe gestures on mobile screens.
*   **Why this task exists:** Implements credibility social proofs.
*   **Dependencies:** M2-009, M2-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/sections/testimonials-section.tsx`
*   **Acceptance Criteria:**
    *   Carousel pauses on cursor hovers.
    *   Swipe navigates between cards on mobile.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Medium

#### Task ID: M3-011
*   **Title:** Implement Homepage CTA Conversion Section
*   **Description:** Build the bottom conversion card showcasing a radial background glow.
*   **Why this task exists:** Final user-conversion funnel link on the homepage.
*   **Dependencies:** M2-005, M2-009
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/sections/cta-section.tsx`
*   **Acceptance Criteria:**
    *   Glow renders correctly behind the container.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** High

---

## Milestone 4: Marketing Pages

### Phase 4.1: Services & Portfolio Sections

#### Task ID: M4-001
*   **Title:** Create Services Index Page
*   **Description:** Implement `/services` displaying comprehensive agency offerings using card layouts.
*   **Why this task exists:** Implements marketing layout pages.
*   **Dependencies:** M2-009, M3-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/services/page.tsx`
*   **Acceptance Criteria:**
    *   Layout mounts correctly and lists all agency services.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M4-002
*   **Title:** Implement Dynamic Service Detail Pages
*   **Description:** Create dynamic routes at `/services/[slug]` listing service-specific tech stacks, pricing, and project phases.
*   **Why this task exists:** Provides dynamic detail views.
*   **Dependencies:** M4-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/services/[slug]/page.tsx`
*   **Acceptance Criteria:**
    *   Dynamic service routes load the correct text based on the slug.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M4-003
*   **Title:** Create Portfolio Showcase Grid Page
*   **Description:** Build `/portfolio` containing dynamic filter tags and interactive grid items.
*   **Why this task exists:** Implements Portfolio rules from Design System Section 42.
*   **Dependencies:** M2-009, M2-010
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/portfolio/page.tsx`
*   **Acceptance Criteria:**
    *   Filter chips adjust the grid content dynamically.
    *   Hovering items scales the image within overflow borders.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M4-004
*   **Title:** Implement Dynamic Case Study Page Template
*   **Description:** Create dynamic route templates at `/portfolio/[slug]` displaying project goals, processes, and metric widgets.
*   **Why this task exists:** Implements Case Study rules from Design System Section 43.
*   **Dependencies:** M4-003
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/portfolio/[slug]/page.tsx`
*   **Acceptance Criteria:**
    *   Metrics widgets render numerical indicators and support staggered count-ups on scroll entry.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

### Phase 4.2: Core Info & Content Pages

#### Task ID: M4-005
*   **Title:** Create About Page
*   **Description:** Build `/about` with sections detailing company history, core values, and a team member directory.
*   **Why this task exists:** Establishes company profile.
*   **Dependencies:** M2-009
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/about/page.tsx`
*   **Acceptance Criteria:**
    *   Team grid displays avatars.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

#### Task ID: M4-006
*   **Title:** Create Careers Page
*   **Description:** Build `/careers` with job postings displayed inside interactive accordion menus.
*   **Why this task exists:** Recruiting portal.
*   **Dependencies:** M2-011
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/careers/page.tsx`
*   **Acceptance Criteria:**
    *   Accordion menus expand/collapse to show detailed descriptions.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

#### Task ID: M4-007
*   **Title:** Create Blog Index Page
*   **Description:** Build `/blog` with card listings, featured headers, and pagination.
*   **Why this task exists:** Implements Blog rules from Design System Section 45.1.
*   **Dependencies:** M2-009, M2-010
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/blog/page.tsx`
*   **Acceptance Criteria:**
    *   Post cards stagger enter on first render.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M4-008
*   **Title:** Create Blog Detail Page Template (MDX Support)
*   **Description:** Setup dynamic route `/blog/[slug]` configured to render rich blog posts via MDX content files.
*   **Why this task exists:** Implements Design System Section 45.2.
*   **Dependencies:** M4-007
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/blog/[slug]/page.tsx`
*   **Acceptance Criteria:**
    *   Typography column width is capped at 680px for readability.
    *   Code blocks render in JetBrains Mono inside styled backgrounds.
*   **Estimated Complexity:** M
*   **Estimated Time:** 6 hours
*   **Priority:** Medium

#### Task ID: M4-009
*   **Title:** Create Contact / Quote Page with Multi-Step Form Skeleton
*   **Description:** Build `/contact` showcasing a multi-step form structure (Basic details -> Service -> Budget -> Project brief).
*   **Why this task exists:** Funnel entrance for new service clients.
*   **Dependencies:** M2-006, M2-007
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/contact/page.tsx`
    *   [NEW] `/apps/frontend/src/components/forms/quote-form.tsx`
*   **Acceptance Criteria:**
    *   Form validation validates fields before letting users advance steps.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M4-010
*   **Title:** Create Privacy and Terms Content Pages
*   **Description:** Render simple text layouts for `/privacy` and `/terms` using custom markdown elements.
*   **Why this task exists:** Basic legal compliance.
*   **Dependencies:** M3-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(marketing)/privacy/page.tsx`
    *   [NEW] `/apps/frontend/src/app/(marketing)/terms/page.tsx`
*   **Acceptance Criteria:**
    *   Text reads comfortably with proper spacing.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 1.5 hours
*   **Priority:** Low

---

## Milestone 5: Authentication

### Phase 5.1: Django Auth Engine Setup

#### Task ID: M5-001
*   **Title:** Setup Custom Django User Model & Schema Migrations
*   **Description:** Define a custom User model inheriting from `AbstractUser` utilizing UUIDv4 keys and custom role parameters (Admin, Lead, Employee, Client).
*   **Why this task exists:** Implements user roles and database design requirements.
*   **Dependencies:** M1-005
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/users/models.py`
    *   `/apps/backend/core/settings.py`
*   **Acceptance Criteria:**
    *   Django user creation commands create valid database rows containing custom UUID identifiers.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M5-002
*   **Title:** Configure JWT Auth Views (Login, Refresh, Logout) in Django
*   **Description:** Integrate `django-rest-framework-simplejwt`. Build authentication views to handle access tokens and refresh tokens.
*   **Why this task exists:** Implements backend token-based security workflows.
*   **Dependencies:** M5-001
*   **Files likely affected:**
    *   `/apps/backend/requirements.txt`
    *   `/apps/backend/core/urls.py`
    *   [NEW] `/apps/backend/apps/users/views.py`
*   **Acceptance Criteria:**
    *   Calling `/api/v1/auth/token/` returns valid access and refresh keys.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

#### Task ID: M5-003
*   **Title:** Implement Django API Role-Based Authorization Guards
*   **Description:** Implement custom permission classes (`IsAdminUser`, `IsTeamLead`, `IsEmployee`, `IsClient`) to restrict view access.
*   **Why this task exists:** Implements API security and permissions gating.
*   **Dependencies:** M5-002
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/users/permissions.py`
*   **Acceptance Criteria:**
    *   Requests failing role conditions receive a 403 Forbidden error response.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

### Phase 5.2: Frontend NextAuth Integration

#### Task ID: M5-004
*   **Title:** Integrate NextAuth.js and Configure Credentials Provider
*   **Description:** Install NextAuth.js inside the Next.js app and build a credentials provider linking to backend endpoints.
*   **Why this task exists:** Bridges frontend routing to Django authentication states.
*   **Dependencies:** M1-002, M5-002
*   **Files likely affected:**
    *   `/apps/frontend/package.json`
    *   [NEW] `/apps/frontend/src/app/api/auth/[...nextauth]/route.ts`
*   **Acceptance Criteria:**
    *   NextAuth session calls fetch tokens and save details correctly.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Critical

#### Task ID: M5-005
*   **Title:** Implement HttpOnly Cookie Security Middleware
*   **Description:** Create a Next.js API route handler to securely store refresh tokens inside `HttpOnly` cookie layers.
*   **Why this task exists:** Secures tokens against XSS exfiltration.
*   **Dependencies:** M5-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/api/auth/token/route.ts`
*   **Acceptance Criteria:**
    *   Refresh tokens are absent from document cookies accessible by scripts.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M5-006
*   **Title:** Build Frontend Login Page & Form Component
*   **Description:** Implement the login UI page `/login` containing progressive input validations.
*   **Why this task exists:** Marketing entrance to the app dashboards.
*   **Dependencies:** M2-006, M5-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(auth)/login/page.tsx`
    *   [NEW] `/apps/frontend/src/components/forms/login-form.tsx`
*   **Acceptance Criteria:**
    *   Successful submissions redirect users to the dashboard.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M5-007
*   **Title:** Build Frontend Registration & Profile Creation Page
*   **Description:** Build `/register` allowing new users to create accounts and configure initial profiles.
*   **Why this task exists:** App registration entry point.
*   **Dependencies:** M2-006, M5-006
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(auth)/register/page.tsx`
    *   [NEW] `/apps/frontend/src/components/forms/register-form.tsx`
*   **Acceptance Criteria:**
    *   Submitting forms registers new users and initializes profile settings.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3.5 hours
*   **Priority:** High

#### Task ID: M5-008
*   **Title:** Build Forgot & Reset Password Flow Pages
*   **Description:** Implement password recovery screens at `/forgot-password` and `/reset-password`.
*   **Why this task exists:** Standard user recovery.
*   **Dependencies:** M2-006, M5-006
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(auth)/forgot-password/page.tsx`
    *   [NEW] `/apps/frontend/src/app/(auth)/reset-password/page.tsx`
*   **Acceptance Criteria:**
    *   Submitting the form requests a recovery email link.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M5-009
*   **Title:** Implement Frontend Role Routing and HOC Gates
*   **Description:** Create navigation hooks and Higher-Order Components (HOCs) to restrict client-side dashboard access based on User roles.
*   **Why this task exists:** Prevents users from rendering dashboard views they don't have access to.
*   **Dependencies:** M5-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/shared/role-gate.tsx`
    *   [NEW] `/apps/frontend/src/hooks/use-role.ts`
*   **Acceptance Criteria:**
    *   Accessing a restricted path without the matching role redirects to the home or fallback route.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

---

## Milestone 6: Dashboard Foundation

### Phase 6.1: Core Dashboard Frame & Widgets

#### Task ID: M6-001
*   **Title:** Build Dashboard Layout Shell with Page Boundaries
*   **Description:** Create the core structure for the `/dashboard` route group, incorporating sidebars, headers, and scroll-contained body frames.
*   **Why this task exists:** Implements layout foundations defined in Architecture Section 15.
*   **Dependencies:** M5-009
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/layout.tsx`
*   **Acceptance Criteria:**
    *   Dashboard wraps page elements inside structural containers.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M6-002
*   **Title:** Build Collapsible Dashboard Sidebar component
*   **Description:** Implement the sidebar, supporting collapsible widths, text-label fades, and hover pill animations.
*   **Why this task exists:** Implements Sidebar specifications from Motion System Section 28.1.
*   **Dependencies:** M2-005, M6-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/layout/sidebar.tsx`
*   **Acceptance Criteria:**
    *   Pills move smoothly to the active route.
    *   Labels fade out completely before width transitions collapse the sidebar.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

#### Task ID: M6-003
*   **Title:** Build Dashboard TopBar Header
*   **Description:** Build the TopBar containing navigation breadcrumbs, dynamic search, user profile menu, and notification bell indicators.
*   **Why this task exists:** Implements header utility components.
*   **Dependencies:** M2-008, M2-011, M6-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/layout/top-bar.tsx`
*   **Acceptance Criteria:**
    *   Breadcrumbs accurately render path structures (e.g. Dashboard > Projects).
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M6-004
*   **Title:** Build Dashboard StatWidget Component
*   **Description:** Build the metric display card with trend markers and layout constraints.
*   **Why this task exists:** Implements widgets from Design System Section 25.1.
*   **Dependencies:** M2-009
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/shared/stat-widget.tsx`
*   **Acceptance Criteria:**
    *   Widgets display numerical states with corresponding styling based on metric trends.
*   **Estimated Complexity:** S
*   **Estimated Time:** 2.5 hours
*   **Priority:** High

#### Task ID: M6-005
*   **Title:** Build Dashboard Activity Feed Component
*   **Description:** Build the chronological feed listing system updates, complete with action-specific color indicators.
*   **Why this task exists:** Implements components from Design System Section 25.2.
*   **Dependencies:** M2-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/activity-feed.tsx`
*   **Acceptance Criteria:**
    *   Feed renders list items with correct status indicators.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

#### Task ID: M6-006
*   **Title:** Build Dashboard Notification Drawer Panel
*   **Description:** Implement the slide-out drawer listing unread notifications and exposing click-to-dismiss handles.
*   **Why this task exists:** Central system dashboard alerts panel.
*   **Dependencies:** M2-012, M6-003
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/notifications-panel.tsx`
*   **Acceptance Criteria:**
    *   Unread notifications clear when clicked.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

---

## Milestone 7: Client Dashboard

### Phase 7.1: Client Portal Interface

#### Task ID: M7-001
*   **Title:** Build Client Overview Main Page Route
*   **Description:** Implement `/dashboard/client` displaying active project summary cards, invoice listings, and a fast quote widget link.
*   **Why this task exists:** Entry landing page for logged-in agency clients.
*   **Dependencies:** M5-009, M6-004, M6-005
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/client/page.tsx`
*   **Acceptance Criteria:**
    *   Page validates client roles and lists client-specific metrics.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M7-002
*   **Title:** Build Client Project List & Progress Tracker Route
*   **Description:** Build `/dashboard/client/projects` listing contracted projects alongside progress bars and milestone descriptions.
*   **Why this task exists:** Implements client project transparency goals.
*   **Dependencies:** M2-011, M7-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/client/projects/page.tsx`
*   **Acceptance Criteria:**
    *   Progress bars calculate percentages based on completed milestones.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M7-003
*   **Title:** Build Client Project Detail Route
*   **Description:** Implement `/dashboard/client/projects/[id]` showcasing detailed milestone descriptions, deliverables, and billing records.
*   **Why this task exists:** Project deep-dive details portal.
*   **Dependencies:** M7-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/client/projects/[id]/page.tsx`
*   **Acceptance Criteria:**
    *   Milestones load and render matching status indicators.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

---

## Milestone 8: Employee Dashboard

### Phase 8.1: Employee Productivity Portal

#### Task ID: M8-001
*   **Title:** Build Employee Overview Main Page Route
*   **Description:** Implement `/dashboard/employee` showing task progress widgets and active timesheet status panels.
*   **Why this task exists:** Operational landing page for agency engineers and designers.
*   **Dependencies:** M5-009, M6-004, M6-005
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/employee/page.tsx`
*   **Acceptance Criteria:**
    *   Page validates employee roles and loads employee metrics.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M8-002
*   **Title:** Build Employee Task List Page Route
*   **Description:** Build `/dashboard/employee/tasks` with filter controls (Overdue, Today, Scheduled) and inline status dropdowns.
*   **Why this task exists:** Central work manager for agency employees.
*   **Dependencies:** M2-008, M2-010, M8-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/employee/tasks/page.tsx`
*   **Acceptance Criteria:**
    *   Tasks filter dynamically.
    *   Inline actions successfully update data fields.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4.5 hours
*   **Priority:** High

#### Task ID: M8-003
*   **Title:** Build Employee Time Log Tracker Interface
*   **Description:** Build a time logging interface within the Employee dashboard, supporting manual hour inputs and timers.
*   **Why this task exists:** Enables internal billing and cost estimation.
*   **Dependencies:** M2-006, M8-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/time-tracker.tsx`
    *   [NEW] `/apps/frontend/src/app/(dashboard)/employee/timesheets/page.tsx`
*   **Acceptance Criteria:**
    *   Starting timers tracks minutes continuously.
    *   Submitting timesheets updates backend records.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

---

## Milestone 9: Admin Dashboard

### Phase 9.1: Master Agency Controls

#### Task ID: M9-001
*   **Title:** Build Admin Overview Main Page Route
*   **Description:** Implement `/dashboard/admin` displaying high-level widgets (Total Revenue, Active Leads, Task Velocity, Support Health).
*   **Why this task exists:** Master business intelligence view for admin roles.
*   **Dependencies:** M5-009, M6-004, M6-005
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/admin/page.tsx`
*   **Acceptance Criteria:**
    *   Page validates admin role constraints.
    *   Stat widgets render calculated revenue aggregates.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M9-002
*   **Title:** Build Admin User Directory Management Page
*   **Description:** Implement `/dashboard/admin/users` containing filterable tables of active clients, employees, and admins.
*   **Why this task exists:** Core user and role management interface.
*   **Dependencies:** M2-012, M9-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/admin/users/page.tsx`
*   **Acceptance Criteria:**
    *   Admin can edit user roles via popup dialogs.
    *   Disabled status indicators correctly restrict user access.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Critical

#### Task ID: M9-003
*   **Title:** Build Admin Project & Lead Creation Dialog
*   **Description:** Create the admin project onboarding interface allowing manual additions of new clients, scopes, budgets, and key deliverables.
*   **Why this task exists:** Enables manually creating projects and leads.
*   **Dependencies:** M2-006, M2-012, M9-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/admin-project-creator.tsx`
*   **Acceptance Criteria:**
    *   Submitting forms registers new projects and triggers automated task updates.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

---

## Milestone 10: Project Management

### Phase 10.1: Project Schema & API Service Layer

#### Task ID: M10-001
*   **Title:** Design Database Models for Projects, Milestones, and Tasks
*   **Description:** Create PostgreSQL backend tables for Projects, Milestones, and Tasks, specifying foreign key constraints and audit columns.
*   **Why this task exists:** Structural foundation for all project management actions.
*   **Dependencies:** M1-005
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/projects/models.py`
*   **Acceptance Criteria:**
    *   `makemigrations` runs successfully, creating database tables with UUID keys.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

#### Task ID: M10-002
*   **Title:** Create Django REST API Views for Projects, Milestones, and Tasks
*   **Description:** Build viewsets and serializers exposing CRUD endpoints for `/api/v1/projects/`, `/api/v1/milestones/`, and `/api/v1/tasks/`.
*   **Why this task exists:** Connects frontend dashboards to backend database records.
*   **Dependencies:** M10-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/projects/serializers.py`
    *   [NEW] `/apps/backend/apps/projects/views.py`
    *   `/apps/backend/core/urls.py`
*   **Acceptance Criteria:**
    *   Authenticated calls return correct payload structures.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Critical

#### Task ID: M10-003
*   **Title:** Build Frontend Kanban Board Component Layout
*   **Description:** Implement the Kanban Board UI columns (To Do, In Progress, In Review, Done) to display active tasks.
*   **Why this task exists:** Implements Kanban specifications from Design System Section 25.4.
*   **Dependencies:** M2-009, M6-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/kanban-board.tsx`
    *   [NEW] `/apps/frontend/src/components/dashboard/kanban-column.tsx`
    *   [NEW] `/apps/frontend/src/components/dashboard/kanban-card.tsx`
*   **Acceptance Criteria:**
    *   Board correctly lists columns and maps tasks based on status fields.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M10-004
*   **Title:** Integrate Drag-and-Drop Interaction on Kanban Board
*   **Description:** Integrate Framer Motion or `@hello-pangea/dnd` to enable dragging cards between columns and saving status changes to the API.
*   **Why this task exists:** Implements intuitive drag-and-drop task management.
*   **Dependencies:** M10-003, M10-002
*   **Files likely affected:**
    *   `/apps/frontend/src/components/dashboard/kanban-board.tsx`
*   **Acceptance Criteria:**
    *   Cards snap back on invalid targets.
    *   Successful drops trigger API calls that update status fields.
*   **Estimated Complexity:** L
*   **Estimated Time:** 6 hours
*   **Priority:** High

#### Task ID: M10-005
*   **Title:** Build Task Creation & Edition Sliding Sheet
*   **Description:** Implement a sliding details drawer for creating and editing tasks. Include input fields for title, assignee, description, priority, and due date.
*   **Why this task exists:** Allows modifying individual task details.
*   **Dependencies:** M2-006, M2-012, M10-003
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/task-editor-sheet.tsx`
*   **Acceptance Criteria:**
    *   Form validations display correct warning states.
    *   Saving the form updates tasks dynamically on the board.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

---

## Milestone 11: Payments

### Phase 11.1: Billing Database, Stripe Gateway, and PDF Invoicing

#### Task ID: M11-001
*   **Title:** Design Database Models for Invoices and Transactions
*   **Description:** Build PostgreSQL tables for Invoices and Billing Transactions, linking them to Projects and Users.
*   **Why this task exists:** Implements backend data modeling for payments.
*   **Dependencies:** M10-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/billing/models.py`
*   **Acceptance Criteria:**
    *   `makemigrations` and `migrate` execute successfully.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M11-002
*   **Title:** Integrate Stripe SDK Wrapper Service on Django Backend
*   **Description:** Install Stripe SDK and implement a wrapper service to create payment intents, handle invoices, and configure sandbox credentials.
*   **Why this task exists:** Core gateway helper mapping DRF to external Stripe endpoints.
*   **Dependencies:** M11-001
*   **Files likely affected:**
    *   `/apps/backend/requirements.txt`
    *   [NEW] `/apps/backend/apps/billing/services.py`
*   **Acceptance Criteria:**
    *   Initialization calls return valid Stripe transaction intent identifiers in tests.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Critical

#### Task ID: M11-003
*   **Title:** Build Invoice PDF Generator Celery Task
*   **Description:** Create an asynchronous Celery task using Weasyprint or ReportLab to generate branded invoice PDFs and upload them to AWS S3.
*   **Why this task exists:** Offloads heavy invoice PDF generation from the API request cycle.
*   **Dependencies:** M1-006, M11-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/billing/tasks.py`
*   **Acceptance Criteria:**
    *   Worker compiles PDFs containing dynamic details and successfully uploads them to S3.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M11-004
*   **Title:** Create Django REST API Views for Billing & Invoices
*   **Description:** Build DRF views exposing `/api/v1/invoices/` to clients and admins. Exclude client access to other accounts' billing files.
*   **Why this task exists:** Exposes invoice status and PDF download URLs.
*   **Dependencies:** M5-003, M11-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/billing/serializers.py`
    *   [NEW] `/apps/backend/apps/billing/views.py`
*   **Acceptance Criteria:**
    *   Requests from clients with mismatched project IDs return 403.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

#### Task ID: M11-005
*   **Title:** Build Frontend Client Billing Overview Page
*   **Description:** Build `/dashboard/client/billing` to list invoices and display status badges (Paid, Pending, Overdue).
*   **Why this task exists:** Portal showing financial details to clients.
*   **Dependencies:** M2-010, M7-001, M11-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/client/billing/page.tsx`
*   **Acceptance Criteria:**
    *   The page displays invoices with correct status badges.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M11-006
*   **Title:** Implement Stripe Checkout Component & Callback Redirect Flow
*   **Description:** Integrate Stripe Elements or redirect handlers to enable processing invoice payments via secure checkout interfaces.
*   **Why this task exists:** Enables processing client credit card transactions.
*   **Dependencies:** M11-002, M11-005
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/stripe-checkout.tsx`
*   **Acceptance Criteria:**
    *   Successful card checkouts redirect users to the payment confirmation success screen.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Critical

#### Task ID: M11-007
*   **Title:** Build Django Webhook Endpoint for Stripe Event Hooks
*   **Description:** Implement `/api/v1/billing/webhooks/stripe/` to verify payloads and mark invoices as paid on success events.
*   **Why this task exists:** Handles out-of-band payment status updates.
*   **Dependencies:** M11-002
*   **Files likely affected:**
    *   `/apps/backend/apps/billing/views.py`
*   **Acceptance Criteria:**
    *   Verified Stripe event signatures mark invoices as paid in the database.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

---

## Milestone 12: Chat

### Phase 12.1: Real-Time Chat Infrastructure

#### Task ID: M12-001
*   **Title:** Design Database Models for Rooms and Messages
*   **Description:** Build PostgreSQL tables for Chat Rooms and Messages. Include auditing fields and indexing for timestamp lookups.
*   **Why this task exists:** Persistent database storage for platform chat features.
*   **Dependencies:** M5-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/communications/models.py`
*   **Acceptance Criteria:**
    *   `makemigrations` and `migrate` execute successfully.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M12-002
*   **Title:** Setup Django Channels & Redis WebSocket Server
*   **Description:** Install `channels` and `channels-redis`. Configure ASGI backend protocols inside settings modules to support WebSocket routing.
*   **Why this task exists:** Adds WebSocket capability to the API application.
*   **Dependencies:** M1-004, M12-001
*   **Files likely affected:**
    *   `/apps/backend/requirements.txt`
    *   `/apps/backend/core/asgi.py`
    *   `/apps/backend/core/settings.py`
    *   [NEW] `/apps/backend/apps/communications/routing.py`
*   **Acceptance Criteria:**
    *   WebSocket connections open on `ws://` routes and resolve handshake phases.
*   **Estimated Complexity:** L
*   **Estimated Time:** 6 hours
*   **Priority:** Critical

#### Task ID: M12-003
*   **Title:** Build Real-Time Message Consumers in Django Channels
*   **Description:** Create Django Channels consumers to validate user auth tokens, join room groups, broadcast new messages, and save content.
*   **Why this task exists:** Backend coordinator for real-time messaging payloads.
*   **Dependencies:** M12-002
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/communications/consumers.py`
*   **Acceptance Criteria:**
    *   Sending a WebSocket message broadcasts it to other connected clients in the room.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Critical

#### Task ID: M12-004
*   **Title:** Build Frontend Chat Window Component & Layout
*   **Description:** Implement the sidebar user directory list and chat body frame, complete with scroll containers and sender-aligned message templates.
*   **Why this task exists:** Frontend interface for client-agency communications.
*   **Dependencies:** M2-011, M6-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/chat/page.tsx`
    *   [NEW] `/apps/frontend/src/components/dashboard/chat-window.tsx`
    *   [NEW] `/apps/frontend/src/components/dashboard/chat-message.tsx`
*   **Acceptance Criteria:**
    *   Chat logs stay pinned to the bottom on new message entries.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

#### Task ID: M12-005
*   **Title:** Setup WebSocket Connection Hook in Frontend
*   **Description:** Create a custom hook `useWebSocket` to manage connections, handles auto-reconnects, and updates local state.
*   **Why this task exists:** Client-side manager for WebSockets.
*   **Dependencies:** M12-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/hooks/use-websocket.ts`
*   **Acceptance Criteria:**
    *   System reconnects automatically if the server drops the connection.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M12-006
*   **Title:** Implement Chat Unread Counter & Badge Indicators
*   **Description:** Implement count indicators displaying total unread messages in the Sidebar and TopBar header.
*   **Why this task exists:** Highlights active chat messages.
*   **Dependencies:** M2-010, M6-003, M12-005
*   **Files likely affected:**
    *   `/apps/frontend/src/components/layout/sidebar.tsx`
    *   `/apps/frontend/src/components/layout/top-bar.tsx`
*   **Acceptance Criteria:**
    *   Receiving a message increases the unread count when not viewing the channel.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

---

## Milestone 13: Support

### Phase 13.1: Support Ticketing System

#### Task ID: M13-001
*   **Title:** Design Database Models for Support Tickets and Replies
*   **Description:** Build PostgreSQL tables for Support Tickets and Ticket Replies. Include fields for status, priority, and categories.
*   **Why this task exists:** Underlying ticketing data layer.
*   **Dependencies:** M5-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/support/models.py`
*   **Acceptance Criteria:**
    *   `makemigrations` and `migrate` execute successfully.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M13-002
*   **Title:** Create Django REST API Views for Support Tickets
*   **Description:** Build views and serializers exposing CRUD endpoints for `/api/v1/support/tickets/` and `/api/v1/support/tickets/{id}/replies/`.
*   **Why this task exists:** Exposes support operations to the frontend.
*   **Dependencies:** M13-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/support/serializers.py`
    *   [NEW] `/apps/backend/apps/support/views.py`
*   **Acceptance Criteria:**
    *   DRF endpoints validate inputs and return expected data structures.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M13-003
*   **Title:** Build Frontend Support Ticket Creation form
*   **Description:** Build `/dashboard/support/new` to let clients submit support tickets with file attachments.
*   **Why this task exists:** Form interface for ticket submissions.
*   **Dependencies:** M2-006, M6-001, M13-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/support/new/page.tsx`
    *   [NEW] `/apps/frontend/src/components/forms/support-form.tsx`
*   **Acceptance Criteria:**
    *   Submitting the form uploads attachments and registers the support ticket.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M13-004
*   **Title:** Build Frontend Support Tickets Directory List
*   **Description:** Build `/dashboard/support` listing tickets inside filterable tables with status badges.
*   **Why this task exists:** Overview dashboard for all support tickets.
*   **Dependencies:** M2-010, M6-001, M13-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/support/page.tsx`
*   **Acceptance Criteria:**
    *   Tickets filter correctly by status and priority.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M13-005
*   **Title:** Build Support Ticket Details & Reply Editor Route
*   **Description:** Build `/dashboard/support/[id]` to display ticket chat logs and an editor for replies.
*   **Why this task exists:** Handles ticket resolutions.
*   **Dependencies:** M2-006, M13-004
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/support/[id]/page.tsx`
*   **Acceptance Criteria:**
    *   Submitting responses appends them to logs and updates ticket statuses.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

---

## Milestone 14: Analytics

### Phase 14.1: Metrics Aggregation & Charting

#### Task ID: M14-001
*   **Title:** Build Celery Tasks for Weekly Metrics Aggregation
*   **Description:** Create Celery tasks that aggregate revenue, timesheets, and task completion velocity into database summary tables.
*   **Why this task exists:** Offloads slow reporting queries from dashboard views.
*   **Dependencies:** M1-006, M11-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/analytics/tasks.py`
    *   [NEW] `/apps/backend/apps/analytics/models.py`
*   **Acceptance Criteria:**
    *   Celery runs scheduled tasks and populates data tables.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M14-002
*   **Title:** Create Django REST API Views for Analytics
*   **Description:** Create endpoints exposing analytics summaries to admin users.
*   **Why this task exists:** Supplies frontend dashboard metrics.
*   **Dependencies:** M14-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/analytics/views.py`
*   **Acceptance Criteria:**
    *   Non-admin roles receive 403 errors on access attempts.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M14-003
*   **Title:** Build Admin Dashboard Chart Widgets
*   **Description:** Build responsive chart displays (area charts for revenue, bar charts for timesheets) using Recharts.
*   **Why this task exists:** Implements visual charts from Design System Section 26.
*   **Dependencies:** M2-009, M9-001, M14-002
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/components/dashboard/chart-card.tsx`
*   **Acceptance Criteria:**
    *   Charts load inside parent containers and support hover tooltips.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

---

## Milestone 15: AI Features

### Phase 15.1: LLM Core Integration & User Interface

#### Task ID: M15-001
*   **Title:** Setup LLM Gateway Service on Django Backend
*   **Description:** Integrate the `openai` or `anthropic` client SDK. Implement wrapper services with exception handling.
*   **Why this task exists:** Core API helper for processing prompt inputs.
*   **Dependencies:** M1-003
*   **Files likely affected:**
    *   `/apps/backend/requirements.txt`
    *   [NEW] `/apps/backend/apps/ai/services.py`
*   **Acceptance Criteria:**
    *   Helper functions process prompts and return clean string content.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M15-002
*   **Title:** Build Auto-Estimation API Endpoint for Project Tasks
*   **Description:** Build `/api/v1/ai/estimate-task/` to parse title descriptions and return hour/complexity suggestions.
*   **Why this task exists:** Core AI service assisting employees.
*   **Dependencies:** M10-002, M15-001
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/ai/views.py`
*   **Acceptance Criteria:**
    *   Submitting task parameters returns estimation arrays containing complexity ranges.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Medium

#### Task ID: M15-003
*   **Title:** Build Task Auto-Estimate Component inside Task Editor
*   **Description:** Integrate an auto-estimate button within the frontend task editing dialog, fetching data from the estimation endpoint.
*   **Why this task exists:** Frontend integration for automated estimations.
*   **Dependencies:** M10-005, M15-002
*   **Files likely affected:**
    *   `/apps/frontend/src/components/dashboard/task-editor-sheet.tsx`
*   **Acceptance Criteria:**
    *   Clicking the button updates form values with suggested inputs.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

#### Task ID: M15-004
*   **Title:** Build AI Client assistant Interactive Chat UI
*   **Description:** Build a floating chat widget `/dashboard/client/ai-assistant` displaying chat lists and response streams.
*   **Why this task exists:** Direct AI helper channel for clients.
*   **Dependencies:** M2-006, M2-011, M6-001, M15-001
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/src/app/(dashboard)/client/ai-assistant/page.tsx`
    *   [NEW] `/apps/frontend/src/components/dashboard/ai-chat-window.tsx`
*   **Acceptance Criteria:**
    *   Chat logs render response blocks and animate typing states.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** Medium

---

## Milestone 16: Testing

### Phase 16.1: Test Runners & Core Coverage

#### Task ID: M16-001
*   **Title:** Configure Pytest Test Suite inside Django Backend
*   **Description:** Install `pytest-django`, `pytest-cov`, and configure pytest settings files.
*   **Why this task exists:** Implements backend testing frameworks defined in Architecture Section 18.
*   **Dependencies:** M1-005
*   **Files likely affected:**
    *   `/apps/backend/requirements.txt`
    *   [NEW] `/apps/backend/pytest.ini`
*   **Acceptance Criteria:**
    *   Running `pytest` executes tests and displays coverage metrics.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M16-002
*   **Title:** Configure Vitest & React Testing Library inside Frontend
*   **Description:** Install Vitest, jsdom, and React Testing Library dependencies. Build test configuration scripts.
*   **Why this task exists:** Implements frontend testing frameworks defined in Architecture Section 18.
*   **Dependencies:** M1-002
*   **Files likely affected:**
    *   `/apps/frontend/package.json`
    *   [NEW] `/apps/frontend/vitest.config.ts`
*   **Acceptance Criteria:**
    *   `pnpm test` runs vitest suites and displays coverage metrics.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M16-003
*   **Title:** Configure Playwright E2E testing framework
*   **Description:** Install Playwright inside the frontend codebase, configure target variables, and setup local test script runners.
*   **Why this task exists:** Implements browser-level end-to-end journey tests.
*   **Dependencies:** M1-002
*   **Files likely affected:**
    *   `/apps/frontend/package.json`
    *   [NEW] `/apps/frontend/playwright.config.ts`
*   **Acceptance Criteria:**
    *   `playwright test` runs successfully, mounting tests and reporting results.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Critical

#### Task ID: M16-004
*   **Title:** Implement Core Auth & Role Integration Tests
*   **Description:** Write tests checking authorization rules and JWT token behaviors.
*   **Why this task exists:** Secures authentication logic.
*   **Dependencies:** M5-003, M5-009, M16-001, M16-002
*   **Files likely affected:**
    *   [NEW] `/apps/backend/apps/users/tests/test_auth.py`
    *   [NEW] `/apps/frontend/src/features/auth/tests/auth.test.ts`
*   **Acceptance Criteria:**
    *   Mock requests with invalid signatures trigger authorization failures.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** High

#### Task ID: M16-005
*   **Title:** Implement E2E Playwright Tests for Core Client Funnel
*   **Description:** Write Playwright E2E browser tests tracking user registration, quote submissions, and project creations.
*   **Why this task exists:** Validates business-critical user conversions.
*   **Dependencies:** M4-009, M5-007, M16-003
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/tests/e2e/client-funnel.spec.ts`
*   **Acceptance Criteria:**
    *   Automated scripts successfully fill form steps, submit, and confirm success messages.
*   **Estimated Complexity:** M
*   **Estimated Time:** 5 hours
*   **Priority:** High

---

## Milestone 17: Performance

### Phase 17.1: Bundle Optimizations & Benchmarking

#### Task ID: M17-001
*   **Title:** Configure Next.js Bundle Analyzer
*   **Description:** Install `@next/bundle-analyzer` and configure scripts to analyze size distributions.
*   **Why this task exists:** Identifies optimization targets.
*   **Dependencies:** M1-002
*   **Files likely affected:**
    *   `/apps/frontend/package.json`
    *   `/apps/frontend/next.config.js`
*   **Acceptance Criteria:**
    *   Running build analyses creates graphical bundle report files.
*   **Estimated Complexity:** XS
*   **Estimated Time:** 2 hours
*   **Priority:** High

#### Task ID: M17-002
*   **Title:** Configure Next.js Dynamic Imports on Heavy Components
*   **Description:** Setup dynamic imports (`next/dynamic`) for components containing large libraries (Three.js WebGL scenes, Recharts data visuals).
*   **Why this task exists:** Decreases initial bundle size and speeds up page load times.
*   **Dependencies:** M3-006, M14-003, M17-001
*   **Files likely affected:**
    *   `/apps/frontend/src/app/(marketing)/page.tsx`
    *   `/apps/frontend/src/components/dashboard/chart-card.tsx`
*   **Acceptance Criteria:**
    *   Initial page load weight stays below 150kb.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High

#### Task ID: M17-003
*   **Title:** Configure Lighthouse CI check scripts
*   **Description:** Integrate Lighthouse CI into local workflows to enforce performance budgets (LCP, INP, CLS).
*   **Why this task exists:** Enforces performance budgets programmatically.
*   **Dependencies:** M16-002
*   **Files likely affected:**
    *   [NEW] `/.lighthouserc.js`
*   **Acceptance Criteria:**
    *   Running tests fails if LCP rises above 2.5 seconds or CLS exceeds 0.1.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** Medium

---

## Milestone 18: Deployment

### Phase 18.1: Dockerization, Terraform Infrastructure, & CI/CD Pipelines

#### Task ID: M18-001
*   **Title:** Build Production Dockerfiles for Frontend & Backend
*   **Description:** Build multi-stage production Dockerfiles for Next.js, Django, and Celery, optimizing layer sizes.
*   **Why this task exists:** Containerizes codebases for cloud platforms.
*   **Dependencies:** M1-002, M1-003
*   **Files likely affected:**
    *   [NEW] `/apps/frontend/Dockerfile`
    *   [NEW] `/apps/backend/Dockerfile`
*   **Acceptance Criteria:**
    *   `docker build` compiles containers without errors.
*   **Estimated Complexity:** M
*   **Estimated Time:** 4 hours
*   **Priority:** Critical

#### Task ID: M18-002
*   **Title:** Write Terraform Configurations for Core AWS Infrastructure
*   **Description:** Write Terraform scripts to provision AWS ECS clusters, RDS PostgreSQL instances, Redis ElastiCache, S3 buckets, and CloudFront.
*   **Why this task exists:** Codifies infrastructure configurations (IaC).
*   **Dependencies:** M18-001
*   **Files likely affected:**
    *   [NEW] `/infrastructure/main.tf`
    *   [NEW] `/infrastructure/variables.tf`
    *   [NEW] `/infrastructure/outputs.tf`
*   **Acceptance Criteria:**
    *   `terraform validate` compiles configurations.
*   **Estimated Complexity:** L
*   **Estimated Time:** 8 hours
*   **Priority:** High

#### Task ID: M18-003
*   **Title:** Build GitHub Actions Deployment Workflows
*   **Description:** Configure workflows compiling Docker files, running test runner suites, pushing to ECR registries, and triggering migrations.
*   **Why this task exists:** Implements CI/CD pipelines defined in Architecture Section 20.
*   **Dependencies:** M16-004, M18-001, M18-002
*   **Files likely affected:**
    *   [NEW] `/.github/workflows/deploy.yml`
*   **Acceptance Criteria:**
    *   Pushing to the target branch executes builds, runs tests, and deploys containers to staging.
*   **Estimated Complexity:** M
*   **Estimated Time:** 6 hours
*   **Priority:** Critical

#### Task ID: M18-004
*   **Title:** Integrate Sentry APM Monitoring
*   **Description:** Install Sentry SDKs on frontend and backend apps. Expose configuration tokens using environment variables.
*   **Why this task exists:** Production crash reporting and logging.
*   **Dependencies:** M1-002, M1-003
*   **Files likely affected:**
    *   `/apps/frontend/next.config.js`
    *   `/apps/backend/core/settings.py`
*   **Acceptance Criteria:**
    *   Mock errors dispatch reports and log correctly.
*   **Estimated Complexity:** S
*   **Estimated Time:** 3 hours
*   **Priority:** High
