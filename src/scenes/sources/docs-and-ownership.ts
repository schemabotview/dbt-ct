import type { Scene } from '@graphlearning/flow'

// §2.8 — descriptions and an owner in YAML, and what `dbt docs generate` turns them into. `meta` under
// `config:` parses on dbt-core 1.12.6 and lands in the manifest as {'owner': 'analytics-team'}.
export const docsAndOwnership: Scene = {
  id: 'docs-and-ownership',
  title: 'Documentation, ownership, lineage',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'marts-yml',
      kind: 'code',
      filename: 'models/marts/_marts.yml',
      label: `models:
  - name: fct_orders
    description: One row per order that was not returned.
    config:
      meta:
        owner: analytics-team
    columns:
      - name: order_id
        description: Primary key, from the source system.`,
    },
    {
      id: 'docs-site',
      label: 'dbt docs generate',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'manifest', label: 'Manifest', sub: 'descriptions, owners, lineage', pattern: 'service', icon: 'filecode' },
        { id: 'catalog', label: 'Catalog', sub: 'column types, read from Snowflake', pattern: 'storage', icon: 'snowflake' },
        { id: 'site', label: 'Docs site', sub: 'search + lineage graph', pattern: 'user', icon: 'globe' },
      ],
      edges: [
        { source: 'manifest', target: 'site' },
        { source: 'catalog', target: 'site' },
      ],
    },
    {
      id: 'contract',
      label: 'Source contract',
      sub: 'an agreement with the loading team',
      pattern: 'warn',
      icon: 'receipt',
    },
  ],
  edges: [
    { source: 'marts-yml', target: 'docs-site' },
    { source: 'docs-site', target: 'contract', label: 'records it — does not enforce it', dashed: true },
  ],
}
