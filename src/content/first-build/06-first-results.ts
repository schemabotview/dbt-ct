import type { Section } from '../types'

// §1.6 — first results, basic tests and descriptions, artefacts, cost awareness, and the bridge.
export const firstResults: Section = {
  id: 'first-results',
  title: 'Reading the first build',
  scene: 'first-build-results',
  focus: 'rows',
  slide: `## Reading the first build

### The evidence
- **Rows**: 5 raw orders in, 4 out. Order 3 was returned
- **Log**: every node ends as OK, PASS, WARN, ERROR or SKIP
- **Tests**: \`order_id\` is unique and never null. Both passed
- **Descriptions**: the YAML text becomes docs via \`dbt docs generate\`
- **Artefacts**: \`target/run_results.json\` records each node's status and timing

### What it does not prove
- That "not returned" is the right business definition
- That every order actually arrived in the raw table

### Cost
Every run spends warehouse compute. A table is rebuilt on each run, a view is computed at query time.

**Next:** naming the raw tables properly, as sources.`,
  narration:
    "So what did the first build actually give us? Start with the rows. Five raw orders went in, and four came out, because order three was returned and the model filters returns away. The log gives every node a final status: OK, pass, warn, error or skip. The YAML file did two jobs. It described the model and its key column, which dbt docs generate turns into a documentation site, and it attached two tests to order id: unique, and not null. Both passed. Every run also leaves artefacts behind in the target folder. run results dot json records the status and timing of every node, which is the evidence you go back to when something looks wrong. Now, be careful about what this proves. A green build means the SQL ran and the tests passed. It does not mean that excluding returns is the right business definition, and it says nothing about whether every order made it into the raw table in the first place. And every run costs something. A table is rebuilt in full each time it runs, while a view costs nothing until someone queries it. Next, we stop hard-coding raw table names, and declare them properly as sources.",
}
