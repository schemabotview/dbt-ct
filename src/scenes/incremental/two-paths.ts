import type { Scene } from '@graphlearning/flow'

// §6.1 — one model, two compiled paths. Real dbt-core 1.12.6 runs of fct_payments: the first run
// (no table yet) compiled without the filter; the second compiled with it.
export const twoPaths: Scene = {
  id: 'two-paths',
  title: 'Two paths through one model',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'inc-source',
      kind: 'code',
      filename: 'models/marts/fct_payments.sql',
      label: `{{ config(
    materialized='incremental',
    unique_key='payment_id'
) }}

select payment_id, order_id, payment_method, amount, paid_at, _loaded_at
from {{ ref('stg_payments') }}

{% if is_incremental() %}
  -- only rows newer than the newest row already in this table
  where paid_at > (select max(paid_at) from {{ this }})
{% endif %}`,
    },
    {
      id: 'paths',
      label: 'is_incremental() decides',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'first-run',
          kind: 'code',
          hug: true,
          filename: 'first run, or --full-refresh: build it all',
          label: `create table … as (
  select … from stg_payments
)`,
        },
        {
          id: 'later-run',
          kind: 'code',
          hug: true,
          filename: 'later runs: only new rows, then merge',
          label: `select … from stg_payments
where paid_at > (select max(paid_at)
                 from dbt_alice_marts.fct_payments)`,
        },
      ],
    },
  ],
  edges: [{ source: 'inc-source', target: 'paths' }],
}
