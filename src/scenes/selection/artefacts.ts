import type { Scene } from '@graphlearning/flow'

// §7.3 — what each artefact records. The manifest is schema v12 on dbt-core 1.12.6; the run_results
// excerpt shows the fields dbt-snowflake 1.12.3 writes into adapter_response (query_id, rows_*),
// with illustrative values.
export const artefacts: Scene = {
  id: 'artefacts',
  title: 'Artefacts and what they establish',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'artefact-table',
      kind: 'table',
      label: 'target/  — written by every invocation',
      headers: ['file', 'records', 'cannot tell you'],
      values: [
        ['manifest.json', 'every node, config, dependency', 'what is in the warehouse now'],
        ['run_results.json', 'status and timing of this run', 'anything about other runs'],
        ['catalog.json', 'column types (docs generate)', 'data quality'],
        ['sources.json', 'freshness results', 'completeness'],
      ],
    },
    {
      id: 'run-results',
      kind: 'code',
      filename: 'target/run_results.json   (one result, Snowflake — illustrative values)',
      label: `{
  "unique_id": "model.shop.fct_orders",
  "status": "success",
  "thread_id": "Thread-2",
  "execution_time": 1.84,
  "adapter_response": {
    "_message": "SUCCESS 4",
    "rows_affected": 4,
    "query_id": "01b8…"          # look it up in Snowflake's query history
  }
}`,
    },
  ],
  edges: [{ source: 'artefact-table', target: 'run-results', label: 'one node of run_results' }],
}
