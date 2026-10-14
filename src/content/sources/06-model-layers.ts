import type { Section } from '../types'

// §2.6 — staging, intermediate and mart organisation as design patterns.
export const modelLayers: Section = {
  id: 'model-layers',
  title: 'Staging, intermediate, marts',
  scene: 'model-layers',
  focus: 'staging',
  slide: `## Staging, intermediate, marts

A common way to organise models. It is a **convention**, not a feature: dbt enforces none of it.

### Staging
One model per source table. Rename, cast, clean. No joins. Usually views.

### Intermediate
Reusable steps between staging and marts, such as joins and reshaping. Not meant for consumers.

### Marts
The business entities people query, such as order facts and customers. Documented, tested, usually tables.

### Why it helps
- Only staging touches \`source()\`, so raw data has one entry point
- Consumers see a small, stable set of marts

A folder name does not make a model correct. The layers organise; tests and review establish trust.`,
  narration:
    "As a project grows, it needs some shape, and the most common shape has three layers. It is worth saying up front that this is a convention, not a feature. dbt does not enforce any of it. Staging comes first: one model per source table, doing nothing but renaming, casting and cleaning. No joins, and usually views, because they are cheap. Our three staging models are exactly that. Intermediate models are reusable steps in the middle, like joining orders to their payments, which we build in the next course. They exist to keep marts simple, and they are not meant for anyone outside the team. Marts are what people actually query: business entities like order facts and customers, documented, tested, and usually tables. Why bother? Because only staging touches the raw sources, raw data has exactly one entry point, and a change upstream is fixed in one place. And consumers see a small, stable set of marts rather than every step along the way. But a folder name proves nothing. Putting a model in marts does not make it correct. The layers organise the work. Tests and review are what earn trust.",
}
