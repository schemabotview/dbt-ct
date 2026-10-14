import type { Section } from '../types'

// §6.2 — source filters, watermarks, and incremental processing boundaries.
export const watermarks: Section = {
  id: 'watermarks',
  title: 'Watermarks',
  scene: 'watermark',
  focus: 'which-time',
  slide: `## Watermarks

The filter compares new rows with a **watermark**: the newest value already in the table, \`max(paid_at)\`.

### It works, on the happy path
- Day 1 builds payments 1–3: 3 rows, 35.00, matching the source
- Day 2 reads only payment 4: 4 rows, 42.00, still matching

### Choose the column carefully
- \`paid_at\` is when the payment **happened**. A row can arrive days later with an older value
- \`_loaded_at\` is when it **arrived**. It only ever grows, so nothing slips behind it
- Often best: filter on \`_loaded_at\`, and keep \`paid_at\` for reporting

### The boundary is permanent
A row on the wrong side of the watermark is **never read again** by an incremental run. Nothing errors.

Ask of every filter: what if a row arrives late?`,
  narration:
    "The incremental filter works by comparing incoming rows with a watermark: the newest value already in the table, here the maximum paid at. On the happy path it works perfectly. On day one, the first run builds payments one to three: three rows, thirty five in total, matching the source exactly. On day two, payment four arrives, the filter reads only rows paid after the current maximum, and the table now holds four rows and forty two, still matching. But choosing the watermark column is a real decision. paid at is when the payment happened. A payment can arrive in the warehouse days later, still carrying its older paid at time. underscore loaded at is when the row arrived, which only ever grows, so nothing can slip in behind it. Often the best answer is both: filter on loaded at, and keep paid at for reporting. The reason this matters is that the boundary is permanent. A row that lands on the wrong side of the watermark is never read again by any incremental run, and nothing errors to tell you. So for every incremental filter, ask one question: what happens if a row arrives late? The next sections answer it with a real late payment.",
}
