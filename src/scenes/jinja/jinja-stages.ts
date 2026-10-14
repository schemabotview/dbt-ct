import type { Scene } from '@graphlearning/flow'

// §5.1 — where Jinja runs. dbt renders every model twice: at parse (execute is false, no database)
// and at compile/run (execute is true). Snowflake never sees Jinja — only the rendered SQL.
export const jinjaStages: Scene = {
  id: 'jinja-stages',
  title: 'Parsing, compiling, executing',
  flow: 'TB',
  nodes: [
    {
      id: 'jinja-source',
      kind: 'code',
      filename: 'models/marts/fct_orders.sql   (the Jinja you write)',
      label: `{# a comment: never reaches Snowflake #}
{% set excluded = 'returned' %}            {# a statement #}

select order_id, customer_id, order_date, status, amount
from {{ ref('stg_orders') }}               {# an expression #}
where status != '{{ excluded }}'
  {{ "-- built for target: " ~ target.name }}`,
    },
    {
      id: 'renders-row',
      label: 'How dbt handles it',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'renders',
          label: 'Two renders, then execution',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'parse-render', label: 'Parse', sub: 'execute = false · finds refs', pattern: 'service', icon: 'filecode' },
            { id: 'compile-render', label: 'Compile', sub: 'execute = true · writes SQL', pattern: 'service', icon: 'braces' },
            { id: 'snowflake-runs', label: 'Snowflake', sub: 'runs plain SQL — no Jinja', pattern: 'storage', icon: 'snowflake' },
          ],
          edges: [
            { source: 'parse-render', target: 'compile-render' },
            { source: 'compile-render', target: 'snowflake-runs' },
          ],
        },
        {
          id: 'context',
          kind: 'table',
          label: 'A few things in the Jinja context',
          headers: ['name', 'gives you'],
          values: [
            ['ref() · source()', 'a relation, and a DAG edge'],
            ['target.name · target.schema', 'the current target'],
            ['var() · env_var()', 'values passed in at run time'],
            ['this', 'the relation being built'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'jinja-source', target: 'renders-row' }],
}
