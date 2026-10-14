import type { Scene } from '@graphlearning/flow'

// §2.3 — freshness config, the command's output, and what each source's newest load says. The
// output is a real `dbt source freshness` run on dbt-core 1.12.6 (orders loaded 3h ago, payments 30h
// ago, customers opted out with `freshness: null`), shown without timestamps.
export const sourceFreshness: Scene = {
  id: 'source-freshness',
  title: 'Source freshness',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'freshness-yml',
      kind: 'code',
      filename: 'models/staging/_sources.yml  (excerpt)',
      label: `  - name: shop
    config:
      loaded_at_field: _loaded_at
      freshness:
        warn_after: {count: 12, period: hour}
        error_after: {count: 24, period: hour}
    tables:
      - name: orders
      - name: payments
      - name: customers
        config:
          freshness: null      # not checked`,
    },
    {
      id: 'freshness-log',
      kind: 'code',
      filename: '$ dbt source freshness',
      label: `1 of 2 PASS freshness of shop.orders
2 of 2 ERROR STALE freshness of shop.payments`,
    },
    {
      id: 'ages',
      kind: 'table',
      label: 'What max(_loaded_at) says',
      headers: ['source', 'newest load', 'status', 'proves'],
      values: [
        ['orders', '3 h ago', 'PASS', 'a load ran recently'],
        ['payments', '30 h ago', 'ERROR STALE', 'loads have stopped'],
        ['customers', '—', 'not checked', 'nothing'],
      ],
    },
  ],
  edges: [
    { source: 'freshness-yml', target: 'freshness-log' },
    { source: 'freshness-log', target: 'ages' },
  ],
}
