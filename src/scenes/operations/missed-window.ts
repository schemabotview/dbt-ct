import type { Scene } from '@graphlearning/flow'

// §9.4 — a missing watermark range, recovered. Every number is a real reconciliation after a
// dbt-core 1.12.6 run on the local target: a bogus row dated 2030 pushed max(paid_at) forward, two
// real payments were skipped, and a bounded backfill (var backfill_from) restored 9 · 59.00.
export const missedWindow: Scene = {
  id: 'missed-window',
  title: 'Recovering a missed window',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'fct_payments vs source, run by run',
      headers: ['event', 'max(paid_at)', 'table', 'source'],
      values: [
        ['baseline', '14 Oct', '7 · 39.00', '7 · 39.00'],
        ['a bad row dated 2030 loads', '2030', '8 · 40.00', '8 · 40.00'],
        ['it is deleted; 2 real payments load', '2030', '8 · 40.00', '9 · 59.00'],
        ['remove it + backfill from 1 Oct', '14 Oct', '9 · 59.00', '9 · 59.00'],
      ],
    },
    {
      id: 'backfill-filter',
      kind: 'code',
      filename: 'models/marts/fct_payments.sql   (the filter)',
      label: `{% if var('backfill_from', none) %}
  -- recovery: re-read a bounded window; unique_key merges what is already there
  where paid_at >= '{{ var("backfill_from") }}'
{% elif is_incremental() %}
  where paid_at >= (select max(paid_at) from {{ this }}) - interval '3 days'
{% endif %}`,
    },
    {
      id: 'backfill-cmd',
      kind: 'code',
      hug: true,
      filename: 'the recovery run',
      label: `dbt run -s fct_payments --vars '{backfill_from: "2026-10-01"}'`,
    },
  ],
  edges: [
    { source: 'timeline', target: 'backfill-filter', label: 'the watermark lied' },
    { source: 'backfill-filter', target: 'backfill-cmd' },
  ],
}
