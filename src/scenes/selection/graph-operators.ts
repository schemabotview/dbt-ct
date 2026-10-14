import type { Scene } from '@graphlearning/flow'

// §7.1 — graph and set operators. Every result is real `dbt ls --resource-type model` output on
// dbt-core 1.12.6 for the course project; the YAML selector parsed and listed the five models shown.
export const graphOperators: Scene = {
  id: 'graph-operators',
  title: 'Graph operators and selectors',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'operator-table',
      kind: 'table',
      label: 'dbt ls -s …   (models selected)',
      headers: ['selector', 'means', 'selects'],
      values: [
        ['stg_orders+', 'it + all descendants', '3: + fct, dim'],
        ['+fct_orders', 'it + all ancestors', '4: + int, 2 staging'],
        ['1+fct_orders', 'one generation up', '3: + int, stg_orders'],
        ['@stg_orders', 'descendants + their parents', 'all 6 models'],
        ['stg_orders+,marts', 'intersection (comma)', '2: fct, dim'],
      ],
    },
    {
      id: 'selector-yml',
      kind: 'code',
      filename: 'selectors.yml   → dbt build --selector orders_pipeline',
      label: `selectors:
  - name: orders_pipeline
    description: Everything order facts need, and everything built on them.
    definition:
      union:
        - method: fqn
          value: fct_orders
          parents: true
          children: true
        - exclude:
            - method: resource_type
              value: snapshot`,
    },
  ],
  edges: [{ source: 'operator-table', target: 'selector-yml', label: 'name it once, reuse it' }],
}
