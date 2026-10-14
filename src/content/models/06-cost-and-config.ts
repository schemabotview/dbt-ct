import type { Section } from '../types'

// §3.6 — configuration, execution costs, and adapter boundaries.
export const costAndConfig: Section = {
  id: 'cost-and-config',
  title: 'Configuration and cost',
  scene: 'cost-and-config',
  focus: 'cost-table',
  slide: `## Configuration and cost

dbt does not run your SQL, so it does not decide the bill. The warehouse does. dbt's configs decide **when** and **where** you pay.

### When
- A **table** pays at build time, once per run
- A **view** pays at read time, once per query

### Where: Snowflake-only configs
- \`snowflake_warehouse\`: a bigger warehouse for one heavy model
- \`transient\`: true by default for tables, so no Fail-safe storage
- \`cluster_by\`, \`query_tag\`: pruning, and cost attribution

\`threads: 4\` runs independent models in parallel: faster, but more load.

### Adapter boundaries
These keys belong to **dbt-snowflake**. Another adapter ignores or rejects them. Measure in query history before tuning anything.`,
  narration:
    "dbt sends SQL, but the warehouse runs it, so the bill is the warehouse's. What dbt's configuration controls is when you pay, and where. When is mostly the materialization. A table pays at build time, once per run, however many people read it. A view pays at read time, once for every query. A table read a hundred times a day is usually cheaper than the same view. Where is the next question, and here every config is specific to the Snowflake adapter. snowflake warehouse lets one heavy model run on a bigger warehouse while the rest use the profile's default. transient is true by default for tables, which means no Fail-safe period, and cheaper storage, because dbt can always rebuild them. cluster by helps Snowflake skip data in very large tables, and query tag labels each query so you can attribute cost later. Threads matter too. With threads set to four in the profile, dbt runs up to four independent models at once: a faster build, but more concurrent load on the warehouse. Remember that these keys belong to dbt snowflake. Another adapter will ignore them or reject them. And before tuning anything, measure: Snowflake's query history tells you which models actually cost the most.",
}
