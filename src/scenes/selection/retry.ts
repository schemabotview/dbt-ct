import type { Scene } from '@graphlearning/flow'

// §7.8 — partial failure and retry. Real dbt-core 1.12.6 runs: a typo in stg_payments failed one node
// and skipped seven; after the fix, `dbt retry` re-ran exactly those eight, not all eleven.
export const retry: Scene = {
  id: 'retry',
  title: 'Partial failures and retry',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'retry-before',
      kind: 'code',
      filename: '$ dbt build   (11 nodes)',
      label: `OK    stg_customers · stg_orders · payment_methods (seed)
ERROR stg_payments                     -- a typo: paymnet_method
SKIP  fct_payments · fct_orders · dim_customers · 4 tests
Done. PASS=3 WARN=0 ERROR=1 SKIP=7 TOTAL=11`,
    },
    {
      id: 'retry-after',
      kind: 'code',
      filename: '$ dbt retry   (after fixing the typo)',
      label: `1 of 8 OK created sql view model dbt_alice.stg_payments
…
Done. PASS=7 WARN=1 ERROR=0 SKIP=0 TOTAL=8`,
    },
    {
      id: 'retry-reads',
      label: 'retry reads',
      sub: 'the last run_results.json',
      pattern: 'warn',
      icon: 'filecode',
    },
  ],
  edges: [
    { source: 'retry-before', target: 'retry-after', label: 'only the failed and skipped' },
    { source: 'retry-after', target: 'retry-reads', dashed: true },
  ],
}
