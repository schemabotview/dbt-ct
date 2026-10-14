import type { Scene } from '@graphlearning/flow'

// §3.7 — a mart's columns, grain and types are an interface: other people's queries depend on them.
export const modelInterfaces: Scene = {
  id: 'model-interfaces',
  title: 'Models as interfaces',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'consumers',
      label: 'Who depends on fct_orders',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'dashboard', label: 'Dashboard', sub: 'revenue by day', pattern: 'user', icon: 'barchart' },
        { id: 'analyst', label: 'Analyst SQL', sub: 'saved queries', pattern: 'user', icon: 'users' },
        { id: 'downstream', label: 'Other models', sub: 'dim_customers', pattern: 'service', icon: 'share' },
      ],
    },
    {
      id: 'visibility',
      label: 'What dbt can see',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'sees', label: 'Downstream models', sub: 'they ref it — on the DAG', pattern: 'service', icon: 'circlecheck' },
        { id: 'blind', label: 'Dashboards, saved SQL', sub: 'invisible unless declared', pattern: 'warn', icon: 'circleslash' },
      ],
    },
    {
      id: 'interface',
      label: 'The interface',
      sub: 'columns · types · grain',
      pattern: 'storage',
      icon: 'table',
    },
    {
      id: 'changes',
      kind: 'table',
      label: 'Changing fct_orders',
      headers: ['change', 'effect on consumers'],
      values: [
        ['add a column', 'safe'],
        ['rename or drop a column', 'breaks their queries'],
        ['change a column type', 'can break or silently cast'],
        ['change the grain', 'silently wrong numbers'],
      ],
    },
  ],
  edges: [
    { source: 'consumers', target: 'interface', label: 'read' },
    { source: 'interface', target: 'changes' },
    { source: 'changes', target: 'visibility', label: 'who finds out' },
  ],
}
