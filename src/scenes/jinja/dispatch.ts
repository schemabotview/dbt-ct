import type { Scene } from '@graphlearning/flow'

// §5.6 — adapter.dispatch picks an implementation per adapter. Both compiled cards are real
// dbt-core 1.12.6 output from the same model: dbt-snowflake 1.12.3 chose snowflake__, dbt-duckdb
// fell back to default__.
export const dispatch: Scene = {
  id: 'dispatch',
  title: 'Dispatch',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'dispatch-macro',
      kind: 'code',
      filename: 'macros/day_bucket.sql',
      label: `{% macro day_bucket(column_name) %}
    {{ return(adapter.dispatch('day_bucket')(column_name)) }}
{% endmacro %}

{% macro default__day_bucket(column_name) %}
    date_trunc('day', {{ column_name }})
{% endmacro %}

{% macro snowflake__day_bucket(column_name) %}
    to_date({{ column_name }})
{% endmacro %}`,
    },
    {
      id: 'per-adapter',
      label: "{{ day_bucket('ordered_at') }} compiles to",
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'on-snowflake', kind: 'code', hug: true, filename: 'dbt-snowflake → snowflake__', label: `to_date(ordered_at)` },
        { id: 'on-other', kind: 'code', hug: true, filename: 'any other adapter → default__', label: `date_trunc('day', ordered_at)` },
      ],
    },
  ],
  edges: [{ source: 'dispatch-macro', target: 'per-adapter', label: 'adapter.dispatch' }],
}
