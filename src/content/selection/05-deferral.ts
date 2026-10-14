import type { Section } from '../types'

// §7.5 — deferral, existing relations, upstream resolution, and favour-state choices.
export const deferral: Section = {
  id: 'deferral',
  title: 'Deferral',
  scene: 'defer',
  focus: 'defer-rule',
  slide: `## Deferral

You changed \`fct_orders\` and want to build only it. Its parents live in **production**. \`--defer\` lets you use them.

### How a ref resolves
- A selected model: built in **your** schema
- Unselected, missing in dev: **production's**, from \`--state\`
- Unselected, present in dev: **yours**, unless \`--favor-state\`

### What we got
One compiled model reading \`prod.stg_orders\` **and** a stale dev \`stg_payments\`. Two environments, one result.

### Where it pays off
In CI: \`dbt build -s state:modified+ --defer --state prod-state\` builds what changed, and reads everything else from production.

### Before trusting it
Deferral checks neither freshness nor that prod matches your code. Read the compiled SQL.`,
  narration:
    "Say you changed fct orders and want to build just that model, without first rebuilding everything upstream into your own schema. Its parents already exist in production. dash dash defer, with a saved production manifest, lets you use them. The rule for each ref is this. A model you selected is built in your own schema, as usual. A parent you did not select, and which does not exist in your dev schema, resolves to production's relation, taken from the state manifest. But a parent that does exist in your dev schema is used from dev, unless you add dash dash favor state, which prefers production even then. Combined with state comparison, this is what makes CI cheap: build only what changed, and read everything else from production. We ran exactly this, and the compiled SQL shows the consequence. The one model read stg orders from production, because it had never been built in dev, and stg payments from dev, because an old copy was lying around from an earlier experiment. Two environments, mixed into one result. So before trusting a deferred build, remember that deferral does not check that production is fresh, or that production was built from the same code as yours. Read the compiled SQL to see which relation every ref actually used.",
}
