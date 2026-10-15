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
| 2 | `sources` | Sources, Dependencies, and Project Organisation | 8 | authored — wavs pending |
| 3 | `models` | Analytical Models and Materialization Choices | 7 | authored — wavs pending |
| 4 | `quality` | Tests, Documentation, and Model Contracts | 8 | authored — wavs pending |
| 5 | `jinja` | Jinja, Macros, and Reusable Compilation | 8 | authored — wavs pending |
| 6 | `incremental` | Incremental Models and Historical State | 8 | authored — wavs pending |
| 7 | `selection` | Selection, Artefacts, and Efficient Execution | 8 | authored — wavs pending |
| 8 | `deployment` | Deployment, Collaboration, and Governance | 8 | authored — wavs pending |
| 9 | `operations` | Operations and Safe Evolution | 7 | authored — wavs pending |
| 10 | `metrics` | Metrics, Integrated Design, and Continuation | 5 | authored — wavs pending |

Course 1 sections, in order: `what-dbt-does`, `four-layers`, `project-and-profile`,
`first-model-and-ref`, `compile-vs-run`, `first-results`. The template's `demo` course was deleted
when `first-build` landed.

Course 2 sections: `project-layout`, `declaring-sources`, `source-freshness`, `ref-and-the-dag`,
`seeds`, `model-layers`, `targets-and-schemas`, `docs-and-ownership`.

Course 3 sections: `grain-and-fan-out`, `facts-and-dimensions`, `time-and-history`,
`view-table-ephemeral`, `dynamic-tables`, `cost-and-config`, `model-interfaces`.

Course 4 sections: `generic-tests`, `singular-tests`, `severity-and-failures`, `unit-tests`,
`docs-and-exposures`, `model-contracts`, `versions-and-access`, `coverage-and-confidence`.

Course 5 sections: `jinja-in-dbt`, `vars-and-loops`, `macros`, `hidden-dependencies`, `packages`,
`dispatch`, `side-effects`, `python-models`.

Course 6 sections: `is-incremental`, `watermarks`, `strategies`, `late-data`, `schema-changes`,
`full-refresh`, `snapshots`, `snapshot-limits`.

Course 7 sections: `graph-operators`, `test-selection`, `artefacts`, `state-comparison`, `deferral`,
`threads-and-cost`, `query-evidence`, `retry`.

Course 8 sections: `pull-requests`, `ci-targets`, `slim-ci`, `identities-and-grants`, `orchestration`,
`release-ordering`, `hosted-vs-cli`, `packages-and-governance`.

Course 9 sections: `monitoring`, `diagnosis`, `side-effects`, `incremental-recovery`, `upgrades`,
`performance-regression`, `runbooks`.

Course 10 sections: `shared-definitions`, `semantic-models`, `alternatives`, `decision-records`,
`continuation`.

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
| `dbt_utils` (course 5) | git tag `1.3.0` → commit `e164c645…` | — (Hub unreachable here) |
| `dbt-metricflow` (course 10) | `0.15.0` — installs beside dbt-core 1.12.6 | 0.15.0 |

**Example project state after course 3:** `stg_orders`, `stg_payments`, `stg_customers` (with
`country`), `int_order_payments` (ephemeral), `fct_orders` (with `amount`), `dim_customers`, seed
`payment_methods`. Raw: 5 orders (3 returned), 4 payments (order 4 paid twice), 4 customers.

**Version-specific facts confirmed on 1.12.6 (do not regress):** generic-test arguments go under
`arguments:` (top-level form → `MissingArgumentsPropertyInGenericTestDeprecation`);
`deprecation_date` is a version property, not a config; a contract on an ephemeral model does
**not** error (so do not claim it does); dbt-snowflake does not implement `materialized_view`.

**Course 6 example state:** `fct_payments` (incremental, merge on `payment_id`, 3-day lookback on
`paid_at`), raw payments carry `paid_at`, `_loaded_at`, `currency`; `customers_snapshot` (YAML,
check strategy on `country`). dbt-snowflake: default strategy merge; `insert_overwrite` replaces the
whole table; microbatch needs `event_time` on its inputs.

**Course 8 facts confirmed on 1.12.6:** `list_schemas()` is the Jinja route (not
`adapter.list_schemas`); dropping `target.schema` leaves custom and `_dbt_test__audit` schemas;
`source_status:fresher+` needs the previous run's `sources.json` in `--state`; `dbt deps` ignores a
`projects:` entry and a cross-project `ref` fails in Core; dbt Core attempts anonymous usage
tracking unless `flags: send_anonymous_usage_stats: false` (or `DO_NOT_TRACK=1`).

**Course 10 facts confirmed (1.12.6 + dbt-metricflow 0.15.0):** semantic models, a filtered simple
metric and a time spine parse with no deprecations; every measure needs an `agg_time_dimension`;
`mf query` resolves many-to-one joins (revenue by `customer__country`) and refuses one-to-many
("fan-out join support is pending").

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
| `project-layout` | project tree (hugged code card) + 4-step precedence chain | sources §1 |
| `declaring-sources` | three code cards — `_sources.yml`, `stg_orders` with `source()`, compiled | sources §2 |
| `source-freshness` | freshness YAML + command output + per-source table | sources §3 |
| `shop-dag` | diagram — 3 sources → 3 staging → `fct_orders`, + resolution table | sources §4 |
| `reference-seed` | CSV + `dbt seed` log + seed-or-source table | sources §5 |
| `model-layers` | staging 2×2 over intermediate / marts side by side | sources §6 |
| `environment-schemas` | `+schema` config + where-each-model-lands table + alias card | sources §7 |
| `docs-and-ownership` | YAML + docs-generate tree + source-contract card | sources §8 |
| `fan-out` | joined rows table + FAIL/SKIP log + `int_order_payments` fix | models §1 |
| `facts-and-dimensions` | `fct_orders` and `dim_customers` tables + question card | models §2 |
| `current-vs-history` | timeline (TB) + attribution table + snapshot pointer — illustrative | models §3 |
| `three-materializations` | view / table / ephemeral column + compiled CTE | models §4 |
| `dynamic-tables` | dynamic-table config + who-refreshes + materialized-view warning | models §5 |
| `cost-and-config` | config block + Snowflake config table + when-paid band | models §6 |
| `model-interfaces` | consumers → interface → change table → what dbt sees | models §7 |
| `generic-tests` | tests YAML (`arguments:` form) + what-each-asserts table | quality §1 |
| `singular-test` | test SQL + compiled + how-judged band + singular-vs-generic table | quality §2 |
| `severity` | threshold YAML + WARN log + stored-failures table | quality §3 |
| `unit-test` | unit-test YAML + real failing diff | quality §4 |
| `exposures` | exposure YAML + lineage band + real `dbt ls +exposure:` output | quality §5 |
| `contract` | contract YAML (Snowflake types) + real violation + Snowflake constraint table | quality §6 |
| `model-versions` | versions YAML + ref-resolution table + access band | quality §7 |
| `coverage` | establishes / does-not table + unchecked-gaps column | quality §8 |
| `jinja-stages` | Jinja source + row (two-renders column, context table) | jinja §1 |
| `loop-pivot` | loop source + compiled excerpt + pivot rows | jinja §2 |
| `macros` | `cents_to_dollars` + `generate_schema_name` override + landing table | jinja §3 |
| `hidden-ref` | conditional `ref` + real compilation error + `depends_on` hint | jinja §4 |
| `packages` | `packages.yml` (hub + git) + row (real lock, what-you-depend-on) | jinja §5 |
| `dispatch` | dispatched macro + per-adapter compiled cards | jinja §6 |
| `side-effects` | frozen `run_query` result + ways-Jinja-runs-SQL table + execute guard | jinja §7 |
| `python-model` | Snowpark model + row (where-it-runs, SQL-or-Python table) | jinja §8 |
| `two-paths` | incremental model + the two compiled paths | incremental §1 |
| `watermark` | per-run reconciliation table + which-column band + boundary | incremental §2 |
| `strategies` | Snowflake strategy table + "unique_key is not" column | incremental §3 |
| `late-data` | late row + filter-outcome table (real numbers) + lookback fix | incremental §4 |
| `schema-change` | on_schema_change options + real currency/delete result | incremental §5 |
| `full-refresh` | reconcile SQL + repair column + bounded backfill | incremental §6 |
| `snapshot` | snapshot YAML (check strategy) + two-run history rows | incremental §7 |
| `snapshot-limits` | row (missed flip, hard_deletes table) + source-data warning | incremental §8 |
| `graph-operators` | real selector→result table + YAML selector | selection §1 |
| `test-selection` | eager/cautious table + build-order column + real skip log | selection §2 |
| `artefacts` | artefact table + run_results node (Snowflake fields) | selection §3 |
| `state-modified` | macro diff + real `state:modified` / `+` outputs | selection §4 |
| `defer` | real mixed-env compiled SQL + resolution table + warning | selection §5 |
| `threads` | real out-of-order log + row (time column, threads table) | selection §6 |
| `query-evidence` | row (evidence chain, what-each-shows table) | selection §7 |
| `retry` | real failing build + real `dbt retry` (8 of 11) | selection §8 |
| `change-path` | row (branch→prod column, reviewer table) | deployment §1 |
| `ci-schema` | CI profile output + prefix-drop macro + left-behind table | deployment §2 |
| `slim-ci` | Slim CI command + real PR-123 log + shows / does-not table | deployment §3 |
| `identities` | identity table + row (grants config, secrets column) | deployment §4 |
| `orchestration` | job-order column + real `source_status:fresher+` output | deployment §5 |
| `release-order` | row (release steps, compatible-or-not table) | deployment §6 |
| `hosted-vs-cli` | comparison table + same-either-way column | deployment §7 |
| `governance` | package-vs-project table + real Core error + telemetry flag | deployment §8 |
| `monitoring` | signals table + finance-definition test + real breach (59 vs 25) | operations §1 |
| `diagnosis` | real failed-mart log + row (where-to-look column, warehouse-state table) | operations §2 |
| `rerun-effects` | real duplicated audit rows + rerun table + code-vs-data rollback | operations §3 |
| `missed-window` | real watermark-jump timeline + backfill filter + recovery command | operations §4 |
| `upgrades` | real dbt_utils rename error + upgrade-kinds table + compiled diff | operations §5 |
| `regression` | compare script + real 9.3× timing table + prioritise band | operations §6 |
| `runbook` | row (5-step runbook, retention table) | operations §7 |
| `two-revenues` | two-reports table + revenue metric YAML + real `mf query` | metrics §1 |
| `semantic-model` | semantic model YAML + column (real by-country, real fan-out refusal) | metrics §2 |
| `alternatives` | row (product column, alternatives table) | metrics §3 |
| `decision-record` | ADR for `fct_payments` + migration-checks table | metrics §4 |
| `continuation` | row (practise column, left-out table) | metrics §5 |

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

## Layout levers that worked

- A **code card has a minimum width**; `hug: true` sizes it to its own text (narrow trees, logs).
- Scene `padding` **defaults to 0.12**; boards touching the eyebrow need 0.15–0.17.
- `cols:` on a container is re-ranked by its internal edges — use it only for edge-free grids.
- A wide-and-short board: nest two `TB` columns side by side under one `LR` group, or move a
  side node below the main chain.
- A tall board with a wide band scales **everything** down — code becomes unreadable while the
  area target still passes. Pair two bands side by side in a row group (code on top, row below);
  `npm run check:density` now fails body text under 12px.
- Slides: author to a modelled 960–1000px. Chip-heavy slides model high, so expect ~82 % rendered.

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
| board text | smallest rendered body glyph (not the 12px code caption) ≥ **12px** at 1920×1080 | one wide band scales the whole board down until code is unreadable |

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
