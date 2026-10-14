import type { Scene } from '@graphlearning/flow'

// §4.7 — two versions of fct_orders while consumers migrate. Parsed on dbt-core 1.12.6 with the
// course's dev target: relations get a _v1 / _v2 suffix, an unpinned ref resolves to latest_version
// with a warning, and deprecation_date (a version property) warns every reference.
export const modelVersions: Scene = {
  id: 'model-versions',
  title: 'Versions, access, deprecation',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'versions-yml',
      kind: 'code',
      filename: 'models/marts/_marts.yml',
      label: `  - name: fct_orders
    latest_version: 1
    config:
      access: public
    versions:
      - v: 1
        defined_in: fct_orders
        deprecation_date: 2026-12-31
      - v: 2                      # amount renamed amount_total
        columns:
          - include: all
            exclude: [amount]
          - name: amount_total`,
    },
    {
      id: 'resolves',
      kind: 'table',
      label: 'How refs resolve',
      headers: ['in the code', 'builds from'],
      values: [
        ["ref('fct_orders')", 'dbt_alice_marts.fct_orders_v1 + warning'],
        ["ref('fct_orders', v=1)", 'dbt_alice_marts.fct_orders_v1'],
        ["ref('fct_orders', v=2)", 'dbt_alice_marts.fct_orders_v2'],
      ],
    },
    {
      id: 'access-levels',
      label: 'access:',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'private', label: 'private', sub: 'its own group only', pattern: 'warn', icon: 'lock' },
        { id: 'protected', label: 'protected', sub: 'this project — default', pattern: 'service', icon: 'shieldcheck' },
        { id: 'public', label: 'public', sub: 'other projects too', pattern: 'external', icon: 'globe' },
      ],
    },
  ],
  edges: [
    { source: 'versions-yml', target: 'resolves' },
    { source: 'resolves', target: 'access-levels' },
  ],
}
