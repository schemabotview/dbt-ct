import type { Section } from '../types'

// §9.7 — ownership, retention, audit evidence, and incident runbooks; bridge to course 10.
export const runbooks: Section = {
  id: 'runbooks',
  title: 'Ownership, retention, runbooks',
  scene: 'runbook',
  focus: 'rb-state',
  slide: `## Ownership, retention, runbooks

Incidents go better when the steps are written down **before** they are needed.

### A runbook
1. Tell consumers: the owner in the exposure
2. Read the state: artefacts, logs, and the tables themselves
3. Choose a repair: retry, backfill or full refresh, for what you found
4. Reconcile totals against the source
5. Write it up: cause, fix, and the check that would have caught it

### Keep the evidence
Production manifests and run results, \`sources.json\`, logs and the audit table, for as long as you may need to explain a number.

### Never lose these
Snapshots hold history that exists **nowhere else**.

**Next:** one shared meaning for revenue.`,
  narration:
    "Incidents go better when the steps are written down before anyone needs them. A good runbook has five. First, tell consumers, starting with the owner named in the exposure, so nobody acts on a wrong number while you work. Second, read the state: the artefacts, the logs, and the tables themselves, as in the diagnosis section. Third, choose a repair for what you actually found: a retry for a failed run, a bounded backfill for a missed window, a full refresh only when the source still holds everything. Fourth, reconcile totals against the source, because a repair is just another claim until the numbers agree. Fifth, write it up: the cause, the fix, and the new check that would have caught it sooner. Keep the evidence, too. Production manifests and run results, the freshness files, the logs and the audit table, kept for as long as you might need to explain a number. And one thing must never be lost. Snapshots hold history that exists nowhere else. Next, the final course: one shared meaning for revenue.",
}
