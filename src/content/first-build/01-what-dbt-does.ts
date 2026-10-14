import type { Section } from '../types'

// §1.1 — analytics engineering, ELT, and the line between ingestion and transformation.
export const whatDbtDoes: Section = {
  id: 'what-dbt-does',
  title: 'What dbt does',
  scene: 'elt-pipeline',
  focus: 'dbt',
  slide: `## What dbt does

**Analytics engineering** turns raw, loaded data into tables people can trust, using the habits of software work: version control, review and tests.

### ELT: load first, transform in the warehouse
- An **ingestion tool** extracts rows and loads them raw. dbt does not do this
- **dbt** owns the T: you write \`select\` statements, dbt turns them into views and tables
- The **warehouse** does the heavy lifting. dbt sends it SQL
- Raw tables stay untouched, so every model can be **rebuilt** from them

### What dbt is not
Not a loader, not a scheduler, not a dashboard. It compiles your SQL and runs it in the right order.

### The running example
Raw shop **orders**, **payments** and **customers** become staging models, marts and, by the last course, one shared definition of revenue.`,
  narration:
    "Analytics engineering is the work of turning raw data into tables that people can actually trust, and doing it with the habits of software engineering: version control, code review, and tests. dbt is a tool for exactly that work, but it is important to be precise about which part. In an E L T pipeline, something extracts rows from the source systems and loads them, unchanged, into the warehouse. That is an ingestion tool's job, and dbt does not do it. dbt starts from the raw tables that are already there. It owns the T, the transform. You write select statements, and dbt turns each one into a view or a table. Even then, dbt is not the thing crunching the data. It sends SQL to the warehouse, and the warehouse does the heavy lifting. And because dbt never modifies the raw tables, every model it builds can be thrown away and rebuilt from them. So keep three boundaries in mind: dbt is not a loader, it is not a scheduler, and it is not a dashboard. It compiles your SQL, and runs it in the right order. Throughout this course, we follow one small shop: raw orders, payments and customers, becoming staging models, then marts, and eventually a single shared definition of revenue.",
}
