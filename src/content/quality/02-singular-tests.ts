import type { Section } from '../types'

// §4.2 — singular tests and business-specific failing-row queries.
export const singularTests: Section = {
  id: 'singular-tests',
  title: 'Singular tests',
  scene: 'singular-test',
  focus: 'singular-sql',
  slide: `## Singular tests

When a rule is specific to your business, write it as a **singular test**: one \`.sql\` file in \`tests/\`.

### The convention
- Select the rows that **break** the rule
- Zero rows: PASS. Any rows: FAIL, with the count
- \`ref()\` it like a model, so it runs after what it checks

### Every test works this way
Generic tests are the same idea, written once as a macro and reused. A singular test is that query, written by hand, for one rule.

### Good singular tests
- "No order has a negative amount"
- "Revenue per day never drops to zero on a weekday"

A singular test takes config at the top of its file, such as \`{{ config(severity='warn') }}\`.

Name the file after the rule. The name is what appears in the log when it fails.`,
  narration:
    "Some rules are too specific to your business for a reusable test. For those, you write a singular test: one SQL file in the tests folder. The convention is simple, and it is worth getting the direction right. The query selects the rows that break the rule. If it returns zero rows, the test passes. If it returns any rows, the test fails, and dbt reports how many. Here, the rule is that no order may have a negative amount, so the query selects orders where the amount is below zero. It refs fct orders like any model, so dbt knows to run it after that model is built. It passed on our data. In fact, every dbt test works exactly this way. A generic test is the same idea written once as a macro, so you can attach it to any column. A singular test is that query written by hand, for one rule. Good candidates are the rules your stakeholders actually care about, like no negative amounts, or revenue never dropping to zero on a weekday. A singular test can also take configuration at the top of its file, such as a severity of warn. Name the file after the rule itself, because the file name is what appears in the log when it fails.",
}
