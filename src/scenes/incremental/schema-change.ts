import type { Scene } from '@graphlearning/flow'

// §6.5 — a new column, and a deleted row. Real dbt-core 1.12.6 runs: with on_schema_change left at
// ignore, currency was dropped; with append_new_columns it appeared, filled only for rows the 3-day
// lookback re-read; payment 2, deleted at the source, stayed in the table.
export const schemaChange: Scene = {
  id: 'schema-change',
  title: 'Schema changes and deletes',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'osc-options',
      kind: 'table',
      label: "on_schema_change — when the model's columns change",
      headers: ['value', 'new column', 'old rows'],
      values: [
        ['ignore (default)', 'silently left out', '—'],
        ['append_new_columns', 'added', 'NULL unless re-read'],
        ['sync_all_columns', 'added; removed ones dropped', 'NULL unless re-read'],
        ['fail', 'the run errors', '—'],
      ],
    },
    {
      id: 'osc-result',
      kind: 'table',
      label: 'fct_payments after adding currency (append_new_columns)',
      headers: ['payment_id', 'paid_at', 'currency', 'note'],
      values: [
        ['1', '1 Sep', 'NULL', 'not re-read'],
        ['2', '1 Sep', 'NULL', 'deleted at source — still here'],
        ['3', '3 Sep', 'EUR', 're-read by the lookback'],
        ['6', '5 Sep', 'USD', 'new row'],
      ],
    },
  ],
  edges: [{ source: 'osc-options', target: 'osc-result', label: 'a lookback is not a backfill' }],
}
