import type { Section } from '../types'

// §6.6 — full refresh, targeted backfills, reconciliation, and recovery.
export const fullRefresh: Section = {
  id: 'full-refresh',
  title: 'Full refresh and reconciliation',
  scene: 'full-refresh',
  focus: 'repairs',
  slide: `## Full refresh and reconciliation

An incremental table drifts silently. **Reconciliation** finds the drift; a rebuild repairs it.

### Reconcile
- Compare counts and totals between the table and its source
- After the late row: table **4 · 42.00**, source **5 · 45.00**
- Keep it in \`analyses/\`: compiled, never run
- Or write it as a **singular test**, so drift fails the build

### Repair
- \`dbt run -s fct_payments --full-refresh\` rebuilt it: **5 · 45.00**
- Too big to rebuild? Backfill one window, bounded by a \`var\`
- Then reconcile **again**: a repair is a claim too

### When you cannot rebuild
If the source no longer holds old rows, a full refresh **loses** them. Check retention first.`,
  narration:
    "Incremental tables drift silently, so you need a way to find the drift, and a way to repair it. Reconciliation finds it. Compare simple counts and totals between the table and its source. After the late payment, the table held four rows and forty two, while the source held five and forty five. A query like this one can live in the analyses folder, which dbt compiles, resolving every ref, but never runs, so you run the compiled SQL yourself, or turn it into a singular test. Repairing is usually a full refresh. dbt run, selecting fct payments, with dash dash full refresh, ignores the existing table and rebuilds it from the source. Ours came back with five rows and forty five. When a table is too big to rebuild, backfill a window instead: give the model's filter a variable for its start date, and pass that variable on the command line. One warning before you reach for a full refresh. It rebuilds from whatever the source holds today. If the source has already deleted old rows, the rebuild loses them. So check the source's retention before you rebuild.",
}
