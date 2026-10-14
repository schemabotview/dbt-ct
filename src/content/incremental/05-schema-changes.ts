import type { Section } from '../types'

// §6.5 — updates, deletes, schema changes, and historical-column backfills.
export const schemaChanges: Section = {
  id: 'schema-changes',
  title: 'Schema changes and deletes',
  scene: 'schema-change',
  focus: 'osc-result',
  slide: `## Schema changes and deletes

An incremental table outlives many versions of its SQL. Changes to its **columns** and **deletes** at the source need a plan.

### A new column: \`currency\`
- Left at \`ignore\`, the default, the column was **silently dropped**
- With \`append_new_columns\`, it appeared, but filled only for rows the lookback **re-read**
- Older rows stay NULL. \`on_schema_change\` never backfills history

### A deleted row
Payment 2 was deleted at the source. The incremental run never reads the past, so it **stayed** in the table.

### What to do
Backfill a new column with a full refresh. Handle deletes explicitly: a soft-delete flag from the source, or a periodic rebuild.`,
  narration:
    "An incremental table outlives many versions of the SQL that builds it, so changes to its columns, and deletions upstream, need a plan. We added a currency column to the payments model. With on schema change left at its default, ignore, the new column was simply left out of the table. No error, no warning, just missing. With append new columns, the column appeared in the table, but look at which rows have a value. Only the rows that this run happened to re-read through its lookback window got a currency. Everything older is null. on schema change changes the table's shape; it never backfills history. Deletes are the other gap. We deleted payment two at the source. An incremental run only reads recent rows, so it never noticed, and payment two is still in the table, contributing to every total. Neither problem fixes itself. To fill a new column for every row, run a full refresh. For deletes, handle them explicitly, for example with a soft-delete flag from the source that the model can filter on, or with a periodic full rebuild.",
}
