import type { Section } from '../types'

// §6.4 — late data, lookback windows, deduplication, and deterministic input.
export const lateData: Section = {
  id: 'late-data',
  title: 'Late data and lookback',
  scene: 'late-data',
  focus: 'outcomes',
  slide: `## Late data and lookback

Payment 5 happened on 2 September but only **loaded** on 4 September. The table already held 3 September.

### What each filter did with it
- \`paid_at > max(paid_at)\`: **missed**. 4 rows, 42.00 against the source's 45.00, and the run said OK
- A 3-day **lookback** with **merge**: caught. 5 rows, 45.00
- The same lookback with **append**: 10 rows, 90.00. Every re-read row was stored twice

### The pattern
Look back far enough to cover how late data really arrives, and pair it with \`unique_key\`, so re-reading is harmless.

### How late is late?
Measure it: compare \`_loaded_at\` with \`paid_at\` across history. Set the lookback past the worst delay you accept, and rebuild now and then for the rest.

### Deterministic input
Re-reading only works if the same row comes back the **same**. Deduplicate the source in staging first.`,
  narration:
    "Here is the late row. Payment five happened on the second of September, but only arrived in the warehouse on the fourth, by which time the table already held payments from the third. The original filter, paid at greater than the maximum, never saw it. After the run, the table held four rows totalling forty two, while the source held five totalling forty five. And the run reported OK. Nothing failed. The fix is a lookback window. Instead of strictly newer than the maximum, read everything from three days before it. With merge on the unique key, the run picked up payment five, re-read a few rows it already had, merged them harmlessly, and ended with five rows and forty five, matching the source. We also tried the same lookback with append. Every re-read row was inserted a second time: ten rows, ninety in total, double the truth. How long should the lookback be? Measure it. Compare loaded at with paid at across your history, set the window past the worst delay you are willing to accept, and rebuild every so often to catch anything later still. So the pattern is a lookback long enough to cover how late your data really arrives, paired with a unique key so that re-reading is safe. That only works if the same row comes back the same each time, so deduplicate the source in staging first.",
}
