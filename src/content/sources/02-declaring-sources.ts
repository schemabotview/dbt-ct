import type { Section } from '../types'

// §2.2 — source declarations, source references, and raw-data ownership.
export const declaringSources: Section = {
  id: 'declaring-sources',
  title: 'Declaring sources',
  scene: 'declaring-sources',
  focus: 'stg-orders',
  slide: `## Declaring sources

A **source** names a raw table that something else loaded. You declare it once in YAML, then refer to it by name.

### \`source('shop', 'orders')\`
- Compiles to the real table: \`raw.shop.orders\`
- Puts the raw table **on the DAG**, so lineage starts at the data, not at a model
- Moving the raw data means editing **one** YAML file, not every model
- Sources take descriptions, tests and freshness checks, like models

### Declaring is not loading
- dbt never creates or fills a source. The ingestion team does
- A typo in a declared name fails at run time, when Snowflake cannot find the table

### Ownership
The description says who loads it. Raw data has an owner outside your project.`,
  narration:
    "In the first course, the staging model named its raw table directly: raw dot shop dot orders. That works, but dbt has no idea the table exists. A source fixes that. You declare the raw tables once, in YAML: a source called shop, living in the raw database and the shop schema, with three tables, orders, payments and customers. Then models refer to them by name, with source, shop, orders. When dbt compiles that, it becomes exactly the same raw dot shop dot orders. So what did we gain? The raw table now appears on the dependency graph, so lineage starts at the actual data instead of at your first model. Sources can also carry descriptions, tests and freshness checks, just like models. And if the raw data ever moves to a new schema, you change one line of YAML instead of hunting through every model. But be clear about what a declaration is. dbt never creates a source, and never loads it. That is the ingestion team's job, and if a declared table does not exist, you only find out when Snowflake fails to find it at run time. That is also why the description says who loads the data. Raw data has an owner, and it is usually not you.",
}
