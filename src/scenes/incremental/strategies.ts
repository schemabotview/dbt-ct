import type { Scene } from '@graphlearning/flow'

// §6.3 — SNOWFLAKE-SPECIFIC strategy list. From dbt-snowflake 1.12.3: valid_incremental_strategies is
// append, merge, delete+insert, microbatch, insert_overwrite; the default is merge; and Snowflake's
// INSERT OVERWRITE clears the whole table (insert_overwrite.sql), not one partition.
export const strategies: Scene = {
  id: 'strategies',
  title: 'unique_key and strategies',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'strategy-table',
      kind: 'table',
      label: 'incremental_strategy on dbt-snowflake 1.12',
      headers: ['strategy', 'what it does with new rows', 'needs'],
      values: [
        ['merge (default)', 'update matching keys, insert the rest', 'unique_key'],
        ['delete+insert', 'delete matching keys, then insert', 'unique_key'],
        ['append', 'insert everything — no matching', '—'],
        ['microbatch', 'rebuild one time batch at a time', 'event_time, batch_size'],
        ['insert_overwrite', 'Snowflake: replaces the WHOLE table', '—'],
      ],
    },
    {
      id: 'key-is-not',
      label: 'unique_key is not',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'not-test', label: 'A test', sub: 'it checks nothing', pattern: 'warn', icon: 'ban' },
        { id: 'not-constraint', label: 'A constraint', sub: 'Snowflake enforces none', pattern: 'warn', icon: 'ban' },
        { id: 'is-match', label: 'A match rule', sub: 'which rows to update', pattern: 'service', icon: 'merge' },
      ],
    },
  ],
  edges: [{ source: 'strategy-table', target: 'key-is-not' }],
}
