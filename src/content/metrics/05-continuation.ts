import type { Section } from '../types'

// §10.5 — specialist continuation and priorities for improvement. The end of the concept.
export const continuation: Section = {
  id: 'continuation',
  title: 'Continuation',
  scene: 'continuation',
  focus: 'practice',
  slide: `## Continuation

You can now explain a dbt project end to end: how it compiles, what it builds, how it is tested, deployed and repaired.

### What this course did not do
It explained; it did not assess. Production responsibility needs **demonstrated** practice:
- Build the shop project on a warehouse of your own
- Get real pull requests reviewed by real owners
- Run an incident: repair, reconcile, write it up

### Where to go deeper
Ingestion, warehouse administration, custom adapters, hosted Semantic Layer and Mesh, and dbt v2 were left out on purpose. Each has its own documentation.

### Keep current
Pin versions, read release notes, and check every claim against the engine you run. This course's were verified on dbt Core 1.12.6.`,
  narration:
    "You can now explain a dbt project from end to end: how it compiles, what it builds in the warehouse, how it is tested and documented, how it is deployed through review, and how it is repaired when something goes wrong. Be honest about what that means. This course explained. It did not assess you, and following worked examples is not the same as being responsible for production. That needs demonstrated practice. Build the shop project on a warehouse of your own. Get real pull requests reviewed by the people who own the numbers. And run an incident, even a rehearsed one: diagnose it, repair it, reconcile the totals, and write it up. Some topics were left out on purpose: ingestion tools, warehouse administration, custom adapters and materializations, the hosted Semantic Layer and multi-project features, and dbt version two. Each has its own documentation, and each deserves its own study. Finally, keep current. Pin your versions, read the release notes when you move them, and check every claim, including the ones in this course, against the engine you actually run.",
}
