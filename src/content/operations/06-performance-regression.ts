import type { Section } from '../types'

// §9.6 — performance/cost regression and workload prioritisation.
export const performanceRegression: Section = {
  id: 'performance-regression',
  title: 'Performance and cost regressions',
  scene: 'regression',
  focus: 'timings',
  slide: `## Performance and cost regressions

A regression passes every test. Only **timing** shows it.

### A real one
One change to \`dim_customers\` took it from **0.04 s** to **0.42 s**: nearly ten times slower. The build said OK and every test passed.

### Catch it
- Keep each production run's \`run_results.json\`
- Compare each model's \`execution_time\` with the last run's
- Investigate the biggest **ratios**, not the biggest totals
- On Snowflake, credits follow time: a 10× model is a 10× bill

Snowflake's query history shows the same per query, for every tool, not only dbt.

### Prioritise the workload
When the warehouse is busy, run critical marts first, or on their own warehouse, and let everything else wait.`,
  narration:
    "A performance regression passes every test, because tests check rows, not time. Only timing shows it. Here is a real one. A single change to dim customers took it from four hundredths of a second to forty two hundredths: nearly ten times slower. The build said OK, and every test passed. Nothing would have flagged it, except a comparison of timings. That comparison is simple to set up. Keep each production run's run results file. After every run, compare each model's execution time with the previous run, and sort by the ratio between them. Look at the biggest ratios first, not the biggest totals, because a model that suddenly takes ten times longer is news, while a model that has always been slow is not. On Snowflake, credits follow running time, so a model that is ten times slower is roughly ten times the cost. Snowflake's query history shows the same thing per query, across every tool that uses the warehouse, not only dbt. Finally, when the warehouse is busy, prioritise. Run the critical marts first, or on a warehouse of their own, and let everything else wait its turn.",
}
