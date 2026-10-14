import type { Section } from '../types'

// §6.8 — snapshot frequency, hard-delete options, retention, and rebuild limits; bridge to course 7.
export const snapshotLimits: Section = {
  id: 'snapshot-limits',
  title: 'What snapshots cannot see',
  scene: 'snapshot-limits',
  focus: 'run-sees',
  slide: `## What snapshots cannot see

A snapshot records what each **run observes**. Between runs, it is blind.

### Changes between runs
Ben moved to France and back between two runs. The second run saw UK, the same as before: **no trace** of France. Run more often if those changes matter.

### Deleted rows
Dev was deleted at the source. \`hard_deletes\` decides what the snapshot does:
- \`ignore\`, the default: Dev stays current, forever
- \`invalidate\`: his row is closed
- \`new_record\`: a new row marked \`dbt_is_deleted\`

### Snapshot sources, not marts
A mart's logic changes; the source's facts do not.

### Treat it as source data
A snapshot holds history that exists nowhere else. Never drop or full-refresh it, and back it up.

**Next:** choosing exactly what to run.`,
  narration:
    "A snapshot records what each run observes. Between runs, it is blind. Ben moved to France and then back to the UK between two snapshot runs. The second run saw UK, exactly as before, so the snapshot holds no trace that France ever happened. If short-lived changes matter to you, the only answer is to run the snapshot more often, or to get change history from the source itself. Deleted rows need a decision too. Dev was deleted from the source, and the hard deletes setting decides what the snapshot does. With ignore, the default, Dev simply stays current forever, as if he still existed. With invalidate, his row is closed, so he drops out of current views. With new record, the snapshot adds a fresh row marked as deleted, which keeps the deletion itself as part of the history. We ran the last two and saw exactly that. Also, snapshot raw sources rather than marts. A mart's logic changes over time, and its history would mix old and new definitions, while the source's facts do not. Finally, treat a snapshot as source data, not as a model. It holds history that exists nowhere else, so a rebuild cannot recover it. Never drop it or full-refresh it, and make sure it is backed up. Next, we look at choosing exactly what to run.",
}
