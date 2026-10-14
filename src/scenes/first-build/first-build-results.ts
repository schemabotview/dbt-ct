import type { Scene } from '@graphlearning/flow'

// §6 — the evidence from the first build: the YAML that declared the tests, the log, and the rows.
// The rows and the PASS/OK pattern come from a real `dbt build` on dbt-core 1.12.6 against a local
// DuckDB copy of raw.shop.orders; the log is rewritten to Snowflake relation names, so the slide
// labels it illustrative.
export const firstBuildResults: Scene = {
  id: 'first-build-results',
  title: 'What the first build produced',
  flow: 'TB',
  nodes: [
    {
      id: 'tests-yml',
      kind: 'code',
      filename: 'models/marts/_marts.yml',
      label: `models:
  - name: fct_orders
    description: One row per order that was not returned.
    columns:
      - name: order_id
        description: Primary key, from the source system.
        data_tests:
          - unique
          - not_null`,
    },
    {
      id: 'build-log',
      kind: 'code',
      filename: '$ dbt build   (illustrative)',
      label: `1 of 4 OK created sql view model dbt_alice.stg_orders
2 of 4 OK created sql table model dbt_alice.fct_orders
3 of 4 PASS not_null_fct_orders_order_id
4 of 4 PASS unique_fct_orders_order_id
Done. PASS=4 WARN=0 ERROR=0 SKIP=0 TOTAL=4`,
    },
    {
      id: 'rows',
      kind: 'table',
      label: 'analytics.dbt_alice.fct_orders',
      headers: ['order_id', 'customer_id', 'order_date', 'status'],
      values: [
        ['1', '101', '2026-09-01', 'completed'],
        ['2', '102', '2026-09-01', 'shipped'],
        ['4', '103', '2026-09-03', 'completed'],
        ['5', '104', '2026-09-03', 'placed'],
      ],
    },
  ],
  edges: [
    { source: 'tests-yml', target: 'build-log', label: 'declares 2 tests' },
    { source: 'build-log', target: 'rows', label: '4 of 5 raw orders' },
  ],
}
