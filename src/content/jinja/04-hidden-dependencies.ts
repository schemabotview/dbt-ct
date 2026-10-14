import type { Section } from '../types'

// §5.4 — ref/source visibility and dependency discovery.
export const hiddenDependencies: Section = {
  id: 'hidden-dependencies',
  title: 'Dependencies dbt cannot see',
  scene: 'hidden-ref',
  focus: 'hidden-error',
  slide: `## Dependencies dbt cannot see

dbt builds the DAG from the \`ref()\` calls it meets **while parsing**. A \`ref()\` it never reaches is never recorded.

### How a ref hides
- Inside \`{% if execute %}\`: at parse, \`execute\` is false, so the block is skipped

### Why it matters
A missing edge breaks **build order**, and hides the model from graph selection such as \`stg_orders+\`.

### What dbt does about it
At compile time the hidden \`ref()\` finally runs, and dbt stops: it cannot be sure \`stg_orders\` was built first.

### The fix
Put \`-- depends_on: {{ ref('stg_orders') }}\` on the first line. It is a SQL comment, but parse still reads the \`ref()\` inside it.

Prefer plain \`ref()\` calls at the top level of the model, where everyone, and dbt, can see them.`,
  narration:
    "The dependency graph comes from the ref calls dbt meets while parsing. That sounds airtight, but there is a gap: a ref that parsing never reaches is never recorded. The commonest way to hide one is to put it inside an if execute block. At parse time, execute is false, so the whole block is skipped, and the ref inside it is never seen. A missing edge matters in two ways: it breaks build order, and it hides the model from graph selections like stg orders plus. Here, a model counts the orders in stg orders with a query inside exactly such a block. Parsing records no dependency at all. Then, at compile time, the block runs, the ref is finally evaluated, and dbt stops with an error. It says it was unable to infer all dependencies for the model, because it cannot be sure stg orders was built first. Helpfully, the error tells you the fix. Add a depends on hint as the first line: a SQL comment containing the ref. Snowflake ignores the comment, but dbt's parser still reads the ref inside it, so the edge is recorded, and the model builds in the right order. The better lesson, though, is to keep ref calls plain and at the top level of a model, where every reader, and dbt, can see them.",
}
