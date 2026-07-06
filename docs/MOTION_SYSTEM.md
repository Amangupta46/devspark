# DevSpark — Motion System

> The animation constitution of DevSpark.
> Every transition, every reveal, every hover response, every scroll behavior — defined here.
> Motion is not decoration. Motion is communication.
> This document governs how things move, why they move, when they move, and when they must be still.

---

## Table of Contents

1. [Motion Philosophy](#1-motion-philosophy)
2. [Motion Principles](#2-motion-principles)
3. [Motion Tokens](#3-motion-tokens)
4. [Animation Timing](#4-animation-timing)
5. [Bezier Curves](#5-bezier-curves)
6. [Duration System](#6-duration-system)
7. [Hover Motion](#7-hover-motion)
8. [Button Motion](#8-button-motion)
9. [Card Motion](#9-card-motion)
10. [Navbar Motion](#10-navbar-motion)
11. [Hero Motion](#11-hero-motion)
12. [Page Transitions](#12-page-transitions)
13. [Scroll Reveal](#13-scroll-reveal)
14. [Parallax](#14-parallax)
15. [Text Animation](#15-text-animation)
16. [Image Animation](#16-image-animation)
17. [Video Animation](#17-video-animation)
18. [Dashboard Motion](#18-dashboard-motion)
19. [Charts Motion](#19-charts-motion)
20. [Loading Motion](#20-loading-motion)
21. [Skeleton Motion](#21-skeleton-motion)
22. [Error Motion](#22-error-motion)
23. [Success Motion](#23-success-motion)
24. [Notification Motion](#24-notification-motion)
25. [Drawer Motion](#25-drawer-motion)
26. [Dialog Motion](#26-dialog-motion)
27. [Accordion Motion](#27-accordion-motion)
28. [Sidebar Motion](#28-sidebar-motion)
29. [Table Motion](#29-table-motion)
30. [Tooltip Motion](#30-tooltip-motion)
31. [Cursor Motion](#31-cursor-motion)
32. [3D Motion](#32-3d-motion)
33. [WebGL Rules](#33-webgl-rules)
34. [Reduced Motion](#34-reduced-motion)
35. [Motion Accessibility](#35-motion-accessibility)
36. [Performance Budget](#36-performance-budget)
37. [GPU-Friendly Motion](#37-gpu-friendly-motion)
38. [CSS vs Framer Motion Rules](#38-css-vs-framer-motion-rules)
39. [GSAP Usage Rules](#39-gsap-usage-rules)
40. [React Three Fiber Rules](#40-react-three-fiber-rules)
41. [Intersection Observer Rules](#41-intersection-observer-rules)
42. [Motion Naming Convention](#42-motion-naming-convention)
43. [Motion Anti-Patterns](#43-motion-anti-patterns)

---

## 1. Motion Philosophy

### 1.1 The Core Belief

Motion at DevSpark exists to reduce cognitive load, not to add visual interest. A well-animated interface feels faster than a static one — not because things are actually faster, but because the user's perception of time is managed. A button that responds in 50ms with a scale transition feels instant. A modal that fades in over 250ms feels like a natural extension of the click. A card that gently rises into view as you scroll feels like the page is alive and aware of you.

This is the goal: an interface that feels alive without feeling busy.

### 1.2 The Three Laws of DevSpark Motion

**Law 1 — Motion must have a reason.**

Every animation answers one of these questions:
- "What just happened?" (Feedback — a button was pressed, a form was submitted)
- "Where did this come from?" (Orientation — a dropdown appeared below its trigger, a modal emerged from a button)
- "What should I look at?" (Attention — a notification arrived, a CTA section is approaching)

If an animation does not answer one of these questions, it does not exist.

**Law 2 — Motion must be invisible.**

The user should never think "that was a nice animation." They should think "that felt smooth" or "that was quick" or nothing at all. The moment a user notices the motion system, the motion system has failed. We are not building a showreel. We are building a tool that happens to feel extraordinarily polished.

**Law 3 — Motion must be fast.**

We reject the trend of slow, theatrical animations. DevSpark is a productivity platform. Every millisecond of animation is a millisecond the user is waiting. Our animations are swift. They begin immediately. They resolve quickly. They never force the user to watch something they did not ask to see.

### 1.3 The Emotional Target

The motion system should make the interface feel:
- **Responsive** — "It reacts the instant I touch it."
- **Spatial** — "I understand where things are in relation to each other."
- **Confident** — "Nothing is uncertain or jittery."
- **Calm** — "Nothing is competing for my attention."

The motion system should never make the interface feel:
- Playful, bouncy, or whimsical
- Theatrical or cinematic
- Heavy, sluggish, or labored
- Nervous, twitchy, or over-eager

---

## 2. Motion Principles

### Principle 1 — Enter Slowly, Exit Quickly

Elements entering the viewport or appearing on screen take slightly longer to arrive (giving the user time to register them) and leave quickly (because the user has already decided to dismiss them and is waiting for the result).

| Direction | Duration Ratio |
|---|---|
| Enter | 1.0× (base duration) |
| Exit | 0.7× (30% faster) |

A modal that enters in 300ms exits in 210ms. A dropdown that opens in 200ms closes in 140ms.

### Principle 2 — Motion Follows the Action

The direction of an animation corresponds to the action that triggered it:
- A dropdown opens downward because the trigger is above it
- A sidebar slides in from the left because that is where it lives
- A mobile bottom sheet slides up because it originates from the bottom edge
- A notification slides in from the right because it is an interruption entering the field of view
- A deleted item collapses vertically because it is being removed from a vertical list

Never animate in a direction that contradicts the spatial logic.

### Principle 3 — Stagger, Don't Swarm

When multiple elements enter simultaneously (a grid of cards, a list of items, a row of stats), they stagger — each one appearing 60–100ms after the previous. This creates a wave that guides the eye in the intended reading direction (left to right, top to bottom) without overwhelming the user with simultaneous movement.

Stagger rules:
- Grid items stagger left-to-right, top-to-bottom
- List items stagger top-to-bottom
- Maximum stagger delay: 600ms for the last item (even if the list is 50 items long — cap it)
- Only the first 8–10 items in a list stagger. After that, all remaining items appear at once

### Principle 4 — One Thing Moves at a Time

Within any given viewport, the user's attention should be directed to one animated region at a time. If a card grid is staggering in, the section heading above it should already be visible. If a modal is opening, the background dims but does not animate separately. If a notification slides in, no other element begins an animation.

Exceptions: micro-interactions (hover states, focus rings) can occur simultaneously because they are user-initiated and scoped to the cursor/focus location.

### Principle 5 — Respect the Frame Budget

All animations must maintain 60fps (16.67ms per frame). If a device cannot sustain 60fps for an animation, the animation is too complex. Reduce it. Remove it. Replace it with a simpler version. A 30fps animation is worse than no animation at all — it communicates that the product is laggy.

### Principle 6 — Meaningful Defaults, Not Mandatory Motion

Every animatable component has a well-defined default animation. But no animation is mandatory. The system works perfectly with all animations disabled (see §34 Reduced Motion). The layout never depends on animation to be correct. Content is always in its final position even if the transition is skipped.

---

## 3. Motion Tokens

Motion tokens are the named constants that govern all animation parameters. They are the motion equivalent of color tokens — no animation should use a hardcoded value.

### 3.1 Token Table

| Token | Category | Value | Purpose |
|---|---|---|---|
| `motion.duration.instant` | Duration | 100ms | Micro-interactions (focus ring, color swap) |
| `motion.duration.fast` | Duration | 150ms | Quick feedback (button press, toggle, input focus) |
| `motion.duration.normal` | Duration | 250ms | Standard transitions (dropdown, tooltip, card hover lift) |
| `motion.duration.moderate` | Duration | 350ms | Medium transitions (modal enter, drawer slide, page content fade) |
| `motion.duration.slow` | Duration | 500ms | Deliberate transitions (scroll reveal entrance, hero content appear) |
| `motion.duration.slower` | Duration | 700ms | Extended transitions (complex stagger sequences, 3D scene initial load) |
| `motion.ease.out` | Easing | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for most enter/appear animations |
| `motion.ease.inOut` | Easing | `cubic-bezier(0.65, 0, 0.35, 1)` | State changes, repositioning, layout shifts |
| `motion.ease.in` | Easing | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` | Exit animations only (elements leaving the screen) |
| `motion.ease.spring` | Easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toggle switches, checkboxes (slight overshoot) |
| `motion.ease.linear` | Easing | `linear` | Spinners, progress bars, continuous rotation |
| `motion.stagger.tight` | Stagger | 40ms | Dense lists (table rows, small items) |
| `motion.stagger.normal` | Stagger | 80ms | Card grids, feature lists |
| `motion.stagger.wide` | Stagger | 120ms | Large showcase items (portfolio, pricing tiers) |
| `motion.distance.xs` | Distance | 4px | Subtle shifts (button press translateY) |
| `motion.distance.sm` | Distance | 8px | Small shifts (card hover lift) |
| `motion.distance.md` | Distance | 16px | Standard entrance offset (fade-up for cards) |
| `motion.distance.lg` | Distance | 24px | Pronounced entrance (hero content, section reveals) |
| `motion.distance.xl` | Distance | 40px | Large entrance (mobile menu panels, full-width sections) |
| `motion.scale.subtle` | Scale | 0.98 | Subtle scale-in (modals, popovers) |
| `motion.scale.press` | Scale | 0.97 | Button active press effect |
| `motion.scale.image` | Scale | 1.04 | Image hover zoom (within overflow hidden) |

---

## 4. Animation Timing

### 4.1 Timing Classification

Every animation in the system falls into one of four timing categories:

| Category | Duration Range | Use Cases |
|---|---|---|
| **Micro** | 50–150ms | Focus rings, color changes, cursor feedback, active states |
| **Short** | 150–300ms | Tooltips, dropdowns, button state changes, input feedback, tabs |
| **Medium** | 300–500ms | Modals, drawers, scroll reveals, page content transitions |
| **Long** | 500–700ms | Hero animations, complex staggers, 3D scene intros |

### 4.2 Timing Rules

1. **No animation exceeds 700ms.** Anything longer feels sluggish. If a complex effect needs more time, break it into sequenced stages.

2. **User-triggered animations are faster.** When the user clicks/taps something, the response should feel instant. Hover effects: 100–200ms. Click responses: 50–150ms. This is non-negotiable.

3. **System-triggered animations can be slower.** Scroll reveals, page transitions, and data loading animations can take 300–500ms because the user did not directly request them and they serve an attention-guiding purpose.

4. **Delays are almost never acceptable.** Start the animation the instant it is triggered. The only acceptable delay is within a stagger sequence (each subsequent item waits for its stagger offset). Do not add delays "to let the user read something first" — the user controls their own reading speed.

---

## 5. Bezier Curves

### 5.1 The Curves

DevSpark uses a curated set of four easing curves. No other curves are permitted. Adding custom curves without team approval is a design violation.

#### Ease Out (Default)
```
cubic-bezier(0.16, 1, 0.3, 1)
```
**Behavior:** Fast start, decelerating finish. The element "arrives" with energy and gently settles into place.
**When to use:** Entrances, reveals, appearances — any time something is coming into view or being added to the interface.
**Character:** Confident. Decisive. The element knows where it is going.

#### Ease In-Out (Symmetric)
```
cubic-bezier(0.65, 0, 0.35, 1)
```
**Behavior:** Slow start, fast middle, slow end. Symmetrical acceleration and deceleration.
**When to use:** Layout repositioning, state changes (toggle between two states), accordion expand/collapse, sidebar open/close.
**Character:** Smooth. Even-tempered. Neither rushed nor lingering.

#### Ease In (Exit)
```
cubic-bezier(0.55, 0.055, 0.675, 0.19)
```
**Behavior:** Slow start, accelerating exit. The element gathers speed as it leaves.
**When to use:** Exits, dismissals, removals — any time something is leaving the viewport or being removed. This curve is used far less frequently than ease-out because most of the time elements appear, they do not disappear with ceremony.
**Character:** Purposeful departure. Not lingering. Not dramatic.

#### Ease Spring (Overshoot)
```
cubic-bezier(0.34, 1.56, 0.64, 1)
```
**Behavior:** Overshoots the target by ~5% then settles back. A controlled bounce.
**When to use:** Toggle switches, checkbox checks, mobile menu icon morph (hamburger → X), small playful moments. Used sparingly — maximum 2–3 spring animations on any single page.
**Character:** A wink. A tiny moment of personality that humanizes the interface without undermining its professionalism.

### 5.2 Framer Motion Spring Config (Alternative)

For Framer Motion animations that use physics-based springs instead of bezier curves:

| Preset | Stiffness | Damping | Mass | Usage |
|---|---|---|---|---|
| `spring.snappy` | 500 | 30 | 1 | Quick, controlled — modals, popovers |
| `spring.smooth` | 300 | 30 | 1 | Default — card transitions, layout changes |
| `spring.gentle` | 200 | 25 | 1 | Soft — hero content, slow reveals |
| `spring.bouncy` | 400 | 15 | 1 | Slight bounce — toggles, checkboxes only |

Spring guidelines:
- Prefer `type: "spring"` in Framer Motion for layout animations (`layout` prop) because springs handle interruptions more naturally than timed bezier curves
- Use bezier curves for CSS transitions and opacity-only animations
- Never let a spring oscillate more than once. If the element visibly bounces back and forth, increase damping

---

## 6. Duration System

### 6.1 Duration Map

| Component / Context | Enter | Exit | Hover On | Hover Off |
|---|---|---|---|---|
| Focus ring | 0ms (instant) | 100ms | — | — |
| Button color change | — | — | 100ms | 150ms |
| Button press (scale) | 50ms | 100ms | — | — |
| Input focus border | 150ms | 200ms | — | — |
| Toggle switch | 200ms | 200ms | — | — |
| Tooltip | 150ms | 100ms | — | — |
| Dropdown menu | 200ms | 140ms | — | — |
| Card hover lift | — | — | 250ms | 300ms |
| Card glow appear | — | — | 300ms | 400ms |
| Tab content switch | 200ms | 150ms | — | — |
| Accordion expand | 300ms | 200ms | — | — |
| Sidebar open/close | 300ms | 250ms | — | — |
| Drawer slide | 350ms | 250ms | — | — |
| Modal enter/exit | 300ms | 200ms | — | — |
| Notification toast | 250ms | 200ms | — | — |
| Scroll reveal (card) | 500ms | — | — | — |
| Scroll reveal (heading) | 400ms | — | — | — |
| Page content transition | 350ms | 250ms | — | — |
| Hero content appear | 600ms | — | — | — |
| Stagger item delay | 80ms per item | — | — | — |
| 3D scene initial | 700ms | — | — | — |
| Skeleton shimmer | 1500ms (loop) | — | — | — |
| Loading spinner | 800ms (loop) | — | — | — |

### 6.2 The Exit Multiplier

All exit durations are calculated as:

```
exit_duration = enter_duration × 0.7
```

This is rounded to the nearest 50ms for simplicity. Examples:
- Enter 300ms → Exit 210ms → Rounded to 200ms
- Enter 500ms → Exit 350ms → Stays 350ms
- Enter 200ms → Exit 140ms → Stays 140ms

---

## 7. Hover Motion

### 7.1 Hover Philosophy

Hover states exist to confirm interactivity. They answer the question: "Can I click this?" The hover response should be immediate enough to feel connected to the cursor but not so aggressive that it distracts from scanning the page.

### 7.2 Hover Specifications

#### Interactive Card Hover
```
Properties animated:
  - transform: translateY(-2px) to translateY(-4px) depending on card size
  - border-color: --border-default → --border-prominent
  - box-shadow: none → --shadow-md (and optionally glow)
  
Timing:
  - Hover on: 250ms ease-out
  - Hover off: 300ms ease-out (slightly slower return feels more natural)
  
Rules:
  - The card lifts, it does not scale. Scale changes on cards feel tablet-like and imprecise.
  - Glow appears only on featured/premium cards, not all cards.
  - The entire card is the hover target, not just the image or text.
```

#### Navigation Item Hover
```
Properties animated:
  - background-color: transparent → --surface-elevated
  - color: --neutral-200 → --neutral-0
  
Timing:
  - Hover on: 150ms ease-out
  - Hover off: 200ms ease-out
  
Rules:
  - Background appears as a soft pill/rounded rectangle behind the text
  - No transform. Navigation items do not move on hover.
```

#### Link Hover
```
Properties animated:
  - color: --teal-300 → --teal-200
  - text-decoration: none → underline (or underline-offset transition)
  
Timing:
  - 150ms ease-out both directions
  
Rules:
  - Links within body text use underline on hover.
  - Navigation links use background change instead of underline.
```

#### Image Hover (Portfolio/Blog)
```
Properties animated:
  - transform: scale(1) → scale(1.04)
  - filter: brightness(1) → brightness(1.1) (very subtle)
  
Container:
  - overflow: hidden with border-radius
  - The image zooms, the container stays fixed

Timing:
  - Hover on: 400ms ease-out (slow zoom feels cinematic)
  - Hover off: 500ms ease-out (even slower return)
```

#### Logo Hover (Trusted By Section)
```
Properties animated:
  - filter: grayscale(1) opacity(0.4) → grayscale(0) opacity(1)
  
Timing:
  - Hover on: 300ms ease-out
  - Hover off: 400ms ease-out
```

### 7.3 Hover Anti-Patterns

- Do not animate `width`, `height`, `margin`, or `padding` on hover — they cause layout reflow
- Do not use `transition: all` — it animates properties you did not intend and is costly
- Do not change text content on hover (e.g., button label changing to "Click me!")
- Do not scale text on hover — it looks jittery at non-integer scale values
- Do not add hover effects to non-interactive elements (headings, paragraphs, badges)

---

## 8. Button Motion

### 8.1 Button State Transitions

**Resting → Hover**
```
Background: instant color shift (100ms ease-out)
Shadow: subtle shadow appears (150ms ease-out)
Transform: translateY(-1px) for primary buttons only (100ms ease-out)
```

**Hover → Active (Press)**
```
Transform: translateY(0px) and scale(0.97) (50ms ease-out)
Shadow: shadow retracts to --shadow-inner (50ms)
Background: darkens slightly (50ms)
```

**Active → Resting (Release)**
```
Transform: back to translateY(0) scale(1) (150ms ease-out)
Shadow: returns to resting state (150ms)
```

**Resting → Focus (Keyboard)**
```
Outline: 2px solid --amber-400 appears instantly (0ms)
Box-shadow: 0 0 0 4px amber-glow-sm appears (100ms ease-out)
```

**Resting → Loading**
```
Step 1: Button content fades out (100ms)
Step 2: Spinner fades in at center (100ms)
Step 3: Button width locks (maintains current width, no layout shift)
Step 4: Button becomes disabled
Opacity of button: reduced to 0.8
```

**Loading → Success**
```
Step 1: Spinner fades out (100ms)
Step 2: Checkmark icon draws in (SVG stroke animation, 300ms ease-out)
Step 3: Background briefly flashes --success-400 at 20% opacity (200ms)
Step 4: After 1000ms, return to resting state (200ms fade)
```

### 8.2 Button Rules

1. Primary (amber) buttons get the full translateY lift on hover. Secondary and ghost buttons only change background/border.
2. The active/press state must respond in under 50ms. This is the most time-critical animation in the system.
3. Icon buttons (icon only, no text) do not translateY. They only change background color.
4. Disabled buttons have no transitions. They are static at reduced opacity.

---

## 9. Card Motion

### 9.1 Card Entrance (Scroll Reveal)

```
Initial state:
  opacity: 0
  transform: translateY(16px)

Animate to:
  opacity: 1
  transform: translateY(0)

Duration: 500ms
Easing: motion.ease.out
Trigger: Element enters viewport with 100px bottom margin
Animation: once (does not replay on scroll back up)
```

### 9.2 Card Hover

```
Standard Card:
  translateY: 0 → -2px
  border: --border-default → --border-prominent
  shadow: none → --shadow-md
  Duration: 250ms ease-out / 300ms ease-out (return)

Glass Card (Marketing):
  translateY: 0 → -4px
  border: --border-default → --border-prominent
  box-shadow: none → amber glow (sm) or teal glow
  Duration: 300ms ease-out / 400ms ease-out (return)

Feature Card:
  translateY: 0 → -4px
  border: --border-default → --amber-400 at 30%
  box-shadow: none → amber glow (md)
  Duration: 400ms ease-out / 500ms ease-out (return)
```

### 9.3 Card Grid Stagger

```
Container: staggerChildren = 80ms, delayChildren = 100ms
Each card: fadeUp animation (opacity 0→1, translateY 16px→0)

For a 3×3 grid of 9 cards:
  Card 1: appears at 100ms
  Card 2: appears at 180ms
  Card 3: appears at 260ms
  Card 4: appears at 340ms
  ...
  Card 9: appears at 740ms

Total stagger window: 740ms
Constraint: if total stagger exceeds 800ms, reduce per-item stagger to fit
```

### 9.4 Card Removal

When a card is removed from a list (e.g., task completion, item deletion):

```
Step 1: Card opacity fades to 0, scale to 0.95 (200ms ease-in)
Step 2: Card height collapses to 0 with overflow hidden (250ms ease-in-out)
Step 3: Sibling cards slide up to fill the gap (300ms ease-out with Framer Motion layout animation)
```

---

## 10. Navbar Motion

### 10.1 Desktop Navigation

**Initial State (Top of Page):**
```
Background: transparent
Border-bottom: none
Position: fixed, top 0
Padding: generous (32px vertical)
```

**Scrolled State (after 50px scroll):**
```
Background: --neutral-950 at 80% opacity + backdrop-blur(16px)
Border-bottom: 1px solid --border-subtle
Padding: reduced (16px vertical)
Transition: all 300ms ease-out
```

The transition between states is smooth — background fades in, blur appears, padding reduces, and the nav "compresses" as you scroll.

**Active Navigation Item:**
```
Text color: --amber-400
Background: --amber-400 at 8% opacity (pill shape)
Indicator: 2px bottom bar in --amber-400 below the text
Transition: color 150ms, background 200ms
```

**Dropdown Menu:**
```
Enter:
  opacity: 0 → 1
  transform: translateY(-8px) → translateY(0)
  scale: 0.96 → 1
  Duration: 200ms ease-out
  Delay: 0ms (instant after trigger)

Exit:
  opacity: 1 → 0
  transform: translateY(0) → translateY(-4px)
  Duration: 140ms ease-in
```

### 10.2 Mobile Navigation

**Menu Open:**
```
Overlay: opacity 0 → 0.6 (250ms ease-out)
Menu panel: translateX(100%) → translateX(0) (300ms ease-out)
Menu items: stagger fade-up, 60ms apart, starting after panel is 50% visible
```

**Menu Close:**
```
Menu panel: translateX(0) → translateX(100%) (250ms ease-in)
Overlay: opacity 0.6 → 0 (200ms ease-out, starts after panel begins closing)
```

**Hamburger → X Morph:**
```
Top bar: rotateZ(0) → rotateZ(45deg) + translateY to center (250ms ease-spring)
Middle bar: opacity 1 → 0 (100ms)
Bottom bar: rotateZ(0) → rotateZ(-45deg) + translateY to center (250ms ease-spring)
```

---

## 11. Hero Motion

### 11.1 Hero Content Sequence

The hero is the single most animated section of the entire site. Even here, restraint is paramount. The animation is a carefully choreographed sequence, not a fireworks display.

**Sequence Timeline:**

| Time | Element | Animation | Duration |
|---|---|---|---|
| 0ms | Navigation | Appears instantly — no animation | 0ms |
| 0ms | 3D Background | Begins loading (shows gradient fallback) | — |
| 0ms | Hero Headline | Already visible — no entrance animation | 0ms |
| 200ms | Hero Subheadline | Fade up from 16px below | 500ms |
| 400ms | CTA Buttons | Fade up from 16px below | 400ms |
| 600ms | Trust Chips | Fade in (opacity only, no vertical movement) | 400ms |
| ~800ms | 3D Scene | Cross-fade from gradient fallback to live 3D | 700ms |

Critical rules:
- The headline is visible at paint. It does not animate in. The most important content on the page must never be hidden behind an animation delay.
- The 3D scene loads asynchronously. The hero is fully functional (text, buttons, trust indicators) before the 3D scene appears.
- Total hero sequence: ~1200ms from first paint to fully resolved. The user can interact with CTAs at 400ms.

### 11.2 Hero Headline Treatment

The headline itself does not animate on page load. However, it may have a subtle treatment:

**Option A — Static with gradient text:**
```
No animation. Text displayed immediately.
Optional: subtle gradient on the amber keywords using background-clip: text.
The gradient itself is static, not animated.
```

**Option B — Word-by-word reveal (if used, must be carefully tested):**
```
Each word fades in and slides up from 8px below.
Stagger: 40ms per word.
Duration per word: 300ms.
For a 6-word headline: 40ms × 5 = 200ms stagger + 300ms last word = 500ms total.
This option is acceptable ONLY if:
  - The headline is 8 words or fewer
  - The words are not replaced with blank space during loading (no CLS)
  - The animation plays once, not on every scroll
```

**Recommended:** Option A. Simplicity is more premium than complexity.

### 11.3 Hero Scroll Behavior

As the user scrolls past the hero:

```
Hero content: opacity reduces from 1 → 0 as scroll position moves from 0 → 80% of hero height
Hero content: translateY shifts from 0 → -30px (parallax drift upward)
3D scene: subtle depth shift (camera position adjusts to create parallax)
Speed: 0.5× scroll speed (content moves at half the speed of the scroll)
Implementation: CSS transform driven by scroll position, NOT re-renders
```

---

## 12. Page Transitions

### 12.1 Marketing Pages (Between Routes)

```
Exit current page:
  opacity: 1 → 0
  duration: 200ms ease-in

Enter new page:
  opacity: 0 → 1
  transform: translateY(8px) → translateY(0)
  duration: 350ms ease-out
  delay: 50ms (slight gap after exit completes)
```

Total perceived transition: ~600ms. This is the maximum acceptable page transition time.

### 12.2 Dashboard Pages (Within Dashboard Shell)

```
The sidebar and topbar remain static. Only the main content area transitions.

Exit:
  opacity: 1 → 0
  duration: 150ms ease-in

Enter:
  opacity: 0 → 1
  duration: 250ms ease-out

No vertical movement. Dashboard transitions are faster and more utilitarian than marketing transitions.
```

### 12.3 Progress Bar

During Next.js route transitions, a thin progress bar appears at the top of the viewport:

```
Position: fixed, top 0, full width, height 2px
Color: --amber-400 (gradient optional)
Z-index: --z-max

Animation:
  Step 1: Bar appears at 0% width (instantly)
  Step 2: Bar animates to 30% width (200ms, then pause)
  Step 3: Bar slowly creeps to 80% (trickle animation, simulating progress)
  Step 4: When page loads, bar jumps to 100% (100ms)
  Step 5: Bar fades out (200ms)
```

---

## 13. Scroll Reveal

### 13.1 Scroll Reveal Presets

**Fade Up (Default for most elements):**
```
initial: { opacity: 0, y: 16 }
animate: { opacity: 1, y: 0 }
duration: 500ms
easing: motion.ease.out
trigger: bottom of element crosses viewport minus 100px
```

**Fade In (For elements that should not move vertically):**
```
initial: { opacity: 0 }
animate: { opacity: 1 }
duration: 400ms
easing: motion.ease.out
Used for: background elements, decorative shapes, large images
```

**Fade Up Large (For hero-level elements within sections):**
```
initial: { opacity: 0, y: 24 }
animate: { opacity: 1, y: 0 }
duration: 600ms
easing: motion.ease.out
Used for: Section headings, feature spotlights, CTA sections
```

**Scale In (For special emphasis):**
```
initial: { opacity: 0, scale: 0.95 }
animate: { opacity: 1, scale: 1 }
duration: 500ms
easing: motion.ease.out
Used for: Hero 3D container, featured case study card, pricing highlight
Rare — use max 1–2 times per page
```

### 13.2 Scroll Reveal Rules

1. **Trigger once.** Scroll reveals play once when the element enters the viewport. They do not replay when the user scrolls back up. Set `viewport={{ once: true }}`.

2. **Do not reveal above-the-fold content.** Anything visible on initial page load (hero, navigation) should not have a scroll reveal. It should already be there.

3. **Reveal in reading order.** For a section with a heading, description, and card grid: the heading reveals first (or is already visible), then the description, then the cards stagger in. The user reads top-to-bottom, the reveals follow.

4. **Maximum 5 animated elements per viewport.** If more than 5 elements are animating simultaneously, the page feels chaotic. Stagger ensures sequential reveals.

5. **No horizontal reveals.** Elements do not slide in from the left or right on scroll. This is a legacy pattern from early scroll animation libraries. Vertical movement (fade-up) is the only acceptable scroll-triggered direction.

6. **The margin buffer.** Trigger reveals when the bottom of the element is 100px inside the viewport. This ensures the user sees the animation play out fully rather than catching the tail end of it as it scrolls past the edge.

---

## 14. Parallax

### 14.1 Parallax Philosophy

Parallax is used with extreme restraint. It creates a sense of depth and spatial richness when done subtly. It creates nausea and disorientation when overdone.

### 14.2 Permitted Parallax

| Element | Speed Ratio | Movement | Notes |
|---|---|---|---|
| Hero 3D scene | 0.3× | Vertical drift | Scene shifts slowly relative to scroll |
| Hero background gradient | 0.5× | Vertical drift | Gradient moves at half scroll speed |
| Section background decoration | 0.2× | Vertical drift | Faint geometric shapes behind sections |
| **Everything else** | **1.0× (no parallax)** | **Normal scroll** | **Text, cards, images, content — no parallax** |

### 14.3 Parallax Rules

1. **Never parallax text.** Moving text at a different speed than the user's scroll makes it unreadable. Zero exceptions.

2. **Never parallax interactive elements.** Buttons, links, inputs, and cards must scroll at 1.0× (normal speed). Parallaxing them makes them feel disconnected from the user's control.

3. **Maximum parallax depth difference: 0.5×.** The fastest layer moves at 1.0× (content). The slowest moves at 0.5×. Greater differences create uncomfortable spatial distortion.

4. **Parallax is disabled on mobile.** Mobile devices do not have the rendering headroom, and touch-based scrolling handles parallax poorly. Replace with static positioning.

5. **Implementation via CSS `transform: translate3d()` driven by scroll position.** Do not use `position: fixed` or `background-attachment: fixed` — these cause painting issues on mobile browsers.

---

## 15. Text Animation

### 15.1 Text Animation Types

**Counter Animation (Stat Numbers):**
```
Behavior: Number counts up from 0 to target value
Duration: 1500ms
Easing: ease-out (fast start, slow finish — feels like momentum decelerating)
Trigger: When the stat widget enters the viewport
Format: Animated with locale-aware formatting (commas, currency symbols)
Decimal: Animate to nearest integer, then append decimal if needed
Example: 0 → 47,250 over 1.5 seconds
```

**Typewriter Effect:**
```
Use: NEVER on the marketing site. Too playful. Too slow.
Exception: Only in developer-focused code demos if absolutely necessary.
```

**Text Highlight / Underline Draw:**
```
Behavior: An underline or highlight mark "draws in" from left to right beneath a keyword
Duration: 400ms ease-out
Width: starts at 0%, ends at 100%
Color: --amber-400 at 20% opacity (highlight) or 100% (underline)
Use: Maximum once per page, on a single keyword in a section heading
```

### 15.2 Text Animation Rules

1. Body text is never animated. Paragraphs appear instantly or fade in with their parent container. They do not slide, scale, or type.
2. Headings may fade-up as part of a scroll reveal. They do not have individual word/letter animations (except the hero, under strict conditions).
3. Labels, captions, metadata — never animated independently. They animate with their parent component.

---

## 16. Image Animation

### 16.1 Image Entrance

```
Behavior: Image fades in from opacity 0 → 1
Optional: slight scale from 1.02 → 1.0 for a "settling" effect
Duration: 500ms ease-out
Trigger: Intersection Observer (when image enters viewport)
Placeholder: blurred low-quality placeholder (LQIP) via next/image
Sequence: LQIP visible → high-res loads → crossfade (300ms)
```

### 16.2 Image Hover (Portfolio / Blog Cards)

```
Behavior: Image scales from 1.0 → 1.04 within an overflow:hidden container
Duration: 400ms ease-out (hover on), 500ms ease-out (hover off)
Additional: brightness increases from 1.0 → 1.05 (very subtle)
Container: overflow hidden, border-radius matches card
```

### 16.3 Image Rules

1. Images never slide or translate on entrance — they only fade and optionally scale
2. Image load transitions use the blur-up pattern: blurred placeholder → sharp image crossfade
3. No Ken Burns effect (slow pan + zoom) — it is dated and distracting
4. Gallery image transitions (if lightbox exists): crossfade between images, 300ms

---

## 17. Video Animation

### 17.1 Video Entrance

```
Behavior: Video container fades in like an image (opacity 0 → 1)
Duration: 500ms ease-out
Autoplay: Only for background/ambient video. Never for content video.
Controls: Content video shows native controls. No custom play button animation.
```

### 17.2 Background Video Rules

1. Background video plays muted, looped, at reduced playback rate (0.75×)
2. Video fades in after loading (no visual pop)
3. Video has a dark gradient overlay for text readability
4. Video is replaced with a static poster image on mobile (performance)
5. Video respects `prefers-reduced-motion` — shows poster image instead

---

## 18. Dashboard Motion

### 18.1 Dashboard Motion Philosophy

Dashboard motion is **utilitarian**. It exists to:
- Confirm actions (task moved, item saved)
- Preserve spatial context (sidebar collapses, panel expands)
- Smooth data transitions (chart updates, table sorts)

Dashboard motion does NOT exist to:
- Create visual interest (no scroll reveals in dashboards)
- Build atmosphere (no ambient animations)
- Wow the user (they are here to work, not to admire)

### 18.2 Dashboard Specific Motions

**Data Refresh:**
```
When a dashboard widget receives new data:
  Old value fades out (100ms)
  New value fades in (150ms)
  If the value changes significantly, briefly flash the widget border
  in --amber-400 at 20% opacity (300ms pulse, then fade)
```

**Tab Switch (Within Dashboard):**
```
Old tab content: opacity 1 → 0, 150ms
New tab content: opacity 0 → 1, translateY(4px) → 0, 200ms
Content height adjusts: 200ms ease-in-out (no jump)
```

**Kanban Card Drag:**
```
Pick up: card lifts with scale(1.03), shadow increases to --shadow-lg, opacity 0.9
Drag: card follows cursor with 0ms delay (no lag)
Drop: card settles into position, scale returns to 1.0, shadow to resting (200ms ease-spring)
Drop zone: dashed border pulses subtly while card hovers over it (border-color oscillates)
```

**Row Actions:**
```
Delete row: row height collapses to 0 with opacity fade (250ms ease-in-out)
Add row: new row expands from 0 height with opacity fade in (300ms ease-out)
Sort: rows reposition smoothly using Framer Motion layout animations (300ms ease-in-out)
```

### 18.3 Dashboard Anti-Patterns

- No scroll reveal animations on dashboard content
- No staggered entrance for dashboard widgets on page load — everything appears immediately
- No parallax anywhere in the dashboard
- No glow effects on dashboard cards (reserved for marketing site)
- No hero-style animations for dashboard sections

---

## 19. Charts Motion

### 19.1 Chart Entrance

```
Line chart:
  Line draws from left to right (SVG stroke-dashoffset animation)
  Duration: 800ms ease-out
  Area fill fades in after line completes: 300ms

Bar chart:
  Bars grow from bottom (height 0 → target height)
  Stagger: 40ms per bar
  Duration per bar: 400ms ease-out

Donut/Pie chart:
  Segments draw in clockwise (stroke-dashoffset)
  Duration: 600ms ease-out
  Center label: fade in after segments complete, 200ms

All charts:
  Triggered once when chart enters viewport
  No animation on data update — instant re-render with new values
  (Exception: if a chart has a "live" mode, values tween smoothly to new positions over 300ms)
```

### 19.2 Chart Interaction

```
Hover on data point:
  Dot appears: scale 0 → 1, 100ms ease-spring
  Tooltip appears: opacity 0 → 1, translateY(-4px) → 0, 150ms ease-out

Hover off:
  Dot disappears: 100ms
  Tooltip disappears: 100ms
```

---

## 20. Loading Motion

### 20.1 Loading Spinner

```
Shape: Ring (circle with 270° arc gap)
Rotation: 360° per 800ms, linear, infinite
Size: 20px (inline), 32px (section), 48px (page)
Color: --amber-400 (primary), --neutral-400 (secondary)
Stroke: 2.5px
Additional: optional subtle pulse on opacity (0.8 → 1 → 0.8) over 1.5s
```

### 20.2 Page Loading Bar

```
Position: fixed top, full width, 2px height
Color: --amber-400 with gradient to --amber-300
Behavior:
  0–300ms: bar appears, fills to 30% (fast, ease-out)
  300ms–load: bar trickles to 80% (slow, linear, random pauses)
  on load: bar jumps to 100% (100ms ease-out)
  after 100%: bar fades out (200ms)
  bar has a subtle glow/shadow effect matching amber
```

### 20.3 Button Loading

```
Transition to loading:
  Label text fades out (100ms)
  Spinner fades in (100ms, centered where icon was or center of button)
  Button width maintains (no layout shift)
  Button background dims slightly (opacity 0.8)
  Button pointer-events: none

Transition from loading to success:
  Spinner fades out (100ms)
  Checkmark draws in (stroke animation, 300ms ease-out)
  Button background briefly pulses success (200ms)
  After 1000ms hold: returns to default state (200ms)

Transition from loading to error:
  Spinner fades out (100ms)
  Shake animation: translateX(0, -6px, 6px, -4px, 4px, 0) over 400ms
  Button returns to default enabled state
```

---

## 21. Skeleton Motion

### 21.1 Skeleton Shimmer

```
Animation: A highlight band sweeps across the skeleton element from left to right

Gradient:
  Background: --neutral-800 (base)
  Shimmer band: --neutral-750 (lighter, center of sweep)
  Width of band: ~40% of element width
  
Movement:
  background-position: 200% → -200% (left to right sweep)
  Duration: 1500ms
  Easing: ease-in-out
  Iteration: infinite
  
Implementation:
  background: linear-gradient(90deg,
    --neutral-800 0%,
    --neutral-800 35%,
    --neutral-750 50%,
    --neutral-800 65%,
    --neutral-800 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
```

### 21.2 Skeleton to Content Transition

```
Step 1: Skeleton shimmer stops (animation paused)
Step 2: Skeleton fades out (opacity 1 → 0, 200ms)
Step 3: Real content fades in (opacity 0 → 1, 200ms)
Step 4: Minimum skeleton display time: 300ms (prevents flash)

If content loads in <300ms:
  Show skeleton for 300ms, then crossfade
  This prevents the skeleton from appearing and disappearing so fast it looks like a glitch
```

---

## 22. Error Motion

### 22.1 Inline Error (Form Field)

```
Appearance:
  Error message slides down from 0 height + fades in
  Duration: 200ms ease-out
  Height animates from 0 → auto (using max-height trick or Framer Motion layout)

Input shake (optional, for invalid submit attempts):
  translateX keyframes: 0 → -6px → 6px → -4px → 4px → -2px → 0
  Duration: 400ms
  Easing: ease-out
  Use: only on submit attempt, not on individual field blur

Input border:
  Transitions from --border-default → --error-400 (150ms ease-out)
  If error clears: --error-400 → --border-default (200ms ease-out)
```

### 22.2 Error Toast

```
Enter:
  Slides in from right edge of screen
  translateX(100%) → translateX(0)
  Duration: 250ms ease-out

Auto-dismiss:
  After 5 seconds, slides back out to the right
  translateX(0) → translateX(100%)
  Duration: 200ms ease-in

Manual dismiss (X button):
  Same exit animation, triggered immediately
```

### 22.3 Error Page (500, Network Failure)

```
Icon: fades in with slight scale (0.9 → 1), 400ms
Title: fades up, 400ms, 100ms delay after icon
Description: fades up, 400ms, 200ms delay
CTA button: fades up, 400ms, 300ms delay
```

---

## 23. Success Motion

### 23.1 Success Checkmark (Full Page)

```
Circle:
  SVG circle stroke draws in (stroke-dashoffset animation)
  Duration: 400ms ease-out
  Color: --success-400

Checkmark:
  SVG path draws in after circle completes
  Duration: 300ms ease-out
  Slight overshoot at the tip (the pen goes 2px past, then settles back)

Size: 64px
Total sequence: 700ms
```

### 23.2 Success Toast

```
Same slide-in behavior as error toast but:
  Auto-dismiss: 3 seconds (success is acknowledged faster than errors)
  Border-left color: --success-400
  Icon: CheckCircle
```

### 23.3 Inline Success

```
Checkmark icon: scales in from 0 → 1, 200ms ease-spring
Text ("Saved"): fades in, 150ms
Auto-dismiss: 2 seconds, fade out 200ms
```

---

## 24. Notification Motion

### 24.1 Toast Stack

```
Position: top-right corner, 24px from edges
Stacking: new toasts appear at top, pushing older ones down
Gap between toasts: 8px

Enter:
  New toast slides in from right: translateX(100%) → translateX(0), 250ms ease-out
  Existing toasts below shift down smoothly: 200ms ease-in-out (Framer Motion layout)

Exit:
  Toast slides out to right: translateX(0) → translateX(100%), 200ms ease-in
  Remaining toasts shift up: 200ms ease-in-out (layout animation)

Maximum visible toasts: 5
If more arrive: oldest toast is dismissed to make room
```

### 24.2 Notification Badge (Count)

```
When count changes:
  Badge briefly scales to 1.2 then back to 1.0 (200ms ease-spring)
  If going from 0 → N (new badge): scales in from 0 → 1, 200ms ease-spring
  If going from N → 0 (badge removed): scales from 1 → 0, 150ms ease-in
```

### 24.3 Notification Bell

```
When new notification arrives:
  Bell icon: rotates slight swing (0° → 15° → -15° → 10° → -10° → 0°)
  Duration: 500ms
  Easing: ease-out with damping
  Trigger: once on new notification, does not loop
```

---

## 25. Drawer Motion

### 25.1 Right Drawer (Desktop)

```
Enter:
  Overlay: opacity 0 → 0.5, 200ms ease-out
  Drawer panel: translateX(100%) → translateX(0), 300ms ease-out
  Drawer content: fade in, 200ms ease-out, 150ms delay

Exit:
  Drawer panel: translateX(0) → translateX(100%), 250ms ease-in
  Overlay: opacity 0.5 → 0, 200ms, starts with panel exit
```

### 25.2 Bottom Sheet (Mobile)

```
Enter:
  Overlay: opacity 0 → 0.5, 200ms ease-out
  Sheet: translateY(100%) → translateY(0), 300ms ease-out
  Sheet handle: visible immediately (grab indicator)

Exit:
  Sheet: translateY(0) → translateY(100%), 250ms ease-in
  Overlay: fades out with sheet

Gesture:
  Sheet can be dragged down to dismiss
  If drag exceeds 40% of sheet height → dismiss (snap to closed)
  If drag is less than 40% → snap back to open (200ms ease-spring)
  Velocity-based: fast swipe down dismisses regardless of distance
```

---

## 26. Dialog Motion

### 26.1 Modal Dialog

```
Enter:
  Overlay: opacity 0 → 1 (--surface-overlay), 200ms ease-out
  Dialog: opacity 0 → 1, scale(0.96) → scale(1), 300ms ease-out
  Dialog appears from the visual center of the viewport

Exit:
  Dialog: opacity 1 → 0, scale(1) → scale(0.98), 200ms ease-in
  Overlay: opacity 1 → 0, 200ms, synchronized with dialog

Focus:
  On enter: focus traps to first focusable element inside dialog
  On exit: focus returns to the trigger element
```

### 26.2 Confirmation Dialog (Destructive Actions)

Same as modal dialog. No additional dramatic animation for destructive actions. The red button and warning text communicate severity — the animation does not need to.

### 26.3 Dialog Rules

1. Dialog must be closable via Escape key, overlay click, and explicit close button
2. Dialog animation must not delay user interaction. The dialog is interactive the moment it is visible.
3. No dialog within a dialog. If needed, replace the content of the current dialog.

---

## 27. Accordion Motion

### 27.1 Expand/Collapse

```
Content area:
  Height: 0 → auto (using Framer Motion AnimatePresence or max-height)
  Opacity: 0 → 1
  Duration: 300ms ease-in-out
  
  On collapse:
  Height: auto → 0
  Opacity: 1 → 0
  Duration: 200ms ease-in-out

Chevron indicator:
  Rotation: 0° → 180° (pointing down when closed → pointing up when open)
  Duration: 250ms ease-in-out
  
Content clip:
  overflow: hidden during transition
  overflow: visible after transition completes (for dropdowns within accordions)
```

### 27.2 Accordion Rules

1. Only one accordion item open at a time (unless explicitly designed for multi-open)
2. When closing one and opening another: close completes before open begins (sequential, not simultaneous) — OR use layout animation to smoothly reflow
3. Accordion items do not have scroll reveal animations — they have their own expand motion

---

## 28. Sidebar Motion

### 28.1 Sidebar Collapse/Expand (Dashboard)

```
Expand (icon-only → full):
  Width: 68px → 260px, 300ms ease-in-out
  Text labels: fade in (opacity 0 → 1) after width reaches ~200px
  Text delay prevents text from being visible while compressed

Collapse (full → icon-only):
  Text labels: fade out (opacity 1 → 0) immediately, 100ms
  Width: 260px → 68px, 300ms ease-in-out (starts after text fades)
  
Main content area:
  Adjusts width simultaneously, 300ms ease-in-out
  Uses CSS `margin-left` or `grid-template-columns` transition

Active item indicator:
  Background pill transitions position smoothly when active item changes
  Duration: 200ms ease-out (follows cursor/selection)
```

### 28.2 Mobile Bottom Navigation

```
No expand/collapse (always visible as bottom tab bar on mobile)
Active indicator: dot or underline transitions horizontally, 200ms ease-out
Active icon: color transitions --neutral-400 → --amber-400, 150ms
```

---

## 29. Table Motion

### 29.1 Table Interactions

```
Sort column click:
  Arrow indicator rotates (0° → 180° or vice versa), 200ms ease-in-out
  Rows reorder: Framer Motion layout animation, 300ms ease-in-out
  (Each row has a unique key/layoutId for smooth reordering)

Row hover:
  Background: transparent → --surface-elevated, 150ms ease-out

Row selection:
  Background: transparent → amber-400 at 8%, 100ms
  Left border: 0 → 2px solid --amber-400, 100ms

Row deletion:
  Row opacity fades to 0, height collapses to 0
  Duration: 250ms ease-in-out
  Below rows slide up: 300ms ease-out (layout animation)

Pagination:
  Page content crossfades:
  Old rows: opacity 1 → 0, 150ms
  New rows: opacity 0 → 1, 200ms
```

### 29.2 Table Rules

1. Table rows do NOT stagger on initial load. All rows appear simultaneously.
2. Sorting animation is optional — if the dataset is large (>50 rows), skip the layout animation and instant-swap for performance.
3. Mobile card view (when table converts to cards): no transition between table and card layout — it is a responsive CSS change, not an interactive transformation.

---

## 30. Tooltip Motion

### 30.1 Tooltip Appear/Dismiss

```
Enter:
  opacity: 0 → 1
  transform: scale(0.95) → scale(1) and translateY(4px) → translateY(0) (if tooltip is above trigger)
  Duration: 150ms ease-out
  Delay: 200ms after hover begins (prevents flashing on quick mouse traversals)

Exit:
  opacity: 1 → 0
  Duration: 100ms ease-in
  Delay: 0ms (instant start on mouse leave)
```

### 30.2 Tooltip Rules

1. The 200ms entrance delay is critical. Without it, tooltips flash as the user moves their cursor across a toolbar, creating visual noise.
2. Tooltip position is calculated once on appear and does not animate if the trigger element moves (it would create jitter).
3. Tooltips do not have pointer arrows that animate. The arrow is static.
4. On touch devices, tooltips appear on long-press (300ms) and dismiss on touch elsewhere.

---

## 31. Cursor Motion

### 31.1 Cursor Interactions

DevSpark does not use a custom cursor. The system cursor is the correct choice for a professional productivity tool.

**What we do:**
- Use `cursor: pointer` on all clickable elements
- Use `cursor: grab` / `cursor: grabbing` on draggable elements (Kanban cards)
- Use `cursor: text` on editable text areas
- Use `cursor: not-allowed` on disabled elements
- Use `cursor: col-resize` on resizable column dividers

**What we do not do:**
- Custom animated cursor following the mouse
- Cursor trails, sparkles, or effects
- Custom cursor shapes (SVG cursors)
- Magnetic cursor effects that pull interactive elements toward the pointer

### 31.2 Exception: Marketing Hero

The hero section may optionally have a subtle "glow follows cursor" effect:

```
A radial gradient (--amber-glow-lg, ~200px radius) follows the mouse position
on the hero background, creating a flashlight-like effect on the dark surface.

Movement: The gradient center tracks the cursor with ~50ms inertia (eased following)
Opacity: Very low (8–10%) — barely perceptible but adds a sense of responsive depth
Performance: This uses a CSS custom property updated via requestAnimationFrame,
  NOT a re-render. The gradient is applied to a pseudo-element, not the actual content.

This effect is:
  - Desktop only (no pointer on touch devices)
  - Hero section only (never in other sections or dashboards)
  - Disabled when prefers-reduced-motion is set
```

---

## 32. 3D Motion

### 32.1 3D Motion Philosophy

The 3D visual in the hero section is the single highest-impact visual element on the entire site. It must justify its existence by creating a moment of awe that a 2D design cannot replicate. It must also be invisible in terms of performance cost — the user should never feel the page slow down because of a WebGL canvas.

### 32.2 3D Scene Motion

**Ambient Motion (No User Input):**
```
The 3D scene has subtle continuous motion even when the user is not interacting:
  - Slow rotation: object rotates ~2° per second around Y axis
  - Breathing scale: object pulses scale 1.0 → 1.02 → 1.0 over 4 seconds
  - Particle drift: ambient particles float slowly in random directions
  - Light shift: subtle color temperature shift in lighting (warm → cool → warm) over 8s
  
All ambient motion is VERY slow. It should be barely noticeable.
The user should not be able to tell something is moving by looking for 1 second.
They should notice it after 5–10 seconds: "Oh, it is slowly rotating."
```

**Scroll-Linked Motion:**
```
As the user scrolls past the hero:
  Camera: subtle dolly back (pulls away from the object)
  Object: slight rotation acceleration (scrolling "pushes" the object)
  Opacity: scene fades as hero section exits viewport
  Speed: 0.3× scroll rate (much slower than scroll)
```

**Mouse-Linked Motion (Desktop):**
```
The 3D scene responds to mouse position:
  Object rotation: tilts ±5° based on mouse X/Y relative to viewport center
  Light position: shifts subtly to follow mouse (as if the user is holding a flashlight)
  Inertia: motion follows mouse with ~100ms ease-out (smooth, not instant)
  Range: ±5° maximum tilt (never more — it should feel like breathing, not puppeteering)
```

### 32.3 3D Load Sequence

```
Phase 1 (0ms): CSS gradient background visible (matches scene colors)
Phase 2 (async): R3F Canvas initializes, scene loads off-screen
Phase 3 (ready): Scene crossfades in, replacing gradient
  opacity: 0 → 1 over 700ms ease-out
  No pop. No flash. No loading spinner for the 3D. Just a smooth appearance.

If loading takes > 3 seconds:
  Stay with CSS gradient fallback. Do not show a loading state for the 3D.
  The gradient IS the fallback. The 3D is an enhancement.

If WebGL is not supported:
  Stay with CSS gradient permanently. No error message.
```

---

## 33. WebGL Rules

### 33.1 Performance Constraints

| Rule | Constraint |
|---|---|
| Triangle count | < 50,000 for the entire scene |
| Texture resolution | Max 2048×2048, prefer 1024×1024 |
| Draw calls | < 20 per frame |
| `frameloop` | Set to `"demand"` — only re-render when state changes, not every frame |
| Canvas resolution | Use `dpr={[1, 1.5]}` — cap at 1.5× device pixel ratio, never full retina (2×) |
| Shader complexity | No real-time ray tracing. No complex post-processing (bloom, DOF). Simple shaders only. |
| Memory | Total scene < 20MB GPU memory |

### 33.2 R3F Component Rules

1. The R3F Canvas is mounted inside a `Suspense` boundary with a `null` fallback (the CSS gradient is the visual fallback, not a React fallback component)
2. The Canvas uses `resize={{ scroll: false }}` to prevent unnecessary re-renders on scroll
3. All geometries and materials are defined outside of render functions to prevent re-allocation
4. Use `useFrame` with a delta-time parameter for smooth animation regardless of frame rate
5. Dispose of Three.js resources (geometries, materials, textures) on unmount via `useEffect` cleanup

### 33.3 Mobile 3D Policy

3D is completely disabled on mobile (<768px viewport width):
- The R3F Canvas is not mounted (not just hidden — not rendered at all)
- A CSS gradient background serves as the permanent visual
- This is a performance and battery life decision, not a visual decision

3D on tablet (768–1024px):
- R3F Canvas is mounted with reduced quality: `dpr={[1, 1]}`, fewer particles, simpler geometry
- `frameloop="demand"` strictly enforced

---

## 34. Reduced Motion

### 34.1 The `prefers-reduced-motion` Contract

When the user has `prefers-reduced-motion: reduce` enabled in their OS settings, DevSpark completely transforms its motion behavior:

### 34.2 What Changes

| Normal Motion | Reduced Motion Equivalent |
|---|---|
| Scroll reveal (fade-up) | Instant appearance (no animation) |
| Card hover lift | Border color change only (no translateY) |
| Button hover translateY | Color change only |
| Page transitions | Instant swap (no fade) |
| Modal enter/exit | Instant show/hide |
| Drawer slide | Instant show/hide |
| Accordion expand | Instant expand/collapse |
| Chart draw-in | Static chart (final state) |
| 3D scene rotation | Static 3D (no rotation) or CSS gradient only |
| Loading spinner rotation | Static loading indicator (pulsing dot) |
| Skeleton shimmer | Static gray placeholder (no shimmer) |
| Parallax | Disabled (all layers at 1.0× scroll) |
| Stagger sequences | All items appear simultaneously |
| Counter animation | Final number displayed immediately |
| Hero cursor glow | Disabled |
| Notification bell swing | No swing |
| Toast slide-in | Instant appearance |
| Kanban card drag lift | No scale/shadow change |
| Background video | Shows poster image (no playback) |

### 34.3 What Does NOT Change

Even with reduced motion, these behaviors remain:
- Focus ring visibility (instant, no animation needed)
- Cursor changes (pointer, grab, text)
- Color transitions (these can remain as they are not spatial motion, but should be fast: ≤100ms)
- Opacity changes (subtle fades ≤100ms are acceptable for reduced motion)
- Scroll behavior is set to `auto` (no smooth scrolling)

### 34.4 Implementation Strategy

**Global CSS override:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Framer Motion integration:**
```
In the root layout, wrap the app in a MotionConfig provider:
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>

This tells Framer Motion to automatically respect the OS preference.
All `motion.div` animations will be skipped when reduce is active.
```

**React Three Fiber:**
```
Check prefers-reduced-motion before mounting the Canvas.
If reduced motion: render CSS gradient, do not mount R3F.
```

---

## 35. Motion Accessibility

### 35.1 Beyond Reduced Motion

Accessibility in motion extends beyond the `prefers-reduced-motion` media query:

1. **No flashing.** No element in the interface flashes more than 3 times per second. This is a WCAG 2.2 hard requirement (2.3.1 Three Flashes or Below Threshold). Violation can trigger photosensitive seizures.

2. **No auto-playing distracting motion.** Continuous animations (3D scene rotation, ambient particles) must be pausable. The hero 3D scene should have a visible pause button (small, corner position, icon-only with aria-label). When paused, the scene freezes on the current frame.

3. **Carousel auto-advance.** If a testimonial carousel auto-advances, it must:
   - Pause on hover (desktop) or touch (mobile)
   - Have visible prev/next controls
   - Pause when any element within it receives keyboard focus
   - Not auto-advance faster than every 6 seconds

4. **Focus-triggered animation.** When keyboard focus moves to an element that normally has a hover animation (card lift, button glow), the animation should NOT play. Focus indicators (outline) are sufficient. Do not replicate hover effects on focus — they can be disorienting for keyboard-only users.

5. **Screen reader announcements.** Loading states, success/error toasts, and dynamic content changes must use `aria-live` regions so screen readers announce them without the user needing visual cues.

---

## 36. Performance Budget

### 36.1 Animation Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| Frame rate during animation | 60fps (16.67ms per frame) | Chrome DevTools Performance panel |
| Jank frames (>16.67ms) | 0 per animation | DevTools frame chart |
| Total Blocking Time impact | < 10ms per animation | Lighthouse TBT |
| Layout shifts during animation | 0 (CLS = 0 for animated elements) | Web Vitals |
| GPU memory usage | < 50MB total for all animations | Chrome Task Manager |
| Main thread work per frame | < 4ms for animation JS | Performance profiler |

### 36.2 When to Sacrifice Animation

If an animation causes any of these conditions, remove it:
- Frame rate drops below 50fps on a mid-range device (e.g., Moto G Power)
- The animation causes a visible layout shift (CLS > 0)
- The animation adds > 5KB to the JavaScript bundle
- The animation requires a polyfill for broad browser support
- The animation delays Time to Interactive by > 100ms

### 36.3 Testing Procedure

Every new animation must be tested on:
1. Desktop Chrome (current) — baseline
2. Desktop Firefox (current) — rendering differences
3. Mobile Chrome on a mid-range Android device (CPU throttle 4×) — performance floor
4. Mobile Safari on iPhone — rendering differences
5. With `prefers-reduced-motion: reduce` — accessibility

---

## 37. GPU-Friendly Motion

### 37.1 The Compositing Rules

Modern browsers can animate certain CSS properties on the GPU compositing layer without triggering layout recalculation or paint. These properties are:

| GPU-Composited (Use These) | NOT Composited (Never Animate These) |
|---|---|
| `transform` (translate, scale, rotate) | `width`, `height` |
| `opacity` | `margin`, `padding` |
| `filter` (blur, brightness) | `top`, `right`, `bottom`, `left` |
| `clip-path` | `border-width`, `border-radius` |
| | `font-size`, `line-height` |
| | `background-color` (triggers paint, not layout — acceptable for hover if isolated) |
| | `box-shadow` (triggers paint — acceptable for hover if element is already composited) |

### 37.2 Promoting to GPU Layer

To ensure an element's animation runs on the GPU:
```
will-change: transform;  /* Add before animation starts */
transform: translateZ(0); /* Force GPU layer promotion */
```

Rules:
- Apply `will-change` only to elements that are about to animate, not to everything
- Remove `will-change` after the animation completes (it consumes GPU memory)
- Maximum 20 elements with `will-change` active simultaneously
- Never apply `will-change: all` — it is a performance anti-pattern

### 37.3 Paint Containment

For animated elements within complex layouts, use CSS containment:
```
contain: layout paint;
```
This tells the browser that this element's internal layout changes do not affect the rest of the page, allowing the browser to optimize rendering.

---

## 38. CSS vs Framer Motion Rules

### 38.1 Decision Framework

| Scenario | Use CSS | Use Framer Motion |
|---|---|---|
| Hover color/background changes | ✅ | ❌ |
| Focus ring appearance | ✅ | ❌ |
| Simple opacity transitions | ✅ | ❌ |
| Skeleton shimmer | ✅ | ❌ |
| Loading spinner rotation | ✅ | ❌ |
| Scroll-triggered reveal | ❌ | ✅ |
| Layout animations (reordering) | ❌ | ✅ |
| Exit animations (AnimatePresence) | ❌ | ✅ |
| Staggered children | ❌ | ✅ |
| Gesture-driven (drag, swipe) | ❌ | ✅ |
| Physics-based springs | ❌ | ✅ |
| Variant-based state machines | ❌ | ✅ |
| Sequenced multi-step | ❌ | ✅ |

### 38.2 The Rule of Thumb

**If the animation is a simple A → B transition triggered by a CSS pseudo-class (`:hover`, `:focus`, `:active`), use CSS.**
CSS transitions are parsed by the browser's style engine and run on the compositor thread. They have zero JavaScript overhead.

**If the animation involves enter/exit lifecycle, layout changes, gestures, orchestration, or scroll-triggered behavior, use Framer Motion.**
Framer Motion manages animation lifecycle declaratively within the React component tree.

### 38.3 CSS Animation Guidelines

```css
/* Always specify the exact properties. Never use 'all'. */
transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 250ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 250ms cubic-bezier(0.16, 1, 0.3, 1);

/* Never: */
transition: all 250ms ease; /* Animates everything, including properties you don't intend */
```

### 38.4 Framer Motion Guidelines

1. Wrap exit-animating elements in `<AnimatePresence>` and provide `exit` props
2. Use the `layout` prop for elements that change position due to reflow
3. Use `layoutId` for shared element transitions between routes/states
4. Define animation variants as objects outside the component to prevent re-creation
5. Use `whileInView` for scroll reveals with `viewport={{ once: true }}`

---

## 39. GSAP Usage Rules

### 39.1 When GSAP is Permitted

GSAP is a powerful but heavy library. In DevSpark, it is reserved for two specific use cases:

1. **ScrollTrigger-based scroll sequences.** Multi-step animations pinned to scroll position (e.g., a process timeline where connecting lines draw as the user scrolls through steps).

2. **Complex SVG path animations.** Drawing complex SVG paths (beyond simple stroke-dashoffset that CSS can handle).

**That's it.** No other use cases justify adding GSAP to the bundle.

### 39.2 GSAP Rules

1. **Lazy-load GSAP.** It must never be in the initial bundle. Use dynamic `import()` and load only on pages that use it.

2. **Register only needed plugins.** If you need ScrollTrigger, register ScrollTrigger. Do not import the entire GSAP suite.

3. **Kill on unmount.** Every GSAP animation and ScrollTrigger instance must be killed in the component's cleanup function (`useEffect` return). Memory leaks from orphaned GSAP instances are a known class of bug.

4. **Maximum 2 GSAP-animated sections per page.** If more are needed, the design is too complex. Simplify.

5. **No GSAP for hover, click, or modal animations.** Framer Motion or CSS handles these.

6. **No GSAP in the dashboard.** GSAP is a marketing site tool only.

---

## 40. React Three Fiber Rules

### 40.1 Usage Scope

R3F is used exclusively for the marketing site hero section and potentially one additional premium visual moment (e.g., an interactive visualization on the About page). It is never used in dashboards, forms, or utility pages.

### 40.2 R3F Rules

1. **One Canvas per page, maximum.** Multiple WebGL contexts compete for GPU resources and crash on some mobile devices.

2. **Lazy-load the Canvas component.** The R3F Canvas and all Three.js dependencies must be loaded via `next/dynamic` with `{ ssr: false }`. They are client-only and should not be in the server-rendered HTML.

3. **`frameloop="demand"`** is mandatory. The scene re-renders only when something changes (animation frame request, user interaction), not 60 times per second when idle.

4. **Use `drei` helpers.** Do not write raw Three.js boilerplate. Use `@react-three/drei` for common patterns (OrbitControls, PerspectiveCamera, Float, Stars, etc.).

5. **Dispose resources.** All Three.js geometries, materials, and textures must be disposed on unmount. Use `useEffect` cleanup or `drei`'s automatic disposal.

6. **No post-processing.** No bloom, no depth of field, no motion blur. These are performance killers. The scene should look premium through lighting and material quality, not post-processing effects.

7. **Fallback is mandatory.** The CSS gradient fallback is not optional. If WebGL fails or is unsupported, the page must look complete and polished with only CSS.

---

## 41. Intersection Observer Rules

### 41.1 Usage

Intersection Observer is the mechanism behind scroll reveal animations, lazy loading, and "count-up" number animations. In DevSpark, it is primarily used through Framer Motion's `whileInView` prop, but understanding the underlying rules is essential.

### 41.2 Rules

1. **Use `rootMargin: "0px 0px -100px 0px"`.** Trigger when the element's bottom edge is 100px inside the viewport. This ensures the user sees the animation play out, not catch its final frames.

2. **`threshold: 0`** (default). Trigger as soon as any part of the element enters the adjusted viewport. Do not wait for the full element to be visible.

3. **Observe once for reveals.** Use `{ once: true }` or `viewport={{ once: true }}` in Framer Motion. Scroll reveal animations play once and do not replay on scroll-back.

4. **Disconnect observers on unmount.** If using raw IntersectionObserver API (not Framer Motion), always `observer.disconnect()` in the cleanup function.

5. **Batch observers.** If a page has 30 elements to observe, create one IntersectionObserver and observe all 30 elements with it, not 30 separate observers. Framer Motion handles this internally.

6. **Do not use Intersection Observer for scroll-linked animations.** IO fires at threshold boundaries, not continuously. For scroll-linked effects (parallax, progress bars), use `scroll` event with `requestAnimationFrame` or GSAP ScrollTrigger.

---

## 42. Motion Naming Convention

### 42.1 Framer Motion Variant Names

Variant objects are named with the pattern `[component]Variants`:
```
cardVariants
heroContentVariants
sectionRevealVariants
modalVariants
```

Variant state names are standardized:
```
hidden     → initial/invisible state
visible    → final/visible state
exit       → state when being removed (AnimatePresence)
hover      → whileHover state
tap        → whileTap state
```

### 42.2 Animation Preset Names

Reusable animation presets are named with the pattern `[motion-type]`:
```
fadeUp
fadeIn
fadeUpLarge
scaleIn
slideRight
slideUp
staggerContainer
staggerItem
```

### 42.3 CSS Animation Names

CSS `@keyframes` are named with the pattern `[effect]`:
```
@keyframes shimmer { ... }
@keyframes spin { ... }
@keyframes pulse { ... }
@keyframes shake { ... }
```

### 42.4 File Organization

All motion presets and variant objects live in a single file:
```
src/lib/motion.ts
```

This file exports all reusable animation definitions. Components import from this file rather than defining animations inline. This ensures consistency and makes global motion changes trivial.

---

## 43. Motion Anti-Patterns

### 43.1 The Blacklist

These motion patterns are explicitly prohibited in DevSpark. If you find yourself implementing any of these, stop and reconsider.

| Anti-Pattern | Why It's Banned |
|---|---|
| **Bounce easing** | Feels cheap and game-like. Undermines professional tone. |
| **Elastic easing** | Same as bounce but worse. Elements stretch unnaturally. |
| **Parallax on text** | Makes text unreadable during scroll. |
| **Parallax on interactive elements** | Disconnects elements from user control. |
| **Auto-playing carousels faster than 6s** | Users cannot read content before it changes. |
| **Typewriter effect on headings** | Too slow. Forces user to wait. Feels like a tech demo. |
| **3D flip animations** | Feels like a jQuery plugin from 2012. |
| **Rotate transitions for page changes** | Disorienting and gimmicky. |
| **Zoom-in page transitions** | Feels like a presentation, not an app. |
| **Background video with motion parallax** | Performance nightmare. Visual chaos. |
| **Infinite scroll-triggered animations** | Animations that replay every time the user scrolls past. Use `once: true`. |
| **Delayed content reveals** | Adding artificial delays before showing content the user is trying to see. |
| **Hover effects on mobile** | Touch devices do not have hover. Don't add `:hover` styles that persist on tap. |
| **Animating `width`/`height` directly** | Causes layout reflow. Use `transform: scale()` instead. |
| **`transition: all`** | Animates unintended properties. Always specify exact properties. |
| **Scroll hijacking** | Taking control of the scroll wheel to advance through animated sections. The user owns their scroll. |
| **Cursor trail effects** | Unprofessional. Performance heavy. Distracting. |
| **Animated backgrounds across the entire page** | Moving gradients, particle fields, or pattern animations covering the full page are distracting and expensive. Limit to hero only. |
| **Sound effects on animation** | DevSpark is a professional tool. No click sounds. No whooshes. No notification chimes (browser notification API is acceptable). |
| **Multiple simultaneous glow effects** | Max 2 glowing elements per viewport. More creates a gaming aesthetic. |
| **SVG morphing for navigation** | Icon morphs (hamburger → X is the sole exception) for decorative purposes. |
| **Loading screens with branded animation** | Show a progress bar. Show a skeleton. Do not show a full-screen animated logo while the page loads. |
| **Counter animations on revisit** | Number counters should animate once per session. Use sessionStorage to track. |
| **Animation on print** | When `@media print`, all animations must be removed. Content shows in final state. |

### 43.2 The Decision Checklist

Before adding any new animation, answer these questions:

1. ☐ Does this animation answer "What happened?", "Where did this come from?", or "What should I look at?"
2. ☐ Is the duration under 700ms?
3. ☐ Does it use only `transform` and `opacity` (GPU-friendly)?
4. ☐ Does it have a `prefers-reduced-motion` alternative?
5. ☐ Does it maintain 60fps on a mid-range mobile device?
6. ☐ Is there a maximum of 5 animated elements visible simultaneously?
7. ☐ Does it play only once for scroll-triggered reveals?
8. ☐ Is the easing curve from the approved set (ease-out, ease-in-out, ease-in, ease-spring)?
9. ☐ Will the user ever think "that was a nice animation" (if yes — make it more subtle)?
10. ☐ Does the interface work perfectly if this animation is completely removed?

If any answer is "no," the animation needs revision or removal.

---

## Appendix: Motion Token Quick Reference

```
DURATIONS
  instant   100ms    Micro-interactions
  fast      150ms    Button feedback, toggles
  normal    250ms    Dropdowns, tooltips, hovers
  moderate  350ms    Modals, drawers
  slow      500ms    Scroll reveals
  slower    700ms    Hero, 3D scenes

EASINGS
  out       cubic-bezier(0.16, 1, 0.3, 1)       Entrances (default)
  in-out    cubic-bezier(0.65, 0, 0.35, 1)       State changes
  in        cubic-bezier(0.55, 0.055, 0.675, 0.19)  Exits
  spring    cubic-bezier(0.34, 1.56, 0.64, 1)    Toggles, checks

DISTANCES
  xs        4px      Button press
  sm        8px      Card hover lift
  md        16px     Scroll reveal offset
  lg        24px     Hero content offset
  xl        40px     Full panel slides

STAGGERS
  tight     40ms     Dense lists
  normal    80ms     Card grids
  wide      120ms    Showcase items

SCALES
  subtle    0.98     Modal entrance
  press     0.97     Button active
  image     1.04     Image hover zoom

EXIT MULTIPLIER
  exit_duration = enter_duration × 0.7
```

---

> This document is the motion constitution of DevSpark.
> Every transition, every reveal, every hover, every gesture — governed here.
> Motion that cannot be traced to a rule in this document is unauthorized.
> When in doubt, do not animate. Stillness is a valid design choice.
> The best animation is the one the user never notices.

> **Last Updated:** June 28, 2026
> **Document Owner:** DevSpark Motion Design Team
> **Review Cadence:** With every design sprint
