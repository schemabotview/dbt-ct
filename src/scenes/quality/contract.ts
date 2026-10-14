import type { Scene } from '@graphlearning/flow'

// §4.6 — an enforced model contract. The YAML is written with Snowflake types; the failure table is a
// real dbt-core 1.12.6 run on the local DuckDB target (hence DuckDB's type names) after `amount` was
// cast to text. Constraint enforcement is SNOWFLAKE-SPECIFIC: only not_null is enforced.
export const contract: Scene = {
  id: 'contract',
  title: 'Model contracts',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'contract-yml',
      kind: 'code',
      filename: 'models/marts/_marts.yml   (Snowflake types)',
      label: `  - name: fct_orders
    config:
      contract:
        enforced: true
    columns:
      - name: order_id
        data_type: number
        constraints:
          - type: not_null
          - type: primary_key
      - name: customer_id
        data_type: number
      - name: order_date
        data_type: date
      - name: status
        data_type: varchar
      - name: amount
        data_type: number`,
    },
    {
      id: 'contract-error',
      kind: 'code',
      filename: 'amount cast to text — dbt build   (local run, DuckDB types)',
      label: `ERROR creating sql table model fct_orders
This model has an enforced contract that failed.
| column_name | definition_type | contract_type | mismatch_reason    |
| amount      | VARCHAR         | DOUBLE        | data type mismatch |`,
    },
    {
      id: 'enforcement',
      kind: 'table',
      label: 'Constraints on Snowflake',
      headers: ['constraint', 'Snowflake'],
      values: [
        ['not_null', 'enforced'],
        ['primary_key, unique, foreign_key', 'recorded, not enforced'],
      ],
    },
  ],
  edges: [
    { source: 'contract-yml', target: 'contract-error', label: 'checked before build' },
    { source: 'contract-error', target: 'enforcement' },
  ],
}
