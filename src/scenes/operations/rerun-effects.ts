import type { Scene } from '@graphlearning/flow'

// §9.3 — a build is not one transaction. Real dbt-core 1.12.6 runs: an on-run-end audit insert ran in
// the failed build AND in `dbt retry` (two rows for one logical run); logic that deployed cleanly
// emptied fct_orders, reverting the code left it empty until a rebuild.
export const rerunEffects: Scene = {
  id: 'rerun-effects',
  title: 'Partial builds and side effects',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'audit-rows',
      kind: 'table',
      label: 'dbt_audit after one failure and one retry (on-run-end insert)',
      headers: ['invocation_id', 'nodes'],
      values: [
        ['c3008196…  (failed build)', '3'],
        ['8ec4776c…  (dbt retry)', '1'],
      ],
    },
    {
      id: 'rerun-table',
      kind: 'table',
      label: 'Run it again: what repeats?',
      headers: ['work', 'on a rerun'],
      values: [
        ['table / view build', 'replaced — safe'],
        ['incremental merge with unique_key', 'merged — safe'],
        ['incremental append', 'rows duplicated'],
        ['hook INSERT', 'rows duplicated'],
        ['grants config', 're-applied — safe'],
      ],
    },
    {
      id: 'rollback',
      kind: 'table',
      label: 'Rolling back code',
      headers: ['step', 'fct_orders rows'],
      values: [
        ['bad filter deployed, run OK', '0'],
        ['code reverted in git', '0 — data untouched'],
        ['rebuilt from reverted code', 'restored'],
      ],
    },
  ],
  edges: [
    { source: 'audit-rows', target: 'rerun-table' },
    { source: 'rerun-table', target: 'rollback' },
  ],
}
