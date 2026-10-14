import type { Scene } from '@graphlearning/flow'

// §7.5 — deferral. A real dbt-core 1.12.6 run of `dbt run -s fct_orders --defer --state prod-state`
// on the local targets (schema names shown as Snowflake dev/prod): stg_orders did not exist in dev,
// so it resolved to prod; a stale dev stg_payments existed, so it was used — one model, two envs.
export const defer: Scene = {
  id: 'defer',
  title: 'Deferral',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'deferred-sql',
      kind: 'code',
      filename: 'dbt run -s fct_orders --defer --state prod-state',
      label: `with __dbt__cte__int_order_payments as (
    select order_id, count(*) as payment_count, sum(amount) as amount
    from analytics.dbt_alice.stg_payments   -- dev (stale)
    group by order_id
) select …
from analytics.prod.stg_orders as o         -- prod
left join __dbt__cte__int_order_payments as p
    on o.order_id = p.order_id`,
    },
    {
      id: 'defer-rule',
      kind: 'table',
      label: 'An unselected ref resolves to…',
      headers: ['in dev it…', 'without --favor-state', 'with --favor-state'],
      values: [
        ['does not exist', 'prod', 'prod'],
        ['exists (maybe stale)', 'dev', 'prod'],
      ],
    },
    {
      id: 'defer-risk',
      label: 'Mixed environments',
      sub: 'fresh dev + old prod, in one result',
      pattern: 'warn',
      icon: 'merge',
    },
  ],
  edges: [
    { source: 'deferred-sql', target: 'defer-rule' },
    { source: 'defer-rule', target: 'defer-risk' },
  ],
}
