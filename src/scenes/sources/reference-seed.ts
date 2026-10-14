import type { Scene } from '@graphlearning/flow'

// §2.5 — a seed: a small CSV in git that dbt loads as a table. The log line is a real `dbt seed` run
// on dbt-core 1.12.6 (DuckDB target), shown with the Snowflake dev schema name.
export const referenceSeed: Scene = {
  id: 'reference-seed',
  title: 'A seed for bounded reference data',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'csv',
      kind: 'code',
      filename: 'seeds/payment_methods.csv',
      label: `payment_method,label,is_card
credit_card,Credit card,true
coupon,Coupon,false
bank_transfer,Bank transfer,false
gift_card,Gift card,false`,
    },
    {
      id: 'seed-log',
      kind: 'code',
      filename: '$ dbt seed   (illustrative)',
      label: `1 of 1 OK loaded seed file dbt_alice.payment_methods   [INSERT 4]
-- then, in any model:   {{ ref('payment_methods') }}`,
    },
    {
      id: 'seed-or-source',
      kind: 'table',
      label: 'Seed or ingestion?',
      headers: ['the data is…', 'use'],
      values: [
        ['small, edited by people, reviewed in git', 'seed'],
        ['a lookup that changes a few times a year', 'seed'],
        ['produced by an application', 'source'],
        ['large, growing, or personal data', 'source'],
      ],
    },
  ],
  edges: [
    { source: 'csv', target: 'seed-log', label: 'dbt seed' },
    { source: 'seed-log', target: 'seed-or-source' },
  ],
}
