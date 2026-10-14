import type { Scene } from '@graphlearning/flow'

// §5.7 — Jinja that touches the database. Real dbt-core 1.12.6 behaviour: a run_query at compile
// time baked its result (6) into the compiled SQL; run-operation logged "stg_orders rows: 6"; the
// post_hook and grants configs both land in the manifest.
export const sideEffects: Scene = {
  id: 'side-effects',
  title: 'Hooks, operations, run_query',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'baked',
      kind: 'code',
      filename: 'run_query at compile time → the compiled SQL',
      label: `{% set n = run_query("select count(*) from " ~ ref('stg_orders')) %}
...
select 6 as order_count          -- the answer was frozen at compile time`,
    },
    {
      id: 'effects',
      kind: 'table',
      label: 'Ways Jinja reaches the database',
      headers: ['tool', 'runs', 'use it for'],
      values: [
        ['run_query()', 'while compiling', 'reading metadata to shape SQL'],
        ['pre_hook / post_hook', 'before / after a model', 'statements tied to one model'],
        ['on-run-start / -end', 'once per invocation', 'audit rows, housekeeping'],
        ['dbt run-operation', 'one macro, on demand', 'admin tasks outside a build'],
        ['grants config', 'after a model builds', 'grants — prefer it to hooks'],
      ],
    },
    {
      id: 'guard',
      label: '{% if execute %}',
      sub: 'skips it at parse — not at compile',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'baked', target: 'effects' },
    { source: 'effects', target: 'guard' },
  ],
}
