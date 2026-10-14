import type { Scene } from '@graphlearning/flow'

// §2.1 — the project tree beside the four places a materialization can come from. The precedence
// chain is verified on dbt-core 1.12.6: a model set to `table` by folder, `view` in its properties
// YAML and `ephemeral` in its own config() parsed as ephemeral; with nothing set, a model is a view.
// The tree carries no comments so it stays narrow — the chain beside it does the labelling.
export const projectLayout: Scene = {
  id: 'project-layout',
  title: 'Project layout and configuration precedence',
  flow: 'LR',
  nodes: [
    {
      id: 'tree',
      kind: 'code',
      hug: true,
      filename: 'shop/',
      label: `dbt_project.yml
models/
  staging/
    _sources.yml
    stg_orders.sql
    stg_payments.sql
    stg_customers.sql
  marts/
    _marts.yml
    fct_orders.sql
seeds/
  payment_methods.csv
macros/
snapshots/
tests/
analyses/
target/`,
    },
    {
      id: 'precedence',
      label: 'Most specific wins',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'default', label: 'dbt default', sub: 'a model is a view', pattern: 'external', icon: 'box' },
        { id: 'folder', label: 'Project file', sub: 'folder: +materialized', pattern: 'storage', icon: 'folder' },
        { id: 'properties', label: 'Properties YAML', sub: 'config: on the model', pattern: 'service', icon: 'filecode' },
        { id: 'in-file', label: 'In-file config()', sub: 'top of the .sql — wins', pattern: 'warn', icon: 'star' },
      ],
      edges: [
        { source: 'default', target: 'folder', label: 'overridden by' },
        { source: 'folder', target: 'properties', label: 'overridden by' },
        { source: 'properties', target: 'in-file', label: 'overridden by' },
      ],
    },
  ],
  edges: [{ source: 'tree', target: 'precedence', label: 'config' }],
}
