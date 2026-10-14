import type { Section } from '../types'

// §7.7 — compiled SQL, materializations, and query-performance evidence.
export const queryEvidence: Section = {
  id: 'query-evidence',
  title: 'Compiled SQL and query evidence',
  scene: 'query-evidence',
  focus: 'e-history',
  slide: `## Compiled SQL and query evidence

"This model is slow" is a claim. Follow the evidence from dbt into Snowflake.

### In dbt's artefacts
- \`execution_time\` in \`run_results.json\`: which node, how long
- \`target/compiled/\`: your rendered \`select\`
- \`target/run/\`: the full statement, including the \`merge\` or \`create\` around it

### In Snowflake
- Find the query by the \`query_id\` dbt-snowflake records, or by your \`query_tag\`
- The **query profile** shows bytes scanned, spilling and queueing

### Then decide
A full table scan suggests a filter or clustering. Rebuilding history every run suggests incremental. A long queue suggests scheduling, not SQL.`,
  narration:
    "This model is slow is a claim, and you can follow the evidence for it from dbt into Snowflake. Start with dbt's own artefacts. Execution time in run results tells you which node took how long. The compiled folder holds your select statement, rendered. The run folder holds the full statement dbt actually sent, including the merge or create table wrapped around your select, which is often where the surprise is. Then move into Snowflake. The Snowflake adapter records each query's id in run results, so you can find exactly that query in Snowflake's query history, or you can search by the query tag you configured in course three. Open its query profile, and Snowflake shows where the time went: how many bytes were scanned, whether it spilled to disk, how long it waited in the queue. Only then decide what to change. A full table scan on a large table suggests a better filter, or clustering. Rebuilding years of history every run suggests an incremental model. And a long queue time suggests a scheduling problem, not a SQL problem at all.",
}
