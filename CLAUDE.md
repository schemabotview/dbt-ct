# CLAUDE.md — dbt-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*. The teaching plan this repo authors from is
> [`DBT-COURSE-PLAN.md`](DBT-COURSE-PLAN.md); this file maps it onto courses and sections.

## What this repo is

The GraphL concept app for **dbt** — *from a first model to reliable analytics engineering*. Served
at `graphl.in/dbt-ct/`. One concept, ten courses (one per plan chapter), each course a list of
sections. A **section** is `(scene, slide, narration)` and is one segment of the course video. One
section = one slide.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract

`#/<courseId>-<sectionId>`, e.g. `#/first-build-compile-vs-run`. `#/` is the catalog. Section ids
are kebab-case and stable once a wav exists for them — the wav path
`public/audio/<courseId>/<sectionId>.wav` is derived from the id, so a rename silences the section.

## Course arc

Plan chapter → course. Plan section → section (1:1 by default; a plan section that will not fit one
slide inside the density targets splits in two, and the split is recorded here).

| # | course id | title | plan sections | status |
| --- | --- | --- | --- | --- |
| 1 | `first-build` | Analytics Engineering and a First Build | 6 | authored — wavs pending |
| 2 | `sources` | Sources, Dependencies, and Project Organisation | 8 | not started |
| 3 | `models` | Analytical Models and Materialization Choices | 7 | not started |
| 4 | `quality` | Tests, Documentation, and Model Contracts | 8 | not started |
| 5 | `jinja` | Jinja, Macros, and Reusable Compilation | 8 | not started |
| 6 | `incremental` | Incremental Models and Historical State | 8 | not started |
| 7 | `selection` | Selection, Artefacts, and Efficient Execution | 8 | not started |
| 8 | `deployment` | Deployment, Collaboration, and Governance | 8 | not started |
| 9 | `operations` | Operations, Failure Recovery, and Evolution | 7 | not started |
| 10 | `metrics` | Metrics, Integrated Design, and Continuation | 5 | not started |

Course 1 sections, in order: `what-dbt-does`, `four-layers`, `project-and-profile`,
`first-model-and-ref`, `compile-vs-run`, `first-results`. The template's `demo` course was deleted
when `first-build` landed.

## The recurring example

Every course draws on one retail project, so scenes stay recognisable across the whole concept:

- **sources** — `raw.orders`, `raw.payments`, `raw.customers` (customer rows change over time)
- **staging** — `stg_orders`, `stg_payments`, `stg_customers`
- **intermediate** — `int_order_payments` (the grain-mismatch lesson in course 3)
- **marts** — `fct_orders`, `dim_customers`, then `fct_revenue` / the revenue metric (course 10)
- **history** — `customers_snapshot` (course 6)

A correct full rebuild is the baseline before any incremental optimisation. Layer names are taught
as an organising pattern, not mandatory architecture.

## Content rules from the plan

- **Toolchain:** dbt Core CLI, SQL-first, Snowflake as the warehouse. Every command flag and config
  key on a slide is checked against the pinned versions below.
- **Snowflake-specific behaviour is labelled** as such (dynamic tables, `merge` specifics, grants),
  never presented as portable dbt semantics. Hosted-platform, Fusion, Python-model and Semantic
  Layer features carry an eligibility caveat.
- **Illustrative output is labelled.** No section claims an executed build it did not run.
- **Teaching shape per section:** objective → mental model → annotated SQL/YAML/Jinja and the
  compiled SQL → expected rows or diagnostic evidence → the failure/alternative contrast. Across a
  course this spreads over several sections; the last section of each course carries the bridge.
- **Compilation, execution and orchestration are kept visibly separate** — dbt compiles, the
  warehouse executes, a scheduler orchestrates.

## Version pin

Chosen 2026-10-14. **dbt v1** — the Python engine — is the course's primary illustration, by the
owner's decision, though new installs now default to **dbt v2** (the Rust engine, open-source build
`dbt-oss` 2.0.x). Say so wherever v2 behaves differently; do not assume parity.

| package | pin | latest seen 2026-10-14 |
| --- | --- | --- |
| `dbt-core` | `~=1.12.0` | 1.12.6 |
| `dbt-snowflake` | `~=1.12.0` | 1.12.3 |
| packages (dbt_utils etc.) | none yet | — |

**How snippets are verified.** The course's example project is rebuilt in a scratch venv with the
pinned pair: every YAML/SQL snippet must pass `dbt parse` with the Snowflake profile; compiled SQL is
real `dbt compile --no-populate-cache` output against that profile (no live connection needed for
models without introspection). Result rows and log shapes come from a real `dbt build` against a
local DuckDB copy of the raw tables (`dbt-duckdb` 1.11), rewritten to Snowflake relation names and
**labelled illustrative** on the slide. `docs.getdbt.com` is not reachable from the authoring
environment; behaviour claims that cannot be run locally need a docs check before publishing.

## Scene inventory

Shared scenes (reused across courses with a different `focus:`) are the point — list each here as it
is authored: id, shape (diagram / code card), courses that use it.

| scene id | shape | used by |
| --- | --- | --- |
| `elt-pipeline` | diagram — load band (TB) beside transform band (BT) | first-build §1 |
| `dbt-stack` | diagram — platform / machine / Snowflake bands | first-build §2 |
| `project-and-profile` | two code cards — `dbt_project.yml`, `profiles.yml` | first-build §3 |
| `first-model` | three code cards — `stg_orders`, `fct_orders`, compiled SQL | first-build §4 |
| `command-effects` | diagram (dbt side / Snowflake side) + commands table | first-build §5 |
| `first-build-results` | YAML + build-log code cards, result-rows table | first-build §6 |

`first-model` and `first-build-results` carry the recurring example's first state; later courses
should extend these models rather than introduce new names.

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
  **This bites dbt hardest:** `int_order_payments`, `dbt_project.yml`, `is_incremental` and
  `run_results.json` are each one unbreakable token wider than a label line (~12 chars). Give a
  leaf a human label ("Order payments") and put the relation name in `sub` (~20 chars per line), or
  show it in a code card.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

**Measure them — `npm run check:density`** (dev server running; `PUPPETEER_EXECUTABLE_PATH` set to a
local Chromium if puppeteer has none). It drives every route at 1920×1080 and measures the slide's
rendered height and the scene's node bounding box; it exits non-zero on any frame off target. Do not
trust the modelled slide height for the lower bound: `check`'s model runs **5–10 % high** against the
render, so a slide modelling 850px renders at ~75 %. Author to a modelled **940–1000px** and confirm
with the measurement. `check` still owns the upper bound (clipping) — `check` models no density at
all. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
npm run check:density        # with `npm run dev` running
```

All four are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
