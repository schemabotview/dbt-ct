import type { Section } from '../types'

// §7.8 — partial failures, retry commands, and engine/version support; bridge to course 8.
export const retrySection: Section = {
  id: 'retry',
  title: 'Partial failures and retry',
  scene: 'retry',
  focus: 'retry-after',
  slide: `## Partial failures and retry

A build that fails halfway leaves the project **partly built**: some nodes new, some skipped, some untouched.

### What happened here
- A typo in \`stg_payments\`: 1 error, 7 skipped, 3 succeeded
- After the fix, \`dbt retry\` re-ran exactly those **8**, not all 11

### How retry knows
It reads \`target/run_results.json\` from the previous invocation. Run anything else in between, and that file is replaced.

### What retry does not do
It does not undo the 3 nodes that succeeded, or check that their inputs are still current.

### Engines differ
\`retry\`, state and deferral behave per engine and version. Check them on yours, such as dbt v2.

**Next:** taking all of this into reviewed, deployed production work.`,
  narration:
    "When a build fails halfway, the project is left partly built. Some nodes were rebuilt, some were skipped, and some were never touched. Here, a typo in stg payments produced one error and seven skipped nodes, while three nodes succeeded. After fixing the typo, there is no need to rebuild everything. dbt retry re-ran exactly the eight nodes that errored or were skipped, not all eleven, and they all succeeded. Retry knows what to re-run because it reads the run results file from the previous invocation. That has a consequence. If you run any other dbt command in between, even a quick dbt ls, that file is replaced, and retry is working from the wrong run. Be clear, too, about what retry does not do. It does not undo the three nodes that already succeeded, and it does not check whether their inputs have changed since. Finally, retry, state comparison and deferral are behaviours of a particular engine and version. Check them on the one you run, especially if you move to dbt version two. Next, we take all of this into reviewed, deployed production work.",
}
