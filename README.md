# dbt-ct

**dbt — from a first model to reliable analytics engineering.** A GraphL concept app, served at
`graphl.in/dbt-ct/`: ten courses that follow raw orders, payments and customer changes from a first
`dbt build` to tested, documented, incrementally maintained and deployed analytics products.

- [`DBT-COURSE-PLAN.md`](DBT-COURSE-PLAN.md) — the teaching plan: audience, scope, the ten chapters
  and their sections, sources.
- [`CLAUDE.md`](CLAUDE.md) — how the plan maps onto courses and sections, the route contract, the
  recurring example, the scene inventory, and the layout rules frames must respect.
- [`TEMPLATE.md`](TEMPLATE.md) — the scaffold checklist this repo was created from
  ([`content-repo-template`](https://github.com/schemabotview/content-repo-template)).

## Running it

```sh
npm install
npm run dev          # http://localhost:5173 — #/ is the catalog
```

Routes are `#/<course>-<section>`, e.g. `#/first-build-compile-vs-run`.

## Verifying a change

```sh
npm run build        # must be clean
npx tsc --noEmit     # must be clean
npm run check        # content budgets: card overflow, slide clipping, dead focus, missing wavs
```

…and the section looked at in the browser. The three commands are a floor, not proof.

## What is in here

```
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2 — dbt orange, with a teal counter tone
scripts/        check-content.mjs · init-template.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/    narration wavs (Colab + Chatterbox, never by hand)
.github/workflows/deploy.yml    Pages deploy on push to main
```
