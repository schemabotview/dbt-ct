import type { Scene } from '@graphlearning/flow'

// §4.1 — the four built-in generic tests on fct_orders. Parsed and run on dbt-core 1.12.6 with
// arguments nested under `arguments:` (the top-level form raises
// MissingArgumentsPropertyInGenericTestDeprecation). All four passed on the course data.
export const genericTests: Scene = {
  id: 'generic-tests',
  title: 'Generic data tests',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'tests-yml',
      kind: 'code',
      filename: 'models/marts/_marts.yml',
      label: `  - name: fct_orders
    columns:
      - name: order_id
        data_tests: [unique, not_null]
      - name: customer_id
        data_tests:
          - relationships:
              arguments:
                to: ref('dim_customers')
                field: customer_id
      - name: status
        data_tests:
          - accepted_values:
              arguments:
                values: ['placed', 'shipped', 'completed']`,
    },
    {
      id: 'what-each-checks',
      kind: 'table',
      label: 'What each test asserts — all PASS on this data',
      headers: ['test', 'fails when'],
      values: [
        ['unique', 'any order_id appears twice'],
        ['not_null', 'any order_id is null'],
        ['relationships', 'a customer_id has no row in dim_customers'],
        ['accepted_values', 'a status is outside the list'],
      ],
    },
  ],
  edges: [{ source: 'tests-yml', target: 'what-each-checks', label: 'one query per test' }],
}
