import type { Section } from '../types'

// §7.1 — graph operators, set selection, exclusions, and YAML selectors.
export const graphOperators: Section = {
  id: 'graph-operators',
  title: 'Graph operators and selectors',
  scene: 'graph-operators',
  focus: 'operator-table',
  slide: `## Graph operators and selectors

\`-s\` (\`--select\`) chooses what a command touches. The DAG makes the choices precise.

### Graph operators
- \`stg_orders+\`: the model and **everything downstream**
- \`+fct_orders\`: the model and **everything upstream**
- \`1+fct_orders\`: one generation only
- \`@stg_orders\`: descendants, plus everything they need

### Set operators
- A space is a **union**; a comma an **intersection**: \`stg_orders+,marts\`
- \`--exclude\` removes nodes from the result

### Name the common ones
A **YAML selector** gives a selection a name, a description and review: \`--selector orders_pipeline\`.

Check before you run: \`dbt ls\` shows exactly what \`-s\` selects.`,
  narration:
    "Most commands do not need the whole project. The select flag, dash s, chooses what a command touches, and because dbt knows the DAG, the choices can be precise. A plus after a name means the model and everything downstream of it. stg orders plus selects stg orders, fct orders and dim customers. A plus before the name means everything upstream: plus fct orders selects it and the three models it is built from. A number limits the depth, so one plus fct orders goes up a single generation. And the at sign selects a model's descendants plus everything those descendants need, which here turns out to be all six models, because dim customers also needs the customers staging model. Selections combine like sets. A space between two selectors is a union, and a comma is an intersection: stg orders plus, comma, marts, gives only the downstream models that live in the marts folder. dash dash exclude removes nodes from the result. Selections you use often deserve a name: a YAML selector, with a description, reviewed like code. And before you run anything, dbt ls shows exactly what your selection selects.",
}
