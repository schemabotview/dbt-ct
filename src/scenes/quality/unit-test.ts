import type { Scene } from '@graphlearning/flow'

// §4.4 — a unit test of fct_orders on fixed inputs. Real dbt-core 1.12.6 runs: it passes on the real
// model, and with the returns filter commented out it fails with the diff shown. The ephemeral input
// int_order_payments has to be given in `format: sql`.
export const unitTest: Scene = {
  id: 'unit-test',
  title: 'Unit tests',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'unit-yml',
      kind: 'code',
      filename: 'models/marts/_unit_tests.yml',
      label: `unit_tests:
  - name: fct_orders_drops_returns_and_sums_split_payments
    model: fct_orders
    given:
      - input: ref('stg_orders')
        rows:
          - {order_id: 1, customer_id: 101, order_date: 2026-09-01, status: completed}
          - {order_id: 3, customer_id: 101, order_date: 2026-09-02, status: returned}
          - {order_id: 4, customer_id: 103, order_date: 2026-09-03, status: completed}
      - input: ref('int_order_payments')     # ephemeral, so given as SQL
        format: sql
        rows: |
          select 1 as order_id, 1 as payment_count, 10.0 as amount union all
          select 4 as order_id, 2 as payment_count, 12.0 as amount
    expect:
      rows:
        - {order_id: 1, amount: 10.0}
        - {order_id: 4, amount: 12.0}`,
    },
    {
      id: 'unit-diff',
      kind: 'code',
      filename: '$ dbt test -s fct_orders,test_type:unit   (returns filter removed)',
      label: `FAIL 1 fct_orders::fct_orders_drops_returns_and_sums_split_payments
actual differs from expected:
@@ ,order_id,amount
   ,1       ,10.0
+++,3       ,Decimal('0.0')
   ,4       ,12.0`,
    },
  ],
  edges: [{ source: 'unit-yml', target: 'unit-diff', label: 'break the logic' }],
}
