import type { Section } from '../types'

// §6.1 — full rebuilds, existing targets, and is_incremental conditions.
export const isIncremental: Section = {
  id: 'is-incremental',
  title: 'Two paths through one model',
  scene: 'two-paths',
  focus: 'later-run',
  slide: `## Two paths through one model

A table rebuilds everything on every run. An **incremental** model builds everything once, then adds only what is new.

### \`is_incremental()\` is true only when
- the model is \`materialized='incremental'\`
- its table **already exists**
- the run is **not** \`--full-refresh\`

### So one file compiles two ways
- **First run, or full refresh:** no filter. A plain \`create table … as\`
- **Later runs:** the filter applies, and new rows are **merged** in on \`unique_key\`

### What it saves
Day 2 read **one** new payment, not all of them. Cost grows with what changed, not with history.

### The rule that keeps you safe
The full-rebuild path must stay **correct**. Every incremental run is an optimisation of it, and should end with the same rows.`,
  narration:
    "Every table so far was rebuilt from scratch on every run. That is simple and safe, but as payments pile up, rebuilding years of history every hour gets slow and expensive. An incremental model builds everything once, and afterwards only processes what is new. The switch is a macro called is incremental, and it is true only when three things hold: the model is materialized as incremental, its table already exists in the warehouse, and the run is not a full refresh. That means one file compiles in two different ways. On the first run, or whenever you pass dash dash full refresh, the filter disappears, and dbt creates the whole table from the full select. On later runs, the filter applies, so only payments newer than the newest one already in the table are selected, and dbt merges them in, matching on the unique key. We ran it, and the two compiled files show exactly those two paths. On the second day, the run read one new payment instead of all of them, so the cost grows with what changed, not with the size of the history. Here is the rule that keeps incremental models safe. The full-rebuild path must stay correct. Every incremental run is just an optimisation of that rebuild, and should end up with exactly the same rows.",
}
