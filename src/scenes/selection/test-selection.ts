import type { Scene } from '@graphlearning/flow'

// §7.2 — tests come along indirectly. Real dbt-core 1.12.6 `dbt ls -s fct_orders --resource-type test`
// with the default (eager) and with --indirect-selection cautious; and a real `dbt build` showing the
// skip chain after an error.
export const testSelection: Scene = {
  id: 'test-selection',
  title: 'Selected resources and tests',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'indirect',
      kind: 'table',
      label: 'dbt ls -s fct_orders --resource-type test',
      headers: ['test on fct_orders', 'eager (default)', 'cautious'],
      values: [
        ['unique, not_null, accepted_values', 'selected', 'selected'],
        ['relationships → dim_customers', 'selected', 'left out'],
      ],
    },
    {
      id: 'order',
      label: 'How dbt build orders them',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'o-model', label: 'Build a model', sub: 'when its parents pass', pattern: 'storage', icon: 'table' },
        { id: 'o-tests', label: 'Run its tests', sub: 'right after it', pattern: 'service', icon: 'circlecheck' },
        { id: 'o-next', label: 'Then its children', sub: 'or SKIP them on error', pattern: 'warn', icon: 'circleslash' },
      ],
      edges: [
        { source: 'o-model', target: 'o-tests' },
        { source: 'o-tests', target: 'o-next' },
      ],
    },
    {
      id: 'skip-log',
      kind: 'code',
      filename: '$ dbt build   (a typo in stg_payments — excerpt)',
      label: `ERROR creating sql view model dbt_alice.stg_payments
SKIP relation dbt_alice_marts.fct_payments
SKIP relation dbt_alice_marts.fct_orders due to ephemeral model status 'skipped'
SKIP relation dbt_alice_marts.dim_customers
Done. PASS=3 WARN=0 ERROR=1 SKIP=7`,
    },
  ],
  edges: [
    { source: 'indirect', target: 'order' },
    { source: 'order', target: 'skip-log' },
  ],
}
