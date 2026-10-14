import type { Section } from '../types'

// §3.5 — warehouse-managed materializations and adapter-specific refresh choices. Snowflake-specific.
export const dynamicTables: Section = {
  id: 'dynamic-tables',
  title: 'Warehouse-managed refresh',
  scene: 'dynamic-tables',
  focus: 'dynamic',
  slide: `## Warehouse-managed refresh

**Snowflake-specific.** Every materialization so far is refreshed when dbt runs. A **dynamic table** is refreshed by Snowflake itself.

### \`materialized='dynamic_table'\`
- dbt creates it once; Snowflake keeps it within \`target_lag\` of its inputs
- Needs a \`snowflake_warehouse\` to run those refreshes, which cost credits
- Freshness no longer depends on your scheduler, but on Snowflake's refresh

### Check the adapter, not the docs of another
- dbt-snowflake 1.12 ships \`dynamic_table\`
- It does **not** implement \`materialized_view\`: it fails to compile
- Other adapters offer different options. None of this is portable dbt

Start with tables. Reach for this when a mart must be fresher than your schedule allows.`,
  narration:
    "Everything so far is refreshed when dbt runs, so a table is exactly as fresh as your last scheduled build. Some warehouses can take over that job, and this section is specific to Snowflake. A dynamic table is a table that Snowflake keeps up to date by itself. In dbt you set materialized to dynamic table and give it a target lag, say one hour. dbt creates it once, and from then on Snowflake refreshes it so that it never falls more than an hour behind its inputs. It needs a warehouse for those refreshes, and they cost credits whether or not anyone reads the result. The trade-off is real: freshness stops depending on your scheduler and starts depending on Snowflake's refresh behaviour. Be careful to check what your adapter actually supports. The Snowflake adapter we pinned ships dynamic tables, but it does not implement dbt's materialized view materialization at all; asking for one fails at compile time. Other adapters offer other options, so none of this is portable dbt. A sensible default is to start with tables, and reach for dynamic tables only when a mart must be fresher than your schedule allows.",
}
