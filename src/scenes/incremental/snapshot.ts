import type { Scene } from '@graphlearning/flow'

// §6.7 — a YAML snapshot of raw customers. Real dbt-core 1.12.6 `dbt snapshot` runs (local target;
// times trimmed to run 1 / run 2): Ana's move closed one row and opened another. The schema config is
// prefixed by generate_schema_name like any other (dbt_alice_snapshots in dev).
export const snapshot: Scene = {
  id: 'snapshot',
  title: 'Snapshots',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'snapshot-yml',
      kind: 'code',
      filename: 'snapshots/customers_snapshot.yml',
      label: `snapshots:
  - name: customers_snapshot
    relation: source('shop', 'customers')
    config:
      schema: snapshots
      unique_key: id
      strategy: check          # no updated_at column, so compare values
      check_cols: [country]
      hard_deletes: invalidate`,
    },
    {
      id: 'snapshot-rows',
      kind: 'table',
      label: 'customers_snapshot after two runs',
      headers: ['id', 'first_name', 'country', 'dbt_valid_from', 'dbt_valid_to'],
      values: [
        ['101', 'Ana', 'UK', 'run 1', 'run 2'],
        ['101', 'Ana', 'DE', 'run 2', 'NULL — current'],
        ['102', 'Ben', 'UK', 'run 1', 'NULL — current'],
        ['103', 'Chi', 'FR', 'run 1', 'NULL — current'],
      ],
    },
  ],
  edges: [{ source: 'snapshot-yml', target: 'snapshot-rows', label: 'dbt snapshot, twice' }],
}
