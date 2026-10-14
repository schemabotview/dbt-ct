import type { Section } from '../types'

// §8.3 — Slim CI, state artefact provenance, deferral, and test-data limits.
export const slimCi: Section = {
  id: 'slim-ci',
  title: 'Slim CI',
  scene: 'slim-ci',
  focus: 'ci-proves',
  slide: `## Slim CI

Rebuilding the whole project for every pull request is slow and expensive. **Slim CI** builds only the change.

### One command, two ideas from course 7
- \`state:modified+\`: what changed, and everything downstream
- \`--defer --state prod-state\`: read every other parent from production

### PR 123 changed \`stg_orders\`
3 models and 4 tests built in \`ci_pr_123\`. Everything else was read from production.

### The manifest's provenance matters
\`prod-state\` must be the manifest of the **latest** production run. A stale one selects the wrong changes and defers to old relations.

### What green does not mean
Not that production is fresh, and not that it performs at production scale.`,
  narration:
    "Rebuilding the whole project for every pull request gets slow and expensive as the project grows. Slim CI builds only what the change touches, and it combines two ideas from course seven. state modified plus selects what changed and everything downstream of it. And defer, with production's saved state, reads every other parent from production, instead of rebuilding it. Pull request one two three changed only stg orders. CI built three models and four tests in its own schema, and read everything else, like stg payments, from production. Much depends on where that saved manifest came from. It has to be the manifest of the latest production run. If it is stale, state comparison selects the wrong set of changes, and deferral reads from relations built from older code. So publish the production manifest as part of every production run, and have CI fetch exactly that. Finally, be precise about what a green Slim CI run means. The change compiles, builds and passes its tests on today's data, against production's parents. It does not mean production is fresh, and it says nothing about performance at production scale.",
}
