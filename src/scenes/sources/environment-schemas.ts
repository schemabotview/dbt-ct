import type { Scene } from '@graphlearning/flow'

// §2.7 — where each model lands, per target. Every relation in the table is from the dbt-core 1.12.6
// manifest with the course profile's dev (schema dbt_alice) and prod (schema prod) targets and
// `+schema: marts` on the marts folder — dbt's default generate_schema_name joins the two.
export const environmentSchemas: Scene = {
  id: 'environment-schemas',
  title: 'Targets, schemas and aliases',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'schema-config',
      kind: 'code',
      filename: 'dbt_project.yml  (excerpt)',
      label: `models:
  shop:
    staging:
      +materialized: view
    marts:
      +materialized: table
      +schema: marts        # a custom schema`,
    },
    {
      id: 'landing',
      kind: 'table',
      label: 'Where each model lands',
      headers: ['model', '--target dev', '--target prod'],
      values: [
        ['stg_orders', 'analytics.dbt_alice.stg_orders', 'analytics.prod.stg_orders'],
        ['fct_orders', 'analytics.dbt_alice_marts.fct_orders', 'analytics.prod_marts.fct_orders'],
      ],
    },
    {
      id: 'alias-note',
      kind: 'code',
      filename: 'models/marts/_marts.yml  (alias, if you need one)',
      label: `  - name: fct_orders
    config:
      alias: orders     # relation name changes; ref('fct_orders') still works`,
    },
  ],
  edges: [
    { source: 'schema-config', target: 'landing', label: 'target schema + custom' },
    { source: 'landing', target: 'alias-note' },
  ],
}
