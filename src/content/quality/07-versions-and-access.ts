import type { Section } from '../types'

// §4.7 — model versions, access, deprecation, and consumer migration.
export const versionsAndAccess: Section = {
  id: 'versions-and-access',
  title: 'Versions, access, deprecation',
  scene: 'model-versions',
  focus: 'resolves',
  slide: `## Versions, access, deprecation

Renaming \`amount\` would break every consumer at once. **Versions** let both shapes exist while people move.

### Two versions, side by side
- \`v1\` keeps \`amount\`; \`v2\` renames it \`amount_total\`
- They build as \`fct_orders_v1\` and \`fct_orders_v2\`
- An unpinned \`ref('fct_orders')\` gets \`latest_version\`, with a warning
- \`deprecation_date\` makes dbt warn every reference to \`v1\`

### A migration
Ship \`v2\` beside \`v1\`, move consumers, then delete \`v1\` and set \`latest_version: 2\`.

### Access
\`private\`, \`protected\` (default) or \`public\`: who may \`ref()\` the model.

### Not a permission
Access governs dbt references only. Who can **query** the table is a Snowflake grant.`,
  narration:
    "Sometimes an interface has to change. Renaming amount to amount total would break every consumer at once, so dbt lets you keep both shapes alive while people move across. These are model versions. Version one keeps amount. Version two renames it. They build side by side, as fct orders underscore v one and underscore v two. A consumer can pin a version explicitly, with ref fct orders, v equals two. A reference without a version resolves to the latest version you declared, here still version one, and dbt warns that it is unpinned, so nobody is surprised when the latest moves. Give version one a deprecation date, and dbt warns at every reference to it, which is a polite but persistent migration reminder. So a migration looks like this: ship version two beside version one, move consumers across, then delete version one and make two the latest. Alongside versions sits access. A model can be private, usable only within its own group, protected, usable anywhere in this project, which is the default, or public, usable from other projects too. One last distinction, and it is important. Access governs which dbt models may ref this one. It is not a permission. Who can actually query the table in Snowflake is decided by grants.",
}
