import type { Scene } from '@graphlearning/flow'

// §4.2 — a singular test: a SQL file in tests/ that returns the rows breaking a rule. Ran on
// dbt-core 1.12.6 and passed (no negative amounts); the compiled card is real `dbt compile` output.
export const singularTest: Scene = {
  id: 'singular-test',
  title: 'Singular tests',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'singular-sql',
      kind: 'code',
      filename: 'tests/assert_order_amount_not_negative.sql',
      label: `-- Returns the rows that break the rule. Zero rows = pass.
select order_id, amount
from {{ ref('fct_orders') }}
where amount < 0`,
    },
    {
      id: 'singular-compiled',
      kind: 'code',
      filename: 'target/compiled/…/assert_order_amount_not_negative.sql',
      label: `select order_id, amount
from analytics.dbt_alice_marts.fct_orders
where amount < 0`,
    },
    {
      id: 'how-judged',
      label: 'How dbt judges any test',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'runs', label: 'Run the query', sub: 'in Snowflake', pattern: 'storage', icon: 'snowflake' },
        { id: 'counts', label: 'Count the rows', sub: 'failing rows only', pattern: 'service', icon: 'hash' },
        { id: 'verdict', label: 'Verdict', sub: '0 → PASS, more → FAIL', pattern: 'user', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'runs', target: 'counts' },
        { source: 'counts', target: 'verdict' },
      ],
    },
    {
      id: 'singular-vs-generic',
      kind: 'table',
      label: 'Singular or generic?',
      headers: ['', 'singular', 'generic'],
      values: [
        ['written as', 'one .sql file', 'a macro, applied in YAML'],
        ['reused', 'no — one rule, one place', 'yes — any column'],
        ['good for', 'a business rule', 'a structural rule'],
      ],
    },
  ],
  edges: [
    { source: 'singular-sql', target: 'singular-compiled', label: 'compiled like a model' },
    { source: 'singular-compiled', target: 'how-judged' },
    { source: 'how-judged', target: 'singular-vs-generic' },
  ],
}
