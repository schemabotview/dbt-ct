import type { Section } from '../types'

// §2.8 — documentation, ownership, lineage, and source contracts; bridge to course 3.
export const docsAndOwnership: Section = {
  id: 'docs-and-ownership',
  title: 'Documentation and ownership',
  scene: 'docs-and-ownership',
  focus: 'site',
  slide: `## Documentation and ownership

### Write it next to the code
- \`description:\` on models, columns and sources
- \`meta:\` for anything else, such as an \`owner\`. dbt stores it; your tools read it

### \`dbt docs generate\`
- Combines the manifest with a **catalog** of column types read from Snowflake
- \`dbt docs serve\` shows a searchable site with the lineage graph

### Lineage comes free
The graph is built from \`ref()\` and \`source()\`, so it is never out of date with the code.

### Source contracts
An agreement with the loading team: which tables, which columns, how fresh. It is documentation and process. dbt does not enforce it.

**Next:** the project is organised; now we decide what each model means.`,
  narration:
    "Documentation in dbt lives right next to the code it describes. Models, columns and sources all take a description, and meta holds anything else your team wants to record, such as an owner. dbt does not act on meta. It simply stores it in the manifest, where other tools can read it. dbt docs generate then builds the documentation. It combines the manifest, which holds every description, owner and dependency, with a catalog of actual column types, which it reads from Snowflake. dbt docs serve opens the result as a searchable site with the full lineage graph, from raw sources to marts. And the lineage costs you nothing extra. It is built from the same ref and source calls that order the build, so it can never drift out of date with the code. One more idea belongs here: a source contract. That is an agreement with the team that loads your raw data, covering which tables, which columns, and how fresh they will be. Writing it down in your source descriptions is valuable, but be clear that it is documentation and process. dbt does not enforce it. That is different from the model contracts we meet in course four, which dbt does enforce. The project is now organised and documented. Next, we decide what each model actually means.",
}
