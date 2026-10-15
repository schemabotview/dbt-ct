import type { Scene } from '@graphlearning/flow'

// §10.2 — a semantic model over fct_orders. Parsed on dbt-core 1.12.6; both results are real
// dbt-metricflow 0.15.0 runs on the local target: revenue by customer__country joined orders → customers
// (many-to-one), and a customer-grain metric grouped by order__status was refused as a fan-out.
export const semanticModel: Scene = {
  id: 'semantic-model',
  title: 'Entities, measures, dimensions',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'sm-yml',
      kind: 'code',
      filename: 'semantic_models: orders   (over fct_orders)',
      label: `  - name: orders
    model: ref('fct_orders')
    defaults:
      agg_time_dimension: order_date
    entities:
      - {name: order, type: primary, expr: order_id}
      - {name: customer, type: foreign, expr: customer_id}
    dimensions:
      - {name: order_date, type: time, type_params: {time_granularity: day}}
      - {name: status, type: categorical}
    measures:
      - {name: order_amount, agg: sum, expr: amount}`,
    },
    {
      id: 'sm-row',
      label: 'Joins follow the entities',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'by-country',
          kind: 'code',
          hug: true,
          filename: 'revenue by customer__country',
          label: `customer__country   revenue
UK                        3
DE                       10
FR                       12`,
        },
        {
          id: 'fan-out-refused',
          kind: 'code',
          hug: true,
          filename: 'a customer-grain metric by order__status',
          label: `ERROR: No valid join paths exist from the
measure to the group-by-item.
(fan-out join support is pending)`,
        },
      ],
    },
  ],
  edges: [{ source: 'sm-yml', target: 'sm-row', label: 'many orders → one customer' }],
}
