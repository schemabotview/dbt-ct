import type { Section } from '../types'

// §10.2 — entities, measures, dimensions, grain, and join risks.
export const semanticModels: Section = {
  id: 'semantic-models',
  title: 'Entities, measures, dimensions',
  scene: 'semantic-model',
  focus: 'fan-out-refused',
  slide: `## Entities, measures, dimensions

A **semantic model** describes a mart in the terms metrics need.

### Three parts
- **Entities**: the keys. \`order\` is primary; \`customer\` is foreign
- **Dimensions**: what you group by, such as \`status\` and \`order_date\`
- **Measures**: what you aggregate, such as \`sum(amount)\`

### Joins follow the entities
Revenue by \`customer__country\` joined many orders to one customer: safe, and it gave UK 3, DE 10, FR 12.

### Fan-out is refused
A customer-grain metric grouped by order status needs a one-to-many join. MetricFlow **refused**: no valid join path.

### What it inherits
Ana's order counts under **DE**: today's country, from \`dim_customers\`. The metric is only as right as the mart.`,
  narration:
    "A semantic model describes a mart in the terms that metrics need, and it has three parts. Entities are the keys. In the orders model, order is the primary entity, one per row, and customer is a foreign entity, pointing at the customers model. Dimensions are what you group and filter by, such as status and order date. Measures are what you aggregate, such as the sum of amount. Joins then follow the entities, and only in the safe direction. Asking for revenue by customer country joined many orders to one customer each: a many-to-one join, which cannot duplicate rows. It returned three for the UK, ten for Germany and twelve for France. Now the protection. We defined a customer count and asked for it by order status, which needs a one-to-many join, exactly the fan-out from course three. MetricFlow refused, saying there was no valid join path. But notice what the metric inherits. Ana's September order counts under Germany, because dim customers holds her current country. A metric is only as right as the mart underneath it.",
}
