import type { Scene } from '@graphlearning/flow'

// §3.6 — where a model's cost comes from, and the SNOWFLAKE-SPECIFIC model configs that change it.
// Every key in the table is in dbt-snowflake 1.12.3's SnowflakeConfig; transient defaults to true for
// tables (parse_model.is_transient).
export const costAndConfig: Scene = {
  id: 'cost-and-config',
  title: 'Configuration and cost',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'heavy-model',
      kind: 'code',
      filename: 'models/marts/fct_orders.sql   (config block)',
      label: `{{ config(
    materialized='table',
    snowflake_warehouse='transforming_large',   -- this model only
    cluster_by=['order_date'],
    query_tag='dbt_fct_orders'
) }}`,
    },
    {
      id: 'cost-table',
      kind: 'table',
      label: 'Snowflake-specific configs and what they change',
      headers: ['config', 'changes', 'default'],
      values: [
        ['snowflake_warehouse', 'compute size for one model', 'profile warehouse'],
        ['transient', 'storage: no Fail-safe period', 'true for tables'],
        ['cluster_by', 'pruning on large tables', 'none'],
        ['query_tag', 'cost attribution in history', 'none'],
      ],
    },
    {
      id: 'when-paid',
      label: 'When the cost lands',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'paid-build', label: 'table', sub: 'paid at build time', pattern: 'storage', icon: 'table' },
        { id: 'paid-read', label: 'view', sub: 'paid on every read', pattern: 'service', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'heavy-model', target: 'cost-table' },
    { source: 'cost-table', target: 'when-paid' },
  ],
}
