import type { Scene } from '@graphlearning/flow'

// §5.3 — two macros: a small reusable expression, and the generate_schema_name override promised in
// course 2. Both verified on dbt-core 1.12.6: stg_payments compiles with the rounded division, and the
// override gives analytics.marts.fct_orders in prod while dev keeps dbt_alice_marts.
export const macros: Scene = {
  id: 'macros',
  title: 'Macros',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'cents-macro',
      kind: 'code',
      filename: 'macros/cents_to_dollars.sql   → used in stg_payments',
      label: `{% macro cents_to_dollars(column_name, scale=2) %}
    round({{ column_name }} / 100.0, {{ scale }})
{% endmacro %}

-- in a model:   {{ cents_to_dollars('amount') }}  as amount
-- compiles to:  round(amount / 100.0, 2)          as amount`,
    },
    {
      id: 'schema-macro',
      kind: 'code',
      filename: 'macros/generate_schema_name.sql   (overrides dbt’s own)',
      label: `{% macro generate_schema_name(custom_schema_name, node) -%}
    {%- if target.name == 'prod' and custom_schema_name is not none -%}
        {{ custom_schema_name | trim }}
    {%- elif custom_schema_name is none -%}
        {{ target.schema }}
    {%- else -%}
        {{ target.schema }}_{{ custom_schema_name | trim }}
    {%- endif -%}
{%- endmacro %}`,
    },
    {
      id: 'schema-result',
      kind: 'table',
      label: 'fct_orders lands in',
      headers: ['target', 'before', 'with the override'],
      values: [
        ['dev', 'dbt_alice_marts', 'dbt_alice_marts'],
        ['prod', 'prod_marts', 'marts'],
      ],
    },
  ],
  edges: [
    { source: 'cents-macro', target: 'schema-macro', label: 'a macro can replace dbt’s own' },
    { source: 'schema-macro', target: 'schema-result' },
  ],
}
