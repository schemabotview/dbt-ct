import type { Section } from '../types'

// §3.3 — temporal semantics, and current versus historical attributes.
export const timeAndHistory: Section = {
  id: 'time-and-history',
  title: 'Current versus historical',
  scene: 'current-vs-history',
  focus: 'attribution',
  slide: `## Current versus historical

Most raw tables hold only the **current** value. Join to them, and old events take today's attributes.

### An illustrative case
- Ana orders on 1 September while living in the UK
- On 20 September she moves; \`raw.shop.customers\` now says DE
- A report on 1 October files her September order under **DE**

### Neither answer is wrong
"Where are our customers now?" wants current values. "Where did we sell last month?" wants values **as they were**. Name which one each model gives.

### Know your dates
\`order_date\` is when it happened. \`_loaded_at\` is when it arrived. Time zones move both.

### Until then
Name current-state models plainly, and say "current" in the description. Keeping history needs snapshots: course 6.`,
  narration:
    "Here is a subtler trap, and it is about time. Most raw tables hold only the current value of each attribute. When something changes, the old value is overwritten. Join old events to those tables, and the old events quietly take on today's attributes. Take an illustrative case. Ana places an order on the first of September, while she lives in the UK. On the twentieth she moves to Germany, and the customers table now says D E. When a report runs in October, joining September's orders through dim customers, her order is filed under Germany. Is that wrong? Not necessarily. If the question is where our customers are now, current values are right. If the question is where we sold last month, you need values as they were at the time of the order. The model has to say which one it gives, in its name or its description. While you are at it, be precise about dates. Order date is when something happened. Loaded at is when it arrived in the warehouse. And time zones can shift both across a day boundary. Until then, name current-state models plainly, and say current in their descriptions. Keeping real history takes snapshots, which arrive in course six.",
}
