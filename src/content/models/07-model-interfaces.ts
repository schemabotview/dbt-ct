import type { Section } from '../types'

// §3.7 — consumer-facing model interfaces and compatibility; bridge to course 4.
export const modelInterfaces: Section = {
  id: 'model-interfaces',
  title: 'Models as interfaces',
  scene: 'model-interfaces',
  focus: 'interface',
  slide: `## Models as interfaces

Once people query a mart, its columns, types and grain become an **interface**: other people's work depends on them.

### Safe and unsafe changes
- Adding a column: safe
- Renaming or dropping one: breaks every query that names it
- Changing a type: can break, or silently cast
- Changing the grain: worst of all, because nothing errors and the numbers change

### Who will notice?
- dbt knows about downstream **models**, because they \`ref()\` this one
- It does not see dashboards or saved queries unless you declare them as **exposures**
- Before a breaking change: find the consumers, agree a date, keep the old shape until then

**Next:** tests, documentation and contracts that make these interfaces explicit.`,
  narration:
    "The moment other people start querying a mart, its shape stops being an internal detail. Its column names, their types, and its grain become an interface, and other people's work depends on them. Some changes are safe. Adding a column breaks nobody. Renaming or dropping a column breaks every query and dashboard that names it, loudly, which is at least easy to notice. Changing a column's type can break things, or worse, get silently cast into something slightly different. And changing the grain is the most dangerous of all, because nothing errors. Turn one row per order into one row per payment, and every dashboard keeps working while its totals quietly change. Ask who will notice. dbt knows about downstream models, because they ref this one. It knows nothing about dashboards or analysts' saved queries unless you declare them, as exposures. So before a breaking change, find the consumers, agree a date with them, and keep the old shape available until then. The next course gives you the tools to make this interface explicit: tests that check it, documentation that describes it, and contracts that dbt enforces.",
}
