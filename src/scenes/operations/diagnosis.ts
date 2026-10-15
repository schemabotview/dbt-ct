import type { Scene } from '@graphlearning/flow'

// §9.2 — upstream succeeded, the mart failed. Real dbt-core 1.12.6 run on the local target: both
// staging views built, fct_orders failed on a cast; the same error is in logs/dbt.log at debug level,
// and the statement dbt sent is in target/run/.
export const diagnosis: Scene = {
  id: 'diagnosis',
  title: 'Logs, compiled SQL, the warehouse',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'failed-log',
      kind: 'code',
      filename: '$ dbt build -s +fct_orders   (console)',
      label: `1 of 3 OK created sql view model dbt_alice.stg_orders
2 of 3 OK created sql view model dbt_alice.stg_payments
3 of 3 ERROR creating sql table model dbt_alice_marts.fct_orders
  Runtime Error in model fct_orders (models/marts/fct_orders.sql)
  Could not convert string 'completed' to INT32 when casting from source column status`,
    },
    {
      id: 'diagnose-row',
      label: 'Then, in this order',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'diagnose-steps',
          label: 'Where to look',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'd-log', label: 'logs/dbt.log', sub: 'debug detail, every query', pattern: 'service', icon: 'scroll' },
            { id: 'd-run', label: 'target/run/', sub: 'the exact statement', pattern: 'service', icon: 'filecode' },
            { id: 'd-sf', label: 'Run it yourself', sub: 'in Snowflake, as the job role', pattern: 'storage', icon: 'snowflake' },
          ],
          edges: [
            { source: 'd-log', target: 'd-run' },
            { source: 'd-run', target: 'd-sf' },
          ],
        },
        {
          id: 'diagnose-table',
          kind: 'table',
          label: 'What the warehouse holds now',
          headers: ['relation', 'state'],
          values: [
            ['stg_orders, stg_payments', 'rebuilt by this run'],
            ['fct_orders', 'previous version, intact'],
            ['dim_customers', 'never reached'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'failed-log', target: 'diagnose-row' }],
}
