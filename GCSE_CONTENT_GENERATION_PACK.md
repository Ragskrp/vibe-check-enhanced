# VIBEMENOW GCSE — Content Generation Pack v1.0

## Target: 30 topics × 8 subjects = 240 modules (currently ~150, many thin)

---

## 1. MASTER JSON SCHEMA (use for every subject)

```json
{
  "subject": "maths",
  "subjectMeta": {
    "examBoards": ["AQA", "Edexcel"],
    "tiers": ["foundation", "higher"],
    "totalTopics": 30
  },
  "topics": [
    {
      "slug": "quadratic-equations",
      "title": "Quadratic Equations",
      "emoji": "📐",
      "color": "#00e5a0",
      "category": "Algebra",
      "description": "Solve quadratics by factorising, completing the square, and formula.",
      "examWeight": 8,
      "difficulty": "high",
      "estimatedMinutes": 15,
      "prerequisites": ["expanding-simplifying", "factorising"],
      "questionTypes": ["mcq", "numeric", "cloze", "ordering"],
      "lessons": {
        "foundation": [
          {"title": "What is a Quadratic?", "content": "...", "formula": "ax²+bx+c=0", "example": "x²+5x+6=0", "tip": "..."}
        ],
        "higher": [
          {"title": "Quadratic Formula", "content": "...", "formula": "x = [-b ± √(b²-4ac)]/2a", "example": "2x²-4x-6=0", "tip": "..."}
        ]
      },
      "hacks": [
        {"title": "Discriminant Check", "content": "b²-4ac tells you root count: >0 two real, =0 one real, <0 none."}
      ],
      "advanced": [
        {"title": "Hidden Quadratics", "content": "Substitute u = x² to solve x⁴-5x²+4=0"}
      ],
      "generateQuestion": "FUNCTION_TEMPLATE_BELOW"
    }
  ]
}
```

---

## 2. PER-SUBJECT PROMPT TEMPLATES

### MATHS (30 topics — extend from 42 → 30 core + 12 stretch)

**Prompt:**
> Generate 30 GCSE Maths topics mapped to AQA/Edexcel. Categories: Number (6), Algebra (8), Geometry (8), Statistics (5), Ratio/Proportion (3). Each topic needs: slug, title, emoji, color, category, description, examWeight (1-10), difficulty (low/med/high), estimatedMinutes, prerequisites[], questionTypes[], lessons (foundation/higher arrays with title/content/formula/example/tip), hacks[], advanced[], and a generateQuestion function template. Follow the exact JSON schema above. Output ONLY valid JSON.

**Current gaps to fill:** Surds, Iteration, Algebraic Fractions, Functions, Vectors, Circle Theorems, Histograms, Capture-Recapture

---

### SCIENCE (30 topics — Biology 10, Chemistry 10, Physics 10)

**Prompt:**
> Generate 30 GCSE Science topics (AQA Trilogy + Triple). 10 Biology, 10 Chemistry, 10 Physics. Categories: "Biology", "Chemistry", "Physics". Each topic: slug, title, emoji, color (Bio:#00ff94, Chem:#ff6b35, Phys:#00d4ff), category, description, examWeight, difficulty, estimatedMinutes, prerequisites[], questionTypes: ["mcq", "cloze", "diagram-label", "ordering"], lessons (foundation/higher), hacks[], advanced[]. For diagram-label: include "diagramPrompt": "cell structure with labels nucleus, mitochondria, membrane". Output ONLY valid JSON.

**Current gaps:** Required practicals as interactive modules, equation sheets, graph skills

---

### COMPUTER SCIENCE (25 topics — OCR J277 aligned)

**Prompt:**
> Generate 25 GCSE CS topics for OCR J277. Categories: "Systems Architecture" (5), "Memory & Storage" (4), "Networks" (4), "Security" (3), "Systems Software" (2), "Algorithms" (4), "Programming" (3). questionTypes: ["mcq", "cloze", "code-completion", "ordering", "drag-drop"]. For code-completion: include "codeTemplate": "for i in range(10):\n  ___  # fill gap". For drag-drop: "dragItems": ["INPUT", "PROCESS", "OUTPUT"], "correctOrder": ["INPUT", "PROCESS", "OUTPUT"]. Output ONLY valid JSON.

---

### HISTORY (25 topics — Edexcel/AQA)

**Prompt:**
> Generate 25 GCSE History topics for Edexcel/AQA. Categories: "Medicine Through Time" (6), "Weimar & Nazi Germany" (6), "Early Elizabethan England" (5), "Cold War" (6), "Historical Skills" (2). questionTypes: ["mcq", "cloze", "ordering", "classification"]. For classification: "categories": ["Cause", "Event", "Consequence"], "items": ["Treaty of Versailles", "Hyperinflation", "Hitler becomes Chancellor"]. For ordering: chronological event sequencing. lessons: foundation=narrative recall, higher=source analysis/explanation. Output ONLY valid JSON.

---

### GEOGRAPHY (25 topics — AQA)

**Prompt:**
> Generate 25 GCSE Geography topics for AQA. Categories: "Physical Landscapes" (6), "Living World" (5), "Natural Hazards" (5), "Urban Issues" (5), "Economic World" (4). questionTypes: ["mcq", "cloze", "diagram-label", "classification", "map-skills"]. For map-skills: "mapPrompt": "OS map extract grid ref 456123", "question": "What is the 6-fig grid ref of the church?". lessons: foundation=case study facts, higher=evaluate/assess. Include 3-4 major case studies per physical/human topic. Output ONLY valid JSON.

---

### BUSINESS (20 topics — AQA)

**Prompt:**
> Generate 20 GCSE Business topics for AQA. Categories: "Business in Real World" (5), "Influences on Business" (4), "Business Operations" (4), "Human Resources" (3), "Marketing" (4), "Finance" (4). questionTypes: ["mcq", "cloze", "numeric", "calculation", "classification"]. For calculation: "formula": "Profit = Revenue - Costs", "variables": {"Revenue": 50000, "Costs": 32000}. lessons: foundation=definitions, higher=analysis/evaluation with connectives (however, therefore, consequently). Output ONLY valid JSON.

---

### ENGLISH LANGUAGE (15 topics — AQA)

**Prompt:**
> Generate 15 GCSE English Language topics for AQA. Categories: "Reading - Fiction" (4), "Reading - Non-Fiction" (4), "Writing - Creative" (4), "Writing - Transactional" (3). questionTypes: ["mcq", "cloze", "classification", "highlight"]. For highlight: "textExcerpt": "The wind howled...", "instruction": "Highlight 3 language techniques". lessons: foundation=identify techniques, higher=analyse effect (PEEL paragraphs). Include model answers for writing tasks. Output ONLY valid JSON.

---

### ENGLISH LITERATURE (20 topics — AQA)

**Prompt:**
> Generate 20 GCSE English Literature topics for AQA. Categories: "Shakespeare" (5), "19th Century Novel" (5), "Modern Drama" (5), "Poetry Anthology" (5). Each text: 1 topic = 1 text (Macbeth, Jekyll & Hyde, An Inspector Calls, Power & Conflict poems). questionTypes: ["mcq", "cloze", "quote-completion", "classification", "essay-plan"]. For quote-completion: "partialQuote": "Is this a dagger which I see before me, ___?", "answer": "the handle toward my hand?". For essay-plan: "prompt": "How does Shakespeare present ambition in Macbeth?", "structure": ["Intro", "Point 1: Macbeth", "Point 2: Lady Macbeth", "Point 3: Consequences", "Conclusion"]. lessons: foundation=plot/character/quotes, higher=themes/context/analysis. Output ONLY valid JSON.

---

## 3. QUESTION BANK FORMAT (for `getBankQuestions`)

Each topic needs a companion `questions.json`:

```json
{
  "topicSlug": "quadratic-equations",
  "subjectId": "maths",
  "questions": [
    {
      "id": "qe_001",
      "q": "Solve x² - 5x + 6 = 0",
      "a": "x = 2 or x = 3",
      "o": ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"],
      "e": "Factorise: (x-2)(x-3)=0 → x=2 or x=3",
      "hint": "Find two numbers that multiply to 6 and add to -5",
      "type": "mcq",
      "tier": "both"
    },
    {
      "id": "qe_002",
      "q": "The solutions to x² + 4x - 12 = 0 are ___ and ___",
      "a": "2, -6",
      "type": "cloze",
      "tier": "higher"
    },
    {
      "id": "qe_003",
      "q": "Order the steps to solve 2x² - 8x + 6 = 0 by completing the square",
      "type": "ordering",
      "items": ["Divide by 2", "Complete the square: (x-2)² - 1 = 0", "Solve: x-2 = ±1", "x = 3 or x = 1"],
      "correctOrder": [0, 1, 2, 3],
      "tier": "higher"
    }
  ]
}
```

**Question types per subject:**

| Subject | Types |
|---------|-------|
| Maths | mcq, numeric, fraction, cloze, ordering, graph-sketch |
| Science | mcq, cloze, diagram-label, ordering, classification |
| CS | mcq, cloze, code-completion, ordering, drag-drop |
| History | mcq, cloze, ordering, classification, source-match |
| Geography | mcq, cloze, diagram-label, classification, map-skills |
| Business | mcq, cloze, numeric, calculation, classification |
| English Lang | mcq, cloze, classification, highlight |
| English Lit | mcq, cloze, quote-completion, classification, essay-plan |

---

## 4. EXAMPLE OUTPUT — 1 TOPIC PER SUBJECT

### Maths: `quadratic-equations`

```json
{
  "slug": "quadratic-equations",
  "title": "Quadratic Equations",
  "emoji": "📐",
  "color": "#00e5a0",
  "category": "Algebra",
  "description": "Solve quadratics by factorising, completing the square, and quadratic formula.",
  "examWeight": 8,
  "difficulty": "high",
  "estimatedMinutes": 15,
  "prerequisites": ["expanding-simplifying", "factorising"],
  "questionTypes": ["mcq", "numeric", "cloze", "ordering"],
  "lessons": {
    "foundation": [
      {"title": "What is a Quadratic?", "content": "A quadratic equation has an x² term. Standard form: ax²+bx+c=0.", "formula": "ax²+bx+c=0", "example": "x²+5x+6=0", "tip": "a≠0, otherwise it's linear."},
      {"title": "Solving by Factorising", "content": "Find two numbers that multiply to c and add to b.", "formula": "(x+p)(x+q)=0 → x=-p or x=-q", "example": "x²+5x+6=(x+2)(x+3) → x=-2, -3", "tip": "Check by expanding back!"},
      {"title": "Difference of Two Squares", "content": "x² - a² = (x+a)(x-a).", "formula": "x²-a²=(x+a)(x-a)", "example": "x²-25=(x+5)(x-5)", "tip": "No middle term = DOTS."}
    ],
    "higher": [
      {"title": "Quadratic Formula", "content": "Works for ALL quadratics. Memorise it.", "formula": "x = [-b ± √(b²-4ac)] / 2a", "example": "2x²-4x-6=0 → a=2,b=-4,c=-6 → x=3 or x=-1", "tip": "Discriminant b²-4ac tells root type."},
      {"title": "Completing the Square", "content": "Rewrite as (x+p)²+q=0. Useful for vertex form.", "formula": "x²+bx+c = (x+b/2)² - (b/2)² + c", "example": "x²+6x+5 = (x+3)²-4", "tip": "Half the x-coefficient, square it."},
      {"title": "Hidden Quadratics", "content": "Substitute u = x² or u = expression.", "example": "x⁴-5x²+4=0 → u²-5u+4=0 → u=4,1 → x=±2,±1", "tip": "Spot the pattern: power 4 and power 2."}
    ]
  },
  "hacks": [
    {"title": "Discriminant Shortcut", "content": "b²-4ac > 0 → 2 real roots; =0 → 1 real root; <0 → no real roots. Saves time on 'show that' questions."},
    {"title": "Sum/Product of Roots", "content": "For ax²+bx+c=0: sum = -b/a, product = c/a. Use to check answers or form equations from roots."}
  ],
  "advanced": [
    {"title": "Quadratic Inequalities", "content": "Solve x²-5x+6>0: roots at 2,3. Parabola opens up → x<2 or x>3. Sketch the graph!"},
    {"title": "Modelling with Quadratics", "content": "Projectile motion: h = -5t²+20t+2. Max height at vertex t=-b/2a=2s. Hits ground when h=0."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### Science (Biology): `cell-structure`

```json
{
  "slug": "cell-structure",
  "title": "Cell Structure & Function",
  "emoji": "🔬",
  "color": "#00ff94",
  "category": "Biology",
  "description": "Identify organelles in animal/plant cells and explain their functions.",
  "examWeight": 7,
  "difficulty": "medium",
  "estimatedMinutes": 12,
  "prerequisites": [],
  "questionTypes": ["mcq", "cloze", "diagram-label", "classification"],
  "lessons": {
    "foundation": [
      {"title": "Animal vs Plant Cells", "content": "Both have nucleus, cytoplasm, cell membrane, mitochondria, ribosomes. Plants ADD: cell wall, chloroplasts, vacuole.", "diagramPrompt": "Animal and plant cell side by side with labels"},
      {"title": "Organelle Functions", "content": "Nucleus=DNA control centre. Mitochondria=respiration (energy). Ribosomes=protein synthesis. Chloroplasts=photosynthesis. Vacuole=storage/support."}
    ],
    "higher": [
      {"title": "Specialised Cells", "content": "Sperm=flagellum, many mitochondria. Root hair=large SA. Neuron=long axon. Palisade=packed chloroplasts.", "tip": "Link structure → function → adaptation."},
      {"title": "Microscopy Calculations", "content": "Real size = image size / magnification. Units: mm, µm, nm. 1mm=1000µm=1,000,000nm.", "formula": "Real = Image ÷ Mag", "example": "Image 50mm, Mag ×2000 → Real = 25µm"}
    ]
  },
  "hacks": [
    {"title": "Plant = 3 Extras", "content": "Remember: Cell Wall, Chloroplasts, Vacuole. 'Wall, Chloroplast, Vacuole' = WCV."}
  ],
  "advanced": [
    {"title": "Prokaryotes vs Eukaryotes", "content": "Bacteria: no nucleus, circular DNA, plasmids, 70S ribosomes. 10-100x smaller. No membrane-bound organelles."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### CS: `logic-gates`

```json
{
  "slug": "logic-gates",
  "title": "Logic Gates & Truth Tables",
  "emoji": "🔧",
  "color": "#ff2d78",
  "category": "Systems Architecture",
  "description": "Construct and interpret NOT, AND, OR, XOR gates and combinational circuits.",
  "examWeight": 6,
  "difficulty": "high",
  "estimatedMinutes": 15,
  "prerequisites": ["binary-hex"],
  "questionTypes": ["mcq", "cloze", "code-completion", "drag-drop", "ordering"],
  "lessons": {
    "foundation": [
      {"title": "Basic Gates", "content": "NOT: inverts. AND: both 1→1. OR: either 1→1. XOR: exactly one 1→1.", "diagramPrompt": "Standard gate symbols with truth tables"},
      {"title": "Truth Tables", "content": "List all input combinations. 2 inputs = 4 rows. 3 inputs = 8 rows."}
    ],
    "higher": [
      {"title": "Combining Gates", "content": "NAND = NOT(AND). NOR = NOT(OR). Any circuit can be built from NAND only.", "example": "A NAND B = NOT(A AND B)"},
      {"title": "Half/Full Adders", "content": "Half adder: SUM = A XOR B, CARRY = A AND B. Full adder adds carry-in."}
    ]
  },
  "hacks": [
    {"title": "XOR = 'One or Other Not Both'", "content": "Think: 'Exclusive OR'. Different inputs → 1. Same inputs → 0."}
  ],
  "advanced": [
    {"title": "Logic Simplification", "content": "Use Boolean algebra: A·(A+B)=A, A+A·B=A+B. De Morgan: NOT(A·B)=NOT A + NOT B."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### History: `weimar-recovery`

```json
{
  "slug": "weimar-recovery",
  "title": "Weimar Recovery 1924-1929",
  "emoji": "🇩🇪",
  "color": "#ff6b35",
  "category": "Weimar & Nazi Germany",
  "description": "Stresemann's policies: Dawes Plan, Young Plan, Locarno, League of Nations, cultural golden age.",
  "examWeight": 5,
  "difficulty": "medium",
  "estimatedMinutes": 12,
  "prerequisites": ["weimar-early-challenges"],
  "questionTypes": ["mcq", "cloze", "ordering", "classification"],
  "lessons": {
    "foundation": [
      {"title": "Stresemann's Solutions", "content": "1923 crisis → 1924 Dawes Plan (US loans, reduced reparations). 1929 Young Plan (further reduced). 1925 Locarno Treaties (borders guaranteed). 1926 League of Nations entry."},
      {"title": "Golden Age Culture", "content": "Weimar culture: Bauhaus architecture, expressionist art, cabaret, cinema (Metropolis). BUT: conservatives hated it."}
    ],
    "higher": [
      {"title": "Fragile Recovery", "content": "Dependent on US loans. 1929 Wall Street Crash → loans recalled → economy collapses. 'Dancing on a volcano'."},
      {"title": "Political Stability?", "content": "1928 election: SPD largest party. But coalition governments unstable. Hindenburg elected 1925 — right-wing president."}
    ]
  },
  "hacks": [
    {"title": "Dawes vs Young", "content": "Dawes 1924 = emergency fix, US loans. Young 1929 = final settlement, reduced total. Chronology matters!"}
  ],
  "advanced": [
    {"title": "Historical Interpretations", "content": "Traditional: 'Golden Years' real recovery. Revisionist: 'Illusion of stability' — structural flaws remained."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### Geography: `tectonic-hazards`

```json
{
  "slug": "tectonic-hazards",
  "title": "Tectonic Hazards: Earthquakes & Volcanoes",
  "emoji": "🌋",
  "color": "#ff6b35",
  "category": "Natural Hazards",
  "description": "Plate boundaries, hazard profiles, case studies (Haiti 2010, Japan 2011), management strategies.",
  "examWeight": 8,
  "difficulty": "high",
  "estimatedMinutes": 20,
  "prerequisites": ["plate-tectonics-theory"],
  "questionTypes": ["mcq", "cloze", "diagram-label", "classification", "map-skills"],
  "lessons": {
    "foundation": [
      {"title": "Plate Boundaries", "content": "Constructive (diverge), Destructive (converge), Conservative (slide past). Collision = mountains.", "diagramPrompt": "World map showing plate boundaries with arrows"},
      {"title": "Hazard Profiles", "content": "Earthquakes: magnitude (Richter), depth, epicentre. Volcanoes: VEI, lava type, pyroclastic flows."}
    ],
    "higher": [
      {"title": "Case Study: Haiti 2010 (LIC)", "content": "M7.0, shallow, 230k deaths. Poor building codes, no prep. Primary: collapse. Secondary: cholera, homelessness. Response: slow, aid bottlenecks."},
      {"title": "Case Study: Japan 2011 (HIC)", "content": "M9.0, tsunami. 18k deaths. Prep: drills, seawalls, early warning. Primary: tsunami. Secondary: Fukushima nuclear. Response: rapid, engineered."}
    ]
  },
  "hacks": [
    {"title": "LIC vs HIC = 4 Ps", "content": "Preparation, Prediction, Protection, Planning. HICs do all 4. LICs struggle with all."}
  ],
  "advanced": [
    {"title": "Park Model / Hazard Management Cycle", "content": "Pre-event → Event → Relief → Rehabilitation → Reconstruction → Prevention. Links to development gap."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### Business: `break-even`

```json
{
  "slug": "break-even",
  "title": "Break-Even Analysis",
  "emoji": "📊",
  "color": "#ffe600",
  "category": "Finance",
  "description": "Calculate break-even point, margin of safety, interpret break-even charts.",
  "examWeight": 5,
  "difficulty": "medium",
  "estimatedMinutes": 12,
  "prerequisites": ["costs-revenue-profit"],
  "questionTypes": ["mcq", "cloze", "numeric", "calculation", "graph-sketch"],
  "lessons": {
    "foundation": [
      {"title": "Break-Even Formula", "content": "BEP (units) = Fixed Costs ÷ (Selling Price - Variable Cost per unit). Contribution = Price - VC.", "formula": "BEP = FC / (SP - VC)", "example": "FC=£10,000, SP=£50, VC=£30 → Contribution=£20 → BEP=500 units"},
      {"title": "Margin of Safety", "content": "Actual output - Break-even output. Shows how much sales can fall before loss.", "formula": "MoS = Actual - BEP", "example": "Selling 800, BEP=500 → MoS=300 units"}
    ],
    "higher": [
      {"title": "Break-Even Charts", "content": "X-axis: output. Y-axis: £. TR line from origin. TC line starts at FC. Cross = BEP. Profit = gap above cross."},
      {"title": "Limitations", "content": "Assumes: constant prices, all output sold, linear costs. Real world: discounts, unsold stock, stepped fixed costs."}
    ]
  },
  "hacks": [
    {"title": "Contribution per Unit", "content": "Always calculate contribution first. It's the engine of profit."}
  ],
  "advanced": [
    {"title": "Multi-Product BEP", "content": "Weighted average contribution. Sales mix matters. If mix changes, BEP shifts."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### English Language: `language-analysis`

```json
{
  "slug": "language-analysis",
  "title": "Language Analysis (AO2)",
  "emoji": "📖",
  "color": "#b14aed",
  "category": "Reading - Fiction",
  "description": "Identify and analyse language techniques: metaphor, simile, personification, semantic fields, sentence forms.",
  "examWeight": 7,
  "difficulty": "medium",
  "estimatedMinutes": 15,
  "prerequisites": [],
  "questionTypes": ["mcq", "cloze", "classification", "highlight"],
  "lessons": {
    "foundation": [
      {"title": "Core Techniques", "content": "Metaphor (direct comparison), Simile (like/as), Personification (human traits), Alliteration (sound repeat), Onomatopoeia (sound words)."},
      {"title": "PEEL Paragraphs", "content": "Point → Evidence (quote) → Explain (effect) → Link (to question). One technique per paragraph."}
    ],
    "higher": [
      {"title": "Advanced: Semantic Fields", "content": "Cluster of words on same theme (e.g. 'battle, weapon, shield, warrior' = war field). Shows writer's intent."},
      {"title": "Sentence Forms", "content": "Short = tension/speed. Long/complex = detail/reflection. Fragments = shock. Lists = overwhelm. Anaphora = emphasis."}
    ]
  },
  "hacks": [
    {"title": 'Quote → Technique → Effect → "Why?"', "content": "Never just name the technique. 'The metaphor \"drowning in homework\" suggests overwhelming pressure, making the reader empathise.'"}
  ],
  "advanced": [
    {"title": "Structure + Language", "content": "AO2 = language AND structure. Zoom in (word) → zoom out (paragraph) → whole text shape."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

### English Literature: `macbeth-ambition`

```json
{
  "slug": "macbeth-ambition",
  "title": "Macbeth: Ambition & Power",
  "emoji": "👑",
  "color": "#b14aed",
  "category": "Shakespeare",
  "description": "How Shakespeare presents ambition through Macbeth, Lady Macbeth, and the witches. Key quotes, context, essay structure.",
  "examWeight": 10,
  "difficulty": "high",
  "estimatedMinutes": 20,
  "prerequisites": ["macbeth-plot"],
  "questionTypes": ["mcq", "cloze", "quote-completion", "classification", "essay-plan"],
  "lessons": {
    "foundation": [
      {"title": "Key Quotes - Macbeth", "content": "\"Vaulting ambition\" (1.7), \"Stars hide your fires\" (1.4), \"Tomorrow, tomorrow\" (5.5). Ambition = fatal flaw."},
      {"title": "Key Quotes - Lady Macbeth", "content": "\"Unsex me here\" (1.5), \"Screw your courage\" (1.7), \"Out, damned spot\" (5.1). Stronger initially, collapses."}
    ],
    "higher": [
      {"title": "Witches as Catalyst", "content": "\"Fair is foul\" (1.1). Equivocation: \"none of woman born\" (4.1). They tempt, don't force. Macbeth chooses."},
      {"title": "Context: Divine Right & Gunpowder Plot", "content": "James I obsessed with witchcraft (Daemonologie). Play warns against regicide. Banquo = Stuart ancestor (flattery)."}
    ]
  },
  "hacks": [
    {"title": "AO1+AO2+AO3 = 3 Layers", "content": "What happens (plot) → How written (language/structure) → Why context matters. Every paragraph needs all 3."}
  ],
  "advanced": [
    {"title": "Tragic Hero Arc", "content": "Hamartia (ambition) → Peripeteia (Duncan's murder) → Anagnorisis (Tomorrow speech) → Catharsis. Aristotle's structure."}
  ],
  "generateQuestion": "FUNCTION_TEMPLATE"
}
```

---

## 5. YOUR WORKFLOW

```
For EACH subject:
1. Copy the subject prompt → paste into Claude/ChatGPT/Gemini
2. Get JSON output → validate at jsonlint.com
3. Split into two files:
   - /app/gcse/[subject]/topicData.js  (merge with existing)
   - /app/gcse/data/banks/[subject].json  (question bank)
4. Test: npm run dev → /gcse/[subject]/[slug]
5. Commit & push
```

---

## 6. QUICK VALIDATION CHECKLIST (per topic)

- [ ] All 7 question types work in `TopicGame` (mcq, numeric, cloze, ordering, diagram-label, classification, code-completion)
- [ ] `prerequisites[]` slugs exist in same subject
- [ ] `examWeight` 1-10, sums to ~100 per subject
- [ ] `generateQuestion` returns object with `display`, `answer`, `type`, `hint`, `explanation`
- [ ] Foundation lessons ≤ 6, Higher ≤ 6
- [ ] Hacks ≤ 3, Advanced ≤ 2

---

## 7. START ORDER (highest impact first)

1. **Science** (48 topics → 30, biggest gap)
2. **History** (24 → 25, narrative-heavy)
3. **Geography** (20 → 25, case studies)
4. **English Literature** (15 → 20, quote-heavy)
5. **Business** (18 → 20, calc-heavy)
6. **English Language** (7 → 15, skill-based)
7. **CS** (22 → 25, code questions)
8. **Maths** (42 → trim to 30 core + keep 12 stretch)

---

## 8. FUNCTION TEMPLATE FOR generateQuestion

```javascript
generateQuestion: (tier) => {
  // tier = 'foundation' or 'higher'
  // Return question object with:
  // {
  //   display: "Question text with \\n for line breaks",
  //   answer: "correct answer (string or number)",
  //   answerType: "text" | "number" | "fraction" | "cloze",
  //   options: ["opt1", "opt2", "opt3", "opt4"], // for MCQ only
  //   hint: "Short hint",
  //   explanation: "Full explanation with working",
  //   placeholder: "e.g. 3 × 10^5", // optional for text input
  //   type: "mcq" | "numeric" | "cloze" | "ordering" | "diagram-label" | "classification" | "code-completion"
  // }
}
```

---

## 9. FILE PATHS FOR INTEGRATION

```
/app/gcse/
├── maths/
│   ├── topicData.js          ← merge topics here
│   └── topicData.js.backup
├── science/
│   ├── scienceData.js        ← merge topics here
│   └── scienceData.js.backup
├── computer-science/
│   ├── computerScienceData.js ← merge topics here
│   └── computerScienceData.js.backup
├── history/
│   ├── historyData.js        ← merge topics here
│   └── historyData.js.backup
├── geography/
│   ├── geographyData.js      ← merge topics here
│   └── geographyData.js.backup
├── business/
│   ├── businessData.js       ← merge topics here
│   └── businessData.js.backup
├── english-language/
│   ├── englishLanguageData.js ← merge topics here
│   └── englishLanguageData.js.backup
├── english-literature/
│   ├── englishLiteratureData.js ← merge topics here
│   └── englishLiteratureData.js.backup
└── data/
    └── banks/
        ├── maths.json
        ├── science.json
        ├── computer-science.json
        ├── history.json
        ├── geography.json
        ├── business.json
        ├── english-language.json
        └── english-literature.json
```

---

## 10. GEMINI PROMPT WRAPPER

When pasting into Gemini, use this wrapper:

```
You are an expert GCSE curriculum designer. Generate content following the EXACT JSON schema provided. 

SUBJECT: [SUBJECT NAME]
PROMPT: [COPY THE SUBJECT PROMPT FROM SECTION 2]

RULES:
- Output ONLY valid JSON
- No markdown formatting
- No commentary
- All slugs must be kebab-case
- All prerequisite slugs must exist in the same output
- examWeight integers 1-10, sum ≈ 100 per subject
- Foundation lessons: 4-6 items, Higher: 4-6 items
- Hacks: 1-3 items, Advanced: 1-2 items
- questionTypes from approved list per subject
- generateQuestion: return "FUNCTION_TEMPLATE" string placeholder
```

---

**Ready to generate.** Start with Science (biggest gap) or History (narrative-heavy). Upload this file to Gemini, copy the subject prompt, get JSON, validate, integrate.