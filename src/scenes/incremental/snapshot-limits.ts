import type { Scene } from '@graphlearning/flow'

// §6.8 — what snapshots cannot see. Real dbt-core 1.12.6 runs: Ben went UK → FR → UK between two
// snapshot runs and left no trace; Dev was deleted and, under invalidate, got a dbt_valid_to; under
// new_record a second row with dbt_is_deleted = True appeared.
export const snapshotLimits: Scene = {
  id: 'snapshot-limits',
  title: 'What snapshots cannot see',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'between-runs-row',
      label: 'Two blind spots',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'between-runs',
          label: 'Between two snapshot runs',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'ben-fr', label: 'Ben → FR', sub: 'changed…', pattern: 'network', icon: 'globe' },
            { id: 'ben-uk', label: 'Ben → UK', sub: '…and back', pattern: 'network', icon: 'globe' },
            { id: 'run-sees', label: 'Run 2 sees', sub: 'UK — no change at all', pattern: 'warn', icon: 'circleslash' },
          ],
          edges: [
            { source: 'ben-fr', target: 'ben-uk' },
            { source: 'ben-uk', target: 'run-sees' },
          ],
        },
        {
          id: 'hard-deletes',
          kind: 'table',
          label: 'hard_deletes — Dev was deleted at the source',
          headers: ['setting', 'Dev in the snapshot'],
          values: [
            ['ignore (default)', 'stays current forever'],
            ['invalidate', 'row closed: dbt_valid_to is set'],
            ['new_record', 'new row with dbt_is_deleted = True'],
          ],
        },
      ],
    },
    {
      id: 'irreplaceable',
      label: 'It is source data',
      sub: 'drop it: history gone',
      pattern: 'warn',
      icon: 'trash',
    },
  ],
  edges: [
    { source: 'between-runs-row', target: 'irreplaceable' },
  ],
}
