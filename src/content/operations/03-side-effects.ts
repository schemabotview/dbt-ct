import type { Section } from '../types'

// §9.3 — partial builds, side effects, retries, and idempotency boundaries.
export const sideEffects: Section = {
  id: 'side-effects',
  title: 'Partial builds and side effects',
  scene: 'rerun-effects',
  focus: 'rerun-table',
  slide: `## Partial builds and side effects

A dbt build is **not one transaction**. Each node commits on its own, so a failure leaves some work done.

### Is running it again safe?
- Tables, views, merges on \`unique_key\`, grants: replaced or merged. **Safe**
- Append models and hook \`INSERT\`s: **run twice, stored twice**
- Our \`on-run-end\` audit insert ran in the failed build **and** in \`dbt retry\`: two rows for one run

### Code rollback is not data rollback
- A bad filter deployed with **OK**, and emptied \`fct_orders\`
- Reverting the code left it **empty**
- Only a rebuild from the reverted code restored it

### Before re-running, ask
Did anything write **outside** dbt's tables? Hooks, operations and external calls do not roll back.

Make every step safe to repeat, and know which ones are not.`,
  narration:
    "A dbt build is not one big transaction. Each node commits on its own, so when something fails halfway, some work is already done and stays done. That makes one question central: is running it again safe? For most work, yes. Tables and views are replaced, incremental merges on a unique key merge, and grants are simply applied again. But append models, and hooks that insert rows, are not. Run them twice and you store their rows twice. We had an on run end hook that wrote an audit row. It ran at the end of the failed build, and again at the end of dbt retry, so the audit table now shows two rows for what was really one run. The second trap is rollback. A bad filter deployed, ran with a green OK, and emptied fct orders. We reverted the code in git, and the table stayed empty, because reverting code does not touch data. Only rebuilding the model from the reverted code restored the rows. So before re-running anything, ask whether any step wrote outside dbt's own tables, through hooks, operations or calls to other systems, because none of that rolls back. And design every step to be safe to repeat, and keep a list of the ones that are not.",
}
