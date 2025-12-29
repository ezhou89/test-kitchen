# Test Kitchen — Brand Bible

> "Sibyl System meets enthusiastic lab assistant"

A sleek, scientific interface with personality. Dark, futuristic, precise — but with the energy of someone who genuinely loves what they're doing.

---

## Brand Personality

### The Character
A goofy kid who backs it up with deep scientific expertise. Wears a denim apron over a clean white oxford shirt. Enthusiastic about the process, meticulous about the method, not taking themselves too seriously.

### Voice Principles
- **Confident but not arrogant** — we know our stuff, but we're still learning
- **Precise but not dry** — technical accuracy with warmth
- **Playful but not cutesy** — personality without food-blog energy
- **Scientific but accessible** — lab rigor, human language

### What We Are
- A personal R&D lab
- A working notebook, not a portfolio
- Functional first, beautiful second
- For the cook, not the audience

### What We Are NOT
- A food blog or influencer platform
- Cutesy or whimsical
- Minimalist to the point of sterile
- Overly serious or academic

---

## Visual References

### Primary Inspiration
- **Psycho Pass** — Sibyl System UI: holographic interfaces, cyan data streams, clean readouts
- **Tiger & Bunny** — Bold color blocking, energetic accents, hero-card aesthetic

### Secondary Inspiration
- Modern game HUDs (Destiny 2, NieR: Automata)
- Scientific instrument displays
- Terminal/CLI aesthetics
- Japanese UI design patterns

---

## Color System

### Core Palette

```
┌─────────────────────────────────────────────────────────────┐
│  BACKGROUND                                                 │
│  Deep Space         #0d0d14    rgb(13, 13, 20)             │
│  Card Surface       #1a1a2e    rgb(26, 26, 46)             │
│  Elevated Surface   #252542    rgb(37, 37, 66)             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  TEXT                                                       │
│  Primary Text       #eaeaea    rgb(234, 234, 234)          │
│  Secondary Text     #8a8aa3    rgb(138, 138, 163)          │
│  Muted Text         #5a5a73    rgb(90, 90, 115)            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ACCENT — PRIMARY (Cyan/Teal)                               │
│  Cyan Bright        #00f5ff    rgb(0, 245, 255)            │
│  Cyan Standard      #00d4e6    rgb(0, 212, 230)            │
│  Cyan Muted         #007a8a    rgb(0, 122, 138)            │
│  Cyan Glow          #00f5ff40  (with 25% opacity)          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ACCENT — SECONDARY (Lime)                                  │
│  Lime Bright        #b8ff00    rgb(184, 255, 0)            │
│  Lime Standard      #9ed600    rgb(158, 214, 0)            │
│  Lime Muted         #5a7a00    rgb(90, 122, 0)             │
│  Lime Glow          #b8ff0040  (with 25% opacity)          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  STATUS COLORS                                              │
│  Success            #00ff88    rgb(0, 255, 136)            │
│  Warning            #ffaa00    rgb(255, 170, 0)            │
│  Error              #ff3366    rgb(255, 51, 102)           │
│  Info               #00d4e6    (uses Cyan Standard)        │
└─────────────────────────────────────────────────────────────┘
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Page background | Deep Space `#0d0d14` | Darkest, base layer |
| Cards/containers | Card Surface `#1a1a2e` | Elevated from background |
| Modals/dropdowns | Elevated Surface `#252542` | Highest elevation |
| Body text | Primary Text `#eaeaea` | High contrast on dark |
| Labels/captions | Secondary Text `#8a8aa3` | De-emphasized |
| Disabled/inactive | Muted Text `#5a5a73` | Clearly inactive |
| Links | Cyan Bright `#00f5ff` | Interactive, clickable |
| Primary buttons | Cyan Standard `#00d4e6` | Main actions |
| Tags/badges | Lime Bright `#b8ff00` | Categorization, status |
| Borders/outlines | Cyan Muted `#007a8a` | Subtle structure |

### Glow Effects

Apply subtle glow to interactive elements on hover/focus:

```css
/* Cyan glow — buttons, links */
box-shadow: 0 0 12px rgba(0, 245, 255, 0.25);

/* Lime glow — tags, badges */
box-shadow: 0 0 8px rgba(184, 255, 0, 0.2);

/* Text glow — headlines on hover (optional) */
text-shadow: 0 0 8px rgba(0, 245, 255, 0.3);
```

Keep glows subtle — they should feel like a soft luminescence, not a neon sign.

---

## Typography

### Font Stack

```css
/* Headlines — Bold, condensed, impactful */
--font-display: 'Oswald', 'Arial Narrow', sans-serif;

/* Body, UI, Code — Monospace everything */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

```
┌──────────────────────────────────────────────────────────────┐
│  DISPLAY (Oswald)                                            │
│                                                              │
│  Hero Title      48px / 1.1    font-weight: 700   uppercase │
│  Page Title      36px / 1.2    font-weight: 600   uppercase │
│  Section Head    24px / 1.3    font-weight: 600   uppercase │
│  Card Title      20px / 1.3    font-weight: 500   normal    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  BODY (JetBrains Mono)                                       │
│                                                              │
│  Body Large      18px / 1.6    font-weight: 400             │
│  Body Standard   16px / 1.6    font-weight: 400             │
│  Body Small      14px / 1.5    font-weight: 400             │
│  Caption         12px / 1.4    font-weight: 400             │
│  Micro           10px / 1.3    font-weight: 500   uppercase │
└──────────────────────────────────────────────────────────────┘
```

### Typography Guidelines

- **Headlines**: Oswald, uppercase for major sections, sentence case for cards
- **Body text**: JetBrains Mono, comfortable line-height (1.6)
- **Ingredient lists**: JetBrains Mono, tabular alignment
- **Code/technical**: JetBrains Mono (already the body font)
- **Labels/badges**: JetBrains Mono, uppercase, letter-spacing +0.05em

---

## Components

### Cards (Recipe Cards)

Recipe cards are the primary content container. Designed to feel like lab specimen cards.

```
┌─────────────────────────────────────────────────────────────┐
│▌                                                            │
│▌  [STABLE] [#high-protein] [#sheet-pan]                    │
│▌                                                            │
│▌  SHEET PAN CHICKEN THIGHS                                 │
│▌  Crispy skin, tender meat, minimal effort                 │
│▌                                                            │
│▌  ──────────────────────────────────────────────────────   │
│▌  Version: v1.2  │  Prep: 10min  │  Cook: 35min            │
│▌                                                            │
└─────────────────────────────────────────────────────────────┘
  ▲
  └── Bold cyan accent border (left edge, 4px)
```

**Card Specifications:**
- Background: Card Surface `#1a1a2e`
- Border: None, except left accent
- Left accent: 4px solid Cyan Bright `#00f5ff`
- Border-radius: 0 (sharp edges)
- Padding: 24px
- Shadow: `0 4px 20px rgba(0, 0, 0, 0.3)`

### Buttons

Outlined/wireframe style — transparent fill, visible border.

```
┌─────────────────────────────────────────────┐
│                                             │
│    ┌─────────────────┐   ┌─────────────┐   │
│    │  START COOKING  │   │    SAVE     │   │
│    └─────────────────┘   └─────────────┘   │
│         Primary              Secondary     │
│                                             │
└─────────────────────────────────────────────┘
```

**Primary Button:**
- Background: transparent
- Border: 2px solid Cyan Bright `#00f5ff`
- Text: Cyan Bright `#00f5ff`
- Hover: Background `#00f5ff20`, glow effect
- Font: JetBrains Mono, 14px, uppercase, letter-spacing +0.1em

**Secondary Button:**
- Background: transparent
- Border: 1px solid Secondary Text `#8a8aa3`
- Text: Secondary Text `#8a8aa3`
- Hover: Border and text become Primary Text `#eaeaea`

### Lab Labels (Status Badges)

Specimen-tag style labels for status, version, and metadata.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │  STABLE  │  │  BETA    │  │  WIP     │  │  v1.2    │   │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│       Lime         Cyan        Warning        Muted         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Badge Specifications:**
- Font: JetBrains Mono, 10px, uppercase, letter-spacing +0.1em
- Padding: 4px 8px
- Border: 1px solid (color matches text)
- Border-radius: 0 (sharp)
- Background: transparent or 10% fill of border color

**Badge Colors:**
| Status | Border/Text | Meaning |
|--------|-------------|---------|
| STABLE | Lime `#b8ff00` | Battle-tested, reliable |
| BETA | Cyan `#00f5ff` | Works, needs more runs |
| WIP | Warning `#ffaa00` | In development |
| DRAFT | Muted `#5a5a73` | Incomplete |
| Version (v1.2) | Muted `#5a5a73` | Informational |

### Tags (Content Tags)

For categorization: `#high-protein`, `#weeknight`, `#sheet-pan`

```css
/* Tag styling */
background: transparent;
border: 1px solid #5a5a73;
color: #8a8aa3;
padding: 2px 6px;
font-size: 11px;
text-transform: lowercase;

/* Hover state */
border-color: #00f5ff;
color: #00f5ff;
```

### Input Fields

Wireframe style to match buttons.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   Search protocols...                                        │
│   ─────────────────────────────────────────────────────────  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Input Specifications:**
- Background: transparent
- Border: none, only bottom border
- Border-bottom: 1px solid Muted Text `#5a5a73`
- Focus: Border-bottom becomes Cyan Bright `#00f5ff`, subtle glow
- Text: Primary Text `#eaeaea`
- Placeholder: Muted Text `#5a5a73`

---

## Layout Patterns

### Recipe/Protocol Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [STABLE]  [v1.2]  [#proteins]  [#sheet-pan]  [#high-protein]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SHEET PAN CHICKEN THIGHS                                      │
│  Crispy skin, hands-off method, weeknight-friendly             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │                    [ HERO IMAGE ]                         │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PREP: 10min  ·  COOK: 35min  ·  YIELD: 4 servings             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ▌ INGREDIENTS                                                  │
│  ──────────────────────────────────────────────────────────    │
│  │  680g    bone-in, skin-on chicken thighs (4 pieces)         │
│  │   15g    olive oil                                          │
│  │    5g    kosher salt (Diamond Crystal)                      │
│  │    2g    black pepper                                       │
│  │    3g    garlic powder                                      │
│  │    2g    smoked paprika                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ▌ METHOD                                                       │
│  ──────────────────────────────────────────────────────────    │
│  1. Preheat oven to 425°F                                      │
│  2. Pat thighs dry with paper towels                           │
│  3. ...                                                        │
│                                                                 │
│     [ INLINE STEP IMAGE ]                                      │
│                                                                 │
│  4. ...                                                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ▌ FIELD NOTES                                                  │
│  ──────────────────────────────────────────────────────────    │
│  - Dry skin = crispy skin. Don't skip the paper towels.        │
│  - If thighs are uneven, flatten gently for even cooking.      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Section Headers

Section headers use the left-bar accent pattern with uppercase Oswald.

```css
/* Section header styling */
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-header::before {
  content: '';
  width: 4px;
  height: 24px;
  background: #00f5ff;
}

.section-header h2 {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #eaeaea;
  margin: 0;
}
```

---

## Content Patterns

### Section Names (Hybrid Style)

| Section | Display Name |
|---------|--------------|
| Ingredients list | **INGREDIENTS** |
| Steps/instructions | **METHOD** |
| Tips and observations | **FIELD NOTES** |
| What "done" looks like | **SUCCESS CRITERIA** |
| Related protocols | **SEE ALSO** |
| Run history | **RUN LOG** |
| Metadata header | (inline, no header) |

### Empty States

Playful but functional. Keep the scientific framing.

| Context | Message |
|---------|---------|
| No search results | "Nothing here yet — time to cook something up." |
| Empty run log | "No runs recorded. Every protocol starts somewhere." |
| No saved protocols | "Your lab is empty. Start your first experiment." |
| Search no match | "No matches found. Try different keywords." |
| Loading | "Indexing the lab..." |
| Error | "Something went wrong. Check the field notes (console)." |

### Microcopy Voice

- Use contractions: "don't" not "do not"
- Active voice: "Pat thighs dry" not "Thighs should be patted dry"
- Direct address: "you" not "one" or "the cook"
- Precise times: "35 minutes" not "about half an hour"
- Acknowledge uncertainty: "around 165°F internal" if there's a range

---

## Spacing System

Use an 8px base unit for consistent spacing.

```
┌─────────────────────────────────────────────────────────────┐
│  SPACING SCALE                                              │
│                                                             │
│  --space-1:   4px    (micro adjustments)                   │
│  --space-2:   8px    (tight, inline elements)              │
│  --space-3:  12px    (default gap)                         │
│  --space-4:  16px    (between related items)               │
│  --space-5:  24px    (between sections)                    │
│  --space-6:  32px    (major section breaks)                │
│  --space-7:  48px    (page sections)                       │
│  --space-8:  64px    (hero/major landmarks)                │
└─────────────────────────────────────────────────────────────┘
```

---

## Responsive Behavior

### Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Mobile Considerations (Kitchen Use)

- **Large tap targets**: Minimum 44px for buttons
- **Readable text**: Body text minimum 16px on mobile
- **Thumb-friendly**: Primary actions in bottom half of screen
- **High contrast**: Maintained for bright kitchen environments
- **No hover-dependent features**: Everything works with touch

---

## CSS Custom Properties

Complete set for implementation:

```css
:root {
  /* Colors — Background */
  --color-bg-base: #0d0d14;
  --color-bg-card: #1a1a2e;
  --color-bg-elevated: #252542;

  /* Colors — Text */
  --color-text-primary: #eaeaea;
  --color-text-secondary: #8a8aa3;
  --color-text-muted: #5a5a73;

  /* Colors — Accent Cyan */
  --color-cyan-bright: #00f5ff;
  --color-cyan-standard: #00d4e6;
  --color-cyan-muted: #007a8a;
  --color-cyan-glow: rgba(0, 245, 255, 0.25);

  /* Colors — Accent Lime */
  --color-lime-bright: #b8ff00;
  --color-lime-standard: #9ed600;
  --color-lime-muted: #5a7a00;
  --color-lime-glow: rgba(184, 255, 0, 0.2);

  /* Colors — Status */
  --color-success: #00ff88;
  --color-warning: #ffaa00;
  --color-error: #ff3366;
  --color-info: var(--color-cyan-standard);

  /* Typography */
  --font-display: 'Oswald', 'Arial Narrow', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  /* Font Sizes */
  --text-hero: 48px;
  --text-page-title: 36px;
  --text-section: 24px;
  --text-card-title: 20px;
  --text-lg: 18px;
  --text-base: 16px;
  --text-sm: 14px;
  --text-caption: 12px;
  --text-micro: 10px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Effects */
  --glow-cyan: 0 0 12px var(--color-cyan-glow);
  --glow-lime: 0 0 8px var(--color-lime-glow);
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.3);

  /* Borders */
  --border-accent: 4px solid var(--color-cyan-bright);
  --border-subtle: 1px solid var(--color-text-muted);
  --border-input: 1px solid var(--color-text-muted);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

---

## Logo / Wordmark

Clean typography, no icon. The name is the brand.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     TEST KITCHEN                                            │
│     ▔▔▔▔▔▔▔▔▔▔▔▔                                           │
│                                                             │
│     Font: Oswald, 700 weight                                │
│     Size: 24-32px depending on context                      │
│     Color: Primary Text #eaeaea                             │
│     Underline: 2px Cyan Bright #00f5ff (optional accent)    │
│     Letter-spacing: 0.1em                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Usage:**
- Header: "TEST KITCHEN" with cyan underline accent
- Favicon: "TK" monogram in cyan on dark background
- No tagline needed

---

## Do's and Don'ts

### Do
- Use sharp corners (border-radius: 0)
- Let content breathe with generous spacing
- Use the left-bar accent consistently
- Keep the interface dark — it's designed for it
- Use monospace for everything textual
- Apply subtle glow effects on interaction
- Make metadata visible and proud

### Don't
- Add rounded corners or soft shapes
- Use gradients (flat colors only)
- Add decorative illustrations or icons
- Use multiple accent colors in one view
- Make it feel like a food blog
- Hide metadata or version info
- Use light mode (not designed for it)

---

## Implementation Checklist

When building components, verify:

- [ ] Uses correct color tokens from CSS custom properties
- [ ] Typography matches scale (Oswald headlines, JetBrains body)
- [ ] Sharp corners (no border-radius)
- [ ] Left-bar accent on cards/sections
- [ ] Subtle glow on interactive hover states
- [ ] High contrast maintained (WCAG AA minimum)
- [ ] Works on mobile (44px tap targets, 16px minimum text)
- [ ] Empty states use brand voice

---

*Last updated: 2025-12-29*
*Version: v1.0*
