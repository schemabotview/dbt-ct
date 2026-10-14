import type { Section } from '../types'

// §3.1 — grain, keys, joins, aggregation, and duplicate amplification.
export const grainAndFanOut: Section = {
  id: 'grain-and-fan-out',
  title: 'Grain and fan-out',
  scene: 'fan-out',
  focus: 'fail-log',
  slide: `## Grain and fan-out

A model's **grain** is what one row means. \`fct_orders\`: one row per order. Its key, \`order_id\`, must be unique at that grain.

### How a join breaks it
- Order 4 was paid in two parts, so it has **two payment rows**
- Join orders to payments and order 4 appears twice
- Count orders: 5, not 4. Sum any order-level amount: doubled

### The evidence
The \`unique\` test on \`order_id\` fails with 1 result, and \`dbt build\` skips \`dim_customers\` rather than build on it.

### The fix
Aggregate payments **to the order grain first**, in \`int_order_payments\`, then join one row to one row.

### A habit
Before any join, say the grain of both sides out loud. If they differ, aggregate or pick one row first.`,
  narration:
    "Every model has a grain: what one row means. For fct orders, one row means one order, and its key, order id, must be unique at that grain. Grain is easy to break without noticing, and joins are where it usually happens. Order four was paid in two parts, so the payments table has two rows for it. Join orders to payments, and order four now appears twice. Nothing errors. The SQL is perfectly valid. But count the orders and you get five instead of four, and if orders carried an amount of their own, summing it would double order four's value. This is called fan-out, and it is the most common way an analytical model goes quietly wrong. Here, the unique test on order id caught it: it failed with one duplicated key, and dbt build skipped dim customers downstream instead of building it on bad data. The fix is to respect the grain. First aggregate payments to one row per order, in an intermediate model called int order payments, and only then join, so that one order row meets exactly one payment row. It is worth making a habit of this: before writing any join, say the grain of both sides out loud. If they differ, aggregate or pick one row first.",
}
