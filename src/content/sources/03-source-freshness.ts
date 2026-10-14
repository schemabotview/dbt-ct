import type { Section } from '../types'

// §2.3 — source freshness, loaded-at evidence, and completeness boundaries.
export const sourceFreshness: Section = {
  id: 'source-freshness',
  title: 'Source freshness',
  scene: 'source-freshness',
  focus: 'ages',
  slide: `## Source freshness

\`dbt source freshness\` asks each source one question: how long since the newest row was **loaded**?

### How it decides
- \`loaded_at_field\` names the load timestamp, here \`_loaded_at\`
- dbt compares \`max(_loaded_at)\` with now
- Past \`warn_after\`: WARN. Past \`error_after\`: ERROR STALE. \`freshness: null\` opts out

### What it cannot tell you
- A recent load can still be **partial**: freshness does not count rows
- It measures the loader, not the business event. Orders placed yesterday can load today

### Where \`_loaded_at\` comes from
Most loaders stamp each row with a load time. A business date such as \`order_date\` measures something else.

Run it before a build, so a stale source stops the line instead of feeding old data downstream.`,
  narration:
    "Declaring sources also lets you ask whether they are up to date. dbt source freshness asks each source one question: how long ago was the newest row loaded? You tell it which column records the load time, here underscore loaded at, which the ingestion tool writes on every row. dbt takes the maximum of that column and compares it with the current time. Past the warn after threshold, the source warns. Past error after, it errors as stale. In our run, orders were loaded three hours ago and passed. Payments had not been loaded for thirty hours, past the twenty four hour limit, so they errored. Customers were opted out with freshness null, so they were not checked at all. Now the boundary. Freshness tells you that a load happened recently. It does not tell you that the load was complete. A loader that brought in half the rows an hour ago passes with flying colours. And it measures load time, not the business event, so orders placed yesterday can legitimately arrive today. So use the timestamp your loader stamps on each row. A business column like order date measures something else entirely. The habit worth building is to run freshness before a build, so a stale source stops the line instead of quietly feeding old data downstream.",
}
