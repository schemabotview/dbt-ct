import type { Scene } from '@graphlearning/flow'

// §2.4 — the project's DAG as dbt infers it from source() and ref(), plus how each name resolves per
// target. Relations are from the 1.12.6 manifest for the dev and prod targets in the course profile.
// Leaf labels are human words; the relation names live in `sub` (snake_case does not wrap).
export const shopDag: Scene = {
  id: 'shop-dag',
  title: 'The DAG dbt infers',
  flow: 'TB',
  nodes: [
    {
      id: 'dag',
      label: 'Built from source() and ref() calls',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'src-orders', label: 'Raw orders', sub: 'source', pattern: 'external', icon: 'database' },
        { id: 'src-payments', label: 'Raw payments', sub: 'source', pattern: 'external', icon: 'database' },
        { id: 'src-customers', label: 'Raw customers', sub: 'source', pattern: 'external', icon: 'database' },
        { id: 'stg-orders', label: 'Orders', sub: 'stg_orders', pattern: 'service', icon: 'table' },
        { id: 'stg-payments', label: 'Payments', sub: 'stg_payments', pattern: 'service', icon: 'table' },
        { id: 'stg-customers', label: 'Customers', sub: 'stg_customers', pattern: 'service', icon: 'table' },
        { id: 'fct-orders', label: 'Order facts', sub: 'fct_orders', pattern: 'storage', icon: 'barchart' },
      ],
      edges: [
        { source: 'src-orders', target: 'stg-orders' },
        { source: 'src-payments', target: 'stg-payments' },
        { source: 'src-customers', target: 'stg-customers' },
        { source: 'stg-orders', target: 'fct-orders', label: 'ref' },
      ],
    },
    {
      id: 'resolution',
      kind: 'table',
      label: 'One name, a relation per target',
      headers: ['in the code', 'target dev', 'target prod'],
      values: [
        ["source('shop','orders')", 'raw.shop.orders', 'raw.shop.orders'],
        ["ref('stg_orders')", 'analytics.dbt_alice.stg_orders', 'analytics.prod.stg_orders'],
      ],
    },
  ],
  edges: [{ source: 'dag', target: 'resolution' }],
}
