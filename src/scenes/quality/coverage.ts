import type { Scene } from '@graphlearning/flow'

// §4.8 — what each kind of check establishes, and what stays unchecked on fct_orders.
export const coverage: Scene = {
  id: 'coverage',
  title: 'Coverage and false confidence',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'establishes',
      kind: 'table',
      label: 'What each check establishes',
      headers: ['check', 'establishes', 'does not establish'],
      values: [
        ['data test', 'today’s rows obey a rule', 'tomorrow’s will'],
        ['unit test', 'logic handles chosen cases', 'cases nobody chose'],
        ['contract', 'names and types', 'that the values are right'],
        ['freshness', 'a load ran recently', 'the load was complete'],
        ['description', 'a stated intent', 'that the SQL matches it'],
      ],
    },
    {
      id: 'gaps',
      label: 'Still unchecked on fct_orders',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'gap-revenue', label: 'Revenue rule', sub: 'should placed count?', pattern: 'warn', icon: 'receipt' },
        { id: 'gap-complete', label: 'Completeness', sub: 'did every order arrive?', pattern: 'warn', icon: 'search' },
        { id: 'gap-currency', label: 'Currency', sub: 'are amounts all one?', pattern: 'warn', icon: 'scale' },
      ],
    },
  ],
  edges: [{ source: 'establishes', target: 'gaps', label: 'and what is left' }],
}
