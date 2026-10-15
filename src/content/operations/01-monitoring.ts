import type { Section } from '../types'

// §9.1 — run, source-freshness, test, and consumer-health monitoring.
export const monitoring: Section = {
  id: 'monitoring',
  title: 'What to monitor',
  scene: 'monitoring',
  focus: 'breach',
  slide: `## What to monitor

A green run says the SQL ran. Production needs signals that would catch the failures that matter.

### Four signals
- **Run status**, from \`run_results.json\`: did every node succeed?
- **Freshness**, from \`sources.json\`: is the data recent?
- **Data tests**: do the rows obey the rules you wrote?
- **Consumer health**: does the mart match what its **users** mean?

### The one that caught this
Order 6 is \`refunded\`. The status test only warned, every other test passed, and the mart reported revenue of **59.00**. Finance counts completed and shipped orders only: **25.00**.

### Agree it, then encode it
A singular test with finance's definition failed at once, and now runs in every build. Alert the **owner**, not a shared channel nobody reads.`,
  narration:
    "A green run tells you the SQL ran. Production needs signals that would actually catch the failures that matter, and there are four worth having. Run status, from run results: did every node succeed? Freshness, from the sources file: is the data recent? Data tests: do the rows obey the rules you wrote down? And consumer health: does the mart match what its users mean by it? That last one is the one teams skip, and here is why it matters. A new order, order six, arrived with the status refunded. The accepted values test only warned, every other test passed, and the mart reported revenue of fifty nine. But finance counts revenue only for completed and shipped orders, which comes to twenty five. The difference is the refunded order and an unpaid placed order. Nothing in the pipeline was broken. The mart simply disagreed with its consumer. The fix starts with a conversation, to agree the definition, and ends with encoding it: a singular test using finance's own rule failed immediately, and it now runs in every production build. And route alerts to the owner of the model, not to a shared channel that nobody reads.",
}
