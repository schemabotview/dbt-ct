import type { Section } from '../types'

// §1.4 — SQL models, in-file configuration, ref, and the first dependency.
export const firstModelAndRef: Section = {
  id: 'first-model-and-ref',
  title: 'A first model and ref',
  scene: 'first-model',
  focus: 'fct-orders',
  slide: `## A first model and ref

A **model** is one \`select\` in one \`.sql\` file. dbt wraps it in the DDL that creates a view or a table.

### \`config()\` sets this model's behaviour
- Here, \`materialized='table'\`, overriding the folder default in \`dbt_project.yml\`
- With neither set, a model is a **view**: dbt's own default

### \`ref()\` names another model
- It compiles to the real relation for the **current target**. In dev: \`analytics.dbt_alice.stg_orders\`
- It records a **dependency**, so \`stg_orders\` builds first
- Never hard-code another model's table name

### What Snowflake receives
\`create or replace transient table analytics.dbt_alice.fct_orders as (…)\`. Transient is dbt-snowflake's default, a Snowflake-only detail.

\`stg_orders\` still hard-codes its raw table. Course 2 fixes that.`,
  narration:
    "A model is simply one select statement in one SQL file. You never write create table or create view yourself. dbt wraps your select in whatever statement is needed. The first model, stg orders, takes the raw orders table and tidies it: it renames columns, casts the date, and lower-cases the status. The second model, fct orders, starts with a config block, which sets behaviour for this one model. Here it asks for a table. A setting in the file wins over the folder default in the project file, and if neither says anything, dbt's own default is a view. Then comes the important part. Instead of naming the staging table directly, fct orders says ref, stg orders. When dbt compiles it, that ref becomes the real relation for whichever target you are running: in dev, analytics dot dbt alice dot stg orders. And ref does a second job. It tells dbt that fct orders depends on stg orders, so the staging model is always built first. That is why you should never hard-code another model's table name. And what does Snowflake finally receive? A create or replace transient table statement, wrapped around your select. Transient tables are the Snowflake adapter's default, which is a Snowflake detail, not a general dbt rule. One honest caveat: stg orders still names its raw table directly. The next course replaces that with a proper source.",
}
