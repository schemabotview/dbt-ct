import type { Scene } from '@graphlearning/flow'

// §5.8 — a Python model on Snowflake (Snowpark). Parses on dbt-core 1.12.6 / dbt-snowflake 1.12.3
// with fct_orders as its parent; dbt-snowflake's table and incremental materializations are the only
// ones declaring supported_languages=['sql', 'python']. Not executed (needs a Snowflake account).
export const pythonModel: Scene = {
  id: 'python-model',
  title: 'Python models',
  flow: 'TB',
  nodes: [
    {
      id: 'py-source',
      kind: 'code',
      filename: 'models/marts/customer_order_gaps.py   (Snowflake: Snowpark)',
      label: `def model(dbt, session):
    dbt.config(materialized="table", packages=["pandas"])

    orders = dbt.ref("fct_orders").to_pandas()      # Snowpark -> pandas
    orders = orders.sort_values(["CUSTOMER_ID", "ORDER_DATE"])
    orders["DAYS_SINCE_PREVIOUS"] = (
        orders.groupby("CUSTOMER_ID")["ORDER_DATE"].diff().dt.days
    )
    return orders[["ORDER_ID", "CUSTOMER_ID", "DAYS_SINCE_PREVIOUS"]]`,
    },
    {
      id: 'py-runs-row',
      label: 'Running it',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'py-runs',
          label: 'Where it runs',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'py-dbt', label: 'dbt', sub: 'uploads the code', pattern: 'service', icon: 'gears' },
            { id: 'py-snowpark', label: 'Snowpark', sub: 'runs it inside Snowflake', pattern: 'storage', icon: 'snowflake' },
            { id: 'py-table', label: 'A table', sub: 'or incremental — no views', pattern: 'storage', icon: 'table' },
          ],
          edges: [
            { source: 'py-dbt', target: 'py-snowpark' },
            { source: 'py-snowpark', target: 'py-table' },
          ],
        },
        {
          id: 'py-vs-sql',
          kind: 'table',
          label: 'SQL or Python?',
          headers: ['', 'SQL model', 'Python model'],
          values: [
            ['materializations', 'all', 'table, incremental'],
            ['Jinja', 'yes', 'no — dbt.config, dbt.ref'],
            ['good for', 'joins, aggregation', 'logic SQL makes awkward'],
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'py-source', target: 'py-runs-row' }],
}
