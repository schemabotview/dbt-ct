import type { Section } from '../types'

// §10.1 — shared business definitions and Semantic Layer selection boundaries.
export const sharedDefinitions: Section = {
  id: 'shared-definitions',
  title: 'One definition of revenue',
  scene: 'two-revenues',
  focus: 'metric-yml',
  slide: `## One definition of revenue

Sales reported **59.00** for September; Finance, **25.00**. Both called it revenue; both were right.

### The problem is the definition
Each report wrote its own \`sum()\`. One counted refunded and unpaid orders; one did not. Neither team was careless: nobody had ever written the rule down.

### A metric, defined once
- In YAML, beside the models: a measure, plus Finance's filter
- Querying it with MetricFlow returned 13 and 12: **25.00**
- Every tool now gets the same rule

### What a metric does not fix
If the mart is wrong, every report is now wrong the same way. It still needs an owner.

### Where it runs
MetricFlow is open source: we queried it locally. Serving it to BI tools is a hosted service: check eligibility.`,
  narration:
    "In September, the sales dashboard reported revenue of fifty nine. The finance pack reported twenty five. Both teams were confident, and both queries were correct. The problem was never the SQL. It was the definition. Each report wrote its own sum, and one counted refunded and unpaid orders while the other did not. A metric fixes this by defining revenue exactly once. It lives in YAML, next to the models: a measure, the sum of order amounts, plus the filter Finance agreed, completed and shipped orders only, written into the metric itself, with a description saying who agreed it. Querying it with MetricFlow returned thirteen for the first of September and twelve for the third: twenty five in total, Finance's number. From now on, any tool that asks for revenue gets the same rule, instead of rewriting it. A metric does not fix everything, though. If the mart underneath is wrong, every report is now wrong in exactly the same way, and the definition still needs a named owner who can change it. Be clear, too, about where this runs. MetricFlow is open source, and we queried it locally against our own warehouse. Serving metrics to BI tools through the hosted Semantic Layer is a separate service, so check its eligibility for your plan before relying on it.",
}
