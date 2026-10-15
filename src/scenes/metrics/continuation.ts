import type { Scene } from '@graphlearning/flow'

// §10.5 — where to go next, and the boundaries this course deliberately did not cross (the plan's
// "deferred" list).
export const continuation: Scene = {
  id: 'continuation',
  title: 'Continuation',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'next-row',
      label: 'From here',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'practice',
          label: 'Practise',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'n-build', label: 'Build the shop', sub: 'on your own warehouse', pattern: 'service', icon: 'wrench' },
            { id: 'n-review', label: 'Get reviewed', sub: 'real PRs, real owners', pattern: 'user', icon: 'users' },
            { id: 'n-incident', label: 'Run an incident', sub: 'repair, reconcile, write up', pattern: 'warn', icon: 'bell' },
          ],
          edges: [
            { source: 'n-build', target: 'n-review' },
            { source: 'n-review', target: 'n-incident' },
          ],
        },
        {
          id: 'deferred',
          kind: 'table',
          label: 'Next, from their own docs',
          headers: ['left out on purpose'],
          values: [
            ['ingestion tools'],
            ['warehouse administration'],
            ['custom adapters and materializations'],
            ['hosted Semantic Layer, Mesh'],
            ['dbt v2 / Fusion'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
