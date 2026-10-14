import type { Section } from '../types'

// §8.5 — orchestration, ingestion dependencies, freshness checks, and schedules.
export const orchestration: Section = {
  id: 'orchestration',
  title: 'Orchestration and source readiness',
  scene: 'orchestration',
  focus: 'j-fresh',
  slide: `## Orchestration and source readiness

dbt does not schedule itself. An **orchestrator** runs it, and the order of steps matters.

### A production job
1. Wait until ingestion reports its load finished
2. \`dbt source freshness\`: stop if a source is stale
3. \`dbt build\`
4. Keep \`manifest.json\` and \`sources.json\` for the next run

### Build what new data touched
\`source_status:fresher+\` compares freshness with the last run. New payments arrived, orders did not: dbt selected \`stg_payments\` and its 4 descendants only.

### A schedule is not a dependency
"Run at 06:00" assumes the loader finished by 05:59. Trigger on the load finishing, and use freshness as the safety net.`,
  narration:
    "dbt does not schedule itself. Something else runs it, an orchestrator, and the order of the steps matters more than the tool. A sound production job does four things in order. First, it waits until ingestion reports that its load has finished. Second, it runs dbt source freshness, and stops if a source is stale, rather than publishing yesterday's numbers as today's. Third, it runs dbt build. Fourth, it keeps the manifest and the sources file, because the next run, and CI, will need them. That saved sources file enables a useful selector. source status fresher plus compares source freshness with the previous run, and selects only what new data actually touched. In our run, new payments had arrived but orders had not, so dbt selected staging payments and its four descendants, and left orders alone. Finally, a schedule is not a dependency. Run at six o'clock quietly assumes the loader finished by five fifty nine. When it is late, the job builds on stale data. Trigger the job on the load finishing where you can, and keep freshness checks as the safety net.",
}
