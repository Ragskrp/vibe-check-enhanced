# VIBEMENOW Project Guidelines

## Quick Start Commands
```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint validation
node fix-metadata.js    # Bulk metadata/SEO updates
node check-errors.js    # Error checking utility
```

## Architecture Overview

**Stack**: Next.js 16 (App Router) + React 19 + Firebase + Vanilla CSS + Three.js

**Core Pattern**: Mobile-first gaming platform with 13+ zero-friction games, real-time multiplayer via Firebase, and educational content.

**Key Files**:
- [app/layout.js](../app/layout.js) — Root metadata, viewport, scripts
- [app/components/SiteLayout.js](../app/components/SiteLayout.js) — Header, breadcrumbs, JSON-LD schema
- [app/components/GameEndScreen.js](../app/components/GameEndScreen.js) — Universal win/loss screen with "Did You Know?" facts
- [next.config.mjs](../next.config.mjs) — 3D transpilation, redirects, server externals
- [app/globals.css](../app/globals.css) — Design system, CSS variables, reusable classes

See [PROJECT_REFERENCE.md](../PROJECT_REFERENCE.md) for detailed architecture and [llms.txt](../llms.txt) for codebase summary.

## Code Style & Naming

### Routing & URLs
- Use **kebab-case** for routes: `/wordvibe`, `/emoji-iq`, `/2048-vibe`
- Each game folder in `/app/<game-name>/` matches its URL exactly
- Game metadata must be updated in `/app/blog/<game-name>/` corresponding page

### Components
- Use **PascalCase** for component filenames: `GameEndScreen.js`, `SiteLayout.js`
- All game pages use `'use client'` directive (client-rendered)
- Wrap game pages in `<SiteLayout>` for consistent header, footer, breadcrumbs, JSON-LD

### CSS Classes (Design System)
Reference [DESIGN.md](../DESIGN.md) for complete design tokens:
- `.glass-card` — Glassmorphism (semi-transparent, blurred background)
- `.neon-border` — Glowing borders (primary: `#00e5a0`)
- `.grid-bg` — Background pattern
- CSS variables: `--primary`, `--dark`, `--text-light` (defined in `globals.css`)
- Typography: Space Grotesk (headings) + Inter (body), 8px spacing unit

## Game Implementation Pattern

All games follow this lifecycle:

1. **Initialization** — Local state via `useState`, `useEffect` for setup
2. **Gameplay** — Interactive elements (Canvas, DOM elements, or Three.js for 3D)
3. **Conclusion** — Trigger `<GameEndScreen>` with game stats
4. **Persistence** — localStorage (local scores) + Firebase (multiplayer/leaderboards)

Example structure:
```
/app/<game-name>/
  page.js           # Main game page (use 'use client')
  GameComponent.js  # Game logic (optional, if large)
  game-utils.js     # Game utilities (logic, scoring)
```

## Component Patterns

### SiteLayout Wrapper
Provides navigation, breadcrumbs, JSON-LD schema, footer:
```javascript
import SiteLayout from '@/app/components/SiteLayout';
export default function GamePage() {
  return (
    <SiteLayout breadcrumbs={[{ label: 'Games', href: '/' }, { label: 'Word Vibe' }]}>
      {/* Game content */}
    </SiteLayout>
  );
}
```

### GameEndScreen
Universal end-game modal with stats, share, leaderboard linking:
```javascript
<GameEndScreen 
  title="You Won!" 
  stats={{ score, time, difficulty }} 
  didYouKnow="Psychology of gameplay..." 
  onShare={handleShare}
/>
```

### AdBanner & AdGateway
- `<AdBanner>` — Periodic ad display during gameplay
- `<AdGateway>` — Pre-roll ad gate before games
- AdSense ID: `ca-pub-7832965089021505`

## SEO & Metadata

- **Metadata template**: `{Game Name} | VIBEMENOW`
- **Breadcrumb JSON-LD**: Automatically injected by `<SiteLayout>`
- **OG images**: Dynamic per game, stored in `/public/blog/<game-name>/`
- **Redirects**: www → non-www via `next.config.mjs`
- **Bulk updates**: Run `node fix-metadata.js` to regenerate all metadata

Metadata files appear in `/app/blog/<game-name>/page.js` — update via script or manual edit.

## Firebase Integration

- Real-time multiplayer via Firestore `onSnapshot` listeners
- Configuration in `/app/lib/firebase.js`
- **Local dev**: Set Firebase env vars (not in repo—use `.env.local`)
- **Multiplayer sync lag**: Consider debouncing state updates if listeners trigger frequently

## Common Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| **Hydration mismatch** | Add `suppressHydrationWarning` to `<html>` tag (theme/script injections already in place) |
| **3D rendering fails** | Verify `transpilePackages` in `next.config.mjs` includes Three.js packages |
| **Firebase errors locally** | Set environment variables in `.env.local` (Firebase keys not in repo) |
| **Routes not matching** | Double-check kebab-case URLs vs. PascalCase component names |
| **Metadata stale** | Run `node fix-metadata.js` or `node update-metadata.js` |
| **Ad impressions low** | Verify OG images exist and domain is verified in AdSense |
| **Multiplayer lag** | Check Firebase listener throttling; debounce state updates |
| **ESLint fails on `.next/` builds** | Already ignored in `eslint.config.mjs` |

## Path Aliases

Use `@/*` for imports (configured in `jsconfig.json`):
```javascript
import SiteLayout from '@/app/components/SiteLayout';
import { initializeApp } from '@/app/lib/firebase';
```

## Additional Resources

- [DESIGN.md](../DESIGN.md) — Visual system, colors, typography
- [PROJECT_REFERENCE.md](../PROJECT_REFERENCE.md) — Detailed architecture & game list
- [llms.txt](../llms.txt) — Codebase summary for LLM context
- [next.config.mjs](../next.config.mjs) — Build config, transpilation, redirects
- [app/lib/](../app/lib/) — Firebase, content policy, utilities
