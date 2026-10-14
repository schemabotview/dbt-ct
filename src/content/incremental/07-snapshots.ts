import type { Section } from '../types'

// §6.7 — snapshots, SCD history, timestamp/check strategies, and observed changes.
export const snapshots: Section = {
  id: 'snapshots',
  title: 'Snapshots',
  scene: 'snapshot',
  focus: 'snapshot-rows',
  slide: `## Snapshots

Course 3 left a gap: raw customers keep only today's country. A **snapshot** keeps every version it sees.

### How it records history
- Each run compares the source with the latest version it holds
- A change **closes** the old row (\`dbt_valid_to\`) and **opens** a new one
- Ana's move: a UK row ending at run 2, and a current DE row

### Two strategies
- **timestamp**: trust an \`updated_at\` column to say what changed
- **check**: compare the \`check_cols\` values. Used here: no \`updated_at\` exists

### What the dates mean
\`dbt_valid_from\` is when the snapshot **noticed**, not when Ana moved. Join on it with that in mind.

Defined in YAML, run with \`dbt snapshot\`, or by \`dbt build\`.`,
  narration:
    "Course three left a gap. The raw customers table keeps only today's country, so history is lost the moment it changes. A snapshot keeps it. Every time it runs, a snapshot compares the source with the latest version it already holds. When a row has changed, it closes the old version by setting dbt valid to, and opens a new version with dbt valid from. We ran it twice, with Ana moving from the UK to Germany in between. The snapshot now holds a UK row that ends at the second run, and a current row for Germany, while Ben and Chi each have a single current row. There are two ways to detect a change. The timestamp strategy trusts an updated at column on the source. The check strategy compares the values of chosen columns directly, which we used here because the raw table has no updated at column. Be careful with the dates. dbt valid from records when the snapshot noticed the change, not when Ana actually moved. Snapshots are defined in YAML, and run with dbt snapshot, or as part of dbt build.",
}
