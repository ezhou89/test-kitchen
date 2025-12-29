# CLAUDE.md — AI Assistant Guide for Test Kitchen

This document provides guidance for AI assistants working with this recipe R&D repository.

## Project Overview

This is a **home test-kitchen notebook** for recipe research and development. It uses Git version control to track recipe iterations, document cooking experiments, and build a library of reliable protocols.

**Core philosophy:** Treat cooking like a science experiment — document variables, track outcomes, iterate systematically.

## User Preferences (Critical)

**IMPORTANT:** Always consult `00_lab-manual/food-preferences.md` before creating recipes.

### Allergies & Aversions
- **Oral Allergy Syndrome (OAS):** Raw banana, fuzzy fruits (peaches, nectarines, apricots), almonds
- **Texture/Taste Aversions:** Raw tomato (cooked OK), bitter flavors

### Protein Preferences (ranked)
1. Beef ★★★★★ (top)
2. Pork ★★★★★ (top)
3. Chicken ★★★★☆ (solid go-to)
4. Fish/Turkey ★★★☆☆ (OK, less enjoyable to cook)

### Nutrition Goals
- **Daily target:** 1800–2000 calories (cutting)
- High protein, high fiber, high satiety
- More leafy greens (active goal)

### Preferred Cooking Methods
- **Slow cooker (6-8qt):** Primary batch protein method for large cuts
- **Sous vide:** Mason jars only (no plastic bags) — eggs, oatmeal, portioned proteins, sauces
- **Baked/roasted:** Hands-off oven time, sheet pan meals

### Cooking Style
- Weekend batch prep, weeknight reheating/assembly
- Meat and potatoes style — hearty, satisfying, no-fuss
- Fine with eating same meals repeatedly
- Loves heat/spice, avoids bitter

## Repository Structure

```
test-kitchen/
├── 00_lab-manual/       # Standards, principles, rubrics, tools reference
│   ├── food-preferences.md  # CRITICAL: allergies, preferences, goals
│   ├── principles.md
│   ├── tasting-rubric.md
│   ├── measurement-standards.md
│   └── tools/
├── 01_protocols/        # Canonical recipes (your "best known" methods)
│   ├── proteins/
│   ├── sauces/
│   ├── starches/
│   └── veg-sides/
├── 02_runs/             # Dated cook logs (what actually happened)
│   └── YYYY/YYYY-MM-DD/
├── 03_series/           # Multi-run improvement loops (experiments)
│   └── <series_name>/
│       ├── series-brief.md
│       ├── run-log.md
│       ├── conclusions.md
│       └── runs/
├── 04_indexes/          # Navigation pages (recipe, dish, menu, tag indexes)
├── 05_media/            # Curated photos
├── 06_dishes/           # Composed dishes (combine multiple protocols)
├── 07_menus/            # Multi-course menus with timelines
├── 08_meal-plans/       # Weekly/goal-based meal plans
└── templates/           # Copy/paste templates for all document types
```

## Core Concepts

### Protocols (canonical methods)
- Location: `01_protocols/<category>/`
- Purpose: Your "best known" recipe — what you'd share with a friend
- Template: `templates/protocol.md`
- Naming: `<descriptive-name>.md` (use hyphens, lowercase)

### Runs (cook logs)
- Location: `02_runs/YYYY/YYYY-MM-DD/`
- Purpose: Document what actually happened during a cooking session
- Template: `templates/run.md`
- Naming: `<protocol-name>__run-NN.md`

### Series (structured experiments)
- Location: `03_series/<series_name>/`
- Purpose: Multi-run improvement loop with baseline → tweak → compare → conclude
- Contains: `series-brief.md`, `run-log.md`, `conclusions.md`, `runs/`
- Template: `templates/series-brief.md`

### Dishes (composed recipes)
- Location: `06_dishes/`
- Purpose: Combine multiple protocols into a complete dish
- Template: `templates/dish.md`

### Menus (multi-course)
- Location: `07_menus/`
- Purpose: Multi-course meals with master timelines
- Template: `templates/menu.md`

### Meal Plans (weekly/goal-based)
- Location: `08_meal-plans/`
- Purpose: Weekly meal planning with batch prep and leftover routing
- Template: `templates/meal-plan.md`
- Naming: `YYYY-wNN_<goal-name>.md` (e.g., `2026-w01_weeknight-low-mess.md`)

## File Conventions

### Naming
- Use **lowercase with hyphens**: `sheet-pan-chicken-thighs.md`
- Use underscores for variants: `roasted-carrots_cumin-honey.md`
- Runs use double underscore: `<protocol>__run-NN.md`

### Frontmatter Fields (in order)
Protocols:
```markdown
**Category:** <sauces / proteins / veg-sides / starches / etc.>
**Tags:** #tag1 #tag2
**Version:** v0.1
**Servings / Yield:**
**Prep time:**
**Cook time:**
**Tools:**
```

Runs:
```markdown
**Date:** YYYY-MM-DD
**Protocol used:** <link> or "improv"
**Tags:** #tag1 #tag2
**Tools:**
**Prep / Cook / Total:**
```

Meal Plans:
```markdown
**Goal:**
**Constraints:**
**Batch items:**
**Leftover routing:**
```

### Standard Tags
- `#weeknight` — quick, repeatable dinners
- `#low-mess` — minimal cleanup
- `#japanese-ish` — soy/miso/ginger profiles
- `#high-protein` — protein-forward meals
- `#sheet-pan` — sheet pan cooking
- `#veg` — vegetable dishes
- `#tender` — tender texture focus
- `#batch-prep` — suitable for weekend batch cooking
- `#slow-cooker` — uses slow cooker method

## Measurement Standards

### Units
- **Weights:** grams (preferred for repeatability)
- **Temperatures:** °F (include °C if desired)
- **Time:** minutes

### Naming Ingredients
- Be explicit: "kosher salt (Diamond Crystal)" not just "salt"
- Clarify usage: "lemon (zest + juice)" if both are used
- Avoid "pinch/splash" in protocols — provide weight ranges instead

### Common Conversions
- 1 tbsp = 15 mL
- 1 tsp = 5 mL

## Pantry Staples

Always stocked (can be assumed available):
- White rice, brown rice
- Chicken bouillon
- Soy sauce, mirin, rice wine vinegar, sesame oil
- Variety of hot sauces
- Kosher salt (Diamond Crystal), black pepper

## Equipment

Key equipment available:
- **Slow cooker (6-8qt)** — primary batch protein method
- **Sous vide circulator** — mason jars only, no plastic bags
- **Sheet pans** — for hands-off roasting
- **Instant-read thermometer**
- **Rice cooker**
- Decent freezer space for batch cooking

## Working with This Repository

### Creating a New Protocol
1. Copy `templates/protocol.md` to `01_protocols/<category>/<name>.md`
2. Fill in all frontmatter fields
3. Document ingredients in grams when possible
4. Include success criteria (what "done" looks like)
5. Add to `04_indexes/recipe-index.md`

### Logging a Run
1. Create directory if needed: `02_runs/YYYY/YYYY-MM-DD/`
2. Copy `templates/run.md` to `<protocol>__run-01.md`
3. Link to the protocol used
4. Document substitutions, timing, results
5. Include score (1-10) and "would I serve to guests?"
6. Note fixes/next hypothesis

### Starting a Series
1. Create `03_series/<series_name>/` directory
2. Create `series-brief.md` with goal, variables, metrics, plan
3. Create `runs/` subdirectory
4. Create `run-log.md` to track runs
5. Create `conclusions.md` (placeholder until complete)

### Creating a Meal Plan
1. Copy `templates/meal-plan.md` to `08_meal-plans/YYYY-wNN_<goal-name>.md`
2. Fill in goal, constraints, batch items, and leftover routing
3. Link to dishes and protocols for each day
4. Include delta shopping list (what's not already stocked)

### Updating Indexes
When adding new protocols/dishes/menus/runs, update the relevant index:
- `04_indexes/recipe-index.md` — protocols by category
- `04_indexes/dish-index.md` — composed dishes
- `04_indexes/menu-index.md` — menus
- `04_indexes/run-index.md` — cook logs by date
- `04_indexes/tag-index.md` — tag definitions
- `04_indexes/failures-and-fixes.md` — common problems and solutions

## Tasting Rubric

When evaluating results, score these dimensions (1-10):
- Flavor balance
- Texture
- Aroma
- Salt level
- Acid level
- Finish / aftertaste
- Ease / mess
- Would I serve to guests? (yes/no)

Descriptors: too salty / flat / bitter / cloying / greasy / dry / mushy / tough

## Key Principles

1. **One variable at a time** when iterating (especially in a Series)
2. **Weights beat volume** for repeatability — use grams
3. **Write down constraints** (time, missing ingredients, equipment)
4. **Define success before testing** (taste, texture, ease, holding time)
5. **Make notes while cooking** (one line per step is enough)

## Link Conventions

Use relative links between documents:
- From run to protocol: `../../../01_protocols/proteins/sheet-pan-chicken-thighs.md`
- From protocol to sauce: `../sauces/quick-soy-ginger-glaze.md`
- From index to protocol: `../01_protocols/sauces/lemon-herb-vinaigrette.md`

## Git Workflow

- **Commits** = recipe change notes (e.g., "Reduce oven temp; add rest step")
- **Issues** = ideas/backlog (e.g., "Make weeknight broccoli less mushy")
- **Pull Requests** = write-ups when updating a protocol with evidence from runs

## AI Assistant Guidelines

When assisting with this repository:

### Document Standards
1. **Follow templates exactly** — use the structure from `templates/` directory
2. **Use grams for measurements** — avoid volume measurements in protocols
3. **Maintain linking structure** — always use relative markdown links
4. **Update indexes** — add new protocols/dishes/runs to appropriate index files
5. **Preserve frontmatter order** — keep metadata fields in consistent order
6. **Be specific with ingredients** — include brand/type when it matters
7. **Include success criteria** — every protocol needs clear "done" indicators
8. **Document next steps** — runs should always have "fixes/next hypothesis"
9. **Use proper date format** — YYYY-MM-DD throughout
10. **Keep run numbers sequential** — run-01, run-02, etc.

### Recipe Development (Critical)
11. **NEVER use** raw banana, fuzzy fruits, or almonds in any recipe
12. **Prefer** beef and pork for protein-forward dishes
13. **Prioritize** slow cooker, sheet pan, and baked methods — minimal active time
14. **Sous vide in mason jars only** — no plastic bags
15. **Design for busy schedules** — low-effort, hands-off cooking
16. **Build hearty meals** — meat and potatoes style, high satiety
17. **Include** fiber sources and leafy greens where possible
18. **Lean into** umami-forward, Asian-inspired, or comfort food profiles
19. **Embrace** heat and spice; avoid bitter preparations
20. **Use** pantry staples (soy sauce, mirin, sesame oil, rice vinegar)
21. **Substitute** raw tomato with cooked/sauce forms when tomato flavor is needed
22. **Include calorie estimates** — target 1800–2000 cal/day total
23. **Design for meal prep** — batch cooking encouraged, repeatable meals are fine
