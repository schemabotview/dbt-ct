import type { Scene } from '@graphlearning/flow'

// §9.6 — a regression that passed every test. Real dbt-core 1.12.6 runs on the local target: one
// change to dim_customers took it from 0.04s to 0.42s; the build said OK. Timings from two saved
// run_results.json files, compared by the script shown.
export const regression: Scene = {
  id: 'regression',
  title: 'Performance and cost regressions',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'compare-script',
      kind: 'code',
      filename: 'compare_runs.py   (two saved run_results.json files)',
      label: `t = lambda r: {x['unique_id'].split('.')[-1]: x['execution_time']
               for x in r['results'] if x['unique_id'].startswith('model.')}
before, after = t(old_run), t(new_run)
for model in sorted(after, key=lambda m: after[m] / before[m], reverse=True):
    print(model, before[model], after[model], after[model] / before[model])`,
    },
    {
      id: 'timings',
      kind: 'table',
      label: 'Before and after one change — build OK, tests PASS',
      headers: ['model', 'before s', 'after s', 'ratio'],
      values: [
        ['dim_customers', '0.04', '0.42', '9.3×'],
        ['stg_orders', '0.03', '0.04', '1.5×'],
        ['fct_orders', '0.09', '0.10', '1.1×'],
        ['fct_payments', '0.18', '0.18', '1.1×'],
      ],
    },
    {
      id: 'prioritise',
      label: 'When the warehouse is busy',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'pr-critical', label: 'Critical marts', sub: 'first, own warehouse', pattern: 'storage', icon: 'star' },
        { id: 'pr-rest', label: 'Everything else', sub: 'after, smaller warehouse', pattern: 'service', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'compare-script', target: 'timings' },
    { source: 'timings', target: 'prioritise' },
  ],
}
