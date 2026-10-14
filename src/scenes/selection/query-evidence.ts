import type { Scene } from '@graphlearning/flow'

// §7.7 — from a slow model to evidence. The path is: dbt's own artefacts (target/run, run_results
// with dbt-snowflake's query_id) into Snowflake's query history, where the profile tells the cost.
export const queryEvidence: Scene = {
  id: 'query-evidence',
  title: 'Compiled SQL and query evidence',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'evidence-chain-row',
      label: 'From dbt into Snowflake',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'evidence-chain',
          label: 'From "this model is slow" to a cause',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'e-timing', label: 'Run results', sub: 'run_results.json — timing', pattern: 'service', icon: 'clock' },
            { id: 'e-sql', label: 'target/run/', sub: 'the exact statement sent', pattern: 'service', icon: 'filecode' },
            { id: 'e-history', label: 'Query history', sub: 'by query_id or query_tag', pattern: 'storage', icon: 'snowflake' },
            { id: 'e-profile', label: 'Query profile', sub: 'scans, spills, queueing', pattern: 'storage', icon: 'barchart' },
          ],
          edges: [
            { source: 'e-timing', target: 'e-sql' },
            { source: 'e-sql', target: 'e-history' },
            { source: 'e-history', target: 'e-profile' },
          ],
        },
        {
          id: 'evidence-table',
          kind: 'table',
          label: 'What each piece shows',
          headers: ['look at', 'to learn'],
          values: [
            ['target/compiled/', 'your select, rendered'],
            ['target/run/', 'the full DDL / merge'],
            ['execution_time', 'total time, queue included'],
            ['query profile', 'where Snowflake spent it'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
