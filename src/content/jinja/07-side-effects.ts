import type { Section } from '../types'

// §5.7 — hooks, operations, run_query, execute guards, and side effects.
export const sideEffects: Section = {
  id: 'side-effects',
  title: 'Hooks, operations, run_query',
  scene: 'side-effects',
  focus: 'baked',
  slide: `## Hooks, operations, run_query

Some Jinja does more than write SQL: it **runs** SQL. Know when, and how often.

### \`run_query()\` while compiling
Our model counted \`stg_orders\` at compile time. The answer, 6, was **frozen** into the SQL. Compiling did database work.

### Hooks and operations
- \`pre_hook\` / \`post_hook\`: statements around one model
- \`on-run-start\` / \`on-run-end\`: once per invocation
- \`dbt run-operation\`: one macro, on demand
- Inside a hook, \`{{ this }}\` is the model's own relation
- Hooks run on **every** build, so make them safe to repeat

### \`execute\` guards parse, nothing else
\`{% if execute %}\` stops a query at parse time. At compile, run and build it still runs.

For grants, use the \`grants\` config, not a hook: dbt then knows what to apply.`,
  narration:
    "Some Jinja does more than write SQL. It runs SQL, and you need to know when, and how often. run query executes a query while the model is being compiled. Our example counted the rows in stg orders at compile time. The answer, six, was frozen into the compiled SQL as a plain number. So compiling that model did real database work, and the number will be stale the moment new orders arrive. Hooks are another way. A pre hook or post hook runs statements just before or after one model. on run start and on run end run once per invocation, which suits audit rows and housekeeping. And dbt run operation calls one macro on demand, outside any build. We used it to log the order count. Inside a hook, this refers to the model's own relation. And hooks run on every single build, so write them to be safe to repeat. Now, the execute guard. Wrapping a query in if execute stops it from running at parse time, when there is no connection. It does not stop it anywhere else. At compile, run and build, it still runs. One practical recommendation: for granting access, use the grants config rather than a post hook. dbt then knows which grants should exist, and applies them consistently.",
}
