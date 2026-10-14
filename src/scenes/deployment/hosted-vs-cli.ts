import type { Scene } from '@graphlearning/flow'

// §8.7 — who runs dbt in production. The hosted column describes capabilities to CHECK for your plan
// and engine, not promises; nothing in this course depends on them.
export const hostedVsCli: Scene = {
  id: 'hosted-vs-cli',
  title: 'Hosted platform or your own orchestrator',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Running dbt in production',
      headers: ['job', 'your orchestrator + dbt CLI', 'hosted dbt platform'],
      values: [
        ['schedule, retries', 'you build it (Airflow, Dagster, CI…)', 'built in'],
        ['prod manifest for state', 'you store and fetch it', 'kept for you'],
        ['secrets', 'your secret manager', 'the platform'],
        ['wait for ingestion', 'you wire it', 'you still wire it'],
        ['cost', 'your infrastructure', 'a subscription — check plan'],
      ],
    },
    {
      id: 'same-either-way',
      label: 'The same either way',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'same-code', label: 'The project', sub: 'one repo, one DAG', pattern: 'service', icon: 'folder' },
        { id: 'same-wh', label: 'The warehouse', sub: 'does the work and bills it', pattern: 'storage', icon: 'snowflake' },
        { id: 'same-you', label: 'Ingestion', sub: 'still yours to own', pattern: 'warn', icon: 'workflow' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'same-either-way' }],
}
