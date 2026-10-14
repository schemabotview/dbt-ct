import type { Scene } from '@graphlearning/flow'

// §7.4 — state comparison. Real dbt-core 1.12.6 runs: a production manifest saved to prod-state/,
// then only the cents_to_dollars macro changed; state:modified picked stg_payments (it calls the
// macro) and state:modified+ added everything downstream.
export const stateModified: Scene = {
  id: 'state-modified',
  title: 'State comparison',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'macro-diff',
      kind: 'code',
      filename: 'the only change: macros/cents_to_dollars.sql',
      label: `- {% macro cents_to_dollars(column_name, scale=2) %}
+ {% macro cents_to_dollars(column_name, scale=3) %}`,
    },
    {
      id: 'state-results',
      label: 'Compared with prod-state/manifest.json',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'modified-only',
          kind: 'code',
          hug: true,
          filename: '$ dbt ls -s state:modified --state prod-state',
          label: `shop.staging.stg_payments`,
        },
        {
          id: 'modified-plus',
          kind: 'code',
          hug: true,
          filename: '$ dbt ls -s state:modified+ --state prod-state',
          label: `shop.staging.stg_payments
shop.intermediate.int_order_payments
shop.marts.fct_payments
shop.marts.fct_orders
shop.marts.dim_customers`,
        },
      ],
    },
    {
      id: 'state-is',
      label: 'State is a manifest',
      sub: 'project files, not warehouse rows',
      pattern: 'warn',
      icon: 'filecode',
    },
  ],
  edges: [
    { source: 'macro-diff', target: 'state-results' },
    { source: 'state-results', target: 'state-is' },
  ],
}
