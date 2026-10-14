import type { Scene } from '@graphlearning/flow'

// §5.4 — a ref dbt cannot see at parse time. Real dbt-core 1.12.6 run: the ref inside
// `{% if execute %}` fails with the error shown; the `-- depends_on:` hint dbt suggests fixes it.
export const hiddenRef: Scene = {
  id: 'hidden-ref',
  title: 'Dependencies dbt cannot see',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'hidden-source',
      kind: 'code',
      filename: 'models/marts/order_count_banner.sql',
      label: `{% if execute %}
  {% set n = run_query("select count(*) from " ~ ref('stg_orders')) %}
{% endif %}
select {{ n.columns[0].values()[0] if execute else 0 }} as order_count`,
    },
    {
      id: 'hidden-error',
      kind: 'code',
      filename: '$ dbt run -s order_count_banner',
      label: `Compilation Error in model order_count_banner
  dbt was unable to infer all dependencies for the model.
  This typically happens when ref() is placed within a conditional block.
  To fix this, add the following hint to the top of the model:
  -- depends_on: {{ ref('stg_orders') }}`,
    },
    {
      id: 'hint-fix',
      kind: 'code',
      hug: true,
      filename: 'first line of the model',
      label: `-- depends_on: {{ ref('stg_orders') }}`,
    },
  ],
  edges: [
    { source: 'hidden-source', target: 'hidden-error', label: 'parse never ran the ref' },
    { source: 'hidden-error', target: 'hint-fix', label: 'declare it' },
  ],
}
