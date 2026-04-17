# VIBEMENOW - Project Architecture & LLM Reference

This document serves as the primary technical reference for AI agents and developers to understand the codebase, logic, and structure of **VIBEMENOW**.

---

## 🏗️ Core Architecture
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Runtime**: Node.js
- **Language**: JavaScript (ESM)
- **Library**: React 19
- **Graphics**: Three.js & React Three Fiber (for 3D games/elements)
- **Real-time/DB**: Google Firebase (Firestore, Auth, Analytics)

---

## 📁 Directory Structure

```text
/
├── app/                    # Next.js App Router (Main Logic & Routes)
│   ├── [game-name]/        # Individual game routes (e.g., wordvibe, 2048-vibe)
│   ├── components/         # Shared UI components
│   │   ├── SiteLayout.js   # Global structure (Nav, Footer, Content Wrapper)
│   │   ├── GameEndScreen.js# Universal game result handler
│   │   └── AdBanner.js     # AdSense integration
│   ├── lib/                # Shared utilities & configurations
│   │   ├── firebase.js     # Firebase client initialization
│   │   └── contentPolicy.js# Logic for content safety
│   ├── api/                # Backend API routes
│   ├── globals.css         # Design System, CSS Variables, & Global Styles
│   ├── layout.js           # Root Layout (Metadata, Scripts, Providers)
│   └── page.js             # Homepage (delegates to HomeContent component)
├── public/                 # Static assets (images, icons, manifest.json)
├── next.config.mjs         # Next.js configuration (redirects, headers)
├── package.json            # Dependencies and scripts
└── scripts/ (root files)   # Maintenance scripts (fix-metadata.js, check-errors.js)
```

---

## 🎨 Design System & Styling
- **Method**: Vanilla CSS (No Tailwind by default).
- **Location**: `app/globals.css`.
- **Aesthetics**: Glassmorphism, Neon glow, dark-mode centric (`#0a0a0f` background), grid overlays.
- **Key Classes**:
  - `.glass-card`: Semi-transparent blurred backgrounds.
  - `.neon-border`: Glowing borders for cards.
  - `.grid-bg`: Global background pattern.

---

## 🕹️ Game Logic Patterns
Most games follow this lifecycle:
1. **Selection**: User picks a game from the home grid.
2. **Initialization**: State is managed locally (React `useState`, `useEffect`).
3. **Gameplay**: Interactive elements (Canvas, DOM, or Three.js).
4. **Conclusion**: Triggers `GameEndScreen.js` to show stats, share options, and leaderboard integration if applicable.
5. **Persistence**: Scores are often saved to `localStorage` or Firebase (for multiplayer).

---

## 📡 Multiplayer & Real-time
- **Provider**: Firebase Firestore.
- **Rooms**: Handled via dynamic IDs in URLs.
- **Logic**: Listeners (`onSnapshot`) sync game state across clients in real-time.

---

## 🔍 SEO & Technical Metadata
- **Global Metadata**: Defined in `app/layout.js`.
- **Dynamic Metadata**: Each game folder typically has its own `layout.js` or `page.js` with `generateMetadata`.
- **Indexing**: `app/robots.js` and `app/sitemap.js` are used for search engine crawling.
- **Canonicalization**: Enforced via `next.config.mjs` and `proxy.js` for `www` and `https` consistency.

---

## 🛠️ Development Workflow
- **Standard Command**: `npm run dev`
- **Linting**: `next lint` (configured in `eslint.config.mjs`)
- **Fixing Metadata**: Run `node fix-metadata.js` or `node update-metadata.js` for bulk SEO updates.

---

## 💡 Important Logic Notes for AI
- **Hydration**: Uses `suppressHydrationWarning` on the `html` tag due to theme/script injections.
- **Redirects**: Check `next.config.mjs` for important SEO redirects (non-www to www).
- **AdSense**: `ca-pub-7832965089021505` is the active publisher ID.
- **Environment Variables**: Requires Firebase keys for full functionality in local dev.

---
*Created on 2026-04-14 - Reference this file before making structural changes.*
