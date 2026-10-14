import type { Section } from '../types'

// §8.6 — release ordering, compatible schemas, versions, and consumer handoff.
export const releaseOrdering: Section = {
  id: 'release-ordering',
  title: 'Release ordering and handoff',
  scene: 'release-order',
  focus: 'r2',
  slide: `## Release ordering and handoff

Some changes ship in one release. **Breaking** ones need several, in the right order.

### Compatible: one release
Adding a column or a new model breaks nobody. Nor does a new test or a better description. Merge and deploy.

### Breaking: renaming \`amount\` in \`fct_orders\`
1. Release 1 adds \`v2\` beside \`v1\`, contracted
2. Hand off: tell the owners in the exposures, agree a date
3. Release 2: consumers pin \`v2\`
4. Release 3: after the deprecation date, delete \`v1\`

### Upstream before downstream
A model must deploy before, or with, the models that read it. Never the other way round.

Before merging, \`dbt ls -s state:modified+\` lists every model the release touches.

The handoff is a conversation, not a deploy. dbt only reminds you, with deprecation warnings.`,
  narration:
    "Some changes can ship in a single release, and some cannot. Compatible changes, like adding a column or adding a new model, break nobody, so you merge and deploy. Breaking changes need several releases, in the right order. Take renaming amount in fct orders. Release one adds version two beside version one, both contracted, so consumers can start testing against the new shape while nothing breaks. Then comes the handoff. You tell the owners listed in your exposures, and agree a date. In release two, consumers pin version two. In release three, after the deprecation date, you delete version one. Ordering matters inside the project too. A model has to deploy before, or together with, the models that read it, never after them; otherwise the downstream model fails, or reads a shape that does not exist yet. Before merging any release, dbt ls with state modified plus lists every model it touches, which is the list to check. And notice that the handoff in the middle is a conversation, not a deploy. dbt can remind you, with deprecation warnings at every reference, but it cannot agree a date with the finance team on your behalf.",
}
