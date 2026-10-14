import type { Section } from '../types'

// §5.8 — Python model selection and supported execution boundaries; bridge to course 6.
export const pythonModels: Section = {
  id: 'python-models',
  title: 'Python models',
  scene: 'python-model',
  focus: 'py-snowpark',
  slide: `## Python models

A model can be a \`.py\` file. On Snowflake it runs as **Snowpark**, inside the warehouse, not on your machine.

### The shape
- \`def model(dbt, session):\` returns a DataFrame
- \`dbt.ref()\` and \`dbt.config()\` replace Jinja
- \`packages=[…]\` asks Snowflake for libraries it provides

### Boundaries on dbt-snowflake 1.12
- Materialized as **table** or **incremental** only
- No Jinja, so no macros inside the model
- Each run starts Snowpark and spends warehouse credits

### When it fits
Logic SQL makes awkward, such as per-customer gaps between orders. For joins and aggregation, SQL stays clearer and cheaper.

**Next:** keeping tables up to date without rebuilding them.`,
  narration:
    "A model does not have to be SQL. It can be a Python file, and on Snowflake it runs through Snowpark, inside the warehouse, not on your laptop. The shape is fixed. You define a function called model that takes dbt and a session, and returns a DataFrame. dbt dot ref and dbt dot config take the place of Jinja, and you can ask Snowflake for libraries it provides, such as pandas. This one computes, for each customer, the number of days since their previous order, which is awkward to express in SQL but simple in pandas. There are firm boundaries. On the Snowflake adapter we pinned, Python models can only be materialized as tables or incremental models. There is no Jinja, so no macros inside the model. And each run starts a Snowpark session and spends warehouse credits. The model shown here parses, and dbt records fct orders as its parent, but it needs a Snowflake account to run. Use Python where SQL is genuinely awkward. For joins and aggregation, SQL stays clearer, and usually cheaper. Next, we stop rebuilding tables from scratch, with incremental models.",
}
