import type { Scene } from '@graphlearning/flow'

// §2 — the four things people mean by "dbt". The hosted platform is a band of its own, joined by a
// dashed edge because this course never needs it. Below it, every build crosses from the machine
// column (engine + adapter) to the Snowflake column (role, compute, storage): two columns side by side
// keep the board near the pane's ~1:1 aspect. Versions are the course pin (CLAUDE.md), so this board
// changes when the pin does.
export const dbtStack: Scene = {
  id: 'dbt-stack',
  title: 'Engine, adapter, warehouse, platform',
  padding: 0.15,
  flow: 'TB',
  nodes: [
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
    {
      id: 'every-build',
      label: 'Every build crosses this line',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'machine',
          label: 'Your machine — dbt CLI',
          pattern: 'group',
          flow: 'TB',
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
          flow: 'BT',
          children: [
            { id: 'compute', label: 'Virtual warehouse', sub: 'the compute that runs SQL', pattern: 'service', icon: 'cpu' },
            { id: 'database', label: 'Database', sub: 'tables and views dbt created', pattern: 'storage', icon: 'snowflake' },
            { id: 'role', label: 'Role', sub: 'grants decide what dbt may create', pattern: 'warn', icon: 'lock' },
          ],
          edges: [
            { source: 'compute', target: 'database', label: 'writes' },
            { source: 'database', target: 'role', label: 'governed by' },
          ],
        },
      ],
      edges: [{ source: 'adapter', target: 'compute', label: 'SQL' }],
    },
  ],
  edges: [{ source: 'platform', target: 'every-build', label: 'can host this', dashed: true }],
}
