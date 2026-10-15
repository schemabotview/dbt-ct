import type { Scene } from '@graphlearning/flow'

// §9.1 — four kinds of signal, and the one that catches a consumer-definition breach. Real
// dbt-core 1.12.6 run on the local target: order 6 is `refunded`, accepted_values only warns, every
// other test passes — and the finance-definition singular test fails with 59.00 against 25.00.
export const monitoring: Scene = {
  id: 'monitoring',
  title: 'What to monitor',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'signals',
      kind: 'table',
      label: 'Signals, and what each one misses',
      headers: ['signal', 'read from', 'misses'],
      values: [
        ['run status', 'run_results.json', 'a green run with wrong numbers'],
        ['source freshness', 'sources.json', 'a partial load'],
        ['data tests', 'test results', 'rules nobody wrote'],
        ['consumer health', 'a business check', 'only what you agreed to check'],
      ],
    },
    {
      id: 'finance-test',
      kind: 'code',
      filename: 'tests/assert_revenue_matches_finance_definition.sql',
      label: `-- Finance counts revenue only for completed and shipped orders.
select
    sum(amount)                                                       as mart_revenue,
    sum(case when status in ('completed', 'shipped') then amount end) as finance_revenue
from {{ ref('fct_orders') }}
having sum(amount) != sum(case when status in ('completed', 'shipped') then amount end)`,
    },
    {
      id: 'breach',
      kind: 'table',
      label: 'FAIL 1 — every other test passed',
      headers: ['mart_revenue', 'finance_revenue', 'difference'],
      values: [['59.00', '25.00', 'order 6 (refunded) and order 5 (placed)']],
    },
  ],
  edges: [
    { source: 'signals', target: 'finance-test', label: 'consumer health, as a test' },
    { source: 'finance-test', target: 'breach' },
  ],
}
