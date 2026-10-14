import type { Section } from '../types'

// §7.4 — state comparison and modified-resource selection.
export const stateComparison: Section = {
  id: 'state-comparison',
  title: 'State comparison',
  scene: 'state-modified',
  focus: 'modified-plus',
  slide: `## State comparison

Compare your project with a saved manifest, and select only what changed: \`state:modified\`.

### What we changed
Only the \`cents_to_dollars\` macro: two decimal places became three.

### What dbt selected
- \`state:modified\`: \`stg_payments\`, because it **calls** the macro
- \`state:modified+\`: that, plus all four models downstream of it
- Unchanged models were left alone

### How to use it
Save production's manifest after every production run, in its own folder. Then \`--state prod-state\` points at it.

### What it compares
Two manifests: the code. Not the data. A model can be unchanged in code and still wrong in the warehouse.`,
  narration:
    "Once you have a saved manifest from production, dbt can compare your current project with it and select only what changed. That is state colon modified. We saved a production manifest, then changed just one thing: the cents to dollars macro now keeps three decimal places instead of two. No model file was touched. Even so, state modified selected stg payments, because it calls that macro, so its compiled SQL changed. Adding a plus, state modified plus, brought in everything downstream of it as well: the intermediate model, the payment facts, the order facts and customers. Everything else was left alone. That is the foundation of efficient CI, which we use in the next course. To make it work, save production's manifest after every production run, in a folder of its own, separate from the target folder that each run overwrites, and point dash dash state at it. And remember what is being compared: two manifests, which describe code. State comparison knows nothing about data. A model whose code has not changed can still be wrong, or stale, in the warehouse.",
}
