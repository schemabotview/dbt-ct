import type { Scene } from '@graphlearning/flow'

// §3.1 — joining at the wrong grain. The rows are the real result of stg_orders left-joined to
// stg_payments (order 4 has two payments), and the log is a real `dbt build -s +fct_orders+` on
// dbt-core 1.12.6: the unique test fails and dim_customers is skipped.
export const fanOut: Scene = {
  id: 'fan-out',
  title: 'Joining at the wrong grain',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'joined-rows',
      kind: 'table',
      label: 'orders left join payments — one row per payment',
      headers: ['order_id', 'status', 'payment_id', 'amount'],
      values: [
        ['1', 'completed', '1', '10.00'],
        ['2', 'shipped', '2', '20.00'],
        ['4', 'completed', '3', '5.00'],
        ['4', 'completed', '4', '7.00'],
        ['5', 'placed', '—', '—'],
      ],
    },
    {
      id: 'fail-log',
      kind: 'code',
      filename: '$ dbt build -s +fct_orders+   (excerpt)',
      label: `FAIL 1 unique_fct_orders_order_id
SKIP relation dbt_alice_marts.dim_customers`,
    },
    {
      id: 'fix',
      kind: 'code',
      filename: 'models/intermediate/int_order_payments.sql',
      label: `-- aggregate payments to the order grain BEFORE joining
select
    order_id,
    count(*)    as payment_count,
    sum(amount) as amount
from {{ ref('stg_payments') }}
group by order_id`,
    },
  ],
  edges: [
    { source: 'joined-rows', target: 'fail-log', label: 'order 4 twice' },
    { source: 'fail-log', target: 'fix', label: 'fix the grain' },
  ],
}
