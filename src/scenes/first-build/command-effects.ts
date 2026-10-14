import type { Scene } from '@graphlearning/flow'

// §5 — compile-side versus execute-side (each card names what it leaves behind), then the five
// commands as a table of effects. The board keeps the split the whole concept leans on: dbt compiles on your
// machine, the warehouse executes. The artefact paths are what dbt-core 1.12.6 wrote in target/.
export const commandEffects: Scene = {
  id: 'command-effects',
  title: 'What each command does',
  flow: 'TB',
  nodes: [
    {
      id: 'phases',
      label: 'One build, two places',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'dbt-side',
          label: 'dbt — your machine',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'parse', label: 'Parse', sub: 'builds the DAG → target/manifest.json', pattern: 'service', icon: 'filecode' },
            { id: 'compile', label: 'Compile', sub: 'renders SQL → target/compiled/', pattern: 'service', icon: 'braces' },
          ],
          edges: [{ source: 'parse', target: 'compile' }],
        },
        {
          id: 'warehouse-side',
          label: 'Snowflake — executes',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'run-models', label: 'Run models', sub: 'creates views and tables', pattern: 'storage', icon: 'snowflake' },
            { id: 'run-tests', label: 'Run tests', sub: 'selects rows that break a rule', pattern: 'storage', icon: 'circlecheck' },
          ],
          edges: [{ source: 'run-models', target: 'run-tests' }],
        },
      ],
      edges: [{ source: 'compile', target: 'run-models', label: 'SQL' }],
    },
    {
      id: 'commands',
      kind: 'table',
      label: 'dbt commands and their effects',
      headers: ['command', 'stops after', 'changes the warehouse?'],
      values: [
        ['dbt parse', 'parse', 'no — no connection'],
        ['dbt compile', 'compile', 'no — but may query metadata'],
        ['dbt run', 'execute models', 'yes — creates views, tables'],
        ['dbt test', 'execute tests', 'no — selects failing rows'],
        ['dbt build', 'everything, in DAG order', 'yes — models, tests, seeds, snapshots'],
      ],
    },
  ],
  edges: [{ source: 'phases', target: 'commands' }],
}
