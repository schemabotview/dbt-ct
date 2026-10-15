import type { Section } from '../types'

// §9.2 — logs, compiled SQL, artefacts, and warehouse diagnosis.
export const diagnosis: Section = {
  id: 'diagnosis',
  title: 'Logs, compiled SQL, the warehouse',
  scene: 'diagnosis',
  focus: 'diagnose-table',
  slide: `## Logs, compiled SQL, the warehouse

Both staging models built. Then \`fct_orders\` failed: "could not convert 'completed' to INT32".

### Where to look, in order
1. The console, then \`logs/dbt.log\`: every query, at debug level
2. \`target/run/\`: the exact statement dbt sent
3. Run that statement yourself in Snowflake, **as the job's role**

### Ask what the warehouse holds now
- The staging views: **rebuilt** by this run
- \`fct_orders\`: the **previous** version, intact. A failed table build does not replace it
- \`dim_customers\`: never reached

### Then fix the cause
Here, a \`cast\` on a text column. Fix the code, then decide how to re-run: next section.`,
  narration:
    "Here is a typical failure. Both staging models built successfully. Then fct orders failed, with an error saying it could not convert the string completed to an integer. Diagnose it in a fixed order. Start with the console, then the log file, logs slash dbt dot log, which records every query dbt ran, at debug level, including the full error. Then open the run folder, which holds the exact statement dbt sent to the warehouse. Then run that statement yourself in Snowflake, using the job's role rather than your own, because permissions often differ. Before fixing anything, ask what the warehouse holds right now. The staging views were rebuilt by this run. fct orders still holds its previous version, intact, because a failed table build does not replace the table that was already there. And dim customers was never reached, so it is as old as the last successful run. Only then fix the cause, here a cast applied to a text column. Fixing the code is half the job. The other half is deciding how to re-run safely, which is the next section.",
}
