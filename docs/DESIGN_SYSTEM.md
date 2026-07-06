# DevSpark — Design System

> The visual constitution of DevSpark.
> Every color, every pixel, every curve, every shadow, every transition — defined here.
> This document is the single source of truth for all visual decisions.
> A designer who reads this document should be able to recreate the product without seeing a single screenshot.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Visual Language](#2-visual-language)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing System](#5-spacing-system)
6. [Grid System](#6-grid-system)
7. [Container Widths](#7-container-widths)
8. [Responsive Breakpoints](#8-responsive-breakpoints)
9. [Glassmorphism Rules](#9-glassmorphism-rules)
10. [Border Rules](#10-border-rules)
11. [Shadow Rules](#11-shadow-rules)
12. [Glow Rules](#12-glow-rules)
13. [Surface System](#13-surface-system)
14. [Icon System](#14-icon-system)
15. [Illustration Style](#15-illustration-style)
16. [Image Style](#16-image-style)
17. [Photography Rules](#17-photography-rules)
18. [Card System](#18-card-system)
19. [Button System](#19-button-system)
20. [Input System](#20-input-system)
21. [Badge System](#21-badge-system)
22. [Chip System](#22-chip-system)
23. [Tables](#23-tables)
24. [Forms](#24-forms)
25. [Dashboard Components](#25-dashboard-components)
26. [Charts](#26-charts)
27. [Loading States](#27-loading-states)
28. [Empty States](#28-empty-states)
29. [Error States](#29-error-states)
30. [Success States](#30-success-states)
31. [Skeleton Loaders](#31-skeleton-loaders)
32. [Accessibility](#32-accessibility)
33. [Dark Theme Rules](#33-dark-theme-rules)
34. [Responsive Rules](#34-responsive-rules)
35. [Animation System](#35-animation-system)
36. [Component Naming Rules](#36-component-naming-rules)
37. [Design Tokens](#37-design-tokens)
38. [CSS Variables](#38-css-variables)
39. [Tailwind Tokens](#39-tailwind-tokens)
40. [Component Library](#40-component-library)
41. [Hero Design Rules](#41-hero-design-rules)
42. [Portfolio Rules](#42-portfolio-rules)
43. [Case Study Rules](#43-case-study-rules)
44. [Pricing Rules](#44-pricing-rules)
45. [Blog Rules](#45-blog-rules)
46. [Dashboard Rules](#46-dashboard-rules)
47. [Admin Rules](#47-admin-rules)
48. [Client Rules](#48-client-rules)
49. [Employee Rules](#49-employee-rules)

---

## 1. Design Philosophy

### 1.1 The Guiding Belief

DevSpark's design exists to make complexity disappear. Not to hide it. Not to simplify it falsely. But to absorb it — to take the hard work of understanding, organizing, and presenting information away from the user and onto ourselves. The measure of success is not beauty. It is clarity. Beauty follows clarity naturally.

### 1.2 Five Pillars

**Pillar 1 — Quiet Confidence**

The design never shouts. It never begs for attention. It presents itself with the calm assurance of something that was made by people who know exactly what they are doing. A single well-set headline with breathing room communicates more authority than a page full of animations, gradients, and effects fighting for the eye.

The rule: if a design element needs decoration to feel important, it is not important. Importance comes from hierarchy, placement, and content — not from visual noise.

**Pillar 2 — Deliberate Restraint**

Every visual decision is a conscious choice. A border exists because it creates necessary separation. A shadow exists because it communicates depth. An animation exists because it explains a transition. A color exists because it signals a meaning. If a visual element does not have a defensible reason to exist, it does not exist.

The test: point at any element and ask "why is this here?" If the answer is "it looks nice" — remove it. If the answer is "it separates these two content groups" or "it draws the eye to the primary action" — keep it.

**Pillar 3 — Functional Elegance**

Elegance is not ornamentation. Elegance is the feeling that arises when something complex works simply. A form that guides you through a multi-step process without confusion is elegant. A dashboard that shows you exactly what matters without forcing you to hunt is elegant. A navigation that takes you where you want to go in one click is elegant. The visual design serves this elegance — it does not create it.

**Pillar 4 — Material Honesty**

The dark surfaces in DevSpark are not just "dark mode." They are an intentional material choice. Dark surfaces recede. They create the illusion of depth. They make content — text, images, data — the focal point. Light elements on dark surfaces pop naturally, creating hierarchy without effort. The glassmorphic surfaces float above the dark ground, creating a spatial metaphor: the interface is layered, and the layers communicate meaning.

**Pillar 5 — Invisible Craft**

The highest form of craft is invisible. The user should not notice the 16px border radius, the 1.6 line height, the 64px section padding, or the 300ms ease-out transition. They should feel the result: that everything is comfortable, that nothing is jarring, that the experience flows. The craft is in the details that are never consciously perceived but always subconsciously felt.

### 1.3 What This Is Not

This design system does not produce:
- Dark themes with neon accents that look like a gaming dashboard
- Templates with stock photography and generic illustrations
- Over-animated pages where things slide, bounce, and scale constantly
- Glassmorphism for the sake of glassmorphism — every glass surface has a structural purpose
- "Modern" design that follows trends instead of serving function
- "Minimal" design that sacrifices usability for aesthetics
- "Premium" design that confuses expensive-looking with trustworthy

### 1.4 Reference Compass

When making visual decisions, ask: "Would this feel at home in..."

| Reference | What to borrow |
|---|---|
| **Stripe** | Content hierarchy, documentation clarity, trustworthy color palette |
| **Linear** | Surface depth, keyboard-first UX, interface density, clean data presentation |
| **Vercel** | Dark theme execution, typography confidence, border subtlety, deployment confidence |
| **Apple** | Whitespace courage, material metaphors, transition polish, accessibility rigor |
| **Notion** | Layout flexibility, content-first thinking, comfortable reading experience |
| **Framer** | Motion intentionality, visual richness without excess, canvas-grade craft |

---

## 2. Visual Language

### 2.1 Mood

The visual language of DevSpark communicates three things simultaneously:

1. **Competence** — "We are engineers who understand design, not designers who dabble in engineering."
2. **Calm** — "Working with us will not be stressful. We have a process. We are organized."
3. **Premium** — "We are not the cheapest option. We are the best value."

### 2.2 Visual Vocabulary

| Element | Role in the language |
|---|---|
| Dark backgrounds | Recession, depth, content focus, premium tone |
| Glass surfaces | Floating layers, interactive zones, elevated content |
| Amber/gold accent | Warmth, action, value, trust, human touch |
| Teal accent | Information, links, tags, secondary emphasis, modernity |
| White text on dark | Readability, contrast, crispness |
| Muted text | Hierarchy, secondary information, metadata |
| Thin borders | Structure without weight, separation without division |
| Generous spacing | Breathing room, importance, premium feel |
| Rounded corners | Approachability, modern feel, softness against the dark |
| Subtle gradients | Depth, dimension, spatial cues — never decorative |
| Controlled glow | Focal points, hover states, active elements — never ambient |

### 2.3 Visual Signature

What makes a DevSpark page instantly recognizable:

1. The dark depth — multiple surface layers creating a spatial hierarchy
2. The warm accent — amber/gold appearing sparingly at action points
3. The glass cards — translucent surfaces with subtle borders floating above the background
4. The type confidence — large, well-spaced headings with no decoration needed
5. The breathing room — sections separated by generous vertical space
6. The quiet motion — elements that appear gently, not dramatically

---

## 3. Color System

### 3.1 Philosophy

The color system is built on three principles:

1. **Semantic meaning over aesthetic preference.** Every color communicates a function. Background colors create depth. Text colors create hierarchy. Accent colors create action. Status colors create clarity. No color exists just because it "looks good."

2. **Restraint over variety.** The palette is intentionally small. Most of the interface is composed from the neutral scale (dark backgrounds, light text). Color is introduced sparingly and purposefully — for CTAs, status indicators, interactive states, and focal points.

3. **Accessible contrast as a hard requirement.** Every text-on-background combination meets WCAG 2.2 AA contrast requirements (4.5:1 for normal text, 3:1 for large text). This is not negotiable.

### 3.2 Color Palette

#### Neutral Scale (Background / Surface / Text)

The neutral scale uses a blue-gray undertone (saturation 14–20%, hue 220°). This avoids the flat, lifeless feeling of pure gray and the coldness of pure blue-gray. The slight warmth in the darker values and the slight coolness in the lighter values creates a comfortable, professional atmosphere.

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--neutral-950` | `hsl(222, 22%, 5%)` | `#0B0D11` | Deepest background, page base |
| `--neutral-900` | `hsl(220, 20%, 7%)` | `#0F1117` | Primary background |
| `--neutral-850` | `hsl(220, 18%, 9%)` | `#131620` | Slightly elevated background |
| `--neutral-800` | `hsl(220, 17%, 11%)` | `#171B26` | Card backgrounds, sidebar |
| `--neutral-750` | `hsl(220, 16%, 14%)` | `#1E2230` | Elevated surfaces, hover backgrounds |
| `--neutral-700` | `hsl(220, 15%, 17%)` | `#252A39` | Active backgrounds, selected states |
| `--neutral-600` | `hsl(220, 14%, 22%)` | `#303644` | Prominent borders, dividers |
| `--neutral-500` | `hsl(220, 12%, 30%)` | `#434A5C` | Muted borders, disabled states |
| `--neutral-400` | `hsl(215, 12%, 42%)` | `#5E6578` | Placeholder text, disabled text |
| `--neutral-300` | `hsl(215, 12%, 55%)` | `#7E8596` | Muted text, captions, timestamps |
| `--neutral-200` | `hsl(215, 14%, 70%)` | `#A3AAB8` | Secondary text, labels |
| `--neutral-100` | `hsl(215, 16%, 82%)` | `#C7CCD6` | Body text secondary |
| `--neutral-50` | `hsl(210, 20%, 92%)` | `#E6E9EF` | Body text primary |
| `--neutral-0` | `hsl(210, 25%, 97%)` | `#F4F5F8` | Headings, high-emphasis text |

#### Accent Primary — Amber/Gold

Amber was chosen over blue/purple/green because it conveys warmth, value, and trust without the corporate coldness of blue or the cliché of tech-purple. Gold has universal associations with quality and premium value. On dark backgrounds, amber provides exceptional visibility without the harshness of pure yellow or the aggressiveness of red.

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--amber-50` | `hsl(40, 95%, 95%)` | `#FEF7E6` | Amber tinted text (rare) |
| `--amber-100` | `hsl(40, 92%, 85%)` | `#FDE9B4` | Light amber for subtle fills |
| `--amber-200` | `hsl(39, 90%, 72%)` | `#F9D373` | Amber for icons on dark bg |
| `--amber-300` | `hsl(38, 92%, 62%)` | `#F5BE3E` | Hover state for amber CTAs |
| `--amber-400` | `hsl(37, 93%, 55%)` | `#F2A818` | Primary amber — CTAs, highlights, active states |
| `--amber-500` | `hsl(35, 90%, 48%)` | `#E8930D` | Pressed/active state |
| `--amber-600` | `hsl(32, 85%, 40%)` | `#BD720C` | Dark amber for contrast on lighter surfaces |
| `--amber-700` | `hsl(28, 80%, 32%)` | `#93560A` | Darkest amber (rare, text on light bg) |
| `--amber-glow-sm` | `hsl(37, 93%, 55%, 0.10)` | — | Small glow radius |
| `--amber-glow-md` | `hsl(37, 93%, 55%, 0.15)` | — | Medium glow radius |
| `--amber-glow-lg` | `hsl(37, 93%, 55%, 0.08)` | — | Large, diffuse glow |

#### Accent Secondary — Teal

Teal provides a cool counterpoint to the warm amber. It signals information, navigation, and secondary interactive elements. The combination of warm amber and cool teal creates a balanced palette that avoids monotony without introducing chaos.

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--teal-50` | `hsl(180, 60%, 95%)` | `#E6FAF8` | Teal tinted backgrounds (rare) |
| `--teal-100` | `hsl(180, 55%, 82%)` | `#AFEAE4` | Light teal for tags/chips |
| `--teal-200` | `hsl(180, 50%, 65%)` | `#6BD4C8` | Teal for icons |
| `--teal-300` | `hsl(180, 48%, 52%)` | `#45B8AD` | Default teal — links, tags, badges |
| `--teal-400` | `hsl(180, 50%, 42%)` | `#35998F` | Hover state for teal elements |
| `--teal-500` | `hsl(180, 52%, 34%)` | `#297A72` | Active/pressed state |
| `--teal-600` | `hsl(180, 50%, 26%)` | `#215E58` | Dark teal (rare) |
| `--teal-glow` | `hsl(180, 48%, 52%, 0.12)` | — | Teal glow |

#### Semantic Colors

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--success-400` | `hsl(145, 65%, 42%)` | `#25A55A` | Success text, icons, borders |
| `--success-500` | `hsl(145, 60%, 34%)` | `#228A4C` | Success backgrounds |
| `--success-glow` | `hsl(145, 65%, 42%, 0.12)` | — | Success glow |
| `--warning-400` | `hsl(38, 92%, 55%)` | `#F2A818` | Warning (shares amber-400) |
| `--warning-500` | `hsl(35, 88%, 45%)` | `#D88A10` | Warning backgrounds |
| `--warning-glow` | `hsl(38, 92%, 55%, 0.12)` | — | Warning glow |
| `--error-400` | `hsl(0, 72%, 55%)` | `#D64545` | Error text, icons, borders |
| `--error-500` | `hsl(0, 68%, 45%)` | `#C13030` | Error backgrounds |
| `--error-glow` | `hsl(0, 72%, 55%, 0.12)` | — | Error glow |
| `--info-400` | `hsl(210, 70%, 55%)` | `#3B82D6` | Informational elements |
| `--info-500` | `hsl(210, 65%, 45%)` | `#2B6CB0` | Info backgrounds |
| `--info-glow` | `hsl(210, 70%, 55%, 0.12)` | — | Info glow |

#### Gradient Definitions

Gradients are used sparingly — primarily for hero backgrounds, CTA sections, and selected premium elements. They must never be the primary visual feature of any component.

| Token | Value | Usage |
|---|---|---|
| `--gradient-hero` | `radial-gradient(ellipse 80% 60% at 50% 40%, hsl(220, 30%, 12%) 0%, hsl(222, 22%, 5%) 100%)` | Hero section background — subtle dark vignette |
| `--gradient-surface` | `linear-gradient(180deg, hsl(220, 18%, 11%) 0%, hsl(220, 18%, 9%) 100%)` | Tall cards and panels — subtle top-to-bottom darkening |
| `--gradient-accent` | `linear-gradient(135deg, hsl(37, 93%, 55%) 0%, hsl(28, 85%, 48%) 100%)` | Accent buttons and highlighted elements |
| `--gradient-cta-bg` | `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(37, 93%, 55%, 0.06) 0%, transparent 100%)` | Subtle background glow behind CTA sections |
| `--gradient-mesh` | (multi-stop radial) | Complex mesh gradient for hero backgrounds — used with very low opacity |
| `--gradient-border` | `linear-gradient(135deg, hsl(220, 14%, 25%) 0%, hsl(220, 14%, 15%) 100%)` | Subtle gradient borders for premium cards |

### 3.3 Color Application Rules

1. **The 90/8/2 rule.** 90% of the interface is neutral (dark backgrounds, light text). 8% is subtle structural color (borders, dividers, muted elements). 2% is accent color (CTAs, active states, important indicators). Violating this ratio makes the interface feel noisy.

2. **Amber for action.** The amber accent is reserved for elements the user should interact with: primary buttons, active navigation items, important badges, progress indicators, and conversion CTAs. If amber appears on a non-interactive element, it should be a conscious decision to draw attention.

3. **Teal for information.** Teal is used for links, tags, secondary badges, code elements, and informational indicators. It signals "this is clickable" or "this is a label" without the urgency of amber.

4. **Status colors for status only.** Green, yellow, red, and blue for success, warning, error, and info respectively. These colors never appear as decorative elements. They always communicate state.

5. **Never use color alone.** Every piece of information communicated by color must also be communicated by text, icon, or pattern. A red border on an error field must be accompanied by an error message. A green badge must include text ("Active"), not just a green dot.

6. **Avoid pure white text.** Use `--neutral-0` (hsl 210, 25%, 97%) for headings and `--neutral-50` (hsl 210, 20%, 92%) for body text. Pure `#FFFFFF` text on dark backgrounds creates too much contrast and causes eye strain. The slight warmth in the off-white is more comfortable for extended reading.

7. **Accent opacity for fills.** When using accent colors as background fills (e.g., highlighted rows, selected states), use the accent color at 8–15% opacity, not the full color. This creates a tinted surface that is visible but not overwhelming.

### 3.4 Contrast Verification

Every text/background combination must meet these minimum ratios:

| Text type | Minimum ratio | Standard |
|---|---|---|
| Body text (normal) | 4.5:1 | WCAG AA |
| Large text (≥18px bold, ≥24px normal) | 3:1 | WCAG AA |
| Interactive components (borders, icons) | 3:1 | WCAG AA |
| Non-text elements (decorative) | No minimum | — |

Verified combinations:

| Background | Text | Ratio | Pass |
|---|---|---|---|
| `--neutral-900` (#0F1117) | `--neutral-0` (#F4F5F8) | 16.2:1 | ✅ AAA |
| `--neutral-900` (#0F1117) | `--neutral-50` (#E6E9EF) | 14.1:1 | ✅ AAA |
| `--neutral-900` (#0F1117) | `--neutral-200` (#A3AAB8) | 7.2:1 | ✅ AAA |
| `--neutral-900` (#0F1117) | `--neutral-300` (#7E8596) | 4.6:1 | ✅ AA |
| `--neutral-900` (#0F1117) | `--neutral-400` (#5E6578) | 3.1:1 | ✅ AA Large |
| `--neutral-900` (#0F1117) | `--amber-400` (#F2A818) | 8.5:1 | ✅ AAA |
| `--neutral-900` (#0F1117) | `--teal-300` (#45B8AD) | 7.8:1 | ✅ AAA |
| `--neutral-800` (#171B26) | `--neutral-0` (#F4F5F8) | 13.8:1 | ✅ AAA |
| `--neutral-800` (#171B26) | `--neutral-300` (#7E8596) | 3.9:1 | ✅ AA Large |
| `--amber-400` (#F2A818) | `--neutral-950` (#0B0D11) | 9.8:1 | ✅ AAA |

---

## 4. Typography

### 4.1 Typeface Selection

**Primary — Inter**

Inter is the primary typeface for all text across the platform. It was chosen because:
- Designed specifically for screens at small sizes
- Excellent readability at all weights
- Comprehensive character set (Latin, Cyrillic, Greek, Vietnamese)
- Variable font support for precise weight control
- Tabular number features for data-heavy dashboards
- Free and open source (SIL Open Font License)

Load via `next/font/google` with `display: swap` and subset to `latin`.

**Monospace — JetBrains Mono**

JetBrains Mono is used for all code, technical data, and terminal-style elements. It was chosen because:
- Designed for developers, familiar to the target audience
- Ligature support for code readability
- Clear distinction between similar characters (0/O, 1/l/I)
- Free and open source

Load via `next/font/google` with `display: swap` and subset to `latin`.

No other typefaces are permitted. Period. Adding a third font is a design failure.

### 4.2 Type Scale

The type scale uses a modular system based on a 1.250 ratio (major third). Every size exists for a specific purpose.

#### Display (Hero headlines, page titles)

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-display-xl` | 72px / 4.5rem | 1.05 | 700 | -0.03em | Hero headline (desktop only) |
| `--text-display-lg` | 60px / 3.75rem | 1.08 | 700 | -0.025em | Hero headline (tablet), page hero |
| `--text-display-md` | 48px / 3rem | 1.10 | 700 | -0.02em | Hero headline (mobile), major section titles |
| `--text-display-sm` | 40px / 2.5rem | 1.15 | 600 | -0.015em | Sub-hero headlines, important callouts |

#### Heading

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-h1` | 36px / 2.25rem | 1.2 | 700 | -0.015em | Page titles, major section headings |
| `--text-h2` | 30px / 1.875rem | 1.25 | 600 | -0.01em | Section headings, card group titles |
| `--text-h3` | 24px / 1.5rem | 1.3 | 600 | -0.005em | Sub-section headings, card titles |
| `--text-h4` | 20px / 1.25rem | 1.35 | 600 | 0 | Small section headings, sidebar titles |
| `--text-h5` | 18px / 1.125rem | 1.4 | 600 | 0 | Card subtitles, label headings |
| `--text-h6` | 16px / 1rem | 1.4 | 600 | 0.01em | Smallest heading, metadata titles |

#### Body

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-body-lg` | 18px / 1.125rem | 1.65 | 400 | 0 | Long-form reading (blog posts, case studies) |
| `--text-body-md` | 16px / 1rem | 1.6 | 400 | 0 | Default body text, descriptions, form labels |
| `--text-body-sm` | 14px / 0.875rem | 1.55 | 400 | 0.005em | Secondary text, table cells, sidebar items |

#### Caption / Meta

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-caption` | 13px / 0.8125rem | 1.5 | 400 | 0.01em | Timestamps, metadata, helper text |
| `--text-overline` | 12px / 0.75rem | 1.4 | 600 | 0.08em | Overline labels, section tags (uppercase) |
| `--text-tiny` | 11px / 0.6875rem | 1.4 | 500 | 0.02em | Badges, small labels, notification counts |

#### Code

| Token | Size | Line Height | Weight | Font | Usage |
|---|---|---|---|---|---|
| `--text-code-lg` | 16px / 1rem | 1.7 | 400 | JetBrains Mono | Code blocks, terminal output |
| `--text-code-md` | 14px / 0.875rem | 1.6 | 400 | JetBrains Mono | Inline code, tech stack labels |
| `--text-code-sm` | 12px / 0.75rem | 1.5 | 400 | JetBrains Mono | Small code references, badges |

### 4.3 Typography Rules

1. **Maximum two levels of heading per viewport.** A user should never see more than two heading sizes on screen simultaneously (e.g., h2 and h3). If three levels are visible, the hierarchy is too complex for the section.

2. **Headings are always `--neutral-0`.** Primary headings use the brightest text color. No exceptions. No colored headings. No gradient text on headings (gradient text is reserved exclusively for the hero headline, if at all).

3. **Body text is `--neutral-50` or `--neutral-100`.** Body text uses slightly muted white. This reduces contrast fatigue without sacrificing readability.

4. **Metadata is `--neutral-300`.** Timestamps, author names, reading times, labels, and all tertiary text uses the muted gray. It should be readable but clearly secondary.

5. **Line length maximum: 72 characters.** For body text in long-form content (blog, case studies, descriptions), the max-width of the text column should produce approximately 65–72 characters per line. This is the optimal range for reading comfort. In practice: `max-width: 680px` for body-lg, `max-width: 640px` for body-md.

6. **No font size below 11px.** The smallest permissible text in the system is 11px (`--text-tiny`), used only for badges and notification counts. Anything smaller is unreadable on most screens.

7. **No bold body text for emphasis.** Use `font-weight: 500` (medium) for emphasized words within body text, not 700 (bold). Bold body text in dark themes can create uncomfortable bright spots.

8. **Uppercase only for overlines.** The `--text-overline` style is the only context where uppercase text is used. Section headings, button labels, navigation items — all use title case or sentence case. All-caps headings feel aggressive.

9. **Negative letter-spacing for headlines.** Display and heading text uses negative letter-spacing (-0.03em to -0.005em) to create a tighter, more premium feel. Body and caption text uses neutral or slightly positive letter-spacing for readability.

10. **Paragraph spacing.** Paragraphs are separated by `margin-bottom: 1.5em` (relative to the body text size). This creates clear separation without being wasteful. Lists within body text have `margin-bottom: 0.75em` between items.

### 4.4 Responsive Typography

| Token | Mobile (< 768px) | Tablet (768–1024px) | Desktop (> 1024px) |
|---|---|---|---|
| `--text-display-xl` | 36px | 52px | 72px |
| `--text-display-lg` | 32px | 44px | 60px |
| `--text-display-md` | 28px | 38px | 48px |
| `--text-display-sm` | 24px | 32px | 40px |
| `--text-h1` | 28px | 32px | 36px |
| `--text-h2` | 24px | 28px | 30px |
| `--text-h3` | 20px | 22px | 24px |
| `--text-body-lg` | 16px | 17px | 18px |
| `--text-body-md` | 15px | 16px | 16px |
| `--text-body-sm` | 13px | 14px | 14px |

Use `clamp()` for fluid scaling between breakpoints:
```
font-size: clamp(36px, 5vw + 1rem, 72px);  /* display-xl */
font-size: clamp(32px, 4vw + 1rem, 60px);  /* display-lg */
```

---

## 5. Spacing System

### 5.1 Base Unit

The spacing system uses a **4px base unit**. All spacing values are multiples of 4px. No arbitrary spacing values. No "13px" margins. No "27px" padding. Every spatial measurement in the interface is divisible by 4.

### 5.2 Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-0` | 0px | Reset |
| `--space-px` | 1px | Borders only |
| `--space-0.5` | 2px | Tiny gaps (between badge icon and text) |
| `--space-1` | 4px | Minimum gap (icon + label, tight chip padding) |
| `--space-1.5` | 6px | Dense padding (small badges) |
| `--space-2` | 8px | Compact padding (chips, tight card inner spacing) |
| `--space-2.5` | 10px | Small button vertical padding |
| `--space-3` | 12px | Default inline padding (buttons, inputs, small cards) |
| `--space-4` | 16px | Standard padding (cards, list items, section inner) |
| `--space-5` | 20px | Medium padding (card body, form fields) |
| `--space-6` | 24px | Large inner padding (cards, panels, modals) |
| `--space-8` | 32px | Section inner padding, large card padding |
| `--space-10` | 40px | Gap between cards in a grid |
| `--space-12` | 48px | Gap between groups of content |
| `--space-16` | 64px | Section vertical padding (mobile) |
| `--space-20` | 80px | Section vertical padding (tablet) |
| `--space-24` | 96px | Section vertical padding (desktop) |
| `--space-32` | 128px | Large section vertical padding, hero top spacing |
| `--space-40` | 160px | Hero vertical padding |
| `--space-48` | 192px | Maximum section separation |

### 5.3 Spacing Application

**Component internal spacing:**
- Button padding: `--space-2.5` vertical, `--space-5` horizontal (medium)
- Input padding: `--space-3` vertical, `--space-4` horizontal
- Card padding: `--space-6` all sides
- Modal padding: `--space-8` all sides
- Badge padding: `--space-1` vertical, `--space-2` horizontal

**Component external spacing (gaps):**
- Between buttons in a group: `--space-3`
- Between form fields: `--space-5`
- Between cards in a grid: `--space-6` (desktop), `--space-4` (mobile)
- Between sections on a page: `--space-24` (desktop), `--space-16` (mobile)
- Between heading and first paragraph: `--space-4`
- Between section heading and content: `--space-12`

**Layout spacing:**
- Page horizontal padding: `--space-6` (mobile), `--space-8` (tablet), `--space-12` (desktop)
- Sidebar width: 260px (expanded), 68px (collapsed)
- Header height: 72px (desktop), 64px (mobile)
- Footer top padding: `--space-24`

### 5.4 Spacing Rules

1. **Never mix spacing systems.** If you start using `--space-6` for card padding, every card uses `--space-6`. No card uses `--space-5` or `--space-7` (which does not exist).

2. **Vertical rhythm matters.** The vertical spacing between elements should create a predictable rhythm. If section headings have `--space-12` below them, this is true everywhere. If paragraphs have `--space-6` between them, this is true everywhere.

3. **More space = more importance.** Greater spacing around an element signals greater importance. The hero has the most spacing. Regular sections have less. Dashboard cards have the least.

4. **Group related, separate unrelated.** Elements that belong together (label + input, heading + description) use tight spacing (`--space-2` to `--space-4`). Elements that are independent (cards, sections) use wider spacing (`--space-6` to `--space-24`).

---

## 6. Grid System

### 6.1 Grid Foundation

The grid uses CSS Grid with a 12-column structure on desktop. It flexes to fewer columns on smaller screens. Column width is fluid. Gutters are fixed.

### 6.2 Grid Specifications

| Breakpoint | Columns | Gutter | Margin (page padding) |
|---|---|---|---|
| Mobile (< 640px) | 4 | 16px | 20px |
| Mobile L (640–767px) | 6 | 20px | 24px |
| Tablet (768–1023px) | 8 | 24px | 32px |
| Desktop (1024–1279px) | 12 | 24px | 48px |
| Desktop L (1280–1535px) | 12 | 32px | 64px |
| Desktop XL (≥ 1536px) | 12 | 32px | auto (centered) |

### 6.3 Common Grid Patterns

| Pattern | Desktop | Tablet | Mobile |
|---|---|---|---|
| Service cards | 4 columns (3 per row) or 3 columns (4 per row) | 2 columns | 1 column |
| Portfolio gallery | 3 columns | 2 columns | 1 column |
| Pricing tiers | 3 columns (side by side) | 3 columns (stacked if tight) | 1 column (stacked) |
| Blog listing | 3 columns | 2 columns | 1 column |
| Dashboard stats | 4 columns | 2 columns | 1 column (stacked) |
| Testimonials | 1 column (carousel) | 1 column (carousel) | 1 column (carousel) |
| Process steps | 1 column (vertical timeline) | 1 column | 1 column |
| Footer links | 4 columns | 2 columns (2 rows) | 1 column (accordion) |

### 6.4 Grid Rules

1. **Do not break the grid.** Every element aligns to the column grid. Full-bleed elements span all columns. Centered content uses inner columns. Nothing floats between columns.

2. **Content width ≠ visual width.** A card may span 4 columns visually, but its text content may be constrained to a narrower measure within it. The grid defines position, not reading width.

3. **Avoid orphaned grid items.** If you have 5 cards in a 3-column grid, the last row has 2 items with 1 empty space. Either: (a) center the last row, (b) make the last item span 2 columns, or (c) adjust to 5 items that fill evenly. Never leave an obviously unbalanced grid row.

---

## 7. Container Widths

### 7.1 Container Definitions

| Token | Max Width | Usage |
|---|---|---|
| `--container-xs` | 480px | Login/register forms, narrow modals, error pages |
| `--container-sm` | 640px | Blog post body, simple forms, focus views |
| `--container-md` | 768px | Settings pages, detail views, medium content |
| `--container-lg` | 1024px | General content areas, service pages |
| `--container-xl` | 1200px | Homepage sections, portfolio, wide content |
| `--container-2xl` | 1400px | Maximum content width, dashboard main area |
| `--container-full` | 100% | Full-bleed sections (hero, CTA, trusted-by) |

### 7.2 Container Rules

1. All containers are **horizontally centered** with `margin: 0 auto`.
2. All containers have **horizontal padding** that matches the grid margin for their breakpoint.
3. The **homepage uses `--container-xl`** for section content, but sections themselves can be `--container-full` for background effects.
4. The **blog post body uses `--container-sm`** for optimal reading width.
5. **Dashboard main content** uses `--container-2xl` minus the sidebar width.

---

## 8. Responsive Breakpoints

### 8.1 Breakpoint Values

| Token | Value | Target |
|---|---|---|
| `--bp-sm` | 640px | Large phones (landscape), small tablets |
| `--bp-md` | 768px | Tablets (portrait) |
| `--bp-lg` | 1024px | Tablets (landscape), small desktops |
| `--bp-xl` | 1280px | Standard desktops |
| `--bp-2xl` | 1536px | Large desktops |

### 8.2 Breakpoint Philosophy

Mobile-first. Styles are written for mobile by default. Larger breakpoints add complexity, not the reverse. This means:

- Base styles (no media query) = mobile layout
- `@media (min-width: 640px)` = enhancements for larger phones
- `@media (min-width: 768px)` = tablet-specific layout
- `@media (min-width: 1024px)` = desktop layout kicks in
- `@media (min-width: 1280px)` = refinements for wider screens
- `@media (min-width: 1536px)` = max-width content centering

In Tailwind, this translates to: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes.

### 8.3 Breakpoint Content Strategy

| Content Type | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navigation | Hamburger + overlay | Hamburger + overlay | Full horizontal nav |
| Hero 3D visual | Hidden (CSS fallback) | Reduced quality | Full quality |
| Service cards | Stacked (1 col) | 2 columns | 4 columns or 3 columns |
| Stats/counters | 2 per row | 4 per row | 4 per row |
| Testimonials | Swipe carousel | Swipe carousel | Auto-advancing carousel |
| Pricing tiers | Stacked | Side by side (compact) | Side by side (full) |
| Dashboard sidebar | Bottom nav | Collapsed sidebar | Full sidebar |
| Tables | Cards (stacked) | Horizontal scroll | Full table |
| Charts | Simplified | Standard | Full detail |

---

## 9. Glassmorphism Rules

### 9.1 What Glassmorphism Achieves

Glass surfaces communicate layering. They tell the user "this element floats above the background." They create a sense of physical space in a 2D interface. In DevSpark, glass is used for elevated interactive surfaces: the header, cards, modals, dropdowns, and tooltips.

### 9.2 Glass Recipes

#### Glass — Standard Card
```css
background: hsl(220, 17%, 11%, 0.60);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid hsl(220, 14%, 22%, 0.50);
border-radius: 16px;
```

#### Glass — Header (scroll state)
```css
background: hsl(222, 22%, 5%, 0.80);
backdrop-filter: blur(16px) saturate(1.2);
-webkit-backdrop-filter: blur(16px) saturate(1.2);
border-bottom: 1px solid hsl(220, 14%, 22%, 0.30);
```

#### Glass — Modal / Dialog
```css
background: hsl(220, 18%, 9%, 0.90);
backdrop-filter: blur(32px) saturate(1.1);
-webkit-backdrop-filter: blur(32px) saturate(1.1);
border: 1px solid hsl(220, 14%, 22%, 0.40);
border-radius: 20px;
box-shadow: 0 24px 48px hsl(0, 0%, 0%, 0.40);
```

#### Glass — Dropdown / Popover
```css
background: hsl(220, 17%, 11%, 0.85);
backdrop-filter: blur(24px);
-webkit-backdrop-filter: blur(24px);
border: 1px solid hsl(220, 14%, 22%, 0.50);
border-radius: 12px;
box-shadow: 0 8px 32px hsl(0, 0%, 0%, 0.30);
```

#### Glass — Tooltip
```css
background: hsl(220, 16%, 14%, 0.92);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid hsl(220, 14%, 22%, 0.40);
border-radius: 8px;
box-shadow: 0 4px 12px hsl(0, 0%, 0%, 0.25);
```

### 9.3 Glass Rules

1. **Glass requires a background behind it.** Glassmorphism only works when there is content or a gradient behind the glass element. A glass card on a solid dark background with nothing behind it just looks like a semi-transparent card — the blur has nothing to blur. Use glass elements over sections with gradients, images, or other content.

2. **Maximum 2 layers of glass.** A glass card can sit on a page background. A dropdown can sit on a glass header. But a glass element inside a glass element inside another glass element creates visual mud. Two layers maximum.

3. **Performance constraint.** `backdrop-filter: blur()` is GPU-intensive. Do not apply it to more than 5–6 elements visible simultaneously. For long lists of glass cards, use a solid semi-transparent background instead of blur.

4. **Fallback for unsupported browsers.** When `backdrop-filter` is not supported, fall back to a solid background with slightly higher opacity:
```css
@supports not (backdrop-filter: blur(20px)) {
  background: hsl(220, 17%, 11%, 0.92);
}
```

5. **No glass on mobile for scroll performance.** On mobile devices (< 768px), replace `backdrop-filter` with solid semi-transparent backgrounds to maintain 60fps scroll performance. The visual difference is minimal on small screens.

---

## 10. Border Rules

### 10.1 Border Scale

| Token | Value | Usage |
|---|---|---|
| `--border-width-thin` | 1px | Default border for cards, inputs, dividers |
| `--border-width-medium` | 1.5px | Active input border, focused elements |
| `--border-width-thick` | 2px | Selected tabs, active navigation indicator |

### 10.2 Border Colors

| Token | Value | Usage |
|---|---|---|
| `--border-default` | `hsl(220, 14%, 18%)` | Standard border for cards, panels, dividers |
| `--border-subtle` | `hsl(220, 14%, 15%)` | Subtle separators, background dividers |
| `--border-prominent` | `hsl(220, 14%, 25%)` | Hover state borders, emphasized elements |
| `--border-interactive` | `hsl(220, 14%, 30%)` | Input borders on hover, interactive element borders |
| `--border-focus` | `var(--amber-400)` | Focus ring color |
| `--border-error` | `var(--error-400)` | Error state border |
| `--border-success` | `var(--success-400)` | Success state border |

### 10.3 Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| `--radius-none` | 0px | No rounding (sharp elements, specific table cells) |
| `--radius-xs` | 4px | Small badges, tiny chips |
| `--radius-sm` | 6px | Buttons (small), inline code, tags |
| `--radius-md` | 8px | Buttons (default), inputs, small cards |
| `--radius-lg` | 12px | Medium cards, dropdown menus, popovers |
| `--radius-xl` | 16px | Large cards, section panels, modals |
| `--radius-2xl` | 20px | Hero cards, pricing cards, major modals |
| `--radius-3xl` | 24px | Full-width section panels |
| `--radius-full` | 9999px | Avatars, circular buttons, pills |

### 10.4 Border Rules

1. **Every card has a border.** In dark themes, borders are essential for defining element boundaries. Without borders, cards blend into the background. Every card, panel, and elevated surface has at least a 1px border in `--border-default`.

2. **Borders lighten on hover.** When a user hovers over an interactive card, the border transitions from `--border-default` to `--border-prominent`. This is a subtle but important feedback signal.

3. **Focus rings use the accent color.** All focusable elements show a visible focus ring using `--amber-400` with a 2px offset. The focus ring must be visible against all backgrounds.
```css
outline: 2px solid var(--amber-400);
outline-offset: 2px;
```

4. **Dividers are not borders.** Horizontal dividers between content groups use `--border-subtle` and full width. They are separate from card borders. A horizontal rule inside a card uses `--border-default`.

5. **Border opacity for glass.** Glass surfaces use borders with reduced opacity (50%) to blend more naturally with the semi-transparent background.

---

## 11. Shadow Rules

### 11.1 Shadow Scale

Shadows in dark themes work differently than light themes. Heavy box-shadows are largely invisible against dark backgrounds. Instead, shadows are used primarily for deep elevation (modals, dropdowns) and to create a subtle "lift" effect on hover.

| Token | Value | Usage |
|---|---|---|
| `--shadow-xs` | `0 1px 2px hsl(0, 0%, 0%, 0.20)` | Subtle lift on small elements |
| `--shadow-sm` | `0 2px 4px hsl(0, 0%, 0%, 0.25)` | Slight elevation (buttons, chips) |
| `--shadow-md` | `0 4px 12px hsl(0, 0%, 0%, 0.30)` | Card hover elevation |
| `--shadow-lg` | `0 8px 24px hsl(0, 0%, 0%, 0.35)` | Dropdowns, popovers |
| `--shadow-xl` | `0 16px 48px hsl(0, 0%, 0%, 0.40)` | Modals, dialogs |
| `--shadow-2xl` | `0 24px 64px hsl(0, 0%, 0%, 0.50)` | Full-screen overlays |
| `--shadow-inner` | `inset 0 1px 3px hsl(0, 0%, 0%, 0.20)` | Pressed button state, inset inputs |

### 11.2 Shadow Rules

1. **Shadows are for elevation, not decoration.** Every shadow communicates z-axis position. Cards at rest have no shadow or `--shadow-xs`. Hovered cards use `--shadow-md`. Dropdowns use `--shadow-lg`. Modals use `--shadow-xl`.

2. **Shadow + border = elevation.** In dark themes, shadows alone do not create sufficient visual separation. Pair shadows with borders: a dropdown has both `--shadow-lg` and a `--border-default` border.

3. **No colored shadows for layout elements.** Colored shadows (accent glow) are handled separately in the Glow Rules. Standard elevation shadows are always black/neutral.

4. **Mobile shadows are reduced.** On mobile, reduce shadow values by ~50% to improve rendering performance and reduce visual weight on smaller screens.

---

## 12. Glow Rules

### 12.1 What Glow Communicates

Glow is the most premium visual effect in the system. It is used to draw attention, signal interactivity, and create focal points. It is never ambient — it is always triggered by an interaction or applied to a specific high-value element.

### 12.2 Glow Recipes

#### Glow — Amber Card Hover
```css
box-shadow: 0 0 0 1px var(--amber-glow-sm),
            0 4px 24px var(--amber-glow-md),
            0 0 60px var(--amber-glow-lg);
```

#### Glow — Teal Card Hover
```css
box-shadow: 0 0 0 1px var(--teal-glow),
            0 4px 24px var(--teal-glow);
```

#### Glow — CTA Button
```css
box-shadow: 0 0 20px var(--amber-glow-md),
            0 0 60px var(--amber-glow-lg);
```

#### Glow — Active Navigation Item
```css
box-shadow: 0 0 12px var(--amber-glow-sm);
```

#### Glow — Focus Ring (accessibility)
```css
outline: 2px solid var(--amber-400);
outline-offset: 2px;
box-shadow: 0 0 0 4px var(--amber-glow-sm);
```

#### Glow — Background Section Accent
```css
/* Applied to a pseudo-element behind a CTA section */
background: radial-gradient(ellipse 50% 40% at 50% 50%, 
            var(--amber-glow-lg) 0%, 
            transparent 100%);
```

### 12.3 Glow Rules

1. **Glow is earned.** Only the most important elements glow: primary CTAs, featured cards, active states, and focal points. If everything glows, nothing glows.

2. **Maximum 2 glowing elements per viewport.** At any time, no more than 2 elements in the visible viewport should have a visible glow effect. This prevents the page from looking like a gaming interface.

3. **Glow on hover, not at rest.** Cards and interactive elements gain their glow effect on hover (desktop) or tap (mobile). At rest, they have no glow — just their standard border and background.

4. **Glow color matches intent.** Amber glow for CTAs and primary actions. Teal glow for informational highlights. Success/error glow for status. Never mix glow colors on the same element.

5. **Glow transitions smoothly.** Glow effects transition in/out over 300–500ms using `ease-out`. No instant appearance. No popping. The glow should feel like a light turning on, not a switch flipping.

6. **No glow on mobile.** Reduce or eliminate glow effects on mobile to maintain performance and reduce visual noise on smaller screens. Hover glow is irrelevant on touch devices.

---

## 13. Surface System

### 13.1 Surface Hierarchy

The interface is composed of layered surfaces. Each surface level has specific visual properties. Lower surfaces are darker and recede. Higher surfaces are lighter and advance toward the user.

| Level | Token | Background | Border | Usage |
|---|---|---|---|---|
| **Ground** | `--surface-ground` | `--neutral-950` | None | Page background, deepest layer |
| **Base** | `--surface-base` | `--neutral-900` | None | Primary page background |
| **Raised** | `--surface-raised` | `--neutral-800` | `--border-default` | Cards, sidebar, panels, table rows |
| **Elevated** | `--surface-elevated` | `--neutral-750` | `--border-prominent` | Hover states, active cards, dropdowns |
| **Floating** | `--surface-floating` | `--neutral-700` with glass | `--border-interactive` | Modals, dialogs, command palette |
| **Overlay** | `--surface-overlay` | `hsl(0,0%,0%,0.60)` | None | Backdrop behind modals, dimming layer |

### 13.2 Surface Composition

```
┌─────────────────────────────────────────────────────────────────┐
│  Surface: Ground (--neutral-950)                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Surface: Base (--neutral-900) — Main page background     │  │
│  │  ┌───────────────────┐  ┌───────────────────┐            │  │
│  │  │  Surface: Raised  │  │  Surface: Raised  │            │  │
│  │  │  (--neutral-800)  │  │  (--neutral-800)  │            │  │
│  │  │  Card, panel      │  │  Card, panel      │            │  │
│  │  │                   │  │  ┌─────────────┐  │            │  │
│  │  │                   │  │  │ Elevated    │  │            │  │
│  │  │                   │  │  │ Dropdown    │  │            │  │
│  │  │                   │  │  └─────────────┘  │            │  │
│  │  └───────────────────┘  └───────────────────┘            │  │
│  │                                                           │  │
│  │  ┌─── Overlay (dimming layer) ────────────────────────┐  │  │
│  │  │  ┌───────────────────────────────┐                 │  │  │
│  │  │  │  Surface: Floating            │                 │  │  │
│  │  │  │  (--neutral-700 + glass)      │                 │  │  │
│  │  │  │  Modal / Dialog               │                 │  │  │
│  │  │  └───────────────────────────────┘                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 13.3 Surface Rules

1. **Never skip levels.** A raised surface can contain an elevated surface (dropdown inside a card). But a base surface should not directly contain a floating surface without an overlay between them.

2. **Borders define boundaries.** Surface color differences alone are often too subtle in dark themes. Borders are the primary mechanism for distinguishing surfaces.

3. **Background contrast is minimal.** The difference between adjacent surface levels is ~2–3% brightness. This is intentional — it creates depth without visual competition with content.

4. **Content sits on surfaces.** Text, icons, and interactive elements are always placed on a surface, never floating in the void between surfaces.

---

## 14. Icon System

### 14.1 Icon Library

**Lucide React** is the only permitted icon library. No other icon sets (Heroicons, Font Awesome, Material Icons, custom SVGs for UI icons) are allowed. This ensures visual consistency across the entire platform.

### 14.2 Icon Sizes

| Token | Size | Stroke Width | Usage |
|---|---|---|---|
| `--icon-xs` | 14px | 2px | Inline with caption text, badges, tight spaces |
| `--icon-sm` | 16px | 1.75px | Inline with body-sm text, table cells, list items |
| `--icon-md` | 20px | 1.75px | Default — buttons, inputs, navigation items, cards |
| `--icon-lg` | 24px | 1.5px | Section headings, feature highlights, dashboard stats |
| `--icon-xl` | 32px | 1.5px | Hero features, service cards, empty states |
| `--icon-2xl` | 40px | 1.25px | Large feature icons, page heroes, onboarding |
| `--icon-3xl` | 48px | 1.25px | Decorative feature icons (service section) |

### 14.3 Icon Colors

| Context | Color |
|---|---|
| Default (on dark surface) | `--neutral-300` |
| Interactive (button icon) | Inherits button text color |
| Active navigation | `--amber-400` |
| Success indicator | `--success-400` |
| Error indicator | `--error-400` |
| Warning indicator | `--warning-400` |
| Info indicator | `--info-400` |
| Decorative (service cards, features) | `--amber-400` or `--teal-300` |

### 14.4 Icon Rules

1. **Icons never stand alone for critical actions.** Every icon used for a functional purpose (navigation, button, status) must have an accompanying text label or `aria-label`. An icon-only button is acceptable only for universally understood actions (close ✕, search 🔍, menu ☰) and must still have `aria-label`.

2. **Icons are vertically centered with their text.** When an icon appears next to text, it is vertically centered with the text's x-height, not the line height. Use `display: inline-flex; align-items: center;` with a gap of `--space-2` between icon and text.

3. **No filled icons.** All icons use the outline/stroke style. Filled icons feel heavier and are visually inconsistent. The only exception is a filled circle for status dots (online/offline).

4. **Icon color transitions match their parent.** When a button changes color on hover, its icon transitions at the same speed and to the same color. Icon and text are always the same color within a component.

---

## 15. Illustration Style

### 15.1 Illustration Philosophy

DevSpark does not use traditional illustrations. No cartoon characters. No isometric scenes. No flat design illustrations. No hand-drawn doodles.

Instead, the visual language uses:

1. **Geometric abstractions.** Simple geometric shapes (circles, lines, arcs) composed into patterns that suggest concepts without literally depicting them. Think: a constellation of dots suggesting connectivity, converging lines suggesting focus, layered rectangles suggesting architecture.

2. **3D rendered visuals.** For the hero and premium sections, purpose-built 3D scenes using React Three Fiber. These are abstract, elegant, and dark — glowing spheres, particle fields, morphing surfaces — not realistic 3D models of products or people.

3. **Data visualizations as art.** Charts, graphs, and data patterns can serve double duty as both information and visual interest. A beautifully rendered line chart is more on-brand than an illustration.

4. **Code and terminal aesthetics.** Styled code blocks, terminal prompts, and interface mockups serve as illustrations in service pages and blog posts. They communicate technical credibility.

### 15.2 Illustration Rules

1. No illustrations from generic illustration libraries (unDraw, Blush, etc.)
2. No illustrations with more than 3 colors (neutral + amber + teal max)
3. All geometric abstractions must use design system colors and radii
4. 3D visuals must load lazily and have CSS gradient fallbacks
5. Illustrations never contain human figures or faces (photos only for people)

---

## 16. Image Style

### 16.1 Image Treatment

All images in the DevSpark platform are treated with a consistent visual style that harmonizes with the dark theme.

**Project screenshots / mockups:**
- Displayed in browser or device frames (dark frames only, matching the theme)
- Slight border-radius on the outer frame (`--radius-xl`)
- Subtle shadow below (`--shadow-lg`)
- May have a slight dark overlay to unify with the dark theme

**Decorative images:**
- Use CSS `mix-blend-mode: luminosity` or reduce opacity to ~85% to prevent bright images from overwhelming the dark interface
- Apply a subtle dark gradient overlay from the bottom for text readability when text overlays images

### 16.2 Image Specifications

| Context | Aspect Ratio | Max Width | Format | Quality |
|---|---|---|---|---|
| Hero background | 16:9 | 1920px | WebP | 85% |
| Portfolio card thumbnail | 16:10 | 800px | WebP | 80% |
| Case study hero | 16:9 | 1400px | WebP | 85% |
| Case study inline | Flexible | 1000px | WebP | 80% |
| Blog featured image | 2:1 | 1200px | WebP | 80% |
| Blog inline image | Flexible | 800px | WebP | 80% |
| Team member photo | 1:1 | 400px | WebP | 85% |
| Client logo | Flexible (SVG preferred) | 200px | SVG/PNG | Lossless |
| OG image | 1200×630 | 1200px | PNG | 95% |

### 16.3 Image Rules

1. **All images use `next/image`.** No raw `<img>` tags. The Next.js Image component handles lazy loading, responsive sizing, format optimization, and blur placeholder generation.

2. **All images above the fold have explicit `width` and `height`.** This prevents Cumulative Layout Shift.

3. **All images have descriptive `alt` text.** Not "image1" or "screenshot." Describe what the image shows: "Dashboard showing project timeline with three active milestones" or "DevSpark team members collaborating in a meeting."

4. **Dark-theme compatible images only.** All screenshots and mockups must show dark-themed interfaces. A bright white screenshot on the dark website creates visual whiplash.

5. **No stock photos on marketing pages.** Real project screenshots, real team photos, or abstract visuals only. Stock photography undermines trust for a development agency.

---

## 17. Photography Rules

### 17.1 Photography Usage

Photography is used in limited contexts:

1. **Team member portraits** — for the About page and author bios
2. **Office/workspace photos** — for the About page and Careers page (optional)
3. **Client photos** — for testimonials (small avatars)

### 17.2 Photography Style

| Attribute | Specification |
|---|---|
| Lighting | Natural or soft studio light. No harsh flash. No dramatic shadows. |
| Background | Neutral, uncluttered. Dark or blurred backgrounds preferred. |
| Color grading | Slightly desaturated, warm undertone. Never oversaturated or cold. |
| Framing | Head and shoulders for portraits. 1:1 aspect ratio. Subject centered or at golden ratio. |
| Expression | Natural, approachable, confident. No stiff corporate poses. |
| Treatment on site | Slight desaturation (via CSS `filter: saturate(0.9)`). Border-radius: `--radius-full` for avatars, `--radius-xl` for larger photos. |

### 17.3 Photography Rules

1. All team photos must be taken by the same photographer or treated to look consistent
2. No selfies, event photos, or casual snapshots on the marketing site
3. Client avatars may be their company logo if a personal photo is not available
4. Never use AI-generated faces. If real photos are not available, use initials avatars

---

## 18. Card System

### 18.1 Card Anatomy

Every card in the system follows this structural anatomy:

```
┌─────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐│
│  │  Card Header (optional)             ││
│  │  Icon/Badge + Title + Action Button ││
│  ├─────────────────────────────────────┤│
│  │  Card Body                          ││
│  │  Primary content area               ││
│  │  Text, images, data, etc.           ││
│  ├─────────────────────────────────────┤│
│  │  Card Footer (optional)             ││
│  │  Meta info + CTA link/button        ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### 18.2 Card Variants

#### Standard Card

```
Background:   --surface-raised
Border:       1px solid --border-default
Radius:       --radius-xl (16px)
Padding:      --space-6 (24px)
Hover:        Border → --border-prominent
              Background → --surface-elevated
              Shadow → --shadow-md
              Transition: 300ms ease-out
```

#### Glass Card (Marketing)

```
Background:   --neutral-800 at 60% opacity
Backdrop:     blur(20px)
Border:       1px solid --border-default at 50% opacity
Radius:       --radius-xl (16px)
Padding:      --space-6 (24px)
Hover:        Border → --border-prominent
              Box-shadow → amber glow (sm)
              Transform → translateY(-2px)
              Transition: 300ms ease-out
```

#### Feature Card (Services)

```
Background:   --surface-raised
Border:       1px solid --border-default
Radius:       --radius-xl (16px)
Padding:      --space-8 (32px)
Icon:         --icon-3xl, --amber-400 or --teal-300
Hover:        Border → --amber-400 at 30% opacity
              Box-shadow → amber glow (md)
              Transform → translateY(-4px)
              Transition: 400ms ease-out
```

#### Stat Card (Dashboard)

```
Background:   --surface-raised
Border:       1px solid --border-default
Radius:       --radius-lg (12px)
Padding:      --space-5 (20px)
Layout:       Label (text-caption, muted) above
              Value (text-h3, high-emphasis) below
              Optional trend indicator (right-aligned)
No hover effects (static data display)
```

#### Pricing Card

```
Background:   --surface-raised
Border:       1px solid --border-default
Radius:       --radius-2xl (20px)
Padding:      --space-8 (32px)
Featured:     Border → 1px solid --amber-400 at 40%
              Subtle amber glow behind card
              "Most Popular" badge at top
```

#### Interactive Card (Portfolio, Blog)

```
Background:   --surface-raised
Border:       1px solid --border-default
Radius:       --radius-xl (16px)
Overflow:     hidden (for image at top)
Image:        Aspect ratio 16:10, object-fit cover
Padding:      0 for image, --space-5 for text area
Hover:        Image scale(1.05) with overflow hidden
              Border → --border-prominent
              Shadow → --shadow-md
              Cursor → pointer
              Transition: 400ms ease-out
```

### 18.3 Card Rules

1. **All cards use `--radius-xl` (16px).** This is the global card radius. Do not use different radii for different cards. The only exceptions are stat cards (`--radius-lg`) and badges within cards.

2. **Card padding is always `--space-6`.** Interior content has uniform 24px padding. Larger cards (pricing, feature) may use `--space-8` (32px).

3. **Cards never have both shadows AND glow at rest.** Choose one: shadows for structural elevation, glow for interactive emphasis. Never combine them outside of hover states.

4. **Card hover effects are uniform within a page.** If one card in a grid lifts on hover, all cards in that grid lift on hover. No mixed behaviors.

5. **Maximum image height in cards: 240px.** Images within cards are constrained to prevent the card from becoming disproportionately tall. Use `object-fit: cover` with a fixed height.

---

## 19. Button System

### 19.1 Button Variants

#### Primary Button (Amber)
```
Background:   var(--gradient-accent) or solid --amber-400
Color:        --neutral-950 (dark text on amber)
Border:       none
Radius:       --radius-md (8px)
Font:         --text-body-md, weight 600
Padding:      --space-2.5 vertical, --space-5 horizontal
Shadow:       --shadow-sm
Hover:        Background lightens (--amber-300)
              Shadow → --shadow-md + amber glow (sm)
              Transform: translateY(-1px)
Active:       Background darkens (--amber-500)
              Shadow → --shadow-inner
              Transform: translateY(0)
Disabled:     Opacity 0.5, cursor not-allowed, no hover
Transition:   200ms ease-out
```

#### Secondary Button (Ghost/Outline)
```
Background:   transparent
Color:        --neutral-50
Border:       1px solid --border-interactive
Radius:       --radius-md (8px)
Font:         --text-body-md, weight 500
Padding:      --space-2.5 vertical, --space-5 horizontal
Hover:        Background → --surface-elevated
              Border → --border-prominent
Active:       Background → --surface-raised
Disabled:     Opacity 0.5, cursor not-allowed
Transition:   200ms ease-out
```

#### Ghost Button (No border)
```
Background:   transparent
Color:        --neutral-200
Border:       none
Radius:       --radius-md (8px)
Font:         --text-body-md, weight 500
Padding:      --space-2.5 vertical, --space-5 horizontal
Hover:        Background → --surface-elevated
              Color → --neutral-0
Active:       Background → --surface-raised
Transition:   200ms ease-out
```

#### Danger Button
```
Background:   --error-400
Color:        white
Border:       none
Radius:       --radius-md (8px)
Hover:        Background darkens
              Shadow → error glow (sm)
Active:       Background → --error-500
Transition:   200ms ease-out
```

#### Icon Button
```
Background:   transparent
Color:        --neutral-300
Border:       none
Radius:       --radius-md (8px)
Size:         40px × 40px (centered icon)
Hover:        Background → --surface-elevated
              Color → --neutral-0
Active:       Background → --surface-raised
Transition:   150ms ease-out
```

#### Link Button (Text only)
```
Background:   none
Color:        --teal-300
Border:       none
Padding:      0
Font:         inherit weight 500
Hover:        Color → --teal-200
              Text-decoration: underline
Active:       Color → --teal-400
Transition:   150ms ease-out
```

### 19.2 Button Sizes

| Size | Height | Font | Icon Size | Padding H | Usage |
|---|---|---|---|---|---|
| `xs` | 28px | --text-caption (13px) | 14px | --space-2 (8px) | Table actions, compact UIs |
| `sm` | 32px | --text-body-sm (14px) | 16px | --space-3 (12px) | Card actions, secondary CTAs |
| `md` | 40px | --text-body-md (16px) | 20px | --space-5 (20px) | Default — most buttons |
| `lg` | 48px | --text-body-md (16px) weight 600 | 20px | --space-6 (24px) | Primary CTAs, hero buttons |
| `xl` | 56px | --text-body-lg (18px) weight 600 | 24px | --space-8 (32px) | Hero CTA (marketing site only) |

### 19.3 Button Rules

1. **One primary button per viewport section.** A section can have one primary (amber) button and multiple secondary buttons. Two amber buttons competing for attention defeats the purpose.

2. **Button labels are verbs.** "Start Your Project", "Get a Quote", "View Details", "Submit", "Cancel". Never nouns ("Information", "Pricing", "Details").

3. **Icon + label, or label only.** Icons in buttons appear on the left side of the label, with `--space-2` gap. Icon-only buttons are acceptable only for universally understood actions and must have `aria-label`.

4. **Minimum button width: 100px.** Buttons should never be too narrow to read comfortably. Short labels like "OK" get extra horizontal padding.

5. **Loading state.** When a button triggers an async action, it shows a spinner (replacing the icon, or centered if no icon), disables the button, and optionally changes the label to "Loading..." or a contextual message ("Sending..."). The button maintains its width during loading (no layout shift).

6. **No button groups with more than 3 buttons.** If more than 3 actions are needed, use a dropdown menu for overflow actions.

---

## 20. Input System

### 20.1 Text Input

```
Background:   --surface-raised
Color:        --neutral-0
Border:       1px solid --border-default
Radius:       --radius-md (8px)
Height:       44px
Padding:      --space-3 vertical, --space-4 horizontal
Font:         --text-body-md (16px)
Placeholder:  --neutral-400

Focus:
  Border → --amber-400
  Box-shadow → 0 0 0 3px var(--amber-glow-sm)
  Outline: none

Error:
  Border → --error-400
  Box-shadow → 0 0 0 3px var(--error-glow)
  Below: error message in --error-400, --text-caption

Success:
  Border → --success-400
  Below: success message in --success-400, --text-caption (optional)

Disabled:
  Background → --neutral-850
  Color → --neutral-400
  Cursor → not-allowed
  Opacity → 0.7

Transition: border-color 200ms ease-out, box-shadow 200ms ease-out
```

### 20.2 Textarea

Same styling as text input, with:
```
Height:       120px (default, resizable vertically)
Min-height:   80px
Max-height:   400px
Resize:       vertical
Line-height:  1.6
```

### 20.3 Select / Dropdown

Same base styling as text input, with:
```
Appearance:   none (custom chevron icon on right)
Chevron:      Lucide ChevronDown, --neutral-300, --icon-sm
Dropdown:     Custom dropdown using --surface-elevated, glass, --shadow-lg
Option hover: --surface-elevated → --neutral-700
```

### 20.4 Checkbox

```
Size:         18px × 18px
Border:       1.5px solid --border-interactive
Radius:       --radius-xs (4px)
Background:   transparent

Checked:
  Background → --amber-400
  Border → --amber-400
  Checkmark → --neutral-950 (dark on amber), 2px stroke

Focus:
  Box-shadow → 0 0 0 3px var(--amber-glow-sm)

Disabled:
  Opacity → 0.5
```

### 20.5 Radio Button

```
Size:         18px × 18px
Border:       1.5px solid --border-interactive
Radius:       --radius-full (circle)
Background:   transparent

Selected:
  Border → --amber-400
  Inner dot → 8px circle, --amber-400

Focus:
  Box-shadow → 0 0 0 3px var(--amber-glow-sm)
```

### 20.6 Toggle / Switch

```
Track:
  Width: 44px, Height: 24px
  Background: --neutral-600
  Radius: --radius-full
  
Thumb:
  Size: 20px circle
  Background: --neutral-100
  Offset: 2px from track edge

Active:
  Track background → --amber-400
  Thumb → --neutral-950

Transition: 200ms ease-out (both track and thumb)

Focus:
  Track box-shadow → 0 0 0 3px var(--amber-glow-sm)
```

### 20.7 Input Label

```
Font:         --text-body-sm (14px), weight 500
Color:        --neutral-100
Margin:       0 0 --space-1.5 0 (6px below label, before input)
Required:     Red asterisk (*) in --error-400 after label text
```

### 20.8 Helper Text

```
Font:         --text-caption (13px), weight 400
Color:        --neutral-300
Margin:       --space-1.5 0 0 0 (6px above, after input)
```

### 20.9 Input Rules

1. **Labels above inputs, always.** No floating labels (they cause accessibility issues). No placeholder-only labels (they disappear on input). The label sits above the input with 6px spacing.

2. **Placeholder text is guidance, not a label.** Placeholders show format examples ("john@example.com") or brief hints ("Enter your full name"). They are never the sole indication of what the field expects.

3. **Minimum input height: 44px.** This meets the 44px touch target requirement on mobile.

4. **Focus states are visible and distinct.** The amber focus ring must be clearly visible against all background surfaces. Combined border color change + box-shadow glow ensures visibility.

5. **Error states show immediately below the field.** Error messages appear with a slide-down animation (150ms) and include a small error icon (Lucide AlertCircle) for redundant signaling.

---

## 21. Badge System

### 21.1 Badge Variants

#### Status Badge
```
Background:   Status color at 15% opacity
Color:        Status color at 100%
Border:       1px solid status color at 25%
Radius:       --radius-full (pill shape)
Padding:      --space-1 vertical, --space-2.5 horizontal
Font:         --text-tiny (11px), weight 600
Text:         Uppercase

Examples:
  Active   → green-400 bg(15%), green-400 text, green border(25%)
  Pending  → amber-400 bg(15%), amber-400 text, amber border(25%)
  Overdue  → error-400 bg(15%), error-400 text, error border(25%)
  Draft    → neutral-400 bg(15%), neutral-200 text, neutral border(25%)
```

#### Count Badge (Notification)
```
Background:   --error-400
Color:        white
Radius:       --radius-full
Min-width:    18px
Height:       18px
Font:         --text-tiny (11px), weight 700
Padding:      0 --space-1
Text-align:   center
Position:     absolute, top-right corner of parent, offset by -4px
```

#### Label Badge
```
Background:   --neutral-700
Color:        --neutral-100
Border:       1px solid --border-default
Radius:       --radius-sm (6px)
Padding:      --space-1 vertical, --space-2 horizontal
Font:         --text-caption (13px), weight 500
```

#### Tech Badge
```
Background:   --teal-300 at 10% opacity
Color:        --teal-300
Border:       1px solid --teal-300 at 20%
Radius:       --radius-sm (6px)
Padding:      --space-0.5 vertical, --space-2 horizontal
Font:         --text-code-sm (12px), weight 500, font: JetBrains Mono
```

### 21.2 Badge Rules

1. Badges do not have hover states (they are labels, not interactive elements)
2. Maximum 3 badges per line on any card or list item
3. Badge text must be concise (1–2 words, max 15 characters)
4. Status badges always include text — never a colored dot alone

---

## 22. Chip System

### 22.1 Chip Anatomy

Chips are compact, interactive elements used for filtering, selecting, and tagging. Unlike badges, chips can be clicked, toggled, or dismissed.

```
┌───────────────────────────┐
│  [Icon]  Label Text  [✕]  │
└───────────────────────────┘
```

### 22.2 Chip Variants

#### Filter Chip (Toggle)
```
Default:
  Background: transparent
  Color: --neutral-200
  Border: 1px solid --border-default
  Radius: --radius-full
  Padding: --space-1.5 vertical, --space-3 horizontal
  Font: --text-body-sm (14px), weight 500
  Cursor: pointer

Selected:
  Background: --amber-400 at 15%
  Color: --amber-400
  Border: 1px solid --amber-400 at 30%

Hover:
  Background: --surface-elevated
  Border: --border-prominent
```

#### Dismissible Chip
```
Same as filter chip, with:
  Close icon (✕) on right: --icon-xs (14px)
  Gap between text and icon: --space-1.5
  Close icon hover: --error-400
```

#### Input Chip (Selected value, e.g., tags)
```
Background: --neutral-700
Color: --neutral-100
Border: 1px solid --border-default
Radius: --radius-sm (6px)
Padding: --space-1 vertical, --space-2 horizontal
Font: --text-body-sm (14px), weight 400
Close icon on right for removal
```

### 22.3 Chip Rules

1. Chips in a group wrap to the next line with `--space-2` gap
2. Maximum 6 chips visible before a "+N more" indicator
3. Chip labels are max 20 characters
4. Chips are always used in groups of 2+. A single chip should be a badge instead

---

## 23. Tables

### 23.1 Table Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│  ☐  Column A ▲     Column B          Column C       Actions    │ ← Header
├─────────────────────────────────────────────────────────────────┤
│  ☐  Row 1 data     Row 1 data        Row 1 data     [⋮]       │ ← Row
├─────────────────────────────────────────────────────────────────┤
│  ☐  Row 2 data     Row 2 data        Row 2 data     [⋮]       │ ← Row
├─────────────────────────────────────────────────────────────────┤
│  ☐  Row 3 data     Row 3 data        Row 3 data     [⋮]       │ ← Row (hover)
├─────────────────────────────────────────────────────────────────┤
│  Showing 1–10 of 47                    ◄  1  2  3  4  5  ►    │ ← Footer
└─────────────────────────────────────────────────────────────────┘
```

### 23.2 Table Styling

```
Table:
  Width: 100%
  Border-collapse: separate
  Border-spacing: 0
  Background: --surface-raised
  Border: 1px solid --border-default
  Radius: --radius-lg (12px)
  Overflow: hidden

Header:
  Background: --neutral-850
  Border-bottom: 1px solid --border-default
  Font: --text-body-sm (14px), weight 600, --neutral-200
  Padding: --space-3 vertical, --space-4 horizontal
  Text-transform: none (sentence case)
  Cursor: pointer on sortable columns
  Sort indicator: Lucide ArrowUpDown, --icon-xs

Row:
  Background: transparent
  Border-bottom: 1px solid --border-subtle
  Font: --text-body-sm (14px), weight 400, --neutral-50
  Padding: --space-3 vertical, --space-4 horizontal

Row hover:
  Background: --surface-elevated

Row selected:
  Background: --amber-400 at 8% opacity
  Border-left: 2px solid --amber-400

Pagination:
  Background: transparent
  Padding: --space-3
  Font: --text-caption (13px), --neutral-300
  Page buttons: icon buttons with numbers
```

### 23.3 Table Responsive Strategy

On mobile (< 768px), tables transform into card-based layouts:

```
┌─────────────────────────────┐
│  Column A: Row 1 data       │
│  Column B: Row 1 data       │
│  Column C: Row 1 data       │
│                    [Action]  │
└─────────────────────────────┘
┌─────────────────────────────┐
│  Column A: Row 2 data       │
│  Column B: Row 2 data       │
│  ...                        │
└─────────────────────────────┘
```

Each row becomes a card with the column name as a label and the cell value as the content.

### 23.4 Table Rules

1. Tables are only used in dashboard contexts, never on marketing pages
2. Minimum column width: 100px to prevent text truncation
3. The first column is typically the primary identifier (name, title, ID)
4. The last column is typically the actions column (⋮ more menu)
5. Numeric data is right-aligned. Text data is left-aligned
6. Status columns use status badges, not plain text
7. Date columns use relative time for recent dates ("2 hours ago") and absolute for older dates ("Jun 15, 2025")
8. Maximum 8 columns visible at once. Additional columns go into a detail view or "more" panel

---

## 24. Forms

### 24.1 Form Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Form Title (text-h3)                                          │
│  Optional description (text-body-sm, muted)                    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Label*                                                    │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  Input                                              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  Helper text or error message                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────┐  ┌───────────────────────┐          │
│  │  Label                │  │  Label*               │          │
│  │  ┌─────────────────┐  │  │  ┌─────────────────┐  │          │
│  │  │  Input           │  │  │  │  Input           │  │          │
│  │  └─────────────────┘  │  │  └─────────────────┘  │          │
│  └───────────────────────┘  └───────────────────────┘          │
│                                                                 │
│  ┌─────────────────────────────┐                               │
│  │  [Cancel]    [Submit]       │                               │
│  └─────────────────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### 24.2 Form Rules

1. **Max 2 fields per row** on desktop. Single column on mobile.
2. **Field spacing: `--space-5`** between form groups (label + input + helper).
3. **Section spacing: `--space-8`** between form sections (groups of related fields).
4. **Action buttons right-aligned** at the bottom. Primary action on the right, secondary (Cancel) on the left within the button group.
5. **Progressive validation.** Validate on blur (when user leaves field), not on every keystroke. Show errors immediately on blur. Re-validate on input change after first error.
6. **Required indicator.** Required fields marked with `*` after the label. At the top of the form, include a note: "Fields marked with * are required."
7. **Multi-step forms.** For complex forms (quote request), use a stepped layout with a progress indicator at the top. Each step should have 3–5 fields maximum. Steps show: step number, step title, completion status. Navigation: "Back" (ghost) and "Next" (primary) buttons. Final step: "Submit" button.
8. **Inline validation icons.** On valid input: green checkmark icon inside the input (right side). On error: red alert icon inside the input (right side).

---

## 25. Dashboard Components

### 25.1 Stat Widget

A compact card displaying a single metric.

```
┌───────────────────────────────────────┐
│  ┌─────┐                             │
│  │ 📊 │  Total Revenue               │ ← Icon + Label
│  └─────┘                             │
│                                       │
│  $47,250                             │ ← Value (text-h2)
│                                       │
│  ▲ 12.5% from last month             │ ← Trend indicator
└───────────────────────────────────────┘

Styling:
  Background: --surface-raised
  Border: 1px solid --border-default
  Radius: --radius-lg
  Padding: --space-5
  Icon: --icon-lg, --amber-400 or --teal-300
  Label: --text-caption, --neutral-300
  Value: --text-h2, --neutral-0
  Trend up: --success-400
  Trend down: --error-400
  Trend flat: --neutral-300
```

### 25.2 Activity Feed

```
┌───────────────────────────────────────────────────────────────┐
│  Recent Activity                                              │
├───────────────────────────────────────────────────────────────┤
│  ● Arjun submitted a new quote request           2 min ago   │
│  ● Task "Homepage redesign" moved to In Review   15 min ago  │
│  ● Invoice #1042 payment received ($5,000)        1 hour ago │
│  ● New support ticket: "Login issue"              3 hours ago│
│  ● Project "EcoTrack" milestone completed         Yesterday  │
└───────────────────────────────────────────────────────────────┘

Each item:
  Dot: colored by type (project=teal, payment=amber, support=info, etc.)
  Text: --text-body-sm, --neutral-50
  Timestamp: --text-caption, --neutral-300, right-aligned
  Separator: 1px solid --border-subtle between items
  Padding: --space-3 vertical per item
```

### 25.3 Progress Bar

```
Track:
  Height: 6px
  Background: --neutral-700
  Radius: --radius-full

Fill:
  Background: var(--gradient-accent) for primary
              --success-400 for positive progress
              --error-400 for at-risk progress
  Radius: --radius-full
  Transition: width 500ms ease-out

Label (above):
  Left: task name (--text-body-sm)
  Right: percentage (--text-body-sm, --neutral-200)
```

### 25.4 Kanban Column

```
Column:
  Width: 300px (desktop), full-width (mobile, stacked)
  Background: --surface-base
  Border: 1px solid --border-subtle
  Radius: --radius-lg
  Padding: --space-4

Column header:
  Title: --text-h5 (e.g., "To Do")
  Count badge: --text-tiny in --neutral-300
  Separator: 1px solid --border-default below header

Cards within column:
  Standard card style, --radius-md
  Drag handle (⠿) on left side
  Content: task title, assignee avatar, priority dot, due date
  Spacing between cards: --space-2

Drop zone (while dragging):
  Dashed border: 2px dashed --amber-400 at 40%
  Background: --amber-400 at 5%
```

### 25.5 Avatar

```
Sizes:
  xs: 24px (inline mentions, tight lists)
  sm: 32px (table rows, chat messages)
  md: 40px (cards, navigation)
  lg: 48px (profiles, headers)
  xl: 64px (profile pages, team cards)
  2xl: 96px (profile settings, about page)

Shape: circle (--radius-full)
Border: 2px solid --border-default (adds definition against dark bg)
Fallback: Initials on --neutral-700 background in --neutral-100 text

Avatar group (overlapping):
  Overlap: -8px margin-left per avatar
  Max visible: 5, then "+N" counter
  Z-index: first avatar on top, descending
```

---

## 26. Charts

### 26.1 Chart Color Palette

Charts use a curated subset of the design system colors. Maximum 6 series per chart.

| Series | Color | HSL |
|---|---|---|
| Series 1 | Amber | `hsl(37, 93%, 55%)` |
| Series 2 | Teal | `hsl(180, 48%, 52%)` |
| Series 3 | Blue | `hsl(210, 70%, 55%)` |
| Series 4 | Purple | `hsl(270, 60%, 55%)` |
| Series 5 | Pink | `hsl(330, 60%, 55%)` |
| Series 6 | Green | `hsl(145, 55%, 50%)` |

### 26.2 Chart Styling

```
Background: transparent (sits on --surface-raised card)
Grid lines: --border-subtle (horizontal only, no vertical)
Axis labels: --text-caption, --neutral-300
Axis lines: --border-default
Tooltip:
  Background: --surface-floating (glass)
  Border: 1px solid --border-default
  Radius: --radius-md
  Shadow: --shadow-lg
  Font: --text-body-sm
  Padding: --space-3

Line charts:
  Stroke width: 2px
  Dot size: 6px on hover (hidden at rest)
  Area fill: 8% opacity of line color

Bar charts:
  Radius: --radius-xs on top corners
  Gap: 4px between bars
  Hover: bar brightens to 100% opacity (rest at 85%)

Pie/Donut charts:
  Inner radius: 60% of outer (donut)
  Stroke: 2px --surface-raised between segments
  Label: center of donut shows primary metric
```

### 26.3 Chart Rules

1. Charts always sit inside a card with a title and optional subtitle
2. Y-axis labels on the left, X-axis labels at the bottom
3. No 3D charts. No skeuomorphic effects. No gradients on chart elements (except area fills)
4. Empty chart state: centered message "No data available" with a subtle illustration
5. Loading chart state: skeleton pulsing in the shape of the expected chart
6. Responsive: charts reduce detail on mobile (fewer grid lines, larger touch targets)
7. Interactive: hover shows tooltip, click drills down (where applicable)

---

## 27. Loading States

### 27.1 Loading Spinner

```
Size: 20px (buttons), 32px (sections), 48px (pages)
Color: --amber-400 (primary), --neutral-300 (secondary)
Style: Ring with 270° arc, rotating 360° per 800ms
Animation: linear rotation, ease-in-out arc length pulse
Border: 2.5px solid
```

### 27.2 Page Loading

When navigating between pages, show a thin progress bar at the very top of the viewport:

```
Position: fixed, top 0, full width
Height: 2px
Background: var(--gradient-accent)
Animation: indeterminate progress (moves left to right repeatedly)
Z-index: highest (above everything)
```

### 27.3 Button Loading

When a button triggers an async action:
```
1. Replace icon with spinner (same size as icon)
2. Keep label text or change to contextual message ("Sending...")
3. Disable the button (prevent double-submit)
4. Maintain button width (no layout shift)
5. On complete: show brief success state (green check) for 1s, then revert
```

### 27.4 Content Loading

For sections that load data asynchronously:
```
1. Show skeleton loaders in the shape of expected content
2. Fade in actual content over 200ms when data arrives
3. Minimum display time for skeleton: 300ms (prevent flash)
4. If loading takes > 5s, show a text hint: "Still loading..."
5. If loading fails, show error state (see Error States)
```

### 27.5 Loading Rules

1. Loading states must appear within 100ms of the action that triggered them
2. Never show a blank white/dark screen while loading — always show skeleton or spinner
3. Loading text uses "Loading..." not "Please wait..."
4. Progress indicators (for uploads, imports) show percentage when deterministic
5. Optimistic updates for fast actions (task status change shows immediately, reverts on error)

---

## 28. Empty States

### 28.1 Empty State Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     [Subtle illustration                        │
│                      or large icon]                             │
│                                                                 │
│              No projects yet                                    │ ← Title
│                                                                 │
│     Create your first project to get started.                   │ ← Description
│     Your team will be able to track progress                    │
│     and collaborate in real-time.                               │
│                                                                 │
│              [Create Project]                                   │ ← CTA button
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 28.2 Empty State Styling

```
Container: centered, max-width 400px
Icon: --icon-2xl (40px) or --icon-3xl (48px), --neutral-400
Title: --text-h4, --neutral-100
Description: --text-body-sm, --neutral-300, text-align center
CTA: Primary button (sm or md)
Spacing: --space-4 between icon and title, --space-2 between title and description, --space-6 between description and CTA
```

### 28.3 Empty State Messages

| Context | Title | Description | CTA |
|---|---|---|---|
| Projects (client) | No projects yet | Your projects will appear here once started. | Contact Us |
| Projects (admin) | No projects | Create your first project to begin tracking. | Create Project |
| Tasks | All clear | You have no assigned tasks. Enjoy the calm. | — |
| Invoices | No invoices | Your billing history will appear here. | — |
| Messages | No conversations | Start a conversation with your team. | New Message |
| Notifications | All caught up | You have no new notifications. | — |
| Support tickets | No tickets | Need help? Create a support ticket. | Create Ticket |
| Blog posts | No posts yet | Start writing your first blog post. | New Post |
| Search results | No results found | Try adjusting your search or filters. | Clear Filters |

### 28.4 Empty State Rules

1. Every empty state has a title and description. Never show just "No data."
2. Include a CTA button when the user can take action to fill the empty state
3. The tone is encouraging, not apologetic ("All clear!" not "Sorry, nothing here")
4. Empty states should never feel like errors — they are natural starting points

---

## 29. Error States

### 29.1 Inline Field Error

```
Below the input field:
  Icon: Lucide AlertCircle, --icon-xs, --error-400
  Text: --text-caption, --error-400
  Gap: --space-1 between icon and text
  Margin: --space-1.5 above (after input)
  Animation: slide down + fade in, 150ms ease-out
```

### 29.2 Form Error Summary

When a form has multiple errors:
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠  Please fix the following errors:                           │
│                                                                 │
│  • Email address is required                                    │
│  • Password must be at least 8 characters                       │
│  • Please select a service type                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Background: --error-400 at 8% opacity
Border: 1px solid --error-400 at 25%
Border-left: 3px solid --error-400
Radius: --radius-md
Padding: --space-4
Font: --text-body-sm
Icon: --error-400, --icon-md
```

### 29.3 Page Error (500, Network Failure)

```
Centered layout (like empty state):
  Icon: Lucide AlertTriangle, --icon-3xl, --error-400
  Title: "Something went wrong" (--text-h3)
  Description: "We have been notified and are looking into it. Please try again."
  CTA: "Try Again" (primary button) + "Go Home" (ghost button)
```

### 29.4 404 Page

```
Centered layout:
  Large "404" text: --text-display-xl, --neutral-600
  Title: "Page not found" (--text-h2)
  Description: "The page you are looking for does not exist or has been moved."
  CTA: "Go Home" (primary button) + "Contact Support" (link button)
```

### 29.5 Toast Notifications (Error)

```
Position: top-right, fixed, stacked
Background: --surface-raised
Border: 1px solid --border-default
Border-left: 3px solid --error-400
Radius: --radius-lg
Shadow: --shadow-lg
Padding: --space-4
Max-width: 400px
Icon: Lucide XCircle, --error-400
Title: --text-body-sm, weight 600
Message: --text-caption, --neutral-300
Dismiss: X button, top-right corner
Auto-dismiss: 5 seconds
Animation: slide in from right (200ms), slide out to right (200ms)
```

### 29.6 Error Rules

1. Error messages tell the user what to do, not just what went wrong. "Email is required" not "Validation error."
2. Never show technical errors to users. "Something went wrong" not "TypeError: undefined is not a function."
3. Error states are always red (`--error-400`). Never yellow (that is warning). Never amber (that is the CTA color).
4. Errors are dismissible. Toast errors auto-dismiss after 5s. Inline errors clear when the user fixes the input.
5. Network errors always include a "Try Again" option.

---

## 30. Success States

### 30.1 Inline Success

After a successful action (form submission, save, etc.):

```
Icon: Lucide CheckCircle, --success-400
Text: "Changes saved successfully" (--text-body-sm, --success-400)
Animation: fade in + slight scale (1.0 → 1.02 → 1.0), 300ms
Auto-dismiss: 3 seconds (fade out)
```

### 30.2 Toast Notification (Success)

Same structure as error toast, but:
```
Border-left: 3px solid --success-400
Icon: Lucide CheckCircle, --success-400
Auto-dismiss: 3 seconds (shorter than error)
```

### 30.3 Full Page Success (e.g., Quote Submitted)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     ✓ (animated checkmark                       │
│                        circle drawing in)                       │
│                                                                 │
│              Quote request submitted                            │
│                                                                 │
│     Thank you! We will review your project details              │
│     and get back to you within 24 hours.                        │
│                                                                 │
│              [Back to Home]                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Checkmark animation:
  Circle draws in (SVG stroke-dashoffset), 400ms ease-out
  Check draws in after circle, 300ms ease-out
  Color: --success-400
  Size: 64px
```

### 30.4 Success Rules

1. Success feedback is brief and auto-dismissing (3s). Do not block the user.
2. Success states use green (`--success-400`), never amber (that is the CTA color).
3. Major successes (form submission, payment) get a full-page confirmation with next steps.
4. Minor successes (save, toggle, status change) get a toast notification or inline indicator.

---

## 31. Skeleton Loaders

### 31.1 Skeleton Styling

```
Background: --neutral-800
Shimmer: linear-gradient(
  90deg,
  --neutral-800 0%,
  --neutral-750 40%,
  --neutral-800 80%
)
Background-size: 200% 100%
Animation: shimmer 1.5s ease-in-out infinite
Radius: matches the element being loaded (text = --radius-xs, card = --radius-xl)
```

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 31.2 Skeleton Patterns

| Element | Skeleton Shape |
|---|---|
| Text line | Rectangle, height 14px, width 60–100%, --radius-xs |
| Heading | Rectangle, height 24px, width 40–60%, --radius-xs |
| Paragraph (3 lines) | 3 rectangles with staggered widths (100%, 90%, 70%) |
| Avatar | Circle, matching avatar size |
| Card | Full card rectangle with inner skeletons for title + text + meta |
| Table row | Row of rectangles matching column layout |
| Image | Rectangle matching image aspect ratio |
| Button | Rectangle matching button size |
| Stat widget | Card skeleton with number placeholder and label |

### 31.3 Skeleton Rules

1. Skeleton shapes must match the layout of the content they replace. A card skeleton should be the same height and width as the final card.
2. Minimum display time: 300ms. If content loads in <300ms, still show the skeleton for 300ms to prevent flashing.
3. Fade transition: skeleton fades out and content fades in over 200ms. No abrupt switch.
4. Skeleton components should be separate files for reusability (e.g., `CardSkeleton`, `TableSkeleton`).
5. On slow connections (>3s), add a text hint below the skeleton: "Loading..."

---

## 32. Accessibility

### 32.1 Core Standards

The platform targets **WCAG 2.2 Level AA** compliance for all pages.

### 32.2 Color Accessibility

1. All text meets minimum contrast ratios (see Color System § 3.4)
2. No information is conveyed by color alone — always pair color with text, icons, or patterns
3. All interactive elements have visible hover and focus states that work in high-contrast mode
4. The amber accent was verified for common color blindness types (protanopia, deuteranopia, tritanopia)

### 32.3 Keyboard Accessibility

1. All interactive elements are reachable via Tab key in logical order
2. Tab order follows visual reading order (left-to-right, top-to-bottom)
3. Skip-to-main-content link on every page (visually hidden until focused)
4. Focus trap in modals — Tab cycles within the modal, Escape closes it
5. Arrow keys navigate within grouped controls (tabs, menus, radio groups)
6. Enter/Space activates buttons and links
7. Escape closes modals, dropdowns, and overlays

### 32.4 Focus Indicators

```
All focusable elements:
  outline: 2px solid var(--amber-400)
  outline-offset: 2px

Optional enhancement for complex backgrounds:
  box-shadow: 0 0 0 2px var(--neutral-900), 0 0 0 4px var(--amber-400)
  (creates a gap between the element and the focus ring)

Focus-visible only:
  Use :focus-visible instead of :focus to avoid showing focus rings on click
  Polyfill for older browsers: :focus:not(:focus-visible) { outline: none; }
```

### 32.5 Semantic HTML

| Element | HTML |
|---|---|
| Navigation | `<nav aria-label="Primary">` |
| Main content | `<main>` |
| Sections | `<section aria-labelledby="section-heading-id">` |
| Cards | `<article>` when standalone content |
| Sidebar | `<aside>` |
| Footer | `<footer>` |
| Lists | `<ul>` / `<ol>` for all list-like content |
| Headings | Proper h1–h6 hierarchy, one h1 per page |
| Buttons | `<button>` not `<div onClick>` |
| Links | `<a href>` for navigation, `<button>` for actions |

### 32.6 ARIA Usage

1. `aria-label` for icon-only buttons and ambiguous links
2. `aria-labelledby` for sections with visible headings
3. `aria-describedby` for inputs with helper text or error messages
4. `aria-live="polite"` for dynamic content updates (notifications, chat messages)
5. `aria-live="assertive"` for critical alerts (error messages, system warnings)
6. `aria-expanded` for collapsible sections (FAQ, mobile menu)
7. `aria-current="page"` for active navigation items
8. `role="alert"` for toast notifications
9. `role="dialog"` with `aria-modal="true"` for modals

### 32.7 Motion Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This media query is applied globally. All animations and transitions are reduced to near-instant for users who prefer reduced motion. The 3D hero scene is replaced with a static gradient. Scroll animations are removed entirely. Carousels become static single-item views with manual navigation only.

---

## 33. Dark Theme Rules

### 33.1 Dark-Only Policy

DevSpark is dark theme only. There is no light theme. There is no theme toggle. This is an intentional design decision:

1. A single theme means every color, contrast ratio, and visual effect is optimized for one context
2. Dark themes are universally preferred by developers (our primary audience)
3. Dark themes reduce eye strain for extended dashboard use
4. Dark themes make content (text, images, data) the focal point
5. Maintaining two themes doubles the design and testing effort without clear ROI

### 33.2 Dark Theme Anti-Patterns

| Don't | Do |
|---|---|
| Use pure black (#000000) backgrounds | Use deep blue-grays (--neutral-900, --neutral-950) |
| Use pure white (#FFFFFF) text | Use warm off-white (--neutral-0, --neutral-50) |
| Use heavy box-shadows for separation | Use thin borders and subtle surface color differences |
| Use saturated colors at full intensity | Use muted, desaturated variants of accent colors |
| Use gradients that create bright spots | Use subtle, low-opacity gradients for depth |
| Apply the same visual density as light theme | Increase spacing slightly — dark themes need more breathing room |
| Use white images/illustrations on dark | Treat images with overlays or desaturation to blend |

### 33.3 Dark Theme Performance

Dark pixels on OLED screens use less power. This is a real benefit for mobile users. To maximize this:
1. Keep background surfaces as dark as possible without sacrificing depth
2. Minimize bright accent color surface area
3. Use outline/stroke icons instead of filled icons
4. Prefer thin text weights for body copy (400–500, not 600+)

---

## 34. Responsive Rules

### 34.1 Mobile-First Implementation

All styles start from the mobile layout and add complexity at larger breakpoints:

```css
/* Mobile base */
.section {
  padding: var(--space-16) var(--space-5);
}

/* Tablet */
@media (min-width: 768px) {
  .section {
    padding: var(--space-20) var(--space-8);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .section {
    padding: var(--space-24) var(--space-12);
  }
}
```

### 34.2 Responsive Component Behaviors

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Header | Logo + hamburger | Logo + hamburger | Logo + full nav + CTA |
| Hero headline | display-md (28px) | display-lg (44px) | display-xl (72px) |
| Hero CTAs | Stacked full-width | Inline | Inline |
| Service cards | 1 column | 2 columns | 3–4 columns |
| Section padding | 64px vertical | 80px vertical | 96px vertical |
| Card padding | 20px | 24px | 24px |
| Footer | Accordion columns | 2-column grid | 4-column grid |
| Tables | Card view | Scrollable table | Full table |
| Sidebar | Bottom tab bar | Collapsed (icons only) | Full sidebar |
| Modal | Full-screen sheet | Centered modal | Centered modal |
| Charts | Simplified (fewer labels) | Standard | Full detail |
| Pricing | Stacked cards | Side-by-side | Side-by-side |

### 34.3 Touch Target Rules

1. Minimum touch target: **44×44px** on mobile
2. Minimum gap between touch targets: **8px**
3. Touch targets extend beyond the visible element if needed (larger padding)
4. Swipe gestures for carousels and dismissible elements
5. No hover-only information on touch devices

### 34.4 Responsive Rules

1. **No horizontal scroll** on any page at any breakpoint (except within code blocks and tables)
2. **Images scale proportionally** — never stretch or crop awkwardly
3. **Text remains readable** — body text never below 14px on mobile
4. **Navigation is always accessible** — hamburger menu on mobile, full nav on desktop
5. **3D/WebGL is disabled on mobile** — CSS gradient fallback for performance
6. **Modals become bottom sheets on mobile** — slide up from the bottom, full-width
7. **Grid columns collapse gracefully** — 4 → 2 → 1 column as viewport narrows

---

## 35. Animation System

### 35.1 Animation Philosophy

Animation in DevSpark serves three purposes:
1. **Feedback** — confirming user actions (button press, form submit, toggle)
2. **Orientation** — showing spatial relationships (dropdown appears below trigger, modal slides in from center)
3. **Attention** — drawing the eye to something important (notification badge, CTA section)

Animation never serves:
- Decoration ("it would look cool if this bounced")
- Delay ("let's show a fancy transition before the content loads")
- Distraction ("watch this while you wait")

### 35.2 Timing Tokens

| Token | Value | Easing | Usage |
|---|---|---|---|
| `--duration-instant` | 100ms | `ease-out` | Focus rings, hover color changes |
| `--duration-fast` | 150ms | `ease-out` | Button states, input focus, toggles |
| `--duration-normal` | 250ms | `ease-out` | Dropdown open, tooltip appear, card hover |
| `--duration-slow` | 400ms | `ease-out` | Modal enter, section reveal, page transition |
| `--duration-slower` | 600ms | `ease-out` | Complex transitions, staggered reveals |

### 35.3 Easing Functions

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Most transitions — fast start, slow end. Default. |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetrical transitions — moving between states |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Slight overshoot — playful interactions (toggle, checkbox) |
| `--ease-linear` | `linear` | Spinner rotation, progress bars, marquee |

### 35.4 Framer Motion Presets

```typescript
// Fade up — default entrance for most elements
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

// Fade in — simple opacity transition
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

// Scale up — for modals and overlays
const scaleUp = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

// Stagger children — for card grids and lists
const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// Slide from right — for mobile menu, side panels
const slideRight = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

// Slide up — for bottom sheets on mobile
const slideUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};
```

### 35.5 Scroll Animations

**Entrance animations (Framer Motion `whileInView`):**
- Elements fade up (20px) and fade in when they enter the viewport
- `viewport={{ once: true, margin: "-100px" }}` — trigger when element is 100px into the viewport, animate only once
- Stagger children in grids by 80ms each
- Do not animate elements that are visible on page load (above the fold)

**Scroll-linked animations (GSAP ScrollTrigger — use sparingly):**
- Process timeline: connecting lines draw as user scrolls past each step
- Hero parallax: 3D scene depth shifts subtly with scroll
- Do not parallax text — it makes reading difficult
- Maximum 2 scroll-linked animations per page

### 35.6 Hover Animations

| Element | Animation |
|---|---|
| Card | translateY(-2px to -4px), border lightens, shadow appears — 300ms |
| Button (primary) | translateY(-1px), shadow appears — 200ms |
| Button (secondary) | background lightens — 200ms |
| Link | color transitions, underline appears — 150ms |
| Navigation item | background appears, text brightens — 150ms |
| Logo (trusted by) | grayscale → full color — 300ms |
| Image (portfolio) | scale(1.05) within overflow hidden container — 400ms |

### 35.7 Animation Rules

1. **No animation on page load for content above the fold.** Above-the-fold content should appear instantly. The hero headline, navigation, and trust chips are visible without animation.

2. **Animate only `transform` and `opacity`.** These properties are GPU-accelerated and do not cause layout reflows. Never animate `width`, `height`, `margin`, `padding`, `top`, `left`, `border-width`, or `font-size`.

3. **Maximum 5 animated elements per viewport.** If more than 5 elements are animating simultaneously, the page feels chaotic. Stagger reveals ensure only a few elements move at once.

4. **No animation longer than 600ms.** Any animation exceeding 600ms feels sluggish. The user is waiting, not watching a movie.

5. **Exit animations are 20% faster than entrance animations.** Dismissing something should feel snappy. A modal that enters in 300ms exits in 240ms.

6. **Respect `prefers-reduced-motion`.** All animations are wrapped in the reduced motion check. When reduced motion is preferred, all transitions reduce to opacity-only at 100ms.

---

## 36. Component Naming Rules

### 36.1 File Naming

```
kebab-case for all files:
  glass-card.tsx
  section-header.tsx
  hero-section.tsx
  stat-widget.tsx
  
NOT:
  GlassCard.tsx  (PascalCase files)
  glass_card.tsx (snake_case files)
  glassCard.tsx  (camelCase files)
```

### 36.2 Component Naming

```
PascalCase for all React components:
  GlassCard
  SectionHeader
  HeroSection
  StatWidget
  
Export naming matches the component:
  export function GlassCard() { ... }
  // or
  export const GlassCard = () => { ... }
```

### 36.3 Directory Structure

```
src/components/
├── ui/                    # shadcn/ui primitives (auto-generated)
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
├── shared/                # Reusable composed components
│   ├── glass-card.tsx
│   ├── section-header.tsx
│   ├── animated-counter.tsx
│   ├── badge.tsx
│   ├── stat-widget.tsx
│   ├── avatar.tsx
│   ├── logo.tsx
│   └── ...
├── layout/                # Structural layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── mobile-nav.tsx
│   ├── sidebar.tsx
│   ├── dashboard-layout.tsx
│   └── ...
├── sections/              # Page-level sections (marketing)
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   ├── portfolio-section.tsx
│   ├── testimonials-section.tsx
│   └── ...
├── three/                 # 3D / WebGL components
│   ├── hero-canvas.tsx
│   ├── orb-scene.tsx
│   └── ...
├── dashboard/             # Dashboard-specific components
│   ├── activity-feed.tsx
│   ├── kanban-board.tsx
│   ├── chart-card.tsx
│   └── ...
└── forms/                 # Form-specific components
    ├── quote-form.tsx
    ├── contact-form.tsx
    ├── login-form.tsx
    └── ...
```

### 36.4 Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Component files | kebab-case | `glass-card.tsx` |
| Component exports | PascalCase | `GlassCard` |
| Hook files | kebab-case with `use-` prefix | `use-scroll-position.ts` |
| Hook exports | camelCase with `use` prefix | `useScrollPosition` |
| Utility files | kebab-case | `format-date.ts` |
| Utility exports | camelCase | `formatDate` |
| Type files | kebab-case | `project-types.ts` |
| Type exports | PascalCase | `ProjectStatus` |
| CSS variable files | kebab-case | `globals.css` |
| CSS variables | kebab-case with `--` prefix | `--surface-raised` |
| Tailwind classes | kebab-case (Tailwind default) | `bg-surface-raised` |
| API route files | kebab-case | `route.ts` |
| Page files | kebab-case directories | `app/services/[slug]/page.tsx` |

---

## 37. Design Tokens

### 37.1 Token Architecture

Design tokens are the atomic values that define the visual language. They are defined in three layers:

**Layer 1: Primitive tokens** — raw values (hex colors, pixel sizes)
**Layer 2: Semantic tokens** — named by purpose (background, surface, accent)
**Layer 3: Component tokens** — specific to components (card-background, button-radius)

Developers interact primarily with semantic tokens. Primitive tokens exist to support the semantic layer.

### 37.2 Token Categories

| Category | Prefix | Example |
|---|---|---|
| Colors | `--color-*` | `--color-neutral-900` |
| Surfaces | `--surface-*` | `--surface-raised` |
| Text | `--text-*` | `--text-body-md` |
| Spacing | `--space-*` | `--space-6` |
| Radius | `--radius-*` | `--radius-xl` |
| Shadow | `--shadow-*` | `--shadow-lg` |
| Border | `--border-*` | `--border-default` |
| Duration | `--duration-*` | `--duration-normal` |
| Ease | `--ease-*` | `--ease-out` |
| Z-index | `--z-*` | `--z-modal` |
| Font | `--font-*` | `--font-sans` |

---

## 38. CSS Variables

### 38.1 Complete Variable Definition

```css
:root {
  /* ─── Fonts ─── */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* ─── Neutral Scale ─── */
  --neutral-950: hsl(222, 22%, 5%);
  --neutral-900: hsl(220, 20%, 7%);
  --neutral-850: hsl(220, 18%, 9%);
  --neutral-800: hsl(220, 17%, 11%);
  --neutral-750: hsl(220, 16%, 14%);
  --neutral-700: hsl(220, 15%, 17%);
  --neutral-600: hsl(220, 14%, 22%);
  --neutral-500: hsl(220, 12%, 30%);
  --neutral-400: hsl(215, 12%, 42%);
  --neutral-300: hsl(215, 12%, 55%);
  --neutral-200: hsl(215, 14%, 70%);
  --neutral-100: hsl(215, 16%, 82%);
  --neutral-50: hsl(210, 20%, 92%);
  --neutral-0: hsl(210, 25%, 97%);

  /* ─── Accent Primary (Amber) ─── */
  --amber-50: hsl(40, 95%, 95%);
  --amber-100: hsl(40, 92%, 85%);
  --amber-200: hsl(39, 90%, 72%);
  --amber-300: hsl(38, 92%, 62%);
  --amber-400: hsl(37, 93%, 55%);
  --amber-500: hsl(35, 90%, 48%);
  --amber-600: hsl(32, 85%, 40%);
  --amber-700: hsl(28, 80%, 32%);

  /* ─── Accent Secondary (Teal) ─── */
  --teal-50: hsl(180, 60%, 95%);
  --teal-100: hsl(180, 55%, 82%);
  --teal-200: hsl(180, 50%, 65%);
  --teal-300: hsl(180, 48%, 52%);
  --teal-400: hsl(180, 50%, 42%);
  --teal-500: hsl(180, 52%, 34%);
  --teal-600: hsl(180, 50%, 26%);

  /* ─── Semantic Colors ─── */
  --success-400: hsl(145, 65%, 42%);
  --success-500: hsl(145, 60%, 34%);
  --warning-400: hsl(38, 92%, 55%);
  --warning-500: hsl(35, 88%, 45%);
  --error-400: hsl(0, 72%, 55%);
  --error-500: hsl(0, 68%, 45%);
  --info-400: hsl(210, 70%, 55%);
  --info-500: hsl(210, 65%, 45%);

  /* ─── Glow Colors ─── */
  --amber-glow-sm: hsl(37, 93%, 55% / 0.10);
  --amber-glow-md: hsl(37, 93%, 55% / 0.15);
  --amber-glow-lg: hsl(37, 93%, 55% / 0.08);
  --teal-glow: hsl(180, 48%, 52% / 0.12);
  --success-glow: hsl(145, 65%, 42% / 0.12);
  --error-glow: hsl(0, 72%, 55% / 0.12);
  --info-glow: hsl(210, 70%, 55% / 0.12);

  /* ─── Surfaces ─── */
  --surface-ground: var(--neutral-950);
  --surface-base: var(--neutral-900);
  --surface-raised: var(--neutral-800);
  --surface-elevated: var(--neutral-750);
  --surface-floating: var(--neutral-700);
  --surface-overlay: hsl(0, 0%, 0% / 0.60);

  /* ─── Borders ─── */
  --border-default: var(--neutral-600);
  --border-subtle: hsl(220, 14%, 15%);
  --border-prominent: hsl(220, 14%, 25%);
  --border-interactive: hsl(220, 14%, 30%);

  /* ─── Text ─── */
  --text-primary: var(--neutral-0);
  --text-secondary: var(--neutral-50);
  --text-tertiary: var(--neutral-200);
  --text-muted: var(--neutral-300);
  --text-faint: var(--neutral-400);
  --text-disabled: var(--neutral-500);

  /* ─── Spacing ─── */
  --space-px: 1px;
  --space-0: 0px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-2-5: 10px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;
  --space-48: 192px;

  /* ─── Border Radius ─── */
  --radius-none: 0px;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;
  --radius-full: 9999px;

  /* ─── Shadows ─── */
  --shadow-xs: 0 1px 2px hsl(0 0% 0% / 0.20);
  --shadow-sm: 0 2px 4px hsl(0 0% 0% / 0.25);
  --shadow-md: 0 4px 12px hsl(0 0% 0% / 0.30);
  --shadow-lg: 0 8px 24px hsl(0 0% 0% / 0.35);
  --shadow-xl: 0 16px 48px hsl(0 0% 0% / 0.40);
  --shadow-2xl: 0 24px 64px hsl(0 0% 0% / 0.50);
  --shadow-inner: inset 0 1px 3px hsl(0 0% 0% / 0.20);

  /* ─── Animation ─── */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ─── Z-Index ─── */
  --z-base: 0;
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-overlay: 150;
  --z-modal: 200;
  --z-toast: 250;
  --z-tooltip: 300;
  --z-max: 999;

  /* ─── Container Widths ─── */
  --container-xs: 480px;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1200px;
  --container-2xl: 1400px;

  /* ─── Layout ─── */
  --header-height: 72px;
  --header-height-mobile: 64px;
  --sidebar-width: 260px;
  --sidebar-width-collapsed: 68px;
}
```

---

## 39. Tailwind Tokens

### 39.1 Tailwind Configuration

The Tailwind configuration maps CSS variables to utility classes. This is the bridge between the design token system and the implementation layer.

```typescript
// tailwind.config.ts — key custom values

{
  theme: {
    extend: {
      colors: {
        neutral: {
          0: 'var(--neutral-0)',
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          750: 'var(--neutral-750)',
          800: 'var(--neutral-800)',
          850: 'var(--neutral-850)',
          900: 'var(--neutral-900)',
          950: 'var(--neutral-950)',
        },
        amber: {
          50: 'var(--amber-50)',
          100: 'var(--amber-100)',
          200: 'var(--amber-200)',
          300: 'var(--amber-300)',
          400: 'var(--amber-400)',
          500: 'var(--amber-500)',
          600: 'var(--amber-600)',
          700: 'var(--amber-700)',
        },
        teal: {
          50: 'var(--teal-50)',
          100: 'var(--teal-100)',
          200: 'var(--teal-200)',
          300: 'var(--teal-300)',
          400: 'var(--teal-400)',
          500: 'var(--teal-500)',
          600: 'var(--teal-600)',
        },
        success: { 400: 'var(--success-400)', 500: 'var(--success-500)' },
        warning: { 400: 'var(--warning-400)', 500: 'var(--warning-500)' },
        error: { 400: 'var(--error-400)', 500: 'var(--error-500)' },
        info: { 400: 'var(--info-400)', 500: 'var(--info-500)' },
        surface: {
          ground: 'var(--surface-ground)',
          base: 'var(--surface-base)',
          raised: 'var(--surface-raised)',
          elevated: 'var(--surface-elevated)',
          floating: 'var(--surface-floating)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          subtle: 'var(--border-subtle)',
          prominent: 'var(--border-prominent)',
          interactive: 'var(--border-interactive)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
        tooltip: 'var(--z-tooltip)',
      },
      maxWidth: {
        'container-xs': 'var(--container-xs)',
        'container-sm': 'var(--container-sm)',
        'container-md': 'var(--container-md)',
        'container-lg': 'var(--container-lg)',
        'container-xl': 'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
      },
    },
  },
}
```

### 39.2 Tailwind Usage Examples

```html
<!-- Surface with border -->
<div class="bg-surface-raised border border-border rounded-xl p-6">

<!-- Amber accent button -->
<button class="bg-amber-400 text-neutral-950 rounded-md px-5 py-2.5 font-semibold 
               hover:bg-amber-300 transition-colors duration-fast">

<!-- Muted text -->
<p class="text-neutral-300 text-sm">

<!-- Glass card -->
<div class="bg-neutral-800/60 backdrop-blur-xl border border-neutral-600/50 rounded-xl p-6">
```

---

## 40. Component Library

### 40.1 Complete Component Index

The following is the complete list of components in the DevSpark design system, organized by layer.

#### Layer 1: UI Primitives (shadcn/ui based)

| Component | File | Purpose |
|---|---|---|
| Button | `ui/button.tsx` | All button variants and sizes |
| Input | `ui/input.tsx` | Text input fields |
| Textarea | `ui/textarea.tsx` | Multi-line text input |
| Select | `ui/select.tsx` | Dropdown select |
| Checkbox | `ui/checkbox.tsx` | Checkbox with label |
| RadioGroup | `ui/radio-group.tsx` | Radio button group |
| Switch | `ui/switch.tsx` | Toggle switch |
| Slider | `ui/slider.tsx` | Range slider |
| Dialog | `ui/dialog.tsx` | Modal dialogs |
| Sheet | `ui/sheet.tsx` | Side panels and bottom sheets |
| Dropdown Menu | `ui/dropdown-menu.tsx` | Context menus and dropdowns |
| Tooltip | `ui/tooltip.tsx` | Information tooltips |
| Accordion | `ui/accordion.tsx` | Collapsible content sections |
| Tabs | `ui/tabs.tsx` | Tab navigation |
| Table | `ui/table.tsx` | Data table base |
| Separator | `ui/separator.tsx` | Horizontal/vertical dividers |
| Skeleton | `ui/skeleton.tsx` | Loading placeholder |
| Toast | `ui/toast.tsx` | Toast notifications |
| Avatar | `ui/avatar.tsx` | User avatar |
| Badge | `ui/badge.tsx` | Status badges |
| Progress | `ui/progress.tsx` | Progress bar |
| Popover | `ui/popover.tsx` | Floating content |
| Command | `ui/command.tsx` | Command palette |
| ScrollArea | `ui/scroll-area.tsx` | Custom scrollbar area |

#### Layer 2: Shared Components

| Component | File | Purpose |
|---|---|---|
| GlassCard | `shared/glass-card.tsx` | Glass-effect card with hover |
| SectionHeader | `shared/section-header.tsx` | Section title + subtitle + accent |
| AnimatedCounter | `shared/animated-counter.tsx` | Count-up animation |
| TechBadge | `shared/tech-badge.tsx` | Technology label pill |
| StatusBadge | `shared/status-badge.tsx` | Status indicator badge |
| StatWidget | `shared/stat-widget.tsx` | Dashboard stat card |
| LogoMark | `shared/logo-mark.tsx` | Company logo component |
| SocialLinks | `shared/social-links.tsx` | Social media icon links |
| RatingStars | `shared/rating-stars.tsx` | Star rating display |
| ReadingTime | `shared/reading-time.tsx` | Blog reading time indicator |
| EmptyState | `shared/empty-state.tsx` | Empty content state |
| ErrorState | `shared/error-state.tsx` | Error display |
| SuccessState | `shared/success-state.tsx` | Success display |
| LoadingSpinner | `shared/loading-spinner.tsx` | Spin loading indicator |
| PageTransition | `shared/page-transition.tsx` | Page enter/exit transition |
| BackToTop | `shared/back-to-top.tsx` | Scroll to top button |
| Breadcrumb | `shared/breadcrumb.tsx` | Page breadcrumb navigation |
| ThemeGlow | `shared/theme-glow.tsx` | Background glow effect |

#### Layer 3: Layout Components

| Component | File | Purpose |
|---|---|---|
| Header | `layout/header.tsx` | Marketing site header |
| Footer | `layout/footer.tsx` | Marketing site footer |
| MobileNav | `layout/mobile-nav.tsx` | Mobile navigation overlay |
| DashboardLayout | `layout/dashboard-layout.tsx` | Dashboard shell |
| Sidebar | `layout/sidebar.tsx` | Dashboard sidebar |
| TopBar | `layout/top-bar.tsx` | Dashboard top bar |
| PageContainer | `layout/page-container.tsx` | Content width container |
| SectionContainer | `layout/section-container.tsx` | Full-bleed section wrapper |

#### Layer 4: Section Components (Marketing)

| Component | File |
|---|---|
| HeroSection | `sections/hero-section.tsx` |
| TrustedBySection | `sections/trusted-by-section.tsx` |
| ServicesSection | `sections/services-section.tsx` |
| WhyChooseSection | `sections/why-choose-section.tsx` |
| PortfolioSection | `sections/portfolio-section.tsx` |
| ProcessSection | `sections/process-section.tsx` |
| TechStackSection | `sections/tech-stack-section.tsx` |
| TestimonialsSection | `sections/testimonials-section.tsx` |
| PricingSection | `sections/pricing-section.tsx` |
| FaqSection | `sections/faq-section.tsx` |
| CtaSection | `sections/cta-section.tsx` |

#### Layer 5: Form Components

| Component | File |
|---|---|
| QuoteForm | `forms/quote-form.tsx` |
| ContactForm | `forms/contact-form.tsx` |
| LoginForm | `forms/login-form.tsx` |
| RegisterForm | `forms/register-form.tsx` |
| ForgotPasswordForm | `forms/forgot-password-form.tsx` |
| SearchForm | `forms/search-form.tsx` |

#### Layer 6: Dashboard Components

| Component | File |
|---|---|
| ActivityFeed | `dashboard/activity-feed.tsx` |
| KanbanBoard | `dashboard/kanban-board.tsx` |
| KanbanColumn | `dashboard/kanban-column.tsx` |
| KanbanCard | `dashboard/kanban-card.tsx` |
| ChartCard | `dashboard/chart-card.tsx` |
| DataTable | `dashboard/data-table.tsx` |
| ProjectCard | `dashboard/project-card.tsx` |
| TaskCard | `dashboard/task-card.tsx` |
| InvoiceCard | `dashboard/invoice-card.tsx` |
| ChatWindow | `dashboard/chat-window.tsx` |
| ChatMessage | `dashboard/chat-message.tsx` |
| NotificationItem | `dashboard/notification-item.tsx` |
| TimelineView | `dashboard/timeline-view.tsx` |

#### Layer 7: 3D Components

| Component | File |
|---|---|
| HeroCanvas | `three/hero-canvas.tsx` |
| OrbScene | `three/orb-scene.tsx` |
| ParticleField | `three/particle-field.tsx` |

---

## 41. Hero Design Rules

### 41.1 Hero Anatomy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                      [3D WebGL Background                               │
│                       (lazy loaded,                                     │
│                        mobile = CSS gradient)]                          │
│                                                                         │
│                                                                         │
│         We build software that                                          │ ← Display headline
│         moves businesses forward.                                       │
│                                                                         │
│         Premium web applications, mobile apps, and AI solutions         │ ← Subheadline
│         built for startups that refuse to compromise on quality.        │
│                                                                         │
│         [Start Your Project]    [View Our Work]                         │ ← CTAs
│                                                                         │
│         ✓ 50+ Projects   ★ 4.9 Rating   🏢 Enterprise Ready           │ ← Trust chips
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 41.2 Hero Rules

1. **Full viewport height** (`min-height: 100vh` or `100dvh`)
2. **Content centered vertically and horizontally** within the viewport
3. **Maximum headline width: 800px** to maintain comfortable reading
4. **3D scene is behind the text** — never competing with readability
5. **3D scene has a gradient overlay** to ensure text contrast (radial gradient from transparent center to dark edges)
6. **Two CTAs only** — primary (amber, fills) + secondary (ghost/outline)
7. **Trust chips below CTAs** with `--space-8` separation
8. **No auto-playing video** in the hero
9. **Headline is visible without animation delay** — it appears instantly, no wait
10. **Mobile: stack CTAs vertically**, reduce headline size to display-md, hide 3D scene

---

## 42. Portfolio Rules

### 42.1 Portfolio Grid

- 3 columns on desktop, 2 on tablet, 1 on mobile
- Cards use the Interactive Card variant (image + text)
- Image aspect ratio: 16:10
- Cards are uniform height per row
- Filter chips above the grid (by service type)
- Hover reveals a semi-transparent overlay with "View Case Study" text

### 42.2 Portfolio Card Content

1. Featured image (project screenshot or mockup, dark-themed)
2. Project title (text-h4)
3. One-line description (text-body-sm, muted)
4. Tech stack badges (TechBadge components, max 4)
5. Key metric highlight ("34% conversion increase" — amber accent)

---

## 43. Case Study Rules

### 43.1 Case Study Layout

Linear reading flow, no distracting sidebar. Single-column content within `--container-lg`:

1. Hero image (full-width within container, 16:9)
2. Title (text-h1) + metadata (client, industry, services, duration)
3. Overview paragraph
4. "The Challenge" section (text with optional supporting image)
5. "Our Solution" section (text with optional supporting image)
6. "The Process" section (brief, 3–4 steps)
7. "Results" section (stat widgets in a row — big numbers, amber accent)
8. Technology stack (TechBadge grid)
9. Client testimonial (pull quote in a GlassCard)
10. Project gallery (2–3 additional screenshots)
11. CTA section ("Start a Similar Project")

### 43.2 Case Study Rules

1. Real metrics only. Do not fabricate numbers.
2. Client name only with permission. Otherwise: "A leading [industry] company."
3. Screenshots must show dark-themed interfaces when possible.
4. Testimonial quotes must be real and attributed.
5. Maximum page length: ~2000 words. Keep it scannable.

---

## 44. Pricing Rules

### 44.1 Pricing Layout

Three pricing tiers side-by-side on desktop, stacked on mobile.

### 44.2 Pricing Card Anatomy

```
┌─────────────────────────────────┐
│  Starter                        │ ← Tier name (text-h4)
│                                 │
│  $5,000 – $15,000              │ ← Price range (text-h2, amber)
│  per project                    │ ← Billing period (text-caption)
│                                 │
│  Perfect for MVPs and           │ ← Description (text-body-sm)
│  small business websites.       │
│                                 │
│  ──────────────────────────     │ ← Separator
│                                 │
│  ✓ Custom design                │ ← Features list
│  ✓ Responsive development       │
│  ✓ Basic SEO setup              │
│  ✓ 2 rounds of revisions        │
│  ✓ 30 days post-launch support  │
│                                 │
│  [Get Started]                  │ ← CTA button
└─────────────────────────────────┘
```

### 44.3 Pricing Rules

1. The middle tier is the "recommended" tier — highlighted with amber border and "Most Popular" badge
2. Feature checkmarks use `--success-400` check icons
3. Missing features in lower tiers shown as `--neutral-500` text with dash instead of check
4. A "Need something custom?" link below the pricing grid points to the quote form
5. No monthly/annual toggle unless actual SaaS subscription pricing exists
6. Price ranges, not exact prices — this is a services business, projects vary
7. Enterprise tier shows "Custom Quote" instead of a price range

---

## 45. Blog Rules

### 45.1 Blog Listing

- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- First post can be featured (spans 2 columns with larger image)
- Cards: featured image (16:10), title, excerpt (2 lines max), author + date + reading time
- Category filter chips above the grid
- Pagination at bottom (numbered, not infinite scroll)

### 45.2 Blog Post

- Single-column reading layout, `--container-sm` (640px) for text
- Featured image: full-width within container, 2:1 aspect ratio
- Title: text-h1
- Metadata: author avatar + name, publish date, reading time, category badge
- Table of contents: fixed sidebar on desktop (right side, outside main column), inline on mobile
- Body: text-body-lg (18px) for comfortable reading
- Code blocks: dark background (--neutral-850), JetBrains Mono, syntax highlighting
- Headings within body: text-h2, text-h3 (no h1 within body)
- Images within body: max-width 100%, rounded corners, optional caption
- Pull quotes: large text, amber left-border, italic
- Author bio: at the end, avatar + name + short bio + social links
- Related posts: 3 cards below the article
- Social sharing: sticky bar on the left (desktop) or inline buttons (mobile)

### 45.3 Blog Rules

1. No blog post without a featured image
2. Reading time calculated at 200 words/minute
3. Excerpt auto-generated from first 160 characters if not manually set
4. Code blocks support copy-to-clipboard
5. All blog images optimized via next/image
6. Blog posts support MDX for embedding React components

---

## 46. Dashboard Rules

### 46.1 General Dashboard Design

1. **Fixed sidebar on desktop** (260px), collapsible to icons (68px)
2. **Fixed top bar** (72px) with search, notifications, and user menu
3. **Main content scrolls independently** of sidebar and top bar
4. **Breadcrumbs** below the top bar for navigation context
5. **Page title** as the first element in the main content area
6. **No marketing-style animations** in dashboards — transitions are functional only
7. **Data density is higher** than marketing pages — less whitespace, more information
8. **Tables, cards, and lists** are the primary content patterns
9. **Actions are contextual** — near the data they affect, not in global toolbars
10. **Keyboard shortcuts** for power users (e.g., N for new, S for search, Esc for close)

### 46.2 Dashboard Color Usage

- Sidebar: `--surface-raised` background
- Main content: `--surface-base` background
- Cards: `--surface-raised` with `--border-default`
- Active sidebar item: `--amber-400` text, `--amber-400` at 10% background
- Data charts: chart color palette (see Charts section)

---

## 47. Admin Rules

### 47.1 Admin Dashboard Specifics

The admin dashboard has the highest information density. It prioritizes:

1. **Revenue visibility** — revenue card is always the first and most prominent widget
2. **System health** — subtle indicators for API response time, error rate, uptime
3. **Actionable items** — pending invoices, unassigned tickets, unapproved content highlighted with count badges
4. **Activity feed** — real-time log of all significant system events
5. **Quick actions** — floating action button or command palette for frequent tasks

### 47.2 Admin-Specific Components

- User management table with role badges, status indicators, last login
- Revenue chart (area chart, 12-month trend)
- Utilization gauge (circular progress for team capacity)
- Content management table with status (draft, published, scheduled)
- Audit log table with filtering by action type, user, and date range

---

## 48. Client Rules

### 48.1 Client Dashboard Specifics

The client dashboard prioritizes **simplicity and transparency**:

1. **Project status front and center** — the client should know exactly where their project stands
2. **Next milestone highlighted** — what is coming next and when
3. **Payment status clear** — any pending invoices shown prominently
4. **Communication accessible** — chat and support tickets easy to reach
5. **No technical jargon** — task statuses shown as human-readable labels ("In Progress", not "STATUS_WIP")

### 48.2 Client-Specific Design Considerations

- Fewer navigation items than admin (simpler sidebar)
- Larger text and more spacing (not tech-savvy audience)
- Progress bars and visual indicators preferred over data tables
- File downloads clearly accessible
- Notification preferences easily configurable

---

## 49. Employee Rules

### 49.1 Employee Dashboard Specifics

The employee dashboard prioritizes **productivity and focus**:

1. **Today's tasks prioritized** — what needs to be done today, sorted by priority
2. **Time tracking accessible** — log time with minimal clicks
3. **Kanban board available** — visual task management
4. **Team chat integrated** — communicate without leaving the dashboard
5. **Personal metrics visible** — hours logged, tasks completed, productivity trends

### 49.2 Employee-Specific Design Considerations

- Keyboard shortcuts for all common actions
- Dense information display (employees tolerate higher density)
- Quick task status updates (single click to move tasks between columns)
- Timer widget for active time tracking (floating or pinned)
- Minimal distractions — no marketing content, no upsells, just work tools

---

## Appendix: Design Checklist

Before shipping any page or component, verify:

- [ ] All colors reference design tokens (no hardcoded hex values)
- [ ] All spacing uses the spacing scale (no arbitrary pixel values)
- [ ] All border-radius uses the radius scale
- [ ] All text uses the type scale (correct size, weight, line-height)
- [ ] All interactive elements have hover, focus, active, and disabled states
- [ ] Focus indicators are visible on all backgrounds
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Component works on mobile (320px), tablet (768px), and desktop (1280px)
- [ ] Component respects `prefers-reduced-motion`
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] All icons have `aria-label` when used without text
- [ ] Loading states are defined
- [ ] Empty states are defined
- [ ] Error states are defined
- [ ] Component renders correctly in a glass card context
- [ ] No performance regressions (check Lighthouse if adding heavy elements)
- [ ] Animation duration ≤ 600ms
- [ ] Maximum 5 animated elements per viewport
- [ ] Maximum 2 glowing elements per viewport
- [ ] File is named in kebab-case
- [ ] Component is exported in PascalCase

---

> This document is the design constitution of DevSpark.
> It is complete, specific, and non-negotiable.
> Any element that cannot be traced back to a rule in this document is unauthorized.
> When in doubt, choose restraint over decoration, clarity over cleverness, and function over flourish.

> **Last Updated:** June 28, 2025
> **Document Owner:** DevSpark Design Team
> **Review Cadence:** With every design sprint
