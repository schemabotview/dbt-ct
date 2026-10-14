import type { Section } from '../types'

// §3.2 — facts, dimensions, business definitions, and consumer requirements.
export const factsAndDimensions: Section = {
  id: 'facts-and-dimensions',
  title: 'Facts and dimensions',
  scene: 'facts-and-dimensions',
  focus: 'dim',
  slide: `## Facts and dimensions

### Two kinds of mart
- A **fact** records events at a fixed grain, with numbers to add up: \`fct_orders\`, one row per order, with \`amount\`
- A **dimension** describes things, with attributes to group by: \`dim_customers\`, one row per customer, with \`country\`, joined on \`customer_id\`

### Keep them separate
- Facts grow with every event; dimensions change slowly
- Measures live on the fact, so they are summed once, at the right grain

### Start from the question
"Revenue by country" needs a fact to measure and a dimension to group. Ask consumers what they will **filter, group and add up** before writing SQL.

### Definitions are decisions
Does a \`placed\` order count as revenue? Its amount is 0 here. Write the rule down in the model's description.`,
  narration:
    "Most marts come in two kinds. A fact records events at a fixed grain, with numbers you can add up. fct orders is one: one row per order, with an amount. A dimension describes things, with attributes you group and filter by. dim customers is one: one row per customer, with their name, their country, and a few summaries such as their order count. The two meet on a shared key, here customer id. Keeping them separate pays off. Facts grow with every new event, while dimensions change slowly, and keeping measures on the fact means they are summed once, at the right grain. Revenue by country, for example, takes amounts from the fact and groups them by the dimension's country. That is a good way to design a mart in the first place: start from the questions people will ask, and find out what they need to filter, group and add up, before writing any SQL. And notice that every mart quietly encodes business decisions. Does a placed order, one not yet paid, count as revenue? Here its amount is zero, so it adds nothing, but someone should decide that deliberately. Whatever the rule is, write it in the model's description, so the next reader does not have to reverse-engineer it from the SQL.",
}
