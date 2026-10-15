import type { Section } from '../types'

// §10.3 — end-to-end alternatives for modelling, persistence, and orchestration.
export const alternatives: Section = {
  id: 'alternatives',
  title: 'End-to-end alternatives',
  scene: 'alternatives',
  focus: 'choices',
  slide: `## End-to-end alternatives

The shop's revenue product, from loader to dashboard. Every layer had an alternative.

### What this course chose, and why
- **Modelling:** staging → marts, so raw data has one entry point
- **Persistence:** views for staging, tables for marts, incremental only where history is large
- **History:** a snapshot of customers, because the source overwrites
- **Orchestration:** the CLI under your own orchestrator, so nothing is locked to a vendor
- **Metric:** defined once, so reports cannot drift

### None of these is the answer
Each was chosen for **stated** requirements: data size, lateness, team, budget. Change a requirement, and the right choice may change.

Present a design by its requirements first. Then the choices read as consequences.`,
  narration:
    "Step back and look at the shop's revenue product as a whole, from the loader to the dashboard. At every layer there was an alternative, and it is worth saying why we chose what we did. For modelling, we chose staging then marts, rather than one wide table, so raw data has exactly one entry point. For persistence, views for staging and tables for marts, with an incremental model only where history is large enough to matter. For history, a snapshot of customers, because the source overwrites countries. For orchestration, the command line under your own orchestrator, so nothing is locked to a single vendor. And for the metric, a single definition, so that reports cannot drift apart. None of these is the answer. Each one was chosen for stated requirements: how much data there is, how late it arrives, who is on the team, and what the budget allows. Change a requirement, and the right choice may change with it. So when you present a design, start with its requirements. Then every choice reads as a consequence, and can be challenged on its own terms.",
}
