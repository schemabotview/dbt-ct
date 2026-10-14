import type { Scene } from '@graphlearning/flow'

// §2.6 — staging / intermediate / marts as an organising pattern, with this project's models in each.
// int_order_payments is named here and built in course 3. Staging is a 2×2 grid over the two later
// layers side by side, which keeps the board near the pane's ~1:1 aspect.
export const modelLayers: Scene = {
  id: 'model-layers',
  title: 'Staging, intermediate, marts',
  flow: 'TB',
  nodes: [
    {
      id: 'staging',
      label: 'Staging — one per source table',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-stg-orders', label: 'Orders', sub: 'stg_orders', pattern: 'service', icon: 'table' },
        { id: 'l-stg-payments', label: 'Payments', sub: 'stg_payments', pattern: 'service', icon: 'table' },
        { id: 'l-stg-customers', label: 'Customers', sub: 'stg_customers', pattern: 'service', icon: 'table' },
        { id: 'stg-rules', label: 'Rename, cast, clean', sub: 'no joins · views', pattern: 'external', icon: 'wrench' },
      ],
    },
    {
      id: 'downstream',
      label: 'Built on staging',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'intermediate',
          label: 'Intermediate — reusable steps',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'l-int', label: 'Order payments', sub: 'int_order_payments', pattern: 'network', icon: 'merge' },
            { id: 'int-rules', label: 'Joins, reshaping', sub: 'not for consumers', pattern: 'external', icon: 'workflow' },
          ],
        },
        {
          id: 'marts',
          label: 'Marts — what people query',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'l-fct-orders', label: 'Order facts', sub: 'fct_orders', pattern: 'storage', icon: 'barchart' },
            { id: 'l-dim-customers', label: 'Customers', sub: 'dim_customers', pattern: 'storage', icon: 'users' },
            { id: 'mart-rules', label: 'Business entities', sub: 'documented · tables', pattern: 'external', icon: 'shieldcheck' },
          ],
        },
      ],
      edges: [{ source: 'intermediate', target: 'marts' }],
    },
  ],
  edges: [{ source: 'staging', target: 'downstream' }],
}
