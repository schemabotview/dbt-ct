import type { Scene } from '@graphlearning/flow'

// §6.2 — the watermark at work over two days, and the two timestamps it could use. Row counts and
// totals are real reconciliation queries after each dbt-core 1.12.6 run on the local target.
export const watermark: Scene = {
  id: 'watermark',
  title: 'Watermarks',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'runs',
      kind: 'table',
      label: 'fct_payments after each run',
      headers: ['run', 'new in source', 'filter read', 'table rows · total', 'source rows · total'],
      values: [
        ['day 1', 'payments 1–3', 'everything (first run)', '3 · 35.00', '3 · 35.00'],
        ['day 2', 'payment 4', 'paid_at > 3 Sep 09:00', '4 · 42.00', '4 · 42.00'],
      ],
    },
    {
      id: 'which-time',
      label: 'Which column is the watermark?',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'event-time', label: 'paid_at', sub: 'when it happened — can arrive late', pattern: 'warn', icon: 'calendar' },
        { id: 'load-time', label: '_loaded_at', sub: 'when it arrived — only grows', pattern: 'storage', icon: 'clock' },
      ],
    },
    {
      id: 'boundary',
      label: 'The boundary',
      sub: 'rows on the wrong side are never read again',
      pattern: 'external',
      icon: 'ruler',
    },
  ],
  edges: [
    { source: 'runs', target: 'which-time' },
    { source: 'which-time', target: 'boundary' },
  ],
}
