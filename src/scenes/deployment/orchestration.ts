import type { Scene } from '@graphlearning/flow'

// §8.5 — a production job that waits for its data. Real dbt-core 1.12.6 runs: after new payments
// loaded (orders unchanged), source_status:fresher+ against prod's saved sources.json selected
// stg_payments and its four downstream models, and not stg_orders.
export const orchestration: Scene = {
  id: 'orchestration',
  title: 'Orchestration and source readiness',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'job',
      label: 'The production job, in order',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'j-wait', label: 'Wait for ingestion', sub: 'the loader says it is done', pattern: 'external', icon: 'clock' },
        { id: 'j-fresh', label: 'Source freshness', sub: 'stop if a source is stale', pattern: 'warn', icon: 'gauge' },
        { id: 'j-build', label: 'dbt build', sub: 'what new data touched', pattern: 'service', icon: 'gears' },
        { id: 'j-save', label: 'Keep artefacts', sub: 'manifest, sources.json', pattern: 'storage', icon: 'folder' },
      ],
      edges: [
        { source: 'j-wait', target: 'j-fresh' },
        { source: 'j-fresh', target: 'j-build' },
        { source: 'j-build', target: 'j-save' },
      ],
    },
    {
      id: 'fresher',
      kind: 'code',
      filename: '$ dbt ls -s source_status:fresher+ --state prod-state   (payments loaded, orders not)',
      label: `shop.staging.stg_payments
shop.intermediate.int_order_payments
shop.marts.fct_payments
shop.marts.fct_orders
shop.marts.dim_customers`,
    },
  ],
  edges: [{ source: 'job', target: 'fresher', label: 'build only what changed upstream' }],
}
