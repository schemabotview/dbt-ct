import type { Scene } from '@graphlearning/flow'

// §9.7 — an incident runbook and what to keep. The order is the course's: diagnose state before
// choosing retry, backfill or full refresh; reconcile before declaring health.
export const runbook: Scene = {
  id: 'runbook',
  title: 'Ownership, retention, runbooks',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'runbook-row',
      label: 'Incident: a mart is wrong or late',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'steps',
          label: 'Runbook',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'rb-tell', label: '1 · Tell consumers', sub: 'owner from exposures', pattern: 'user', icon: 'bell' },
            { id: 'rb-state', label: '2 · Read state', sub: 'artefacts, logs, tables', pattern: 'service', icon: 'search' },
            { id: 'rb-repair', label: '3 · Choose a repair', sub: 'retry, backfill, rebuild', pattern: 'warn', icon: 'wrench' },
            { id: 'rb-reconcile', label: '4 · Reconcile', sub: 'totals against source', pattern: 'storage', icon: 'scale' },
            { id: 'rb-record', label: '5 · Write it up', sub: 'cause, fix, new check', pattern: 'service', icon: 'pencil' },
          ],
          edges: [
            { source: 'rb-tell', target: 'rb-state' },
            { source: 'rb-state', target: 'rb-repair' },
            { source: 'rb-repair', target: 'rb-reconcile' },
            { source: 'rb-reconcile', target: 'rb-record' },
          ],
        },
        {
          id: 'retention',
          kind: 'table',
          label: 'Keep, and for how long',
          headers: ['evidence', 'why'],
          values: [
            ['prod manifest + run_results', 'state, retry, audit'],
            ['sources.json', 'freshness history'],
            ['logs/dbt.log', 'diagnosis'],
            ['snapshots', 'history nowhere else'],
            ['audit table', 'who ran what, when'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
