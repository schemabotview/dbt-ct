import type { Section } from '../types'

// §3.4 — views, tables, and ephemeral models.
export const viewTableEphemeral: Section = {
  id: 'view-table-ephemeral',
  title: 'View, table, ephemeral',
  scene: 'three-materializations',
  focus: 'as-ephemeral',
  slide: `## View, table, ephemeral

The **materialization** decides what dbt creates from the same \`select\`.

### view
Stores the query. Always current, but every read runs it again. Good for staging.

### table
Stores the rows. Fast to read, but only as fresh as the last run, and rebuilt in full each time. Good for marts.

### ephemeral
Creates nothing. dbt pastes it into each model that refs it, as a CTE named \`__dbt__cte__…\`.
- Keeps the warehouse tidy, so it suits small intermediate steps
- But you **cannot query it** to debug, and every dependant repeats its work

Pick per model, and switch freely. Consumers see the same name either way, except for ephemeral.`,
  narration:
    "The same select statement can become very different things in the warehouse, and the materialization decides which. A view stores only the query. It is always current, because every read runs the query again, which also means every read pays for it. That suits staging models, which are light and read mostly by other models. A table stores the rows themselves. Reads are fast, but the data is only as fresh as the last dbt run, and the whole table is rebuilt every time. That suits marts, which many people read. The third option is ephemeral, and it is the odd one out. An ephemeral model creates nothing at all. Instead, dbt pastes its SQL into every model that refs it, as a common table expression with a name starting dbt CTE. You can see exactly that here: int order payments, inlined at the top of fct orders. That keeps the warehouse tidy, which suits small intermediate steps. But there is no relation you can query when debugging, and if several models ref it, each one repeats the work. You can switch materializations freely. Consumers see the same relation name either way, except for ephemeral, which has none.",
}
