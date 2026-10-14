import type { Section } from '../types'

// §4.4 — unit tests, fixtures, mocks, edge cases, and eligibility.
export const unitTests: Section = {
  id: 'unit-tests',
  title: 'Unit tests',
  scene: 'unit-test',
  focus: 'unit-diff',
  slide: `## Unit tests

Data tests check rows that exist. A **unit test** checks the model's **logic**, on rows you write yourself.

### How it works
- \`given\`: fixed input rows for each \`ref()\`, in place of the real tables
- \`expect\`: the rows the model must return
- dbt runs the model's SQL on the fixtures and compares

### Choose the edge cases
A returned order, and an order paid in two parts. Comment out the returns filter, and the test fails with a diff: order 3 appears.

### Eligibility
- An **ephemeral** input must be given as \`format: sql\`
- Unit tests run first in \`dbt build\`, before the model is built
- They need only fixture data, so CI can run them cheaply: \`dbt test -s test_type:unit\``,
  narration:
    "Data tests check the rows that happen to exist. A unit test checks something different: the model's logic, on rows you write yourself. You give it fixed input rows for each model it refs, in place of the real tables, and you state the rows you expect back. dbt runs the model's SQL on those fixtures and compares the result with your expectation. The skill is choosing the inputs. These are the edge cases that matter for fct orders: one ordinary order, one returned order that must be dropped, and one order paid in two parts, whose payments must add up to twelve. On the real model, it passes. Now comment out the line that filters returns, and run it again. It fails with a diff: order three appears in the output, where it should not. That is a logic bug caught before any real data was touched. A few practical details. Because int order payments is ephemeral, it has no table to stand in for, so its fixture has to be given as SQL. In dbt build, unit tests run first, before their model is built. And since they need only fixture data, they are cheap to run on every change, and dbt test with the selector test type unit runs only them.",
}
