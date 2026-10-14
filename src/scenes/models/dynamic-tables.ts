import type { Scene } from '@graphlearning/flow'

// §3.5 — SNOWFLAKE-SPECIFIC. Who refreshes the data: dbt on a schedule, or Snowflake itself.
// dbt-snowflake 1.12.3 ships a `dynamic_table` materialization (target_lag, snowflake_warehouse,
// refresh_mode, initialize) and does NOT implement `materialized_view` — dbt's default macro raises
// "has not been implemented for this adapter".
export const dynamicTables: Scene = {
  id: 'dynamic-tables',
  title: 'Warehouse-managed refresh',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'dt-config',
      kind: 'code',
      filename: 'models/marts/fct_daily_revenue.sql   (Snowflake only)',
      label: `{{ config(
    materialized='dynamic_table',
    snowflake_warehouse='transforming',
    target_lag='1 hour'
) }}

select order_date, sum(amount) as revenue
from {{ ref('fct_orders') }}
group by order_date`,
    },
    {
      id: 'who-refreshes',
      label: 'Who keeps it current?',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'dbt-table', label: 'table', sub: 'fresh when the next dbt run ends', pattern: 'service', icon: 'clock' },
        { id: 'dynamic', label: 'dynamic table', sub: 'Snowflake refreshes within target_lag', pattern: 'storage', icon: 'snowflake' },
      ],
    },
    {
      id: 'mv-note',
      label: 'Materialized view',
      sub: 'not implemented by dbt-snowflake',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'dt-config', target: 'who-refreshes' },
    { source: 'who-refreshes', target: 'mv-note', dashed: true },
  ],
}
