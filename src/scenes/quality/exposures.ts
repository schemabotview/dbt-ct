import type { Scene } from '@graphlearning/flow'

// §4.5 — declaring a consumer. The exposure parses on dbt-core 1.12.6 and lands in the manifest
// depending on fct_orders and dim_customers. The ls card is real `dbt ls` output (16 lines, trimmed).
export const exposures: Scene = {
  id: 'exposures',
  title: 'Exposures and discovery',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'exposure-yml',
      kind: 'code',
      filename: 'models/marts/_exposures.yml',
      label: `exposures:
  - name: revenue_dashboard
    type: dashboard
    maturity: high
    owner:
      name: Finance analytics
      email: finance-analytics@example.com
    depends_on:
      - ref('fct_orders')
      - ref('dim_customers')`,
    },
    {
      id: 'lineage',
      label: 'Lineage, now with its consumer',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'e-fct', label: 'Order facts', sub: 'fct_orders', pattern: 'storage', icon: 'table' },
        { id: 'e-dim', label: 'Customers', sub: 'dim_customers', pattern: 'storage', icon: 'users' },
        { id: 'dashboard', label: 'Revenue dashboard', sub: 'exposure — owner: Finance', pattern: 'user', icon: 'barchart' },
      ],
      edges: [
        { source: 'e-fct', target: 'e-dim' },
        { source: 'e-dim', target: 'dashboard' },
      ],
    },
    {
      id: 'exposure-select',
      kind: 'code',
      hug: true,
      filename: '$ dbt ls -s +exposure:revenue_dashboard   (excerpt)',
      label: `exposure:shop.revenue_dashboard
shop.marts.dim_customers
shop.marts.fct_orders
shop.intermediate.int_order_payments
shop.staging.stg_orders
shop.staging.stg_payments
shop.staging.stg_customers
source:shop.shop.orders
…  + 3 sources, 5 data tests, 1 unit test`,
    },
  ],
  edges: [
    { source: 'exposure-yml', target: 'lineage' },
    { source: 'lineage', target: 'exposure-select' },
  ],
}
