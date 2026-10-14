import type { Section } from '../types'

// §7.3 — manifest, run_results, catalog, and freshness artefact boundaries.
export const artefacts: Section = {
  id: 'artefacts',
  title: 'Artefacts and what they establish',
  scene: 'artefacts',
  focus: 'run-results',
  slide: `## Artefacts and what they establish

Every invocation writes JSON files into \`target/\`. They are evidence, each about one thing.

### The four you will use
- \`manifest.json\`: the project as parsed. Every node, config and dependency
- \`run_results.json\`: what **this** run did, node by node, with status and timing
- \`catalog.json\`: column types read from Snowflake, by \`dbt docs generate\`
- \`sources.json\`: freshness results

### What they cannot tell you
The manifest describes the **code**, not the warehouse. A model in the manifest may never have been built, or built from older code.

### Keep them
The next run overwrites \`target/\`. Copy artefacts you need, such as production's manifest, somewhere safe.`,
  narration:
    "Every dbt invocation writes JSON files into the target folder, and they are your evidence about what happened. Four matter most. The manifest is the whole project as parsed: every node, its configuration, and every dependency. Run results records what this particular run did, node by node, with a status and timing for each, and on Snowflake, the adapter adds the query id and the number of rows affected. The catalog holds the actual column types, read from Snowflake by dbt docs generate. And sources dot json holds freshness results. Each one is evidence about one thing, so be careful about what it cannot tell you. The manifest describes the code, not the warehouse. A model can appear in the manifest and never have been built, or have been built last week from older code. Run results describes this run only, and says nothing about earlier ones. And here is a practical trap. The next run overwrites the target folder. Any artefact you will need later, such as the manifest from your last production run, has to be copied somewhere safe. The next section depends on exactly that.",
}
