import type { Section } from '../types'

// §5.3 — macros, arguments, return values, and reusable SQL patterns.
export const macros: Section = {
  id: 'macros',
  title: 'Macros',
  scene: 'macros',
  focus: 'schema-macro',
  slide: `## Macros

A **macro** is a reusable piece of Jinja with arguments, saved in \`macros/\`. Call it like a function.

### A small one
\`cents_to_dollars('amount')\` compiles to \`round(amount / 100.0, 2)\`. One definition, used by every model that converts cents.

### Arguments and return values
- \`scale=2\` is a default: \`cents_to_dollars('amount', 4)\` keeps four places
- \`return()\` hands back a value instead of SQL

### Replacing dbt's own
dbt's behaviour is macros too. Define \`generate_schema_name\` in your project and yours wins:
- In **prod**, custom schemas land as written: \`marts\`
- In **dev**, they stay prefixed: \`dbt_alice_marts\`

### When not to
A macro hides SQL from its reader. Use one when the same logic repeats in **three or more** places, and keep it small enough to read in one go.`,
  narration:
    "A macro is a reusable piece of Jinja with arguments, saved in the macros folder, and called like a function. Here is a small one. cents to dollars takes a column name and an optional scale, and returns the rounded division. Arguments can have defaults, so passing four keeps four decimal places instead, and a macro can also return a value rather than printing SQL. Every model that converts cents now calls the same macro, so the rule lives in exactly one place, and stg payments compiles to round amount divided by one hundred, two. Now a more powerful idea. Much of dbt's own behaviour is written as macros, and you can replace them. In course two, custom schemas were always prefixed with the target schema, so prod built into prod underscore marts. Define a macro called generate schema name in your project, and dbt uses yours instead. This one keeps the prefix in development, so developers stay isolated, but in production uses the custom schema exactly as written, plain marts. We checked both targets: dev still lands in dbt alice marts, and prod now lands in marts. A word on restraint. Every macro hides some SQL from whoever reads the model. Reach for one when the same logic repeats in three or more places, and keep it small enough to understand at a glance.",
}
