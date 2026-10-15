import type { Section } from '../types'

// §9.4 — failed incremental recovery, backfills, and historical reconciliation.
export const incrementalRecovery: Section = {
  id: 'incremental-recovery',
  title: 'Recovering a missed window',
  scene: 'missed-window',
  focus: 'timeline',
  slide: `## Recovering a missed window

One bad row can stop an incremental model, silently.

### What happened
- A test payment dated **2030** loaded; the watermark jumped to 2030
- The loader deleted it, but the table kept it, and kept the watermark
- Two real payments arrived: neither was newer than 2030, so **both were skipped**
- Table **8 · 40.00**, source **9 · 59.00**. Every run said OK

### The recovery
1. Delete the bogus row from the table
2. Backfill a bounded window: \`--vars '{backfill_from: "2026-10-01"}'\`
3. Reconcile: **9 · 59.00** on both sides
4. Rebuild what reads it: \`fct_payments+\`

### Prevent it
Test the watermark column: no \`paid_at\` in the future.`,
  narration:
    "One bad row can stop an incremental model, and nothing will tell you. Someone loaded a test payment dated in the year two thousand thirty. The incremental model picked it up, and its watermark, the maximum paid at, jumped to twenty thirty. The loader then deleted the test row, but the incremental table kept it, and kept the watermark with it. Two real payments arrived in October. Neither was newer than twenty thirty, so both were skipped. After that run, the table held eight payments totalling forty, while the source held nine totalling fifty nine. And every run reported OK. The recovery has three steps. First, delete the bogus row from the table. Second, backfill a bounded window: the model reads a backfill from variable, and re-reads everything since the first of October, merging what is already there. Third, reconcile: nine rows and fifty nine on both sides. Fourth, rebuild everything downstream of the repaired model, so the fix reaches the marts. To prevent it happening again, add a test on the watermark column itself: no paid at may lie in the future.",
}
