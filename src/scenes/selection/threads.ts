import type { Scene } from '@graphlearning/flow'

// §7.6 — threads and the warehouse queue. The log is a real dbt-core 1.12.6 build with --threads 4:
// independent nodes start together and finish out of numeric order.
export const threads: Scene = {
  id: 'threads',
  title: 'Threads, queues and cost',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'thread-log',
      kind: 'code',
      filename: '$ dbt build --threads 4   (excerpt — note the order)',
      label: `4 of 11 OK loaded seed file dbt_alice.payment_methods
3 of 11 OK created sql view model dbt_alice.stg_payments
1 of 11 OK created sql view model dbt_alice.stg_customers
2 of 11 OK created sql view model dbt_alice.stg_orders`,
    },
    {
      id: 'where-time-goes-row',
      label: 'Time, and what threads change',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'where-time-goes',
          label: 'Where the time goes',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 't-dbt', label: 'dbt', sub: 'parse, compile — seconds', pattern: 'service', icon: 'gears' },
            { id: 't-queue', label: 'Queue', sub: 'waiting for a warehouse slot', pattern: 'warn', icon: 'clock' },
            { id: 't-run', label: 'Execution', sub: 'Snowflake runs the SQL', pattern: 'storage', icon: 'snowflake' },
          ],
          edges: [
            { source: 't-dbt', target: 't-queue' },
            { source: 't-queue', target: 't-run' },
          ],
        },
        {
          id: 'thread-effects',
          kind: 'table',
          label: 'Raising threads',
          headers: ['helps when', 'does not help when'],
          values: [
            ['many independent models', 'one long chain of dependencies'],
            ['the warehouse has spare slots', 'queries already queue'],
          ],
        },
      ],
    },
  ],
  edges: [
    { source: 'thread-log', target: 'where-time-goes-row' },
  ],
}
