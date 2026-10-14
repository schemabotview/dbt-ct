import type { Scene } from '@graphlearning/flow'

// §2 — the four things people mean by "dbt". The engine and adapter run on the developer's machine;
// the warehouse does the work; the hosted platform is a band of its own, joined by a dashed edge
// because this course never needs it. The Snowflake band runs RL so adapter → compute is a straight drop. Versions are the course pin (CLAUDE.md), so this board changes when the pin does.
export const dbtStack: Scene = {
  id: 'dbt-stack',
  title: 'Engine, adapter, warehouse, platform',
  flow: 'TB',
  nodes: [
    {
      id: 'machine',
      label: 'Your machine — the dbt CLI',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'project', label: 'Project', sub: 'SQL + YAML files in git', pattern: 'storage', icon: 'folder' },
        { id: 'engine', label: 'Engine', sub: 'dbt Core 1.12 — parses, compiles', pattern: 'service', icon: 'gears' },
        { id: 'adapter', label: 'Adapter', sub: 'dbt-snowflake 1.12 — dialect, connection', pattern: 'network', icon: 'plug' },
      ],
      edges: [
        { source: 'project', target: 'engine', label: 'read' },
        { source: 'engine', target: 'adapter' },
      ],
    },
    {
      id: 'snowflake',
      label: 'Snowflake — the warehouse',
      pattern: 'group',
      flow: 'RL',
      children: [
        { id: 'compute', label: 'Virtual warehouse', sub: 'the compute that runs SQL', pattern: 'service', icon: 'cpu' },
        { id: 'database', label: 'Database', sub: 'tables and views dbt created', pattern: 'storage', icon: 'snowflake' },
      ],
      edges: [{ source: 'compute', target: 'database', label: 'writes' }],
    },
    {
      id: 'platform',
      label: 'Hosted platform — optional, not used here',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'scheduler', label: 'Scheduler', sub: 'runs jobs on a timer', pattern: 'external', icon: 'clock' },
        { id: 'ide', label: 'Browser IDE', sub: 'edit without a local install', pattern: 'external', icon: 'cloud' },
      ],
    },
  ],
  edges: [
    { source: 'adapter', target: 'compute', label: 'SQL' },
    { source: 'platform', target: 'machine', label: 'can host this', dashed: true },
  ],
}
