import type { Section } from '../types'

// §4.1 — generic data tests: uniqueness, nullability, relationships, accepted values.
export const genericTests: Section = {
  id: 'generic-tests',
  title: 'Generic data tests',
  scene: 'generic-tests',
  focus: 'what-each-checks',
  slide: `## Generic data tests

A **generic test** is a reusable check you attach to a column in YAML. dbt ships four.

### The built-in four
- \`unique\` and \`not_null\`: the key holds at the model's grain
- \`relationships\`: every \`customer_id\` exists in \`dim_customers\`
- \`accepted_values\`: \`status\` is one of a known list

### How they run
- Each becomes one query that selects the **offending** rows
- \`dbt test\` runs them; \`dbt build\` runs each right after its model

### Version note
Arguments such as \`values\` and \`to\` go under \`arguments:\`. The older top-level form still runs on 1.12 but raises a deprecation warning.

These test **data**: today's rows, not tomorrow's.`,
  narration:
    "The quickest checks you can add are generic tests: reusable checks that you attach to a column in YAML, with no SQL to write. dbt ships four of them. Unique and not null together say the key really holds at the model's grain: every order id appears once, and none is missing. Relationships says every customer id in the fact exists in the customers dimension, so no order points at a customer nobody knows about. Accepted values says the status column only contains values from a known list. Under the hood, each test becomes one query that selects the offending rows. dbt test runs them, and dbt build runs each one right after the model it checks, so a failure stops bad data before it spreads. One version detail matters on the release we pinned. Arguments like the list of values, or the model a relationship points to, now go under an arguments key. The older form, with those arguments at the top level, still runs, but it raises a deprecation warning, so write the new form from the start. And remember what these are: data tests. They check the rows that exist today. They say nothing about the rows that arrive tomorrow.",
}
