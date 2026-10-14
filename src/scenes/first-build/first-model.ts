import type { Scene } from '@graphlearning/flow'

// §4 — two models and the SQL dbt actually sends. The compiled card is real `dbt compile` output
// against the dev target in project-and-profile (dbt-core 1.12.6, dbt-snowflake 1.12.3).
export const firstModel: Scene = {
  id: 'first-model',
  title: 'A model, a ref, and the compiled SQL',
  flow: 'TB',
  nodes: [
    {
      id: 'stg-orders',
      kind: 'code',
      filename: 'models/staging/stg_orders.sql',
      label: `select
    id                       as order_id,
    user_id                  as customer_id,
    cast(order_date as date) as order_date,
    lower(status)            as status
from raw.shop.orders   -- course 2: source()`,
    },
    {
      id: 'fct-orders',
      kind: 'code',
      filename: 'models/marts/fct_orders.sql',
      label: `{{ config(materialized='table') }}

select order_id, customer_id, order_date, status
from {{ ref('stg_orders') }}
where status != 'returned'`,
    },
    {
      id: 'compiled',
      kind: 'code',
      filename: 'target/compiled/…/fct_orders.sql',
      label: `select order_id, customer_id, order_date, status
from analytics.dbt_alice.stg_orders
where status != 'returned'`,
    },
  ],
  edges: [
    { source: 'stg-orders', target: 'fct-orders', label: 'ref — a dependency' },
    { source: 'fct-orders', target: 'compiled', label: 'dbt compile' },
  ],
}
