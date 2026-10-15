import type { Scene } from '@graphlearning/flow'

// §10.4 — an architecture decision record for course 6's choice, citing its real measured evidence,
// with the consumer-compatibility checks that come with any migration.
export const decisionRecord: Scene = {
  id: 'decision-record',
  title: 'Decision records and migration',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'adr',
      kind: 'code',
      filename: 'docs/adr/007-fct-payments-incremental.md',
      label: `# 007 — Build fct_payments incrementally

## Context
A full rebuild re-reads every payment, every hour.
Cost grows with history, not with change.

## Decision
Incremental: merge on payment_id,
3-day lookback on paid_at.

## Evidence
max(paid_at) filter missed a late row (4 · 42 vs 5 · 45);
the lookback caught it. Append doubled rows (10 · 90).

## Consequences
Deletes unseen; new columns not backfilled.
Weekly --full-refresh; reconcile every run.

## Revisit when
Lateness exceeds 3 days, or a rebuild becomes cheap.`,
    },
    {
      id: 'migration',
      kind: 'table',
      label: 'Migrating fct_payments from table to incremental: what consumers see',
      headers: ['check', 'how'],
      values: [
        ['same rows', 'reconcile against a full rebuild'],
        ['same columns and types', 'compare the catalog, or add a contract'],
        ['same name', 'relation unchanged — no version needed'],
        ['owners told', 'exposures list who reads it'],
      ],
    },
  ],
  edges: [{ source: 'adr', target: 'migration', label: 'then migrate safely' }],
}
