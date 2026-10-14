import type { Scene } from '@graphlearning/flow'

// §3.4 — one select, three materializations. The ephemeral card is real `dbt compile` output for
// fct_orders on dbt-core 1.12.6 / dbt-snowflake 1.12.3: int_order_payments is inlined as a CTE.
export const threeMaterializations: Scene = {
  id: 'three-materializations',
  title: 'View, table, ephemeral',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'kinds',
      label: "materialized='…'",
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'as-view', label: 'view', sub: 'stores the query; runs when read', pattern: 'service', icon: 'search' },
        { id: 'as-table', label: 'table', sub: 'stores the rows; rebuilt each run', pattern: 'storage', icon: 'table' },
        { id: 'as-ephemeral', label: 'ephemeral', sub: 'nothing created; inlined as a CTE', pattern: 'external', icon: 'copy' },
      ],
    },
    {
      id: 'inlined',
      kind: 'code',
      filename: 'target/compiled/…/fct_orders.sql   (int_order_payments is ephemeral)',
      label: `with __dbt__cte__int_order_payments as (
select order_id, count(*) as payment_count, sum(amount) as amount
from analytics.dbt_alice.stg_payments
group by order_id
) select
    o.order_id, o.customer_id, o.order_date, o.status,
    coalesce(p.amount, 0) as amount
from analytics.dbt_alice.stg_orders as o
left join __dbt__cte__int_order_payments as p
    on o.order_id = p.order_id
where o.status != 'returned'`,
    },
  ],
  edges: [{ source: 'as-ephemeral', target: 'inlined', label: 'compiled into its dependants' }],
}
