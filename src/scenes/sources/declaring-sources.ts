import type { Scene } from '@graphlearning/flow'

// §2.2 — declare once, reference by name. The compiled card is real `dbt compile` output on
// dbt-core 1.12.6 / dbt-snowflake 1.12.3.
export const declaringSources: Scene = {
  id: 'declaring-sources',
  title: 'Declaring and referencing a source',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'sources-yml',
      kind: 'code',
      filename: 'models/staging/_sources.yml',
      label: `sources:
  - name: shop
    description: Raw tables loaded by the ingestion team.
    database: raw
    schema: shop
    tables:
      - name: orders
      - name: payments
      - name: customers`,
    },
    {
      id: 'stg-orders',
      kind: 'code',
      filename: 'models/staging/stg_orders.sql',
      label: `select
    id                       as order_id,
    user_id                  as customer_id,
    cast(order_date as date) as order_date,
    lower(status)            as status
from {{ source('shop', 'orders') }}`,
    },
    {
      id: 'compiled',
      kind: 'code',
      filename: 'target/compiled/…/stg_orders.sql',
      label: `from raw.shop.orders`,
    },
  ],
  edges: [
    { source: 'sources-yml', target: 'stg-orders', label: "source('shop', 'orders')" },
    { source: 'stg-orders', target: 'compiled', label: 'dbt compile' },
  ],
}
