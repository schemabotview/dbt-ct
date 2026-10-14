import type { Scene } from '@graphlearning/flow'

// §1 — where dbt sits in ELT. Two bands: the load path dbt does NOT own (top) and the transform path
// it does (bottom). The raw tables are the hand-off between them, which is the whole point of the
// section: dbt starts from data something else already loaded. Load runs down, transform runs back
// up (BT), so the raw → dbt hand-off is one short horizontal hop instead of a diagonal.
export const eltPipeline: Scene = {
  id: 'elt-pipeline',
  title: 'Extract and load, then transform',
  flow: 'LR',
  nodes: [
    {
      id: 'load',
      label: 'Extract + load — not dbt',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'apps', label: 'Shop app', sub: 'orders, payments, customers', pattern: 'external', icon: 'globe' },
        { id: 'ingest', label: 'Ingestion tool', sub: 'copies rows as-is', pattern: 'network', icon: 'workflow' },
        { id: 'raw', label: 'Raw tables', sub: 'raw.shop.orders', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'apps', target: 'ingest', label: 'extract' },
        { source: 'ingest', target: 'raw', label: 'load' },
      ],
    },
    {
      id: 'transform',
      label: 'Transform — dbt, in Snowflake',
      pattern: 'group',
      flow: 'BT',
      children: [
        { id: 'dbt', label: 'dbt models', sub: 'select statements in git', pattern: 'service', icon: 'code' },
        { id: 'marts', label: 'Trusted tables', sub: 'tested, documented', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'bi', label: 'Consumers', sub: 'dashboards, analysts', pattern: 'user', icon: 'barchart' },
      ],
      edges: [
        { source: 'dbt', target: 'marts', label: 'create' },
        { source: 'marts', target: 'bi', label: 'query' },
      ],
    },
  ],
  edges: [{ source: 'raw', target: 'dbt', label: 'select from' }],
}
