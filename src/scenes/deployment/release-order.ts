import type { Scene } from '@graphlearning/flow'

// §8.6 — releasing a breaking change in a safe order, using course 4's contract and versions.
export const releaseOrder: Scene = {
  id: 'release-order',
  title: 'Release ordering and handoff',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'release-row',
      label: 'Renaming amount → amount_total in fct_orders',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'release-steps',
          label: 'Release 1 → 3',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'r1', label: 'Release 1', sub: 'add v2 beside v1', pattern: 'service', icon: 'package' },
            { id: 'r2', label: 'Hand off', sub: 'tell owners, set a date', pattern: 'user', icon: 'users' },
            { id: 'r3', label: 'Release 2', sub: 'consumers pin v2', pattern: 'service', icon: 'gitbranch' },
            { id: 'r4', label: 'Release 3', sub: 'delete v1 after its date', pattern: 'warn', icon: 'trash' },
          ],
          edges: [
            { source: 'r1', target: 'r2' },
            { source: 'r2', target: 'r3' },
            { source: 'r3', target: 'r4' },
          ],
        },
        {
          id: 'never',
          kind: 'table',
          label: 'Compatible or not?',
          headers: ['change', 'one release?'],
          values: [
            ['add a column', 'yes'],
            ['add a model', 'yes'],
            ['rename / drop a column', 'no — versions'],
            ['change grain or type', 'no — versions'],
            ['move a schema', 'no — tell consumers'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
