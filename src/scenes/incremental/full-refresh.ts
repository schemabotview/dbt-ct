import type { Scene } from '@graphlearning/flow'

// §6.6 — rebuilding and reconciling. The reconciliation numbers are real: after the late-row run the
// incremental table held 4 rows · 42.00 against the source's 5 · 45.00; `dbt run --full-refresh`
// restored 5 · 45.00.
export const fullRefresh: Scene = {
  id: 'full-refresh',
  title: 'Full refresh, backfill, reconcile',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'reconcile-sql',
      kind: 'code',
      filename: 'analyses/reconcile_fct_payments.sql',
      label: `select 'table'  as side, count(*) as n, sum(amount) as total
from {{ ref('fct_payments') }}
union all
select 'source', count(*), sum(amount)
from {{ ref('stg_payments') }}`,
    },
    {
      id: 'repairs',
      label: 'When they disagree',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'full-refresh-card', label: '--full-refresh', sub: 'rebuild from source: 5 · 45.00', pattern: 'storage', icon: 'repeat' },
        { id: 'backfill', label: 'Backfill a window', sub: 'vars bound the filter', pattern: 'service', icon: 'calendar' },
        { id: 'cant', label: 'Source is gone', sub: 'no rebuild — restore', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'backfill-code',
      kind: 'code',
      hug: true,
      filename: 'a bounded backfill',
      label: `dbt run -s fct_payments --vars '{backfill_from: "2026-09-01"}'
-- the model's filter reads var('backfill_from', …)`,
    },
  ],
  edges: [
    { source: 'reconcile-sql', target: 'repairs', label: 'table 4 · 42.00, source 5 · 45.00' },
    { source: 'repairs', target: 'backfill-code' },
  ],
}
