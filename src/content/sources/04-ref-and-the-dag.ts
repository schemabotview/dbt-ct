import type { Section } from '../types'

// §2.4 — ref, DAG dependencies, relation resolution, and naming.
export const refAndTheDag: Section = {
  id: 'ref-and-the-dag',
  title: 'ref and the DAG',
  scene: 'shop-dag',
  focus: 'stg-orders',
  slide: `## ref and the DAG

dbt never asks you to list dependencies. It reads every \`source()\` and \`ref()\` call and builds the **DAG**, a directed acyclic graph.

### What the graph gives you
- Build order: parents before children, unrelated models in parallel
- Lineage: from a raw table to everything built on it
- Selection: later, "this model and everything downstream"

### Resolution depends on the target
- \`source()\` names a fixed raw table, the same in every target
- \`ref()\` resolves to **your** schema in dev and production's in prod

### Names must be unique
Two models called \`stg_orders\` is a compilation error, even in different folders: \`ref()\` could not choose.`,
  narration:
    "You never tell dbt the order to build things in. It works it out. While parsing, it reads every source call and every ref call, and turns them into a graph: a directed acyclic graph, or DAG. Directed, because each edge points from a parent to a child, and acyclic, because no model may depend on itself, however indirectly. Here are our three raw sources, their three staging models, and the order facts built on top of staging orders. That graph gives you three things. Build order: parents first, and unrelated models in parallel. Lineage: from any raw table to everything built on it. And selection, which a later course uses to build just one model and everything downstream of it. Notice that the two functions resolve differently. A source names a fixed raw table, so it is the same in every target. A ref resolves to wherever that model is built for the current target: your own schema in dev, the production schema in prod. One more rule. Model names must be unique across the whole project. We tried two models called stg orders, in different folders, and dbt refused to compile, because a ref could not know which one you meant.",
}
