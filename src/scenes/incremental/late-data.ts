import type { Scene } from '@graphlearning/flow'

// §6.4 — the late row and the fixes. Every row of the table is a real reconciliation after a
// dbt-core 1.12.6 run: payment 5 (paid 2 Sep, loaded 4 Sep) is missed by the max(paid_at) filter,
// caught by a 3-day lookback with merge, and duplicated everything when the lookback used append.
export const lateData: Scene = {
  id: 'late-data',
  title: 'Late data and lookback',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'late-row',
      kind: 'table',
      label: 'raw.shop.payments — the late row',
      headers: ['id', 'order_id', 'amount', 'paid_at', '_loaded_at'],
      values: [
        ['4', '4', '7.00', '3 Sep 14:00', '3 Sep 15:00'],
        ['5', '2', '3.00', '2 Sep 08:00', '4 Sep 09:00'],
      ],
    },
    {
      id: 'outcomes',
      kind: 'table',
      label: 'fct_payments vs source after day 3 (source: 5 rows · 45.00)',
      headers: ['incremental filter', 'table rows · total', 'verdict'],
      values: [
        ['paid_at > max(paid_at)', '4 · 42.00', 'payment 5 missed, run OK'],
        ['paid_at >= max − 3 days, merge', '5 · 45.00', 'caught, no duplicates'],
        ['same lookback, append', '10 · 90.00', 'every re-read row doubled'],
      ],
    },
    {
      id: 'lookback-code',
      kind: 'code',
      hug: true,
      filename: 'the fix',
      label: `{% if is_incremental() %}
  where paid_at >= (select max(paid_at) from {{ this }}) - interval '3 days'
{% endif %}   -- with unique_key='payment_id'`,
    },
  ],
  edges: [
    { source: 'late-row', target: 'outcomes', label: 'run day 3' },
    { source: 'outcomes', target: 'lookback-code' },
  ],
}
