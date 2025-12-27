# Test Kitchen (Recipe R&D) — GitHub Lab Notebook

This repository is a **home test-kitchen notebook** designed for **recipe research & development (R&D)**.

## Why GitHub?
- **Version control:** every change to a recipe is tracked, so you can see what changed and why.
- **Repeatability:** your best methods become *protocols* you can reliably reproduce.
- **Experiment history:** each cooking session is logged as a dated run, so you can compare outcomes.
- **Structure + search:** Markdown files + consistent tags make it easy to find meals by time, tools, or goals.
- **Collaboration-ready:** issues, pull requests, and project boards work like a kitchen backlog.

## Core Concepts
### Protocols (canonical methods)
**Protocols** are your “best known” recipes and techniques (what you’d share with a friend).
They can be small components (a vinaigrette) or full recipes (sheet-pan chicken thighs).

Location: `01_protocols/`

### Runs (what actually happened)
A **Run** is a dated cook log: substitutions, timing, what went wrong/right, photos, and next steps.

Location: `02_runs/YYYY/YYYY-MM-DD/`

### Series (structured iteration)
A **Series** is a focused improvement loop with multiple runs (baseline → tweak → compare → conclude).

Location: `03_series/<series_name>/`

## Recommended Workflow (low friction)
1. **Cook** (or test) something → log a **Run** (2–5 minutes).
2. If it’s promising → create/update a **Protocol**.
3. If you’re actively dialing it in → create a **Series** and run it like an experiment.
4. When a dish is reliably great → compose it into a **Dish** and/or a **Menu**.

## Repo Map
- `00_lab-manual/` — standards, tasting rubric, tools list
- `01_protocols/` — canonical components & recipes
- `02_runs/` — dated cook logs
- `03_series/` — multi-run improvement efforts
- `04_indexes/` — navigation pages (recipes/dishes/menus/tags)
- `06_dishes/` — composed dishes (combine protocols)
- `07_menus/` — multi-course menus + timelines
- `08_meal-plans/` — weekly plans and goal-based plans
- `05_media/` — curated photos you want to keep
- `templates/` — copy/paste templates for protocols, runs, series, dishes, menus

## How to Use with GitHub (simple)
- **Commits** = “what changed” notes (e.g., “Reduce oven temp; add rest step”).
- **Issues** = ideas/backlog (e.g., “Make weeknight broccoli less mushy”).
- **Pull Requests** (optional) = “write-ups” when updating a protocol with evidence from runs.

---

**Start here:** open `04_indexes/recipe-index.md` and `02_runs/`.
