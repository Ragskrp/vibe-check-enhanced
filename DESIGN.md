# FLEURIR Design System Specification

**Theme:** Princess Scholar
**Aesthetic:** Academic rigor merged with Cottagecore, Parisian Elegance, and Hawaiian Tropical accents. Tactile / Glassmorphic hybrid style shifting to Atmospheric Brutalism during Gothic Horror elements.

---

## 1. Color Palette

### Base & Neutrals (Cream Ivory & Paper Warmth)
- **Background / Surface:** `#fff8f0` (Warm Cream Ivory to reduce eye strain)
- **On-Surface:** `#1e1b16` (Deep Charcoal for readability)
- **On-Surface-Variant:** `#504445`
- **Surface-Dim:** `#e0d9d0`
- **Surface-Container:** `#f4ede3`
- **Surface-Container-Low:** `#faf3e9`
- **Surface-Container-High:** `#eee7dd`
- **Surface-Container-Highest:** `#e8e2d8`
- **Bloom White:** `#ffffff`

### Brand Elements
- **Primary (Petal Blush):** `#7a545a` (Default brand color for panels and structures)
- **Secondary (Coquette Rose):** `#854e60` (Reserved for high-priority CTAs and interactions)
- **Tertiary (Golden Honey):** `#7b5900` (Used for reward states, achievements, and XP petals)

### Story & Feedback Colors
- **Midnight Shadow:** `#1A1030` (Core of the Gothic horror shift)
- **Parisian Noir:** `#2A2035` (Deep shadows, borders, text, and outlines)
- **Sage Green:** `#9DB58A` (Dedicated correct state color)
- **Terracotta Glow:** `#D4785A` (Dedicated incorrect state color)
- **Lavender Mist:** `#C8B4D4` (Tag backgrounds and chips)
- **Tropical Aqua:** `#7ECEC4` (Accent colors)
- **Aurora Silver:** `#D8E8F0` (Secondary accents)

---

## 2. Typography

We differentiate between **Story** (narrative immersion) and **Study** (academic container/functional layers).

### Font Families
- **Display & Narrative:** Playfair Display (Serif, elegant, generous leading)
- **Academic Body:** DM Sans (Sans-serif, neutral, high legibility)
- **Functional UI & Gamification:** Nunito Sans (Rounded terminals, approachable)

### Typography Scale
- **Display Hero (Desktop):** `Playfair Display`, 48px, Bold, Line height 56px, Letter spacing -0.02em
- **Display Hero (Mobile):** `Playfair Display`, 32px, Bold, Line height 40px
- **Headline Large (Desktop):** `Playfair Display`, 32px, Bold, Line height 40px
- **Headline Large (Mobile):** `Playfair Display`, 24px, Bold, Line height 32px
- **Narrative Italic:** `Playfair Display`, 18px, Regular, Line height 28px
- **Body Medium:** `DM Sans`, 16px, Regular, Line height 28px
- **Body Small:** `DM Sans`, 14px, Regular, Line height 24px
- **Button Text:** `Nunito Sans`, 16px, Semi-Bold, Line height 20px
- **Label Caps:** `Nunito Sans`, 12px, Bold, Line height 16px, Letter spacing 0.05em (all caps)

---

## 3. UI Tokens & Layout Rules

### Rounded Corners (Border Radius)
- **Small (sm):** `0.25rem` (4px) - For small badges, input borders
- **Default:** `0.5rem` (8px)
- **Medium (md):** `0.375rem` (6px)
- **Large (lg):** `1rem` (16px) - Standard for PetalCards and panels
- **Extra Large (xl):** `1.5rem` (24px)
- **Full:** `9999px` - For pill buttons, chips, and selection bubbles

### Spacing Scale
- **Base Spacing Unit:** `8px`
- **Card Padding:** `32px` (Internal padding of panels)
- **Gutter (Desktop):** `24px`
- **Margin (Desktop):** `48px`
- **Gutter (Mobile):** `16px`
- **Margin (Mobile):** `20px`

### Layout Grid
- **Desktop:** 12-column grid. Lessons utilize a 2-column split (Content on left, Companion/Interactive on right).
- **Tablet:** 8-column grid. Companion collapses to a fixed drawer/overlay.
- **Mobile:** 4-column grid with a bottom-fixed navigation bar.
