import type { Scene } from '@graphlearning/flow'

// §10.1 — two numbers called revenue, and one definition. The 59.00 / 25.00 are course 9's real
// totals; the metric parses on dbt-core 1.12.6 and `mf query` (dbt-metricflow 0.15.0, local target)
// returned the rows shown — 25.00 in total, finance's number.
export const twoRevenues: Scene = {
  id: 'two-revenues',
  title: 'One definition of revenue',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'disagree',
      kind: 'table',
      label: 'Two reports, both called "revenue", same week',
      headers: ['report', 'built as', 'September'],
      values: [
        ['Sales dashboard', 'sum(amount) from fct_orders', '59.00'],
        ['Finance pack', 'completed + shipped only', '25.00'],
      ],
    },
    {
      id: 'metric-yml',
      kind: 'code',
      filename: 'models/semantic/_semantic.yml   (the metric)',
      label: `metrics:
  - name: revenue
    label: Revenue
    description: Paid revenue — completed and shipped orders only (agreed with Finance).
    type: simple
    type_params:
      measure: order_amount
    filter: |
      {{ Dimension('order__status') }} in ('completed', 'shipped')`,
    },
    {
      id: 'mf-result',
      kind: 'code',
      hug: true,
      filename: '$ mf query --metrics revenue --group-by metric_time__day',
      label: `metric_time__day       revenue
2026-09-01                  13
2026-09-03                  12`,
    },
  ],
  edges: [
    { source: 'disagree', target: 'metric-yml', label: 'agree it once' },
    { source: 'metric-yml', target: 'mf-result', label: '13 + 12 = 25.00' },
  ],
}
