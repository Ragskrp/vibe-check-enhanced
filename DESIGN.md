---
name: VIBEMENOW Design System
description: An immersive, premium edtech and gaming platform for GCSE students. Blends cosmic depth with electric energy.
colors:
  background: "#08090f"
  surface: "#0d0e1a"
  surface-dim: "#0a0b16"
  surface-container-lowest: "#060710"
  surface-container-low: "#10111e"
  surface-container: "#141526"
  surface-container-high: "#1c1d30"
  surface-container-highest: "#22233a"
  on-surface: "#eeeeff"
  on-surface-variant: "#9898b8"
  outline: "#2e2e50"
  outline-variant: "#1a1a30"
  primary: "#00e5a0"
  on-primary: "#002618"
  primary-container: "#00b87e"
  on-primary-container: "#002010"
  secondary: "#ff2d78"
  on-secondary: "#1a0010"
  secondary-container: "#cc0055"
  on-secondary-container: "#ffe0ed"
  tertiary: "#00d4ff"
  on-tertiary: "#001a22"
  tertiary-container: "#00a8cc"
  on-tertiary-container: "#e0f9ff"
  accent: "#ffe600"
  on-accent: "#1a1600"
  purple: "#b14aed"
  on-purple: "#1a0028"
  error: "#ff5555"
  on-error: "#1a0000"
  surface-glow-primary: "rgba(0, 229, 160, 0.08)"
  surface-glow-secondary: "rgba(255, 45, 120, 0.08)"
  surface-glow-tertiary: "rgba(0, 212, 255, 0.08)"
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: "800"
    lineHeight: 72px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 36px
    letterSpacing: -0.02em
  title-lg:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: "700"
    lineHeight: 30px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 24px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: "700"
    lineHeight: 20px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 16px
    letterSpacing: 0.15em
rounded:
  sm: 0.5rem
  DEFAULT: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 1.5rem
  2xl: 2rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1100px
  container-padding: 16px
  card-gap: 20px
  section-gap: 64px
components:
  card-glass:
    backgroundColor: "rgba(20, 21, 38, 0.6)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
  card-glass-hover:
    backgroundColor: "rgba(28, 29, 48, 0.8)"
  card-subject:
    backgroundColor: "rgba(13, 14, 26, 0.7)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    height: 48px
    padding: "0 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-container}"
  button-ghost:
    backgroundColor: "rgba(0, 229, 160, 0.08)"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
  badge:
    backgroundColor: "rgba(0, 229, 160, 0.12)"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  orb-ambient:
    backgroundColor: "rgba(0, 229, 160, 0.04)"
---

## Brand & Style

VIBEMENOW is a premium revision and gaming platform for GCSE students in the UK. The brand sits at the intersection of **academic excellence** and **gaming culture** — rigorous but never boring, structured but always alive.

The aesthetic is **Deep Space Academic**: a near-black background punctuated by electric teal, vivid pink, and soft cyan. The interface feels like a next-generation dashboard — like a spaceship control panel for learning. Students should feel competent and energized, not intimidated or bored.

The emotional response targeted is: **confident, focused, and motivated**.

## Colors

The palette is built around three accent colors on a deep midnight foundation.

- **Primary (#00e5a0):** Electric Teal — the core brand color. Used for CTAs, active states, highlights, and positive feedback. Implies growth and progress.
- **Secondary (#ff2d78):** Vivid Magenta/Pink — used for high-energy elements, timers, streaks, and game mechanics. Creates urgency and excitement.
- **Tertiary (#00d4ff):** Sky Cyan — for informational elements, links, and secondary highlights. Cool and trustworthy.
- **Accent (#ffe600):** Signal Yellow — reserved for achievements, scores, milestones, and high-importance notifications.
- **Purple (#b14aed):** Deep Violet — for creative subjects (English, Arts) and distinct category labels.
- **Background (#08090f):** Near-black with a slight blue bias. Never pure black, which feels harsh.

Gradient rules: Use two-stop linear gradients between adjacent accents (e.g., teal→cyan, pink→purple) for hero elements and buttons. Avoid mixing more than two hues in a single gradient.

## Typography

This system uses a **dual-font** strategy:

- **Space Grotesk** for all headers, labels, game elements, and UI chrome. Its geometric, slightly quirky character gives the platform a distinct, tech-forward personality.
- **Inter** for all long-form content: lesson text, descriptions, and explanations. Its superior reading legibility reduces cognitive load during study sessions.

Headlines should use tight (negative) letter-spacing to feel "locked" and monumental. Labels use loose letter-spacing and UPPERCASE treatment to feel like UI chrome from a modern game interface.

Apply a subtle teal glow (`text-shadow: 0 0 24px rgba(0, 229, 160, 0.4)`) to primary headline elements on the darkest backgrounds.

## Layout & Spacing

The layout follows an **8px base grid** with a content max-width of `1100px`. Pages use generous section gaps (`64px`) to give content breathing room and emphasize each section as a distinct island.

Cards are arranged in responsive auto-fill grids with 20px gaps. Never use full-bleed backgrounds within card groups — allow the deep background to remain visible, creating a sense of float.

## Elevation & Depth

Depth is achieved through **glassmorphism + ambient glow**, not drop shadows.

- **Level 0 (Background):** Deep space gradient with slow-moving color orbs (ambient animation).
- **Level 1 (Cards):** `backdrop-filter: blur(16px)`, `background: rgba(14, 15, 26, 0.6)`. 1px border at `rgba(255,255,255,0.06)`.
- **Level 2 (Elevated/Active):** `backdrop-filter: blur(24px)`, `background: rgba(22, 23, 38, 0.8)`. 1px border with a hint of the accent color at 30% opacity.
- **Glow Halos:** Subject cards emit a soft `box-shadow` in their category accent color (4px spread, 20% opacity). On hover, the glow intensifies and the card lifts `translateY(-4px)`.

## Shapes

Shape language is **rounded-aggressive** — every element has significant rounding to feel approachable and modern.

- Content cards: `rounded-xl` (1.5rem)
- Buttons: `rounded-md` (1rem)
- Badges/chips: `rounded-full`
- Input fields: `rounded-md`

Avoid sharp corners anywhere on the page. The interface should feel tactile and soft despite the dark, energetic palette.

## Components

### Subject Cards
Each subject card floats on the deep background with a glassmorphism treatment. The card's accent glow color is pulled from the subject's brand color. On hover: `translateY(-4px)`, intensified glow, and a thin gradient border shimmer.

### Buttons
Primary buttons use the teal (`#00e5a0`) fill with a hover glow. Ghost/outline buttons use an `8%` opacity fill of the accent with the full accent for text. All buttons have a 150ms ease-out transition.

### Ambient Orbs (Background Animation)
Three large, blurred color orbs float slowly in the background using CSS `@keyframes`. They should be positioned outside the main content container, using `position: fixed` or `position: absolute` with `pointer-events: none`. Orbs never move faster than `20s` per cycle. This creates the "living background" effect.

### Hero Sections
Hero text should animate in with a `fadeInUp` stagger on page load. The badge/label above the headline uses the `badge` component token. The gradient headline uses a CSS `background-clip: text` technique.

## Do's and Don'ts

**Do:**
- Use teal as the primary action color consistently
- Apply backdrop blur on all glass surfaces
- Keep background orbs slow and subtle
- Use Space Grotesk in UPPERCASE + wide letter-spacing for all status labels
- Add a hover lift (`translateY`) to every interactive card

**Don't:**
- Use pure black (`#000`) as a background — always use the near-black `#08090f`
- Mix more than 2 accent colors in a single component
- Use animation durations under 150ms or over 600ms for UI transitions
- Add borders heavier than 1px on glass cards
- Use solid opaque backgrounds on cards — always preserve the glass/blur effect
