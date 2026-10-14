import type { Scene } from '@graphlearning/flow'

// §8.3 — Slim CI. A real dbt-core 1.12.6 run: only stg_orders changed, so state:modified+ built 3
// models and 4 tests in ci_pr_123; every unselected parent was deferred to prod.
export const slimCi: Scene = {
  id: 'slim-ci',
  title: 'Slim CI',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'slim-command',
      kind: 'code',
      hug: true,
      filename: 'the CI job',
      label: `dbt build -s state:modified+ --defer --state prod-state --target ci`,
    },
    {
      id: 'slim-log',
      kind: 'code',
      filename: 'PR 123 changed only stg_orders',
      label: `1 of 7 OK created sql view model ci_pr_123.stg_orders
2 of 7 OK created sql table model ci_pr_123_marts.fct_orders
3 of 7 WARN 1 accepted_values_fct_orders_status__placed__shipped__completed
6 of 7 OK created sql table model ci_pr_123_marts.dim_customers
Done. PASS=6 WARN=1 ERROR=0 SKIP=0 TOTAL=7`,
    },
    {
      id: 'ci-proves',
      kind: 'table',
      label: 'A green Slim CI run shows',
      headers: ['it shows', 'it does not show'],
      values: [
        ['the change compiles and builds', 'production is fresh'],
        ['its tests pass on this data', 'they pass on tomorrow’s'],
        ['against prod’s parents', 'that prod-state was current'],
        ['at CI’s data size', 'production-scale performance'],
      ],
    },
  ],
  edges: [
    { source: 'slim-command', target: 'slim-log' },
    { source: 'slim-log', target: 'ci-proves' },
  ],
}
