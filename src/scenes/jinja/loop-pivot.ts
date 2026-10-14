import type { Scene } from '@graphlearning/flow'

// §5.2 — a for loop that writes four columns. Both cards are real: the compiled SQL is `dbt compile`
// on dbt-core 1.12.6 / dbt-snowflake 1.12.3, and the rows are a real build on the local target.
export const loopPivot: Scene = {
  id: 'loop-pivot',
  title: 'Variables and loops',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'loop-source',
      kind: 'code',
      filename: 'models/marts/order_payment_methods.sql',
      label: `{%- set payment_methods = ['credit_card', 'coupon', 'bank_transfer', 'gift_card'] -%}

select
    order_id,
    {%- for method in payment_methods %}
    sum(case when payment_method = '{{ method }}' then amount else 0 end)
        as {{ method }}_amount
        {{- "," if not loop.last }}
    {%- endfor %}
from {{ ref('stg_payments') }}
group by order_id`,
    },
    {
      id: 'loop-compiled',
      kind: 'code',
      filename: 'target/compiled/…/order_payment_methods.sql   (excerpt)',
      label: `    sum(case when payment_method = 'credit_card' then amount else 0 end)
        as credit_card_amount,
    sum(case when payment_method = 'coupon' then amount else 0 end)
        as coupon_amount,
    …                                           -- 4 columns, one per method`,
    },
    {
      id: 'loop-rows',
      kind: 'table',
      label: 'order_payment_methods',
      headers: ['order_id', 'credit_card', 'coupon', 'bank_transfer', 'gift_card'],
      values: [
        ['1', '10.00', '0', '0', '0'],
        ['2', '0', '20.00', '0', '0'],
        ['4', '0', '0', '5.00', '7.00'],
      ],
    },
  ],
  edges: [
    { source: 'loop-source', target: 'loop-compiled', label: 'the loop unrolls' },
    { source: 'loop-compiled', target: 'loop-rows' },
  ],
}
