import type { Scene } from '@graphlearning/flow'

// §9.5 — upgrades. The error is real: dbt_utils 1.3.0 refuses the old surrogate_key macro, and says
// the replacement treats nulls differently. The deprecation is the course 4 one, real on 1.12.6.
export const upgrades: Scene = {
  id: 'upgrades',
  title: 'Upgrades',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'package-error',
      kind: 'code',
      filename: "dbt_utils 0.x → 1.3.0:  {{ dbt_utils.surrogate_key(['order_id']) }}",
      label: `Compilation Error in model legacy_key
  Warning: \`dbt_utils.surrogate_key\` has been replaced by
  \`dbt_utils.generate_surrogate_key\`. The new macro treats null values
  differently to empty strings.`,
    },
    {
      id: 'upgrade-table',
      kind: 'table',
      label: 'Four kinds of upgrade',
      headers: ['upgrading', 'can change', 'check with'],
      values: [
        ['a model’s shape', 'consumers', 'contracts, versions'],
        ['a package', 'generated SQL', 'diff target/compiled/'],
        ['the adapter', 'DDL, defaults', 'CI on a copy, release notes'],
        ['the engine (1.12 → v2)', 'parsing, behaviour', 'deprecation warnings, CI'],
      ],
    },
    {
      id: 'compiled-diff',
      kind: 'code',
      hug: true,
      filename: 'before and after any upgrade',
      label: `dbt compile && cp -r target/compiled before/
# … upgrade …
dbt compile && diff -r before/ target/compiled/`,
    },
  ],
  edges: [
    { source: 'package-error', target: 'upgrade-table' },
    { source: 'upgrade-table', target: 'compiled-diff' },
  ],
}
