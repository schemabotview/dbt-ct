import type { Section } from '../types'

// §10.4 — migration, consumer compatibility, and architecture decision records.
export const decisionRecords: Section = {
  id: 'decision-records',
  title: 'Decision records and migration',
  scene: 'decision-record',
  focus: 'adr',
  slide: `## Decision records and migration

Six months from now, someone will ask why \`fct_payments\` is incremental. Write the answer down **now**.

### An architecture decision record
- **Context** and **decision**, in two lines
- **Evidence**: the measured runs, such as the late row the lookback caught
- **Consequences**: what we gave up, such as unseen deletes
- **Revisit when**: the condition that would change the decision

### Migrating safely
Switching a table to incremental changes how it is built, not what it promises:
- Reconcile against a full rebuild
- Keep the columns, types and name
- Tell the owners listed in the exposures

Keep records in the repository, reviewed like code.`,
  narration:
    "Six months from now, someone will ask why fct payments is incremental, and the person who decided may have moved on. Write the answer down now, as an architecture decision record. A good record is short. Context and decision, in a line or two each. The evidence, which here is real: the late payment that a maximum timestamp filter missed and the lookback caught, and the append run that doubled the rows. The consequences, including what was given up, such as deletes that the incremental model never sees, and new columns that are not backfilled, so the team runs a weekly full refresh and reconciles after every run. And finally, the condition for revisiting it: if lateness grows beyond three days, or the table becomes cheap enough to rebuild. Migrating fct payments from a table to an incremental model changes how it is built, not what it promises consumers. So reconcile its rows against a full rebuild, keep its columns, types and name unchanged, and tell the owners listed in the exposures. Keep these records in the repository, reviewed like code.",
}
