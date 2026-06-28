# FLEURIR — Master Product Blueprint v1.0
### A Gamified, Story-Led, Immersive GCSE Learning Platform
**Subjects:** Maths Higher Edexcel | AQA Combined Science Trilogy Higher  
**Target:** Year 10–11 students aiming for Grades 8–9  
**Model:** Fully free, independent home learning, daily primary study tool  
**Document Status:** Zero-ambiguity handoff to AI development engine

---

## TABLE OF CONTENTS

1. Platform Identity
2. Target User Profile
3. Core Design Pillars
4. Technical Stack (Full Free Infrastructure)
5. Platform Architecture & Cross-Device Strategy
6. Offline Mode Specification
7. Visual Design System
8. Story Universe Design
   - 8A. Maths World: The Kingdom of Arithmia
   - 8B. Science World: The Elementis Isles
9. Horror & Suspense Scaling Framework
10. Curriculum Mapping to Story Worlds
    - 10A. Maths Higher Edexcel — Full Sub-Topic Map
    - 10B. AQA Combined Science Trilogy Higher — Full Sub-Topic Map
11. Level Architecture
    - 11A. What Constitutes a Level
    - 11B. Linear Progression + Search Mode
    - 11C. Bronze / Silver / Gold Tier System
    - 11D. Six-Flower Clearance Mechanic
12. Complete Learning Flow (Screen-by-Screen)
13. Question Types — Full Specification
14. Boss Battle System
15. Spaced Repetition & Recall Mission System
16. Gamification System
    - 16A. XP System
    - 16B. Petal Currency
    - 16C. Stars (Per Level)
    - 16D. Badges & Achievements
    - 16E. Daily Streak System
17. Companion System
18. In-App Shop
19. Celebration & Reward Design
20. Profile & Personalisation
21. French Phrase System
22. Parent Dashboard
23. Push Notification System
24. Content Pre-Generation Pipeline
25. Firebase Firestore Data Models
26. Asset Specifications
27. Audio Design
28. Launch Sequence: MVP → Full Build

---

## 1. PLATFORM IDENTITY

| Field | Value |
|---|---|
| **Platform Name** | FLEURIR |
| **Pronunciation** | "Fluh-REER" |
| **Meaning** | French: "to bloom / to flourish" |
| **Tagline** | *"Where knowledge blooms and worlds unfold"* |
| **In-App Currency Name** | Petals 🌸 |
| **Primary Clearance Mechanic** | The Bloom Bouquet (6 flowers) |
| **Subjects** | Maths Higher Edexcel + AQA Combined Science Trilogy Higher |
| **Story Worlds** | Two separate: The Kingdom of Arithmia (Maths) + The Elementis Isles (Science) |
| **Visual Aesthetic** | 3D rendered, coquette, cottage core, tropical Hawaiian, Parisian, Italian village, soft pastels, fantastical |
| **Tone** | Princess adventure with escalating horror and suspense |
| **Character Inspiration** | Original characters inspired by (not copying): Disney princesses, Sanrio characters, My Little Pony, pandas, animals |
| **Business Model** | 100% free, no ads, no premium tier |
| **Hosting** | Vercel (web) + Firebase (backend, mobile push, storage) |

---

## 2. TARGET USER PROFILE

- **Age range:** 14–16 (Year 10 and Year 11)
- **Gender:** Girls (primary); not exclusionary but design, tone, narrative, and aesthetic are girl-coded
- **Academic goal:** Grades 8–9 in Maths Higher Edexcel and AQA Combined Science Trilogy Higher
- **Usage pattern:** Daily, as primary revision/learning tool (not supplementary)
- **Device:** Primary device is laptop; secondary is phone and tablet
- **Setting:** Independent home learner — no classroom context, no teacher
- **Motivation style:** Responds to visual reward, story progression, collectibles, aesthetic satisfaction, and narrative investment
- **Entry point:** Beginning of Year 10, continuing through Year 11 until exams

---

## 3. CORE DESIGN PILLARS

Every feature, screen, animation, and decision in FLEURIR must satisfy ALL of the following:

1. **Story-Led First** — Every learning moment is embedded inside a narrative. The student is always "doing something" for the story, not just answering questions.
2. **Picture & Motion-Graphic Centric** — Text is minimised. Concepts are shown through animation, illustrated steps, and motion graphics. No walls of text.
3. **Step by Step, Level by Level** — Nothing is assumed. Every skill is built incrementally. No level is skippable in the learning path.
4. **Clearance & Celebration** — Passing a level is a dramatic event. Every clearance triggers celebration. Progress always feels earned and rewarded.
5. **High Recall by Design** — Spaced repetition, varied question types, and multi-phase learning (learn → practice → test → recall) are baked into the architecture.
6. **Girl-Friendly Aesthetic** — Coquette, cottage core, soft pastels, floral motifs, Parisian elegance, tropical warmth, fantasy whimsy. Horror/suspense is atmospheric, not gory.
7. **Gamification Without Punishment** — No lives system, no energy timers. Only earn mechanics. Struggle is handled with hints and retakes, not punishment.
8. **Zero Live AI During Sessions** — All content is pre-generated and stored. The student's session runs from a static database with no API calls during learning.

---

## 4. TECHNICAL STACK (FULL FREE INFRASTRUCTURE)

### Frontend — Web
| Component | Technology |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Routing | React Router v6 |
| State Management | Zustand |
| Styling | Tailwind CSS + custom CSS (for keyframe animations) |
| 3D Rendering | Three.js + @react-three/fiber + @react-three/drei |
| Character Animations | GLTF/GLB models animated via Three.js AnimationMixer |
| UI Animations | Framer Motion |
| Lottie Animations | lottie-react (for motion graphic overlays) |
| Offline / PWA | Vite PWA plugin + Workbox service worker |
| Hosting | Vercel (free tier) |

### Frontend — Mobile
| Component | Technology |
|---|---|
| Framework | Expo (React Native) |
| Navigation | Expo Router |
| 3D Rendering | Expo GL + Three.js (expo-three) |
| Push Notifications | Expo Notifications + Firebase Cloud Messaging |
| Offline Storage | Expo FileSystem + AsyncStorage |
| App Platforms | iOS (TestFlight initially, then App Store) + Android (Play Store) |

### Backend — Firebase (Spark/Blaze plan, free tier covers launch)
| Service | Use |
|---|---|
| Firestore | All database: user data, progress, curriculum, content, companions, shop items |
| Firebase Auth | User login (email/password + Google sign-in) |
| Firebase Storage | All assets: 3D models (GLB), Lottie files, audio, images |
| Firebase Cloud Messaging | Push notifications (daily streak, French phrases, milestones) |
| Firebase Hosting | Secondary web host |
| Firebase Analytics | Engagement tracking |

### Supporting Free Services
| Service | Use |
|---|---|
| SendGrid (free tier) | Weekly parent email reports (100 emails/day free) |
| Cloudinary (free tier) | Image/video optimisation and CDN delivery |
| GitHub | Version control + CI/CD via GitHub Actions → Vercel |
| ElevenLabs (free tier) | TTS narration for lesson voice-over scripts |
| Blender (free) | 3D model creation for companions and environments |
| LottieFiles (free) | Motion graphic animation files |
| Spline (free tier) | 3D environmental scene design (exported and embedded) |

### Content Pre-Generation Stack (Run once before launch, not during sessions)
| Tool | Use |
|---|---|
| Claude Sonnet API | Generate all questions, hints, explanations, story dialogue, recall missions, French phrases |
| Python scripts | Parse curriculum list → call Claude API → format JSON → push to Firestore |
| Blender pipeline | Render companion animations (idle, encourage, celebrate) → export GLB |
| After Effects / LottieFiles | Create concept motion graphic animations per sub-topic |

---

## 5. PLATFORM ARCHITECTURE & CROSS-DEVICE STRATEGY

### Three Delivery Targets
1. **Web App** (primary, for laptop use): React + Vite + Vercel. Full experience.
2. **iOS App**: Expo/React Native. Identical feature set, native feel, Expo notifications.
3. **Android App**: Expo/React Native. Identical feature set.

### Responsive Breakpoints
- Desktop (≥1024px): Two-column layouts possible. Full 3D companion display. Wider story panels.
- Tablet (768px–1023px): Single-column, slightly compressed. Companion in corner.
- Mobile (< 768px): Full single-column, bottom-fixed navigation bar. Companion as floating button.

### Shared Codebase
Use a monorepo (Turborepo or Nx). Web and mobile share:
- All Zustand state logic
- All Firebase calls and hooks
- All content schemas and types
- All game logic (flower mechanic, XP calc, streak check)

Web-specific and mobile-specific only: navigation, native APIs, rendering wrappers.

### Authentication Flow
1. Student opens app → sees FLEURIR splash screen with animated blooming flower logo
2. Options: Sign Up / Log In / Continue as Guest (guest saves locally only, no cross-device sync)
3. Sign Up: email + password + display name + profile photo upload (optional, can skip and set later)
4. After auth: onboarding flow (see Section 20)
5. Parent email is set during onboarding (optional) — parent receives weekly reports if set

---

## 6. OFFLINE MODE SPECIFICATION

### What Works Offline (Everything)
- All lesson content (animated scripts, step-by-step slides, worked examples)
- All quiz questions (Bronze, Silver, Gold) and all question variants
- All story cutscenes (pre-downloaded video/JSON scenes)
- All formula reference cards
- All companion 3D models and animations
- All shop items (browseable, purchases queue until reconnected)
- Profile and customisation (local changes, sync on reconnect)
- Progress tracking (saved locally to AsyncStorage / IndexedDB)

### What Requires Connectivity
- Initial account creation / login
- Syncing progress to Firestore (happens automatically when connection is restored)
- Parent email reports (sent from Firebase functions when connected)
- Profile photo upload
- Push notifications (received when connected)

### Offline Caching Strategy
1. **On first login:** App downloads the student's entire selected subject's content bundle in background. Student sees a "Preparing your world..." progress bar with animated bloom flower.
2. **Bundle structure:** Each subject divided into topic bundles. Each bundle contains: lesson scripts, question JSON, animation Lottie files, audio files.
3. **Web:** Service worker (Workbox) caches all assets. IndexedDB stores progress and content data.
4. **Mobile:** Expo FileSystem downloads and stores all bundle assets locally. AsyncStorage holds progress.
5. **Sync:** On reconnect, local progress diff is pushed to Firestore. Conflict resolution: server timestamp wins if conflict, but local "more progress" state always preserved.
6. **Content updates:** Version number on each content bundle. On reconnect, compare local version vs Firestore version. Download delta if update available.

---

## 7. VISUAL DESIGN SYSTEM

### Aesthetic References (Synthesis)
The FLEURIR visual world is a synthesis of:
- **Pinterest/Coquette:** lace, bows, ribbon, delicate floral, soft feminine
- **Finch App:** gentle pastels, rounded UI, warm and safe feeling
- **Sky: Children of Light:** mystical environmental storytelling, luminous beauty, gentle motion
- **Moana / Hawaiian Tropical:** warm golds, aqua, coral, lush greens, ocean sparkle
- **Parisian:** cream, blush, dusty rose, black accents, café culture, elegance
- **Italian village:** terracotta, golden afternoon light, archways, cobblestones
- **Cottage core:** moss, lavender, mushrooms, warm wood, wildflowers, honey tones
- **Dark fairy tale:** deep forest greens, shadow purples, midnight navy, glowing runes (scales up with horror progression)

### Colour Palette
| Name | Hex | Use |
|---|---|---|
| Petal Blush | #F7C5CC | Primary backgrounds, UI panels |
| Cream Ivory | #FDF6EC | Card backgrounds, text areas |
| Coquette Rose | #E8A4B8 | Buttons, highlights, flower icons |
| Lavender Mist | #C8B4D4 | Secondary backgrounds, companion panels |
| Tropical Aqua | #7ECEC4 | Science world accents, achievement badges |
| Golden Honey | #F0C060 | XP stars, currency, celebration elements |
| Sage Green | #9DB58A | Nature/biology accents, correct-answer glow |
| Midnight Shadow | #1A1030 | Horror overlay tones, villain scenes |
| Parisian Noir | #2A2035 | Text, outlines, dark UI elements |
| Aurora Silver | #D8E8F0 | Physics world accents, shimmer effects |
| Terracotta Glow | #D4785A | Error states, wrong answers (warm, not harsh red) |
| Bloom White | #FFFFFF | Clean UI elements |

### Typography
| Use | Font | Weight |
|---|---|---|
| Display / Story Titles | Playfair Display | Bold (700) |
| Body / Explanations | DM Sans | Regular (400) |
| UI Buttons / Labels | Nunito | SemiBold (600) |
| Mathematical notation | KaTeX (rendered) | — |
| French phrases | Cormorant Garamond | Italic (400) |

All fonts loaded via Google Fonts, subset for performance.

### Mathematical Notation
All equations, formulas, and maths notation rendered using **KaTeX** (fast, offline-capable, no MathJax). LaTeX strings stored in Firestore content, rendered client-side.

### Motion Design Language
- **Micro-interactions:** 200–300ms, ease-out curves. Buttons scale to 0.97 on press. Cards lift with soft shadow on hover.
- **Level transitions:** 600ms slide + fade. Story panels use cinematic pan.
- **Celebrations:** 1200–2000ms full-screen burst. Confetti uses canvas particle system.
- **Companion idle:** Subtle floating bob (Y-axis oscillation, ~3px, 2s cycle).
- **Flower earn:** Petal-by-petal bloom animation (300ms per flower, sequential).
- **Horror moments:** Screen edges darken (vignette), subtle desaturation, low rumble audio cue.

### UI Component Library
All UI components custom-built to match aesthetic. No off-the-shelf UI library (Tailwind utility classes only). Component list for builder:
- `<BloomButton>` — primary CTA, coquette rose with floral press animation
- `<PetalCard>` — content card with ivory background, rounded-2xl, soft shadow
- `<FlowerBouquet>` — 6-flower display for clearance mechanic
- `<CompanionViewer>` — Three.js canvas for 3D companion display
- `<StoryPanel>` — cinematic widescreen story cutscene wrapper
- `<XPBar>` — animated XP progress bar with bloom fill effect
- `<StreakFlame>` — animated streak counter
- `<QuestionRenderer>` — polymorphic question display (renders all 8 question types)
- `<FormulaCard>` — pullable formula reference card with swipe gesture
- `<CelebrationOverlay>` — full-screen celebration canvas layer
- `<NavBar>` — bottom navigation (mobile) / sidebar (desktop)
- `<ParentReport>` — read-only parent dashboard view
- `<ShopItem>` — shop item tile with preview and price badge

---

## 8. STORY UNIVERSE DESIGN

### Narrative Premise (Both Worlds)
The student IS the protagonist. There is no avatar separate from them. They have uploaded their own profile photo which appears in story scenes as "The Scholar" — a girl who has been summoned to save two separate magical worlds. She carries a magical journal (her study record) that glows as she learns. The journal is the visual metaphor for the platform itself.

The student collects **Companions** along the journey — magical creatures who choose to follow The Scholar and help her. Companions appear on-screen during study sessions and react to correct answers, wrong answers, and level completions.

### Story Format
- Story is **fully integrated** (Option A): Every lesson begins with a story scene, is set inside a story location, and ends with a story reaction.
- Story scenes are presented as **animated cinematic panels** — 2D illustrated backgrounds (parallax layered), with 3D character models placed into scenes. Text dialogue appears in speech-bubble/caption format below/over scenes.
- Story scenes are **non-interactive** (no choices). The student watches, then taps/clicks "Continue" to proceed.
- Every **sub-topic (Learn level)** has: an opening story scene (~60–90 seconds) explaining WHY the student needs this knowledge in the story, and a closing story reaction scene after clearing the quiz.
- Every **topic clearance (Boss Battle)** has: a longer dramatic cutscene (~2–3 minutes) with the villain, a battle sequence resolved by the student's performance, and a victory or consequence scene.

---

### 8A. MATHS WORLD: THE KINGDOM OF ARITHMIA

**World Premise:**
Arithmia is an ancient magical kingdom where every law of reality is governed by mathematics. Bridges hold because of geometry. Trade works because of ratio. The seasons change because of sequences. The kingdom has existed in perfect balance for centuries — until The Unraveller arrived.

**The Unraveller** is a shadow entity from a dimension where logic has no meaning. It has no form — it appears as a living darkness that warps numbers, bends angles, and corrupts equations. When a mathematical truth in Arithmia is forgotten or broken, The Unraveller gains power and a piece of the kingdom dissolves into void.

The Scholar arrives through a portal hidden in a book she found in her school library. She is identified by the Arithmian Archive Council (the lore-keepers of the kingdom) as The One Who Remembers — a scholar whose learning can restore mathematical truth and push back The Unraveller.

**Arithmia Mood Board:**
Early chapters: Golden enchanted library, cobblestone courtyards, warm candlelight, wisteria archways, magical chalk-floating-on-blackboards aesthetic. Soft, wistful, cottage core with a dash of magic.
Later chapters: Shadows spread across the kingdom. Formerly warm locations take on a grey tint. Corrupted equations float in dark air. The Unraveller's shadow is visible on the horizon of every scene.

**Arithmia Regions (mapped to Curriculum Topics):**

| Story Region | Maths Topic |
|---|---|
| The Library of Numerals | Number |
| The Garden of Equations | Algebra |
| The Merchant's Quarter | Ratio, Proportion & Rates of Change |
| The Crystal Citadel | Geometry & Measures |
| The Oracle's Mist Tower | Probability |
| The Hall of Data | Statistics |

Each region is unlocked in this order. The Unraveller has corrupted each region. Restoring sub-topics within a region gradually heals it visually (grey → colour restoration).

**Supporting Characters in Arithmia:**
- **Arith** (she/her): The head archivist of the Library of Numerals. An elegant older woman in ink-stained scholar's robes. Warm, slightly anxious, believes in The Scholar entirely. Delivers exposition and topic introductions.
- **Caden** (he/him): A young market trader from The Merchant's Quarter. Comic relief, enthusiastic, slightly clumsy. Helps with Ratio and Proportion topics.
- **Lyra** (she/her): A crystal sculptor from The Crystal Citadel. Quiet, precise, ethereal. Geometry lessons are delivered from her workshop.
- **The Mist Oracle** (ageless, no pronouns): A mysterious, half-visible entity who speaks only in riddles and probability. Probability and statistics guide.
- **The Unraveller** (antagonist): Appears only as shadow, glitching visual effects, warped audio. Never fully seen. Gets more defined as story progresses. Voice is layered, unsettling.

---

### 8B. SCIENCE WORLD: THE ELEMENTIS ISLES

**World Premise:**
The Elementis Isles are a magical archipelago where the three fundamental sciences of the world maintain the balance of existence. Biology governs all living things. Chemistry governs all transformation and matter. Physics governs all force, energy, and motion. Together, they are called the Elemental Triad.

An ancient force called **The Entropy** has been awakened — a being of pure chaos that existed before the Triad was established. It does not hate — it simply unmakes. Cells stop dividing. Atoms lose their bonds. Forces cease to act. The archipelago is slowly dissolving.

A message carved in a coral reef was found by The Scholar on a beach (a different portal — this one hidden in a tide pool she touched). The message says: "Only one who understands the Triad in its entirety can restore the balance." She is the Alchemyst's Heir — a legendary title passed through generations.

**The Elementis Isles Mood Board:**
Biology Isle: Hawaii/tropical lush, bioluminescent nights, warm humid air, giant glowing cells visible as flora, rich colour.
Chemistry Archipelago: Volcanic, transformative, alchemical. Bubbling pools of colour-changing liquid. Glowing crystalline caves. Dramatic and intense.
Physics Peaks: High mountain observatory meets aurora. Electric energy visible in the air. Crystal-clear starry nights. Dramatic cliffs.
The Entropy corruption: Beautiful at first — looks like decay flowers, geometric dissolution patterns, crystalline fractures spreading. As story progresses, corruption becomes more ominous and erasing.

**The Elementis Isles Regions:**

| Story Region | Science Topic |
|---|---|
| The Living Isle | Biology |
| The Alchemist's Archipelago | Chemistry |
| The Aether Peaks | Physics |

**Supporting Characters in the Elementis Isles:**
- **Zara** (she/her): Marine biologist-guardian of the Living Isle. Young, energetic, passionate, funny. Has a bioluminescent sea-creature companion she's bonded with. Delivers Biology content.
- **Dorian** (he/him): Ancient alchemist spirit, bound to the chemistry archipelago. Wise, dramatic, speaks in flourishes. Has a fondness for explosions (which he insists are "controlled reactions"). Delivers Chemistry content.
- **Nova** (she/they): A stargazer-physicist who lives in the Aether Peaks observatory. Calm, precise, loves patterns and elegance. Has an atmospheric drone companion. Delivers Physics content.
- **The Entropy** (antagonist): Unlike The Unraveller, The Entropy appears as something beautiful — a spreading crystal frost that looks almost decorative but erases everything it touches. Horror lies in its silent, emotionless destruction.

---

## 9. HORROR & SUSPENSE SCALING FRAMEWORK

Horror is age-appropriate (13–16, Ghibli-style dark — not gore, not trauma). It scales with curriculum depth:

### Phase 1 — Year 10, First Half (Enchantment & Mystery)
- Atmosphere: Warm and wondrous with a hint of unease
- Horror elements: Shadows at the edges of scenes, mysterious disappearing objects, eerie music in minor keys, strange symbols appearing on walls
- Story tone: "Something is wrong here… but we don't know what yet"
- Villain appearance: Zero (only implied by corrupted locations)

### Phase 2 — Year 10, Second Half (Gothic Suspense)
- Atmosphere: Noticeably cooler, shadows grow, friendly NPCs show worry
- Horror elements: A corrupted location that looks genuinely unsettling (wilted black flowers, shattered crystals), a voice that isn't any of the characters whispering at the edge of a scene, a companion having a nightmare (shown in a brief cutscene)
- Story tone: "We know the enemy now and it is more powerful than we thought"
- Villain appearance: Brief flash — shadow outline — gone

### Phase 3 — Year 11, First Half (Dread)
- Atmosphere: Dark gold and deep shadow. The warmth is being erased.
- Horror elements: Jump-scare story moment (a figure appears suddenly behind an NPC in a cutscene), NPCs visibly frightened, a location the student loved earlier now shown corrupted
- Story tone: "Time is running out and we are not ready"
- Villain appearance: Sustained presence — half-seen, always moving

### Phase 4 — Year 11, Second Half (Climax & Resolution)
- Atmosphere: Dramatic, high-stakes, operatic
- Horror elements: Full villain confrontation scenes, world near-collapse visuals (beautiful dissolution), companion in danger moment, a "false defeat" scene where things seem lost
- Story tone: "This is the final battle. Everything depends on what you have learned."
- Villain appearance: Full (but never human/gory — The Unraveller is shadow, The Entropy is crystal void)
- Resolution: Victory → world restores → warm and luminous final chapter

---

## 10. CURRICULUM MAPPING TO STORY WORLDS

### 10A. MATHS HIGHER EDEXCEL — Full Sub-Topic Map

Each sub-topic below = **two levels**: Level Type A (Learn) + Level Type B (Quiz).

---

**REGION 1: THE LIBRARY OF NUMERALS** *(Topic: Number)*
Story premise: The Unraveller has scattered the pages of the Numerals Archive. Each sub-topic restores a section of the library.

| # | Sub-Topic | Story Location within Region | Boss Battle (Topic End) |
|---|---|---|---|
| 1 | Types of Number & BIDMAS | The Entrance Hall | — |
| 2 | Fractions, Decimals & Percentages | The Fraction Gallery | — |
| 3 | Indices & Roots | The Index Archives | — |
| 4 | Standard Form | The Standard Scriptorium | — |
| 5 | Surds | The Surd Scroll Vault | — |
| 6 | Factors, Multiples & Primes | The Factor Crypts | — |
| 7 | Accuracy & Bounds | The Bound Chambers | — |
| — | **BOSS BATTLE: The Librarian of Void** | The Grand Reading Room | ✅ |

*Boss Battle premise: The Unraveller has possessed the library's master archivist. She asks seven questions — one from each sub-topic in the Number region. All seven must be answered correctly (Gold-level difficulty) across two rounds. Victory: The archivist is freed, the library's colours restore, a new companion is unlocked.*

---

**REGION 2: THE GARDEN OF EQUATIONS** *(Topic: Algebra)*
Story premise: The Garden of Equations is alive — its vines form expressions, its flowers contain variables. The Unraveller has caused the garden to grow wild and uncontrollable.

| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 8 | Expressions & Substitution | The Expression Arbour | — |
| 9 | Expanding & Factorising | The Hedge Maze | — |
| 10 | Solving Linear Equations | The Equation Fountains | — |
| 11 | Inequalities | The Archway of Limits | — |
| 12 | Formulae & Rearrangement | The Formula Greenhouse | — |
| 13 | Sequences (Arithmetic & Geometric) | The Stepping Stones | — |
| 14 | Straight Line Graphs | The Garden Pathways | — |
| 15 | Other Graphs (Quadratic, Cubic, Reciprocal) | The Graph Grotto | — |
| 16 | Quadratic Equations (factorising, formula, completing square) | The Quarry of Roots | — |
| 17 | Simultaneous Equations | The Twin Springs | — |
| 18 | Algebraic Fractions | The Fractured Bridges | — |
| 19 | Functions & Composite/Inverse Functions | The Mirror Fountain | — |
| 20 | Iteration | The Spiral Stairway | — |
| 21 | Proof | The Proof Pavilion | — |
| — | **BOSS BATTLE: The Wild Equation** | The Garden's Heart | ✅ |

---

**REGION 3: THE MERCHANT'S QUARTER** *(Topic: Ratio, Proportion & Rates of Change)*
Story premise: The Merchant's Quarter (an Italian/Parisian market town) has had its trade scales cursed — nothing balances anymore. Commerce has collapsed.

| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 22 | Ratio | The Scale Markets | — |
| 23 | Direct & Inverse Proportion | The Proportion Promenade | — |
| 24 | Percentage Problems (inc. reverse %) | The Percentage Plaza | — |
| 25 | Speed, Distance, Time & Rates of Change | The Courier's Road | — |
| 26 | Growth & Decay (compound interest) | The Savings Vault | — |
| — | **BOSS BATTLE: The Corrupted Merchant Lord** | The Grand Auction Hall | ✅ |

---

**REGION 4: THE CRYSTAL CITADEL** *(Topic: Geometry & Measures)*
Story premise: The Crystal Citadel's perfect geometric architecture is fracturing. The Unraveller has broken the laws of shape.

| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 27 | Properties of 2D Shapes | The Shape Sanctuary | — |
| 28 | Angles (parallel lines, polygons, bearings) | The Angle Arcade | — |
| 29 | Transformations (reflection, rotation, translation, enlargement) | The Transformation Theatre | — |
| 30 | Constructions & Loci | The Blueprint Court | — |
| 31 | Pythagoras' Theorem | The Pythagorean Pillars | — |
| 32 | Trigonometry (SOHCAHTOA, Sine Rule, Cosine Rule) | The Trigonometry Turrets | — |
| 33 | Circle Theorems | The Circle Theorem Chambers | — |
| 34 | Area, Volume & Surface Area | The Mensuration Mosaic | — |
| 35 | Vectors | The Vector Vault | — |
| — | **BOSS BATTLE: The Fracture Architect** | The Crystal Throne Room | ✅ |

---

**REGION 5: THE ORACLE'S MIST TOWER** *(Topic: Probability)*
Story premise: The Oracle can no longer see any futures — the Mist of Probability has been poisoned by the Unraveller, making all outcomes equally impossible.

| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 36 | Basic Probability | The Entrance Mist | — |
| 37 | Probability Diagrams (Tree Diagrams, Venn Diagrams, Two-Way Tables) | The Diagram Garden | — |
| 38 | Conditional Probability | The Conditional Clouds | — |
| — | **BOSS BATTLE: The Blind Oracle** | The Oracle's Chamber | ✅ |

---

**REGION 6: THE HALL OF DATA** *(Topic: Statistics)*
Story premise: The Hall of Data is a mirrored palace where the patterns of Arithmia are reflected and preserved. The Unraveller has shattered the mirrors — patterns are invisible and history is lost.

| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 39 | Collecting & Representing Data | The Data Entry Hall | — |
| 40 | Averages & Spread (mean, median, mode, range, IQR) | The Average Alcove | — |
| 41 | Cumulative Frequency & Box Plots | The Curve Gallery | — |
| 42 | Histograms | The Histogram Hall | — |
| 43 | Scatter Graphs & Correlation | The Scatter Salon | — |
| — | **BOSS BATTLE: The Pattern Eraser** | The Grand Mirror Hall | ✅ |

**ARITHMIA FINALE (Year 11 Climax):**
After all 6 regions are cleared → **The Final Confrontation with The Unraveller** — a multi-stage boss battle pulling questions from across all topics. 12 questions. Victory triggers the full kingdom restoration cutscene.

---

### 10B. AQA COMBINED SCIENCE TRILOGY HIGHER — Full Sub-Topic Map

---

**ISLAND 1: THE LIVING ISLE — BIOLOGY**

**Sector 1A: Isle of Origins** *(Cell Biology)*
Story premise: The Living Isle's heart is formed of cells. The Entropy has frozen cell division — nothing can grow or heal.

| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 1 | Cell Structure (prokaryotic & eukaryotic) | The Cell Caves | — |
| 2 | Cell Division & Mitosis | The Division Pools | — |
| 3 | Transport in Cells (diffusion, osmosis, active transport) | The Current Gates | — |
| — | **BOSS BATTLE: The Frozen Nucleus** | The DNA Spire | ✅ |

**Sector 1B: The Body Kingdom** *(Organisation)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 4 | Principles of Organisation | The Kingdom Map Room | — |
| 5 | The Digestive System | The Digestive Canal | — |
| 6 | The Heart, Blood Vessels & Blood | The Heart Citadel | — |
| 7 | Coronary Heart Disease & Health | The Health Sanctum | — |
| 8 | Plant Tissues, Organs & Systems | The Canopy Garden | — |
| 9 | Transpiration & Translocation | The Root River | — |
| — | **BOSS BATTLE: The Dissolving Body** | The Kingdom Throne | ✅ |

**Sector 1C: The Plague Wastes** *(Infection & Response)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 10 | Communicable Diseases | The Quarantine Shores | — |
| 11 | Viral Diseases | The Viral Mist | — |
| 12 | Bacterial Diseases | The Bacterial Bogs | — |
| 13 | Fungal & Protist Diseases | The Spore Hollows | — |
| 14 | Human Defence Systems | The Shield Sanctum | — |
| 15 | Vaccination | The Inoculation Garden | — |
| 16 | Antibiotics, Painkillers & Drug Discovery | The Alchemist's Cure | — |
| — | **BOSS BATTLE: The Plague Specter** | The Wastes Fortress | ✅ |

**Sector 1D: The Sun Gardens** *(Bioenergetics)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 17 | Photosynthesis | The Photon Fields | — |
| 18 | Factors Affecting Rate of Photosynthesis | The Glass Garden | — |
| 19 | Aerobic Respiration | The Breath Chambers | — |
| 20 | Anaerobic Respiration & Exercise | The Exertion Arena | — |
| — | **BOSS BATTLE: The Sun Thief** | The Garden's Crown | ✅ |

**Sector 1E: The Inner Sanctuary** *(Homeostasis & Response)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 21 | Principles of Homeostasis | The Balance Hall | — |
| 22 | The Nervous System & Reflexes | The Neural Network | — |
| 23 | The Brain & The Eye | The Mind Palace | — |
| 24 | Control of Body Temperature | The Thermostat Towers | — |
| 25 | Hormonal Coordination & Endocrine System | The Hormone Halls | — |
| 26 | Blood Glucose Control & Diabetes | The Glucose Gardens | — |
| 27 | Reproductive Hormones, Contraception & IVF | The Seed Vaults | — |
| 28 | Plant Hormones & Tropisms | The Root Signal | — |
| — | **BOSS BATTLE: The Hormonal Storm** | The Sanctuary Core | ✅ |

**Sector 1F: The Archive of Life** *(Inheritance, Variation & Evolution)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 29 | Sexual & Asexual Reproduction | The Reproduction Rotunda | — |
| 30 | DNA, Genes & The Genome | The DNA Library | — |
| 31 | Genetic Inheritance & Punnett Squares | The Trait Temple | — |
| 32 | Inherited Disorders | The Disorder Dossiers | — |
| 33 | Variation & Evolution | The Evolution Cliffs | — |
| 34 | Theory of Evolution & Natural Selection | The Darwin Depths | — |
| 35 | Selective Breeding & Genetic Engineering | The Engineering Atelier | — |
| 36 | Fossils, Extinction & Classification | The Fossil Crypts | — |
| — | **BOSS BATTLE: The Mutation Serpent** | The Archive's Vault | ✅ |

**Sector 1G: The Wild Reaches** *(Ecology)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 37 | Ecosystems & Abiotic/Biotic Factors | The Wild Entrance | — |
| 38 | Adaptations | The Adaptation Arenas | — |
| 39 | Feeding Relationships & Food Webs | The Food Web Forest | — |
| 40 | Material Cycles (Water & Carbon) | The Cycle Springs | — |
| 41 | Biodiversity & Its Importance | The Diversity Gardens | — |
| 42 | Human Impact on Ecosystems & Global Warming | The Threat Shores | — |
| — | **BOSS BATTLE: The Entropy's Bloom** | The Wild Reaches Summit | ✅ |

---

**ISLAND 2: THE ALCHEMIST'S ARCHIPELAGO — CHEMISTRY**

**Sector 2A: The Origin Islet** *(Atomic Structure & Periodic Table)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 43 | Atoms, Elements & Compounds | The Element Forge | — |
| 44 | Mixtures & Separation Techniques | The Separation Shore | — |
| 45 | History of the Atomic Model | The Model Workshop | — |
| 46 | Subatomic Particles & Isotopes | The Subatomic Sanctum | — |
| 47 | Electronic Structure | The Electron Gardens | — |
| 48 | The Periodic Table & Group Properties (0, 1, 7) | The Periodic Palace | — |
| — | **BOSS BATTLE: The Atomic Unravelling** | The Islet Core | ✅ |

**Sector 2B: The Bond Shores** *(Bonding, Structure & Properties)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 49 | Ionic Bonding & Ionic Compounds | The Ionic Islet | — |
| 50 | Covalent Bonding (simple & giant) | The Covalent Cove | — |
| 51 | Metallic Bonding & Metallic Structures | The Metallic Mesa | — |
| 52 | Diamond, Graphite, Graphene & Fullerenes | The Carbon Caves | — |
| 53 | Nanoparticles | The Nano Caves | — |
| — | **BOSS BATTLE: The Bond Breaker** | The Shore Summit | ✅ |

**Sector 2C: The Measurement Marshes** *(Quantitative Chemistry)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 54 | Conservation of Mass & Relative Formula Mass | The Balance Bridge | — |
| 55 | Moles & Chemical Equations | The Mole Markets | — |
| 56 | Concentration of Solutions | The Concentration Canals | — |
| — | **BOSS BATTLE: The Mass Phantom** | The Marsh Observatory | ✅ |

**Sector 2D: The Reaction Ruins** *(Chemical Changes)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 57 | Reactivity Series & Metal Extraction | The Reactivity Range | — |
| 58 | Reactions of Acids (neutralisation, salts) | The Acid Archipelago | — |
| 59 | pH, Indicators & Titration | The Litmus Lagoon | — |
| 60 | Electrolysis | The Electrolysis Engine | — |
| — | **BOSS BATTLE: The Acid Sovereign** | The Ruin Throne | ✅ |

**Sector 2E: The Energy Atolls** *(Energy Changes)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 61 | Exothermic & Endothermic Reactions | The Exo/Endo Estuary | — |
| 62 | Activation Energy & Bond Energies | The Bond Energy Bay | — |
| — | **BOSS BATTLE: The Thermal Wraith** | The Atoll Centre | ✅ |

**Sector 2F: The Rate Reefs** *(Rate & Extent of Chemical Change)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 63 | Factors Affecting Rate of Reaction | The Rate Reefs | — |
| 64 | Reversible Reactions & Equilibrium | The Equilibrium Equator | — |
| 65 | Le Chatelier's Principle | The Shifting Shores | — |
| — | **BOSS BATTLE: The Equilibrium Titan** | The Reef's Edge | ✅ |

**Sector 2G: The Organic Orchards** *(Organic Chemistry)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 66 | Alkanes & Crude Oil | The Alkane Arbour | — |
| 67 | Alkenes & Cracking | The Alkene Avenues | — |
| 68 | Alcohols & Carboxylic Acids | The Fermentation Fields | — |
| 69 | Addition & Condensation Polymers | The Polymer Plains | — |
| — | **BOSS BATTLE: The Carbon Curse** | The Orchard Summit | ✅ |

**Sector 2H: The Analysis Atoll** *(Chemical Analysis)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 70 | Purity, Mixtures & Chromatography | The Purity Pools | — |
| 71 | Identifying Gases | The Gas Gardens | — |
| 72 | Identifying Ions (flame tests, precipitates) | The Ion Illuminator | — |
| — | **BOSS BATTLE: The Impurity Illusion** | The Atoll Lab | ✅ |

**Sector 2I: The Atmosphere Arch** *(Chemistry of the Atmosphere)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 73 | History of Earth's Atmosphere | The Sky Archive | — |
| 74 | Climate Change & Carbon Footprint | The Storm Skies | — |
| — | **BOSS BATTLE: The Smog Sovereign** | The Atmosphere Apex | ✅ |

**Sector 2J: The Resource Realm** *(Using Resources)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 75 | Finite & Renewable Resources | The Resource Registry | — |
| 76 | Water Treatment | The Water Sanctum | — |
| 77 | Life Cycle Assessments | The LCA Library | — |
| 78 | Alloys, Ceramics, Polymers & Composites | The Materials Market | — |
| — | **BOSS BATTLE: The Waste Golem** | The Realm Gate | ✅ |

---

**ISLAND 3: THE AETHER PEAKS — PHYSICS**

**Sector 3A: The Energy Highlands** *(Energy)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 79 | Energy Stores & Transfers | The Power Peaks | — |
| 80 | Kinetic & Potential Energy (calculations) | The Kinetic Cliffs | — |
| 81 | Specific Heat Capacity | The Heat Halls | — |
| 82 | Energy Efficiency & Sankey Diagrams | The Efficiency Engine | — |
| 83 | National & Global Energy Resources | The Resource Ridge | — |
| — | **BOSS BATTLE: The Drain Phantom** | The Highland Summit | ✅ |

**Sector 3B: The Circuit Cliffs** *(Electricity)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 84 | Current, Potential Difference & Resistance | The Current Canyons | — |
| 85 | Ohm's Law & I-V Characteristics | The Ohm Observatory | — |
| 86 | Series & Parallel Circuits | The Circuit Citadel | — |
| 87 | Mains Electricity, AC/DC & Safety | The Safety Sanctum | — |
| 88 | Static Electricity | The Static Spires | — |
| 89 | The National Grid | The Grid Gate | — |
| — | **BOSS BATTLE: The Short Circuit Specter** | The Cliffs Edge | ✅ |

**Sector 3C: The Particle Plateaux** *(Particle Model of Matter)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 90 | States of Matter & Changes of State | The State Stables | — |
| 91 | Internal Energy | The Internal Inn | — |
| 92 | Density | The Density Dunes | — |
| 93 | Specific Latent Heat | The Latent Lake | — |
| — | **BOSS BATTLE: The Phase Phantom** | The Plateau Core | ✅ |

**Sector 3D: The Atomic Apex** *(Atomic Structure — Physics)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 94 | Atoms, Isotopes & Nuclear Radiation | The Isotope Islands | — |
| 95 | Radioactive Decay & Nuclear Equations | The Decay Depths | — |
| 96 | Half-Life | The Half-Life Hourglass | — |
| 97 | Uses & Risks of Radiation | The Radiation Registry | — |
| 98 | Nuclear Fission & Fusion | The Nuclear Nexus | — |
| — | **BOSS BATTLE: The Decay Specter** | The Apex Summit | ✅ |

**Sector 3E: The Force Fields** *(Forces)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 99 | Scalars & Vectors; Contact & Non-Contact Forces | The Vector Valley | — |
| 100 | Gravity & Resultant Forces | The Gravity Glen | — |
| 101 | Work Done & Energy Transfer | The Work Workshops | — |
| 102 | Forces & Elasticity (Hooke's Law) | The Spring Sanctum | — |
| 103 | Moments & Levers | The Moment Mountains | — |
| 104 | Pressure in Fluids | The Pressure Plains | — |
| 105 | Speed, Velocity & Acceleration (graphs) | The Motion Meadows | — |
| 106 | Newton's Laws of Motion | The Newton Nursery | — |
| 107 | Stopping Distance & Momentum | The Momentum Marshes | — |
| — | **BOSS BATTLE: The Force Fracture** | The Force Field Gate | ✅ |

**Sector 3F: The Wave Wastes** *(Waves)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 108 | Properties of Waves (transverse & longitudinal) | The Ripple Ranges | — |
| 109 | Reflection & Refraction | The Mirror Marshes | — |
| 110 | The Electromagnetic Spectrum | The Spectrum Sanctum | — |
| 111 | Uses of EM Radiation | The Radiation Road | — |
| 112 | Sound Waves & Ultrasound | The Echo Caverns | — |
| — | **BOSS BATTLE: The Wave Wraith** | The Wastes Core | ✅ |

**Sector 3G: The Magnetic Meadows** *(Magnetism & Electromagnetism)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 113 | Magnets & Magnetic Fields | The Field Forests | — |
| 114 | The Motor Effect | The Motor Moors | — |
| 115 | Electromagnetic Induction | The Induction Isle | — |
| 116 | Transformers | The Transformer Tower | — |
| — | **BOSS BATTLE: The Magnetic Maw** | The Meadow Gateway | ✅ |

**Sector 3H: The Celestial Summit** *(Space Physics)*
| # | Sub-Topic | Story Location | Boss Battle |
|---|---|---|---|
| 117 | The Solar System & Orbital Mechanics | The Solar Observatory | — |
| 118 | Life Cycle of Stars | The Star Sanctuary | — |
| 119 | The Big Bang & Red-Shift | The Big Bang Balcony | — |
| — | **BOSS BATTLE: The Entropy's Eye** *(Final Boss — Science)* | The Celestial Summit | ✅ |

---

## 11. LEVEL ARCHITECTURE

### 11A. What Constitutes a Level

Every sub-topic entry in Section 10 generates exactly **TWO levels**:

**Level Type A — The Learn Level**
A fully narrated, animated learning experience for the sub-topic. No quiz. Pure content delivery with a worked example at the end.

**Level Type B — The Quiz Level**
A 6-question quiz (one difficulty tier at a time: Bronze, then Silver, then Gold). The clearance mechanic (6-flower bouquet) applies here.

One sub-topic's full clearance = Level A (Learn) complete + Level B Bronze cleared + Level B Silver cleared + Level B Gold cleared.

Total levels across both subjects:
- Maths: 43 sub-topics × 2 level types × 3 tiers = **86 Learn levels + 129 Quiz tier attempts** (across 43 sets)
- Science: 76 sub-topics × 2 level types × 3 tiers = **152 Learn levels + 228 Quiz tier attempts**
- Total Learn Levels: **238**
- Total Quiz Level clearances required: **357**

### 11B. Linear Progression + Search Mode

**Main Path (strictly linear):**
The student progresses through the curriculum in the exact order listed in Section 10. Each level must be cleared before the next unlocks. This is the "story path" — regions unlock in sequence, sub-topics within regions unlock in sequence.

**Search Mode (separate area):**
A dedicated "Search & Study" tab accessible from the main navigation at all times. This area allows:
- Search any topic by name or keyword
- Browse the full curriculum list (all subjects, regions, sub-topics)
- Open and replay any Learn Level that has already been unlocked on the main path
- Practice any Quiz Level already cleared (in "practice mode" — flowers not counted, no story, pure revision)
- Access Formula Cards for any unlocked topic

**Important:** Search Mode is for REVISION ONLY. Content in Search Mode does not count toward main path progress. Students cannot "unlock" levels via Search Mode — they must follow the linear main path for clearance.

### 11C. Bronze / Silver / Gold Tier System

**Automatic Tier Progression — How It Works:**
The student never manually selects a difficulty tier. The system manages transitions automatically.

1. After completing a Learn Level, the quiz sequence for that sub-topic begins automatically.
2. The student starts at **Bronze tier** always.
3. Upon clearing Bronze (6/6 flowers earned), the system immediately transitions to **Silver tier** with a brief animation.
4. Upon clearing Silver (6/6), the system immediately transitions to **Gold tier**.
5. Upon clearing Gold (6/6), the sub-topic is **fully cleared** — celebration triggers, next sub-topic unlocks.

**Tier Difficulty Definitions:**
- **Bronze:** Foundation recall questions — direct formula application, simple single-step problems. Visually represented with a bronze flower border.
- **Silver:** Standard GCSE exam-style questions — two or three steps, standard difficulty matching a typical Edexcel/AQA question. Silver flower border.
- **Gold:** Higher-level, tricky, multi-step, exam-style challenge questions — the hardest question types the specification can produce. Gold/shimmer flower border.

**Each tier's quiz:** 6 questions. Each is a different question from that tier's pre-generated question set.

### 11D. Six-Flower Clearance Mechanic

**The Bloom Bouquet:**
At the bottom of every quiz screen sits a visual row of 6 flower buds. Each flower starts as a closed bud. When the student answers a question correctly, the corresponding flower blooms in real-time (300ms bloom animation, from bud → full flower). All 6 flowers blooming = level cleared.

**Scoring Rules:**
- 6/6 correct: All 6 flowers bloom → CLEARED → next tier unlocks
- 5/6 or fewer correct: Retake triggered
- Retake: Same 6 questions but with different number values substituted into the templates. The partial bouquet resets (flowers close back to buds).
- Number of retakes: Unlimited. Student retakes until they achieve 6/6.
- Hints are available throughout (tap the hint button — optional, does not penalise).

**Retake Mechanic — Technical:**
Each question is stored as a template with variable placeholders (e.g. `"Solve {a}x + {b} = {c}"`). Each template has a minimum of 3 pre-generated number variant sets stored in Firestore. On each retake, a different variant set is randomly selected so numbers are guaranteed to be different but the question type and difficulty are identical.

**Stars Earned (per quiz tier clearance):**
- 1 Star: Cleared after 3 or more retakes
- 2 Stars: Cleared after 1 retake
- 3 Stars: Cleared on first attempt (6/6 first try)

Stars are stored per tier, per sub-topic. A sub-topic can have up to 9 stars total (3 per tier × 3 tiers).

---

## 12. COMPLETE LEARNING FLOW (Screen-by-Screen)

### Step 1: MAP VIEW (World Map)
The student's home screen is an illustrated 3D world map of their active world (Arithmia or Elementis Isles). Regions are visible as distinct locations on the map. Cleared regions glow warmly. Locked regions are desaturated. Current active region pulses gently. Corruption (shadow/frost) overlays locked areas. Tapping a region navigates to the region's level list.

### Step 2: REGION VIEW
Shows all sub-topics within the region as a vertical list of level cards. Each card shows: sub-topic name, story location name, lock/unlock status, star rating (once completed), and tier badges (Bronze/Silver/Gold flowers). Cleared levels have a warm glow. The current active level has a pulsing border. Locked levels are dimmed with a lock icon.

### Step 3: LEARN LEVEL — Opening Story Scene
Student taps the current Learn Level card → opens. Screen fills with a cinematic story panel:
- Background: illustrated parallax scene of the sub-topic's story location
- Characters: 3D models of relevant story NPCs placed in scene
- Companion: student's active companion is visible in corner (idle animation)
- Dialogue: character dialogue appears in a styled speech card at bottom of screen
- Student taps "Continue" (or "Next") to advance through each dialogue line
- Scene sets up WHY this knowledge is needed in the story (example: "Arith pulls a scroll from the crumbling shelf: 'The Bound Chambers are sealed. Only one who understands accuracy and error bounds can read the inscription on the door…'")

### Step 4: LEARN LEVEL — Animated Lesson
Content delivery phase. The screen transitions to a lesson viewer:
- Format: Illustrated slides with animated motion graphics (Lottie overlays) for concept explanation
- Narration: Pre-generated voice-over plays over each slide
- Each concept step appears sequentially; student taps/clicks to advance
- Mathematical notation rendered with KaTeX inline within slides
- Formula cards can be accessed via a "Reference" button (bottom-right corner)
- Motion graphics demonstrate the concept visually (e.g. for bounds: a number line animation showing upper and lower bounds, values snapping to positions)
- No questions yet. Pure instruction.
- Lesson has 5–10 slides per sub-topic (depending on concept complexity)

### Step 5: LEARN LEVEL — Worked Example
After the lesson slides: one or two fully worked examples.
- Problem statement appears
- Solution is shown step by step, each step animated onto the screen one at a time
- Student taps "Next Step" to reveal each step
- Each step has a brief text annotation explaining what was done and why
- No student input required. Observation only.
- After worked example: "Now it's your turn" transition.

### Step 6: LEARN LEVEL — Closing Scene & Unlock
A brief closing story beat (2–4 dialogue lines). The NPC reacts to what The Scholar just learned. The sub-topic's story location partially heals (colour restores slightly, shadow pulls back). A subtle particle animation plays. "Quiz unlocked" badge appears. A tap leads to the Level B (Quiz) card in the region view.

### Step 7: QUIZ LEVEL — Opening (Tier Context)
Student taps the Quiz Level → sees a brief one-screen "tier intro":
- Shows which tier they are entering (e.g. "Bronze Challenge 🌿")
- 3-line story context ("Arith opens a bronze-clasped test book: 'Prove to me you understand the Bound Chambers...'")
- Shows empty 6-flower bouquet at bottom
- "Begin" button

### Step 8: QUIZ LEVEL — Question Loop
For each of the 6 questions:
a. Question renders using the appropriate `<QuestionRenderer>` component (type varies per question — see Section 13)
b. Companion is visible in the corner (idle animation)
c. Active formula cards accessible via bottom button (optional)
d. Hint button available (tap to reveal 1-line hint — one hint per question)
e. Student submits answer:
   - CORRECT: flower bloom animation (the corresponding bud blooms) + brief green correct-answer overlay + 1-line positive feedback text + companion plays encouragement animation
   - WRONG: terracotta wrong-answer overlay + 1-line explanation of the error (not a full re-lesson, just what went wrong) + companion reacts (a gentle sad expression, not dramatic)
f. Advance to next question automatically after 1.5 seconds

### Step 9: QUIZ LEVEL — Clearance or Retake

**IF 6/6:** Full-screen bloom burst (all 6 flowers bloom simultaneously in celebratory slow-motion). Then the CLEARANCE CELEBRATION triggers (see Section 19). Then the next tier auto-begins (Silver/Gold) OR if Gold was cleared, the sub-topic FULL CLEARANCE celebration triggers.

**IF ≤5/6:** "Retake" screen appears:
- Shows the bouquet with however many flowers bloomed
- Story line: the NPC says something encouraging ("You're close, Scholar — the words are forming, but not yet complete. Try again — the numbers will shift, but the method is yours to master.")
- A gentle retake animation (flowers gently close back to buds)
- "Try Again" button
- New number variant set loads for the same 6 questions

### Step 10: BOSS BATTLE (End of Each Topic/Region)
After ALL sub-topics in a region are Gold-cleared, the Boss Battle unlocks. See Section 14.

### Step 11: POST-TOPIC GRADUATION MOMENT
After the Boss Battle is won, a dedicated "Topic Graduation" screen appears (more elaborate than a regular level clear). See Section 19.

---

## 13. QUESTION TYPES — FULL SPECIFICATION

All question types must be available in the `<QuestionRenderer>` component. For each quiz, the pre-generated question set specifies which type each of the 6 questions uses. Types are mixed within a quiz for variety.

### Type 1: Multiple Choice
- Displays question text (with KaTeX if needed)
- 4 answer options displayed as tappable cards
- One correct answer
- On wrong selection: card turns terracotta, correct card turns sage green
- Wrong answer explanation displayed below

### Type 2: Drag & Drop
- Elements displayed as draggable tiles
- Drop zones labelled
- Example uses: matching terms to definitions, ordering steps of a solution, placing values on a number line, sorting items into categories
- On submission: wrongly placed tiles shake; correctly placed tiles glow

### Type 3: Fill in the Blank
- Question text with one or more blank fields (styled text input boxes)
- For numerical answers: numerical keyboard
- For algebraic: text input with simple expression validation
- Tolerance: ±0.01 for decimal answers (configurable per question)
- Acceptable answer formats stored as array in Firestore (e.g. ["0.5", "1/2", ".5"])

### Type 4: Equation Builder
- A set of number tiles and symbol tiles displayed in a tray
- Student taps tiles to build an equation or expression in a display bar
- Example: "Rearrange v = u + at to make a the subject" — student taps tiles to form a = (v - u) / t
- Clear button, backspace button
- Validation checks equivalence, not exact string match

### Type 5: Match-Up
- Left column: 5–6 items
- Right column: 5–6 answers (shuffled)
- Student taps one from each column to create a pair; a connecting line draws between them
- Matched pairs locked in place until submission
- On submission: incorrect pairs shown in terracotta, correct in sage green

### Type 6: True or False
- Statement displayed
- Two large tappable buttons: TRUE / FALSE
- Immediate feedback after tap
- Used for common misconceptions and conceptual understanding

### Type 7: Spot the Mistake
- A complete worked solution is displayed with deliberate errors (1–2 errors)
- Student must tap/select the step or line that contains the mistake
- Steps are displayed in numbered lines; each line is tappable
- On correct identification: the error line highlights and a correction animation shows the right approach

### Type 8: Written Input with Mark Scheme
- Open text area for multi-step answers (especially for "show that" or "explain" style questions)
- This type is ONLY used at Gold tier for appropriate question types
- After submission, a full mark scheme is displayed alongside the student's answer
- Student self-marks: "I got this right" / "I got this partly right" / "I got this wrong" buttons (self-reporting)
- The system treats self-reported score as the flower outcome for that question
- Companion reacts to the student's self-report

---

## 14. BOSS BATTLE SYSTEM

### Trigger
A Boss Battle unlocks after every sub-topic in a topic/region is Gold-cleared.

### Boss Battle Structure
1. **Opening Cutscene (60–90 seconds):** Dramatic story scene. The villain (or a villain lieutenant) confronts the student at the heart of the region. The NPC ally is in danger or the region is about to fall. Music shifts to dramatic orchestral/cinematic track. The student is challenged: "Prove you have truly mastered this domain."

2. **Battle Questions (12 questions):** Questions drawn from across ALL sub-topics in the region. Mix of difficulty (approx. 4 Bronze-level, 4 Silver-level, 4 Gold-level). Mix of all question types. No hints during Boss Battles. No retakes per question — wrong answers are recorded but the battle continues.

3. **Battle Score Outcome:**
   - 10–12 correct: **Victory** → Full celebratory cutscene → region fully healed → new companion unlocked (Boss Battle exclusive companion) → major XP + Petal reward
   - 7–9 correct: **Partial Victory** → Region heals but a shadow lingers → story consequence (tension maintained) → standard XP + Petal reward → boss battle can be re-attempted for full score
   - 6 or fewer: **Setback** → Story scene: the villain retreats but the region remains partially corrupted. Student is encouraged to review weak sub-topics (weakest ones highlighted) → reduced XP. Boss battle re-attempt unlocked after reviewing the weakest sub-topic.

4. **Closing Cutscene:** Varies based on outcome. Victory cutscene is celebratory and moves the story forward. Setback cutscene is ominous (good horror escalation point).

5. **Graduation Moment:** Even after Partial Victory, a region graduation screen appears (see Section 19).

---

## 15. SPACED REPETITION & RECALL MISSION SYSTEM

### Trigger Logic (Mixed: Automatic + Manual)
**Automatic:** 7 days after a sub-topic's Gold clearance, a "Recall Mission" for that sub-topic is automatically created and appears as a glowing notification on the world map — the sub-topic's story location shows a dim shadow returning.

**Manual:** From the Search & Study tab, the student can launch a Recall Mission for any cleared sub-topic at any time.

### Recall Mission Structure
1. **Story Wrapper:** A short 2–3 dialogue scene. Story framing: the corruption is creeping back into a previously healed location. Example: "Arith's voice, urgent: 'Scholar — the Factor Crypts are fading again. The Unraveller has sent a shadow back. Quickly — restore the numbers before it sets in.'"

2. **Recall Questions:** 6 questions, all at Silver difficulty, drawn from the sub-topic's question bank. Different variant sets used so they are not identical to the clearance quiz.

3. **Outcome:**
   - 6/6: Sub-topic fully re-protected. Shadow removed. Brief victory scene. XP + Petals rewarded.
   - 4–5/6: Partial. Sub-topic shows a faint shadow (visual indicator). Recall can be re-attempted next day.
   - 3 or fewer: Red alert — sub-topic re-flagged as needing review. Student is prompted to replay the Learn Level before re-attempting the recall.

4. **Recall Progress Tracking:** Firestore stores the last recall date and score for every sub-topic. Parent dashboard shows recall performance.

5. **Recall Mission Scheduling:** Spaced repetition interval doubles on success:
   - First recall: 7 days after clearance
   - Second recall: 14 days after first recall
   - Third recall: 28 days after second recall
   - Fourth onwards: 28-day interval (monthly)

---

## 16. GAMIFICATION SYSTEM

### 16A. XP System

XP tracks the student's overall academic progress and gives them a "Scholar Level" (a number displayed on their profile).

| Action | XP Earned |
|---|---|
| Complete a Learn Level | 50 XP |
| Pass Bronze Quiz (6/6 flowers) | 100 XP |
| Pass Silver Quiz (6/6 flowers) | 150 XP |
| Pass Gold Quiz (6/6 flowers) | 200 XP |
| Win a Boss Battle (full victory) | 400 XP |
| Win a Boss Battle (partial victory) | 200 XP |
| Complete a Recall Mission (6/6) | 100 XP |
| Daily Streak (log in + 5 min activity) | 30 XP |
| First-try clearance bonus (no retakes needed) | +50 XP per tier |
| Complete a Search Mode practice session | 25 XP |

**Scholar Level Thresholds (exponential curve):**
Level 1: 0–500 | Level 2: 501–1,200 | Level 3: 1,201–2,500 | Level 4: 2,501–4,500 | Level 5: 4,501–7,500 | then +3,000 XP per level from Level 6 onwards.

Scholar Level is displayed on the profile as a badge with the student's active companion.

### 16B. Petal Currency 🌸

Petals are the spendable in-app currency, earned through academic action and spent in the shop.

| Action | Petals Earned |
|---|---|
| Pass Bronze Quiz | 5 🌸 |
| Pass Silver Quiz | 10 🌸 |
| Pass Gold Quiz | 20 🌸 |
| Win Boss Battle (full victory) | 50 🌸 |
| Win Boss Battle (partial) | 25 🌸 |
| Recall Mission (6/6) | 15 🌸 |
| Daily Streak (maintained 7 days) | 20 🌸 bonus |
| Recall Mission (4–5/6) | 5 🌸 |

Petals balance is always visible in the top bar of the app as a petal icon + number.

### 16C. Stars (Per Level)

Stars reflect HOW WELL a student cleared a quiz tier, not just whether they cleared it.
- 3 Stars: Cleared on first attempt
- 2 Stars: Cleared after exactly 1 retake
- 1 Star: Cleared after 2 or more retakes

Stars are displayed on each level card in the region view. Each quiz tier has its own star rating. 9 possible stars per sub-topic (3 per tier). Total stars across the platform: 9 stars × number of sub-topics. Stars are purely cosmetic/status — they do not affect unlocks. A student who earns 1 star still fully clears the level.

### 16D. Badges & Achievements

Badges are awarded for specific milestones and displayed on the student's profile. List (minimum — more can be added):

| Badge Name | Condition |
|---|---|
| First Bloom | Complete first Learn Level |
| Bouquet Keeper | Earn 6/6 on first attempt (first time) |
| The Unbroken | 7-day streak |
| Scholar of Numbers | Clear all Number sub-topics |
| Algebra Enchantress | Clear all Algebra sub-topics |
| The Rememberer | Complete 10 Recall Missions |
| Companion Collector | Own 5 companions |
| Rare Bond | Own a Rare-tier companion |
| The Oracle's Choice | Clear all Probability sub-topics |
| Living Isle Guardian | Clear all Biology topics |
| Alchemist's Heir | Clear all Chemistry topics |
| Aether Physicist | Clear all Physics topics |
| Kingdom Restorer | Clear all Maths topics and win Arithmia finale |
| Triad Scholar | Clear all Science topics and win Elementis finale |
| The Dual Scholar | Clear both worlds |
| Golden Perfectionist | Earn 3-star Gold clearance on 10 sub-topics |
| Bonjour | Unlock first French phrase |
| Je Parle Français | Unlock 10 French phrases |
| French Corner Complete | Unlock all French phrases |
| Perfect Recall | 5 Recall Missions at 6/6 in a row |

Badge unlock triggers a brief full-screen badge-reveal animation and a push notification.

### 16E. Daily Streak System

**Streak Logic:**
- A streak day is counted if the student opens the app AND completes at least 5 minutes of active learning (answering at least 1 question in a quiz).
- Streak counter increments at midnight each day.
- If a day is missed, the streak resets to 0 (no streak shields — keeping it clean and honest, but no harsh life-loss punishment either).
- Streak is displayed prominently on the home screen as an animated flame icon with the number of days.

**Streak Rewards:**
- Day 3: 10 Petals bonus
- Day 7: 20 Petals + "The Unbroken" badge + French phrase unlock
- Day 14: 30 Petals + companion cosmetic unlock
- Day 30: 60 Petals + exclusive companion unlocked + major push notification celebration
- Every 30 days thereafter: 60 Petals + a new exclusive item

**Streak Reminder:** Push notification sent at a time the student can configure (e.g. 7pm) if they haven't logged in yet that day.

---

## 17. COMPANION SYSTEM

### Overview
Companions are 3D animated creature/character models that the student collects via the in-app shop using Petals. Each companion is an original creation with a distinct aesthetic inspired by (but legally distinct from): Disney princess character design, Sanrio character design, My Little Pony design, panda/animal characters.

The student selects ONE active companion from their collection. This companion is displayed:
- On-screen during all quiz sessions (floating in the bottom corner, idle animation looping)
- On the profile screen (in a spotlight display)
- On the world map (walking beside the scholar's avatar)
- In story scenes (occasionally referenced by NPC characters as the companion the scholar brought)

### Companion Rarity Tiers
| Tier | Colour Border | Shop Price (Petals) | Companions |
|---|---|---|---|
| Common | Soft White | 50 🌸 | 10 companions |
| Uncommon | Silver | 100 🌸 | 8 companions |
| Rare | Gold | 200 🌸 | 5 companions |
| Boss-Exclusive | Shimmer/Rainbow | Cannot be bought — unlocked only by winning Boss Battles | 7 companions (one per Boss Battle topic) |

### Full Companion List (25 companions)

| # | Name | Type | Rarity | Design Inspiration | Personality |
|---|---|---|---|---|---|
| 1 | Blanche | White bunny in coquette bow dress | Common | Sanrio-inspired | Gentle, encouraging |
| 2 | Mochi | Round soft cream bear with blush cheeks | Common | Sanrio-inspired | Cosy, sleepy-happy |
| 3 | Pip | Panda cub in bamboo-print overalls | Common | Panda character | Playful, clumsy |
| 4 | Rosette | Pink panda in Parisian beret | Common | Panda + Paris | Sophisticated, sweet |
| 5 | Maple | Golden bear in cottage core apron | Common | Cottagecore animal | Warm, nurturing |
| 6 | Cosette | French poodle with ribbon collar | Common | Paris aesthetic | Elegant, chatty |
| 7 | Fern | Tiny deer with wildflower crown | Common | Woodland fairy | Curious, delicate |
| 8 | Soleil | Tropical bird (parrot-like) with plumeria | Common | Hawaiian | Bright, loud, fun |
| 9 | Luna | Black cat with crescent moon collar | Common | Gothic soft | Mysterious, calm |
| 10 | Sage | Owl in academic robes with tiny glasses | Common | Academic animal | Wise, dry humour |
| 11 | Prism | Pastel rainbow pony with flowing mane | Uncommon | MLP-inspired | Joyful, energetic |
| 12 | Aurora | Pony with aurora borealis mane | Uncommon | MLP-inspired | Dreamy, artistic |
| 13 | Blossom | Cherry blossom pony in pink | Uncommon | MLP + Japan | Gentle, poetic |
| 14 | Iris | Purple princess figure with crystal wings | Uncommon | Disney princess inspired | Regal, kind |
| 15 | Pearl | Rose-gold princess with ocean aesthetic | Uncommon | Disney princess inspired | Adventurous, warm |
| 16 | Ember | Fire-fox with amber glowing fur | Uncommon | Fantastical animal | Bold, passionate |
| 17 | Marina | Aquamarine dolphin figure with fins | Uncommon | Ocean companion | Free-spirited, playful |
| 18 | Frost | Ice bear with crystalline fur patches | Uncommon | Nordic animal | Quiet, precise |
| 19 | Stardust | Galaxy-coloured pony, stars in mane | Rare | MLP + space | Magical, mysterious |
| 20 | Velvet | Dark gothic bunny in black lace | Rare | Dark coquette | Sarcastic, protective |
| 21 | Celestia | Celestial snow-white cat, star markings | Rare | Star aesthetic | Ethereal, prophetic |
| 22 | Onyx | Dark-mane horse with electric blue eyes | Rare | Gothic fantasy | Noble, haunting |
| 23 | Jasper | Tiger cub with amber gemstone collar | Rare | Jewel animal | Fierce, loyal |
| 24–30 | *[7 Boss-Exclusive Companions]* | Each themed to the boss battle region | Exclusive | Mix of all aesthetics | Each has unique trait |

**Boss-Exclusive Companions:** One per Boss Battle topic victory:
- Number Boss → "Cipher" (an origami crane made of golden equations)
- Algebra Boss → "Vyne" (a vine-spirit girl with equation-patterned leaves)
- Geometry/Crystal Boss → "Prisme" (a geometric crystal fox)
- Biology Boss → "Flora" (a bioluminescent plant sprite)
- Chemistry Boss → "Alchema" (a tiny alchemist rabbit)
- Physics Boss → "Volt" (an electric ferret)
- Final Boss (either world) → One ultra-rare companion revealed at time of win

### Companion Animations (3 required per companion)
1. **Idle:** Subtle floating bob + occasional blink/wing flutter/ear twitch (loops infinitely)
2. **Encourage:** Plays on correct answer — companion claps, spins, or does a happy jump (1 second)
3. **Celebrate:** Plays on level clearance — companion does full spin or somersault with sparkles (2 seconds)

All animations stored as GLTF morph targets or AnimationClip data in the GLB model file.

---

## 18. IN-APP SHOP

### Access
A dedicated "Bloom Shop" tab in the main navigation. Always accessible.

### Shop Layout
Three tabs within the shop:
1. **Companions** — browse and purchase companions (with preview of idle animation)
2. **Customise** — profile frames, room decorations, profile backgrounds, sticker packs, story cosmetics
3. **French Corner** — French phrase cards (see Section 21 — NOT purchasable, only unlockable through milestones; this tab shows the collection)

### Shop Item Categories & Prices

**Companions:** (See Section 17 for full list and prices)

**Profile Frames** (border that appears around profile photo):
| Item | Petals |
|---|---|
| Rose Gold Frame | 30 🌸 |
| Floral Watercolour Frame | 30 🌸 |
| Parisian Lace Frame | 35 🌸 |
| Dark Enchantment Frame | 40 🌸 |
| Tropical Lei Frame | 35 🌸 |
| Crystal Shatter Frame | 50 🌸 |
| Scholar's Seal Frame | 60 🌸 |

**Profile Backgrounds** (background behind profile photo on profile screen):
| Item | Petals |
|---|---|
| Lavender Field | 40 🌸 |
| Parisian Café | 40 🌸 |
| Tropical Lagoon | 40 🌸 |
| Midnight Enchanted Forest | 45 🌸 |
| Crystal Library | 50 🌸 |
| Cherry Blossom Garden | 45 🌸 |

**Room Decorations** (the student's personal study room, visible on profile):
The profile includes a "Study Den" — a 3D illustrated room that the student decorates. Items placed in the room are visible.
| Item | Petals |
|---|---|
| Wisteria Vine Wall | 25 🌸 |
| Enchanted Bookshelf | 30 🌸 |
| Bloom Desk Set | 20 🌸 |
| Crystal Ball Lamp | 35 🌸 |
| Parisian Window View | 50 🌸 |
| Tropical Plant Corner | 25 🌸 |
| Gothic Mirror | 40 🌸 |
| Companion Plush Display Stand | 30 🌸 |
| Galaxy Sky Ceiling | 60 🌸 |
| Soft Fairy Lights (strings) | 20 🌸 |

**Story Cosmetics** (change visual elements of the world map):
| Item | Petals |
|---|---|
| Rose Portal (replaces default portal animation) | 70 🌸 |
| Golden Path (world map path glows gold) | 70 🌸 |
| Midnight Map Skin | 80 🌸 |
| Tropical Map Skin | 75 🌸 |
| Fairy Light Map Overlay | 60 🌸 |

**Sticker Packs** (decorative stickers for the student's profile/journal):
| Item | Petals |
|---|---|
| Coquette Sticker Pack (bows, lace, pearls) | 25 🌸 |
| Botanical Sticker Pack (flowers, leaves, herbs) | 25 🌸 |
| Dark Fairy Tale Sticker Pack | 30 🌸 |
| Parisian Sticker Pack | 25 🌸 |
| Tropical Sticker Pack | 25 🌸 |
| Academic Sticker Pack (stars, pencils, formulas) | 25 🌸 |

**Companion Outfits** (alternate outfit for a specific companion — changes their visual in all scenes):
Price: 60 🌸 each. Each companion has 2 alternate outfits available.

---

## 19. CELEBRATION & REWARD DESIGN

All celebrations are AUDIO + VISUAL events. They are theatrical, warm, and rewarding.

### Tier 1: Correct Answer (Per Question)
- Duration: 1.5 seconds
- Visuals: Corresponding flower blooms in bouquet. A brief golden particle burst at the flower. Screen border flashes soft green.
- Audio: A gentle chime chord (major key, warm tone)
- Companion: Plays Encourage animation

### Tier 2: Retake Triggered
- Duration: 2 seconds
- Visuals: Unblossomed flowers gently fold back to buds. A soft purple shimmer (not harsh red).
- Text: Encouraging NPC dialogue line
- Audio: A single low soft tone (not a failure sound — neutral, reflective)
- Companion: Brief soft expression (wide eyes, slight head tilt)

### Tier 3: Tier Clearance (Bronze / Silver Cleared → Next Tier)
- Duration: 3 seconds
- Visuals: All 6 flowers bloom simultaneously in slow-motion burst. Golden light radiates outward from bouquet. Brief confetti of flower petals rains across screen. Tier badge appears (bronze/silver medal glows).
- Audio: A rising triumphant arpeggio
- Companion: Plays Celebrate animation
- Text overlay: "Bronze Cleared! ✨ Silver Awaits…"

### Tier 4: Full Sub-Topic Gold Clearance (Gold Cleared)
- Duration: 5–6 seconds
- Visuals: Gold flowers bloom + gold shimmer + full-screen particle burst of petals and stars. The sub-topic card on the world map animates (expands, glows, the story location shows colour restoration). Stars earn animation (1, 2, or 3 stars fill).
- Story beat: 2-line NPC reaction ("The Scholar has restored the Bound Chambers! The library lives again…")
- XP shower: XP number flies up to the XP bar
- Petal shower: Petal icons animate from the screen centre to the Petal counter
- Audio: Full celebratory fanfare (orchestral, 4–6 seconds)
- Companion: Extended celebrate animation

### Tier 5: Boss Battle Victory
- Duration: 10–15 seconds (cutscene included)
- Visuals: Full closing Boss Battle cutscene (animated cinematic — villain retreats, region heals, warm light floods). Then: XP shower, Petal shower, companion reveal (if Boss-Exclusive companion unlocked), badge reveal.
- Audio: Dramatic orchestral climax → transition to warm major-key resolution
- Screen: A "Victory" title card with the student's name and region name ("[Name] — Conqueror of the Library of Numerals")

### Tier 6: Topic Graduation (After Boss Battle)
- A dedicated full-screen GRADUATION MOMENT screen:
  - Illustrated backdrop: the fully restored region (vibrant, warm, glowing)
  - The student's active companion at the centre doing celebrate animation
  - Animated banner: "Arithmia's Library of Numerals — RESTORED" (or relevant region)
  - All sub-topic stars displayed in a grid
  - Total XP and Petals earned in this region displayed
  - A brief story epilogue: what the region looks like now, how the NPCs feel
  - "Continue your journey" button → world map shows next region unlocking

### Tier 7: Daily Streak Milestone (7, 14, 30 days)
- A brief full-screen streak celebration
- Animated flame grows larger and sparkles
- Petal/XP reward shown
- Day 7: French phrase reveals for the first time (see Section 21)
- Push notification fires simultaneously

### Tier 8: Badge Earned
- Whenever a badge is earned, a gold-bordered badge card slides up from the bottom of the screen (regardless of what else is happening — appears on top of the current screen)
- Badge icon glows and spins
- Audio: A distinctive badge-unlock chime (different tone from question correct)
- Tap to dismiss; badge is added to profile

### Personal Best System
The platform tracks and displays:
- Highest single-session XP earned
- Fastest Boss Battle completion (by number of questions correct in first attempt)
- Longest streak ever
- Most stars earned in a day
- Best topic accuracy percentage

Displayed on the profile screen with trophy icons. A "New Personal Best!" banner appears briefly when a record is broken.

---

## 20. PROFILE & PERSONALISATION

### Profile Screen Contents
1. **Profile Photo:** Student's uploaded photo (circular, with chosen profile frame). Tap to change photo or frame.
2. **Display Name:** Student's chosen name (set at onboarding, editable in settings)
3. **Scholar Level Badge:** Current Scholar Level (1–∞) with XP progress bar beneath
4. **Active Companion:** Large display of active companion in idle animation. Tap to go to companion collection.
5. **Streak:** Current streak count with flame icon
6. **Stats Panel:** Total XP, total Petals earned, total Petals spent, total stars, subjects active
7. **Badges Gallery:** Grid of all earned badges (locked badges shown as silhouettes)
8. **Study Den:** Scrollable illustrated 3D room showing all placed decorations
9. **French Corner:** Collection of unlocked French phrase cards (see Section 21)
10. **Sticker Journal:** A virtual journal page the student can decorate with their unlocked stickers. No academic function — pure personalisation.

### Onboarding Flow (First Launch)
1. Splash → Sign Up screen
2. Enter name + email + password
3. Upload profile photo (can skip, set default avatar)
4. Choose active subject world: Maths / Science / Both
5. Enter parent email (optional — skip available)
6. Choose companion: 3 Common companions are offered as starting companion (Blanche, Pip, or Sage). Student picks one. It is gifted for free.
7. Brief tutorial: "Your journey begins" — 4 onboarding screens showing how flowers, XP, and levels work (illustrated, non-interactive)
8. Enter world: The first story scene of the chosen world begins

### Customisation Options Summary
- Profile photo: uploadable from device
- Display name: editable
- Profile frame: purchased from shop
- Profile background: purchased from shop
- Active companion: chosen from owned collection
- Study Den decorations: purchased from shop, placed by drag-and-drop
- Sticker Journal: stickers applied from owned packs
- World map skin: purchased from shop
- Portal animation: purchased from shop
- Subject selection: can have both worlds active, switching between them from home screen

---

## 21. FRENCH PHRASE SYSTEM

### Purpose
As the student progresses, they unlock French motivational phrases — a nod to their French GCSE. These are beautiful, general motivational or reflective quotes in French, with English translations. They are delivered by **Cosette** (the Parisian poodle companion character), who can appear as a brief guest in notification screens even if she is not the student's active companion.

### Delivery Points (All of the Following)
1. **Push Notification:** When a milestone triggers a French phrase, a push notification arrives with the French text and English translation.
2. **In-App Pop-Up:** After the milestone celebration, a dedicated pop-up card slides up: Cosette illustration + quote card (French in Cormorant Garamond italic, English below in DM Sans).
3. **Collectible Quote Card:** Added automatically to the French Corner section of the profile.
4. **French Corner Tab (Shop):** A collection view of all earned phrase cards. Shows 30 total cards — unlocked ones are visible, locked ones show as decorative silhouettes.

### Unlock Triggers (30 Phrases Total)
| Trigger | Phrase Type |
|---|---|
| First ever Gold clearance | Encouragement |
| Day 7 streak | Perseverance |
| Day 14 streak | Growth |
| Day 30 streak | Dedication |
| First Boss Battle win | Triumph |
| Clear all Number sub-topics | Academic |
| Clear all Algebra sub-topics | Academic |
| Clear all Biology sector | Academic |
| Clear all Chemistry sector | Academic |
| Clear all Physics sector | Academic |
| First Recall Mission | Memory |
| 10 Recall Missions complete | Memory |
| Own first companion | Joy |
| Own 5 companions | Collection |
| First badge earned | Achievement |
| Earn Scholar Level 5 | Growth |
| Earn Scholar Level 10 | Dedication |
| 3-star first-attempt clearance (first time) | Excellence |
| Decorate study den (first item placed) | Creativity |
| + 11 more unlocked at major story milestones (each Boss Battle win, final boss win) | Story |

### Example Phrases (30 required, pre-generated)
Sample entries (these must be pre-generated in full before launch):
- "La connaissance, c'est le pouvoir." / *"Knowledge is power."*
- "Chaque jour est une nouvelle chance de s'améliorer." / *"Every day is a new chance to improve."*
- "La persévérance est la clé du succès." / *"Perseverance is the key to success."*
- "Tu es plus forte que tu ne le crois." / *"You are stronger than you believe."*
- "Petit à petit, l'oiseau fait son nid." / *"Little by little, the bird builds its nest."*
- "La beauté est dans l'effort." / *"Beauty is in the effort."*
- (24 more pre-generated for all triggers)

---

## 22. PARENT DASHBOARD

### Access Method
Accessed through the student's account. In the student's settings menu: "Parent View" → prompts for a 4-digit PIN (set by student at setup, or during parent email onboarding step). Parent cannot access from a separate account — they view through the student's device or via the weekly email report.

### Parent Dashboard Contents (All Read-Only)

**Overview Panel:**
- Current Scholar Level + XP
- Daily streak (current and longest ever)
- Total time spent (today / this week / all time)
- Subject(s) active
- Last active date

**Topic Progress Panel:**
- Full curriculum tree for each subject
- Each sub-topic shows: status (locked/learning/cleared), star rating, last cleared date, and recall mission status
- Visual indicator: % of curriculum covered

**Quiz Performance Panel:**
- Accuracy rate (% questions answered correctly, averaged across all attempts)
- Most recent quiz scores
- Topics with weakest accuracy (flagged for attention)
- Topics where recall missions showed decline

**Streak History:**
- Calendar-view heatmap of days active (like GitHub contribution graph)
- Streak milestones achieved

**Badge Panel:**
- All badges earned, with dates

**Weekly Report (Email):**
- Sent every Sunday at 8am if parent email is set
- Contains: week's XP earned, topics covered, quiz accuracy, time spent, current streak, encouraging summary sentence, one suggestion ("Maya could benefit from reviewing [weakest topic]")
- Plain-text email with a simple styled HTML header

---

## 23. PUSH NOTIFICATION SYSTEM

All push notifications delivered via Firebase Cloud Messaging (FCM) on mobile, browser push API on web.

### Notification Types & Triggers

| Notification | Trigger | Timing |
|---|---|---|
| Streak Reminder | Student hasn't logged in yet today | Student-configurable time (default 7pm) |
| Recall Mission Available | 7 days since a Gold clearance | Morning of day 7 |
| Badge Earned | Badge unlock condition met | Immediate |
| Streak Milestone | 7, 14, 30, 60, 90 day streaks | Immediate on day |
| French Phrase Unlock | Milestone achieved | Immediate |
| Boss Battle Unlocked | All sub-topics in a region cleared | Immediate |
| New Companion Available | Enough Petals to afford a new companion | Once per week check |
| Weekly Summary | Every Sunday | 10am |
| Parent Report Sent | Every Sunday | Simultaneous with summary |

### Notification Tone
Notifications are warm, encouraging, and story-flavoured. Three styles mix:
- **Warm & Encouraging:** "You did brilliantly today, Scholar. 6/6 — the library glows a little brighter. 🌸"
- **Funny & Cheeky:** "The Unraveller is getting nervous. You should probably log in and scare it a bit more 😈"
- **Serious & Focused:** "Don't break the chain. Day 14. You're building something powerful."

Push notifications never contain French phrases (those appear only in-app, after a full pop-up experience).

All notification copy must be pre-written (not dynamically generated at send time). Firestore stores an array of notification strings per type; one is randomly selected at send time.

---

## 24. CONTENT PRE-GENERATION PIPELINE

**Critical Rule:** ALL content must be generated and uploaded to Firestore BEFORE the platform launches. No AI API is called during a student's session. The app reads from a static database only.

### Pipeline Overview
A one-time Python script pipeline, run by the build team using the Claude Sonnet API, produces all content and writes it to Firestore.

### Content Items Required Per Sub-Topic

For each of the ~119 sub-topics across both subjects, the pipeline generates:

**A. Learn Level Content**
- `lesson_title`: Sub-topic name (plain text)
- `story_intro_scene`: Array of 4–6 dialogue objects `{character, line}` setting up the story context
- `slides`: Array of 8–12 slide objects, each containing: `{slide_number, illustration_description, narration_script, animation_description, katex_content (if applicable)}`
- `worked_example`: Array of 2 worked example objects, each containing: `{problem_statement, steps: [{step_number, action, explanation}]}`
- `formula_cards`: Array of relevant formula card objects `{formula_name, katex_string, plain_english_description}`
- `story_closing_scene`: Array of 2–4 dialogue objects (NPC reacts to Scholar learning)
- `animation_brief`: A plain-English description of the motion graphic concept animation required for the lesson designer

**B. Quiz Content (per tier: Bronze, Silver, Gold)**
For each of 3 tiers, generate:
- `questions`: Array of 6 question objects, each containing:
  - `question_type`: one of [multiple_choice, drag_drop, fill_blank, equation_builder, match_up, true_false, spot_mistake, written_input]
  - `question_template`: The question with `{VAR1}`, `{VAR2}` etc. as variable placeholders
  - `variable_sets`: Array of 3 distinct number sets `[{VAR1: x, VAR2: y}, ...]` for retake number variation
  - `correct_answer`: Answer for default variable set
  - `correct_answer_variants`: Answers for each variable set
  - `wrong_answer_explanation`: Brief text shown on incorrect answer
  - `hint`: One-line hint (reveal on demand)
  - `question_type_config`: Type-specific config (e.g. for multiple_choice: `options: [A, B, C, D]`; for drag_drop: `tiles`, `drop_zones`; etc.)

**C. Recall Mission Content (per sub-topic)**
- `story_wrapper_scene`: 2–3 dialogue lines (shadow returning narrative)
- `recall_questions`: 6 questions at Silver difficulty, different question templates from the Silver quiz

**D. Boss Battle Content (per topic/region)**
- `boss_battle_story_intro`: Full intro cutscene dialogue (8–12 lines)
- `boss_questions`: 12 questions drawn proportionally from across all sub-topics in the region (4 Bronze, 4 Silver, 4 Gold difficulty — generated with full victory/partial/setback dialogue outcomes)
- `victory_cutscene`: 6–8 dialogue lines
- `partial_victory_cutscene`: 4–6 dialogue lines
- `setback_cutscene`: 4–6 dialogue lines

**E. Story World Content (one-time, not per sub-topic)**
- All NPCs' character bios and dialogue style guides
- All world/region lore descriptions
- All region introductory cutscenes (student first enters a region)
- Arithmia finale multi-stage boss content
- Elementis Isles finale multi-stage boss content

### Pipeline Script Specification

The Python script must:
1. Read a master curriculum JSON file (listing all sub-topics with their region, subject, order, difficulty specs)
2. For each sub-topic, call the Claude Sonnet API with a detailed prompt specifying: sub-topic name, subject, story region, NPC guide character, tier difficulty level, question type requirements, and format schema
3. Parse the returned JSON strictly (retry up to 3 times on malformed response)
4. Validate all KaTeX strings before storing
5. Write each generated content block to Firestore under the correct document path
6. Log all successful writes and all failures to a local log file
7. Support incremental runs (check Firestore for existing content, skip already-generated items)

Prompt template for question generation must instruct Claude to:
- Return ONLY valid JSON, no preamble or markdown fencing
- Follow AQA/Edexcel mark scheme style for the given sub-topic
- For Bronze: single-step, direct application
- For Silver: standard exam-style, two/three steps
- For Gold: multi-step, challenging, may include unfamiliar contexts
- Ensure variable sets produce meaningfully different (not trivially re-scaled) questions
- Include real-world context where subject allows

**Total estimated content items:** ~119 sub-topics × (12 slides + 2 worked examples + 18 quiz questions × 3 tiers × 3 variable sets + 6 recall questions + formula cards + story scenes) = tens of thousands of structured content objects. All pre-generated, stored, retrieved instantly from Firestore.

### ElevenLabs Narration Pipeline
For each slide's `narration_script` field:
- Pass text to ElevenLabs TTS API (free tier) in a calm, warm female voice
- Save output MP3 to Firebase Storage under `/audio/[subject]/[subtopic]/slide_[n].mp3`
- Store Storage URL reference in the slide's Firestore document

---

## 25. FIREBASE FIRESTORE DATA MODELS

All collections are at the root level of Firestore.

### Collection: `users`
Document ID: Firebase Auth UID
```
{
  uid: string,
  email: string,
  displayName: string,
  profilePhotoUrl: string | null,
  createdAt: timestamp,
  lastActiveAt: timestamp,
  streakCount: number,
  streakLastDate: string (YYYY-MM-DD),
  longestStreak: number,
  totalXP: number,
  scholarLevel: number,
  totalPetals: number,         // cumulative earned
  spendablePetals: number,     // current balance
  activeCompanionId: string,
  activeSubjects: string[],    // ["maths", "science"] or ["maths"] or ["science"]
  parentEmail: string | null,
  parentPin: string,           // hashed 4-digit PIN
  notificationTime: string,    // "19:00" format
  studyDenItems: string[],     // array of owned+placed item IDs
  profileFrameId: string | null,
  profileBackgroundId: string | null,
  mapSkinId: string | null,
  personalBests: {
    highestSessionXP: number,
    longestStreak: number,
    mostStarsInDay: number,
    bestBossAccuracy: number
  }
}
```

### Collection: `progress` (sub-collection under each user document: `users/{uid}/progress`)
Document ID: `{subject}_{regionId}_{subtopicId}` (e.g. "maths_number_surds")
```
{
  subtopicId: string,
  subject: string,
  regionId: string,
  learnLevelStatus: "locked" | "unlocked" | "complete",
  learnLevelCompletedAt: timestamp | null,
  bronzeStatus: "locked" | "in_progress" | "cleared",
  bronzeStars: 0 | 1 | 2 | 3,
  bronzeAttempts: number,
  bronzeClearedAt: timestamp | null,
  silverStatus: "locked" | "in_progress" | "cleared",
  silverStars: 0 | 1 | 2 | 3,
  silverAttempts: number,
  silverClearedAt: timestamp | null,
  goldStatus: "locked" | "in_progress" | "cleared",
  goldStars: 0 | 1 | 2 | 3,
  goldAttempts: number,
  goldClearedAt: timestamp | null,
  recallMissions: [
    {
      scheduledDate: string,
      completedDate: string | null,
      score: number | null,   // 0–6
      status: "scheduled" | "complete" | "missed"
    }
  ],
  lastQuizVariantIndex: number  // tracks which variable set was last used
}
```

### Collection: `inventory` (sub-collection: `users/{uid}/inventory`)
Document ID: `{itemId}`
```
{
  itemId: string,
  type: "companion" | "frame" | "background" | "room_decoration" | "story_cosmetic" | "sticker_pack" | "companion_outfit",
  acquiredAt: timestamp,
  acquiredBy: "purchase" | "boss_exclusive" | "onboarding_gift",
  equippedSlot: string | null   // e.g. "active_companion", "profile_frame", etc.
}
```

### Collection: `badges` (sub-collection: `users/{uid}/badges`)
Document ID: `{badgeId}`
```
{
  badgeId: string,
  earnedAt: timestamp
}
```

### Collection: `french_phrases` (sub-collection: `users/{uid}/french_phrases`)
Document ID: `{phraseId}`
```
{
  phraseId: string,
  french: string,
  english: string,
  unlockedAt: timestamp,
  unlockReason: string
}
```

### Collection: `curriculum` (root-level, static — pre-populated by pipeline)
Document ID: `{subject}` (e.g. "maths", "science")
```
{
  subject: string,
  regions: [
    {
      regionId: string,
      regionName: string,
      storyName: string,
      order: number,
      subtopics: [
        {
          subtopicId: string,
          subtopicName: string,
          storyLocation: string,
          order: number,
          hasBossBattle: boolean
        }
      ]
    }
  ]
}
```

### Collection: `content` (root-level, static — pre-populated by pipeline)
Document ID: `{subject}_{subtopicId}` (e.g. "maths_surds")
```
{
  subtopicId: string,
  subject: string,
  learnLevel: {
    storyIntroScene: [{character, line}],
    slides: [{slideNumber, illustrationDescription, narrationScript, narrationAudioUrl, animationDescription, katexContent}],
    workedExamples: [{problemStatement, steps: [{stepNumber, action, explanation, katexContent}]}],
    formulaCards: [{formulaName, katexString, plainEnglish}],
    storyClosingScene: [{character, line}]
  },
  quizLevels: {
    bronze: {
      storyContext: string,
      questions: [{questionType, questionTemplate, variableSets, correctAnswerVariants, wrongAnswerExplanation, hint, typeConfig}]
    },
    silver: { ... same structure ... },
    gold: { ... same structure ... }
  },
  recallMission: {
    storyWrapper: [{character, line}],
    questions: [{...same question structure...}]
  }
}
```

### Collection: `boss_battles` (root-level, static)
Document ID: `{subject}_{regionId}` (e.g. "maths_number")
```
{
  regionId: string,
  bossName: string,
  introScene: [{character, line}],
  questions: [{questionType, subtopicId, difficulty, questionTemplate, variableSets, correctAnswerVariants, wrongAnswerExplanation, typeConfig}],
  victoryCutscene: [{character, line}],
  partialVictoryCutscene: [{character, line}],
  setbackCutscene: [{character, line}],
  exclusiveCompanionId: string
}
```

### Collection: `companions` (root-level, static)
Document ID: `{companionId}`
```
{
  companionId: string,
  name: string,
  type: string,
  rarity: "common" | "uncommon" | "rare" | "boss_exclusive",
  price: number | null,   // null if boss_exclusive
  unlockSource: "shop" | "boss_battle" | "onboarding",
  bossBattleId: string | null,
  modelUrl: string,         // Firebase Storage URL for GLB file
  thumbnailUrl: string,
  personality: string,
  description: string
}
```

### Collection: `shop_items` (root-level, static)
Document ID: `{itemId}`
```
{
  itemId: string,
  name: string,
  type: "companion" | "frame" | "background" | "room_decoration" | "story_cosmetic" | "sticker_pack" | "companion_outfit",
  price: number,
  previewUrl: string,
  description: string,
  companionId: string | null   // if type is companion or companion_outfit
}
```

### Collection: `badges_master` (root-level, static)
Document ID: `{badgeId}`
```
{
  badgeId: string,
  name: string,
  description: string,
  iconUrl: string,
  unlockConditionType: string,
  unlockConditionValue: number | string | null
}
```

### Collection: `french_phrases_master` (root-level, static)
Document ID: `{phraseId}`
```
{
  phraseId: string,
  french: string,
  english: string,
  unlockTrigger: string,
  unlockConditionValue: string | null
}
```

---

## 26. ASSET SPECIFICATIONS

### 3D Companion Models
- Format: GLTF 2.0 / GLB (single binary file per companion)
- Poly count: ≤15,000 triangles per model (optimised for web)
- Textures: 512×512 PNG atlases, PBR materials (baseColor, roughness, metallic maps)
- Animations embedded in GLB as AnimationClips: idle (looping), encourage (1s), celebrate (2s)
- Rigging: Simple humanoid/creature rig with 15–30 bones maximum
- Tool: Created in Blender (free), exported with `gltf-transform` for optimisation

### Environmental Backgrounds
- Format: Layered PNG for parallax (3–5 layers per scene: far background, mid, foreground, character layer, overlay)
- Resolution: 2560×1440 (4K backgrounds recommended; displayed at device resolution)
- Style: 2D hand-illustrated (digital painting), matches aesthetic reference in Section 7
- One full illustration set per story location (sub-topic = one story location = one background set)
- Corruption variant: A greyscale/shadow-overlay version of each background for horror phase display

### Lottie Animation Files
- Format: JSON (Lottie format), exported from Adobe After Effects or created on LottieFiles
- One Lottie per concept animation (e.g. "forces_resultant_animation.json")
- Max file size: 200KB per Lottie
- Dimensions: 1:1 or 16:9 aspect ratio
- Colours: Must use the FLEURIR palette CSS variables so themes can be applied

### Audio Files
- Narration: MP3, 44.1kHz, 128kbps, generated by ElevenLabs
- Music: MP3, OGG fallback, looping background tracks per region (5 tracks: standard, suspense, boss battle, celebration, horror)
- Sound effects: MP3 + OGG, <100KB each. Required effects: flower bloom, XP earn, Petal earn, level clear, boss win, wrong answer, badge reveal, shop purchase, companion reveal, French phrase unlock, notification chime, streak milestone
- All audio pre-cached on first load (included in offline bundle)

### Icons & UI Assets
- Format: SVG (scalable, theme-aware via CSS currentColor)
- All icons: flower, petal, flame, star, lock, unlock, hint, formula, companion, XP, badge, French flag, bookmark
- Exported at 24×24 and 48×48 viewBox

### Profile Photo Handling
- Upload: Compressed client-side to max 500×500 JPEG before upload to Firebase Storage
- Storage path: `/profile_photos/{uid}.jpg`
- Displayed in circular crop with chosen profile frame overlay

---

## 27. AUDIO DESIGN

### Music Tracks (Pre-composed, per region — 13 tracks minimum)

| Track Type | Regions Needed |
|---|---|
| Arithmia Standard | Warm, enchanted, slightly mysterious. Harp + light strings + soft bells |
| Arithmia Suspense | Same motif but minor key, sparse, building tension |
| Arithmia Boss | Full orchestral, dramatic, time pressure feel |
| Elementis Biology Standard | Tropical, warm, bioluminescent vibes. Ukulele + soft synth + nature sounds |
| Elementis Chemistry Standard | Alchemical, bubbling energy. Brass + electronic alchemy sounds |
| Elementis Physics Standard | Celestial, airy, electric. Synth pads + orchestral strings |
| Elementis Suspense (shared) | Dark ambient, building, ominous |
| Boss Battle (shared) | Epic, high-stakes orchestral |
| Celebration Fanfare (short) | 4-second triumphant burst |
| Celebration Fanfare (long) | 10-second full orchestral celebration for Boss Battle wins |
| Menu / Profile Theme | Soft coquette ambience. Piano + bloom |
| Horror Sting | 3-second jump-scare audio cue for horror story moments |
| Recall Mission Theme | Slightly urgent version of region's standard theme |

All music sourced from free-licence stock libraries (e.g. Pixabay Music, Free Music Archive) with creative commons licences, or AI-generated using tools like Suno or Udio with appropriate licencing confirmation.

---

## 28. LAUNCH SEQUENCE: MVP → FULL BUILD

### MVP (Minimum Viable Product — Launch Ready)
The MVP delivers the full experience for ONE region in each subject, proving the full loop works end-to-end:
- **Maths MVP region:** The Library of Numerals (Number — 7 sub-topics + Boss Battle)
- **Science MVP region:** Isle of Origins + Body Kingdom (Cell Biology + Organisation — 9 sub-topics + 2 Boss Battles)
- Complete learning flow: Learn + Bronze + Silver + Gold + Boss Battle
- Basic profile (photo upload, name, active companion)
- 5 Common companions purchasable in shop
- Streak system functional
- 5 French phrases unlockable
- Parent dashboard (basic: progress + time)
- Web app only (Vercel deployed)
- Offline: Web service worker caching

### Phase 2 — Full Maths World
- All 6 Maths regions content generated and uploaded
- All Maths companions (Boss-exclusives) unlocked
- Full Arithmia finale boss battle
- All Maths badges
- Full Maths parent dashboard data

### Phase 3 — Full Science World
- All 3 Science islands content generated and uploaded
- All Science companions
- Full Elementis finale boss battle
- All Science badges

### Phase 4 — Mobile Apps
- iOS app submitted to App Store via Expo / TestFlight first
- Android app submitted to Google Play
- Push notifications fully operational on mobile
- All offline bundles functional on mobile

### Phase 5 — Full Gamification & Shop
- All 25 companions added to shop
- All room decorations, frames, backgrounds, cosmetics live
- Study Den decoration system
- Sticker journal
- Full 30 French phrases
- Full badge set
- Personal bests tracking

### Phase 6 — Polish & Recall
- Spaced repetition system fully active
- All Recall Missions live
- Full horror scaling (Phase 3 and 4 story content)
- Advanced parent weekly email reports
- Personal best system

---

## APPENDIX A — SUMMARY OF TOTAL CONTENT REQUIREMENTS

| Content Type | Quantity |
|---|---|
| Sub-topics total (both subjects) | 119 |
| Learn Levels | 119 |
| Quiz tiers (Bronze + Silver + Gold) | 357 |
| Questions total (6 per tier × 3 variants each) | 357 × 6 × 3 = 6,426 question-variant objects |
| Recall Mission question sets | 119 × 6 = 714 |
| Boss Battle question sets | 26 boss battles × 12 questions = 312 |
| Story scenes (intro + closing per sub-topic) | 119 × 2 = 238 |
| Boss Battle cutscenes | 26 × 3 outcomes = 78 |
| Lesson slides | ~119 × 10 avg = ~1,190 slides |
| Worked examples | ~119 × 2 = ~238 |
| Narration audio files | ~1,190 (one per slide) |
| Lottie concept animations | ~119 (one per sub-topic) |
| Companion 3D GLB models | 25 |
| Background illustration sets | ~119 + region entrance + boss scenes ≈ 150 |
| French phrases | 30 |
| Badges | 20 |
| Music tracks | 13 |
| Sound effects | 15 |
| Shop items | ~60 |

---

## APPENDIX B — CONTENT QUALITY CONSTRAINTS

All AI-generated content must pass these rules before being committed to Firestore:

1. **Curriculum Accuracy:** Every question and explanation must align precisely with the Edexcel Maths Higher specification or AQA Combined Science Trilogy Higher specification. No content from Foundation tier only.
2. **KaTeX Validity:** Every KaTeX string must render without error. All expressions validated before storage.
3. **Question Uniqueness:** No two questions within the same quiz tier may test the same sub-skill in the same way.
4. **Variable Set Validity:** All three variable sets for each question template must produce mathematically valid and meaningfully different questions.
5. **Mark Scheme Accuracy:** All correct answers and worked example solutions must be verifiable against AQA/Edexcel published mark schemes or specification.
6. **Age-Appropriateness:** All story content appropriate for age 14–16. Horror elements atmospheric, not violent or graphic.
7. **Girl-Friendly Tone:** Story dialogue never condescending, never gender-normative in a limiting way. Female characters shown as capable, brave, and multidimensional.
8. **Hint Quality:** Hints give directional guidance ("Think about which formula uses these two values...") without revealing the answer.
9. **Wrong Answer Explanation Quality:** Explanations address the most common misconception for that question type, not just state the correct answer.

---

*End of FLEURIR Master Product Blueprint v1.0*
*Total Sub-Topics Specified: 119 | Total Story Locations: 150+ | Total Levels: 476+ | Platform: Web + iOS + Android | Hosting: 100% Free Infrastructure*
