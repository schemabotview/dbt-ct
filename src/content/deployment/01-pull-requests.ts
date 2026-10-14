import type { Section } from '../types'

// §8.1 — Git, pull requests, ownership, and reviewable SQL/configuration.
export const pullRequests: Section = {
  id: 'pull-requests',
  title: 'From a branch to production',
  scene: 'change-path',
  focus: 'p-pr',
  slide: `## From a branch to production

Every change to production goes through the same path: branch, pull request, CI, merge, scheduled job.

### Why it works for dbt
A dbt project is text: SQL, YAML and Jinja. Git versions it, and a pull request shows the exact diff.

### What a reviewer should read
- The \`.sql\` diff: did the **grain** change?
- The YAML diff: tests, contracts, owners
- The **compiled** SQL, for macro-heavy models
- The CI result: what it built, and what it skipped

### Ownership
Owners in model \`meta\`, and a code-owners file in the repo, decide who must approve a change to a mart.

### Keep pull requests small
One model, or one concern, per PR. A reviewer can hold its grain in their head, and reverting it is clean.

Nobody edits production by hand: \`main\` is what runs.`,
  narration:
    "Every change to production should travel the same path. You work on a branch, building into your own development schema. You open a pull request. A CI job builds and tests the change in a schema of its own. A reviewer approves it, it merges into main, and a scheduled production job, running as a service identity, picks it up. This works well for dbt because a dbt project is just text: SQL, YAML and Jinja. Git versions every line of it, and a pull request shows exactly what changed. A good reviewer reads more than the SQL diff. They ask whether the grain of a model changed, which no diff announces. They read the YAML diff, for tests, contracts and owners. For macro-heavy models, they read the compiled SQL, because that is what will actually run. And they read the CI result, including what it skipped or did not select. Ownership makes review real. Owners recorded in each model's meta, and a code owners file in the repository, decide who must approve a change to a given mart. Keep pull requests small, too: one model or one concern each, so a reviewer can hold its grain in their head, and a revert is clean. And the rule underneath all of it: nobody edits production by hand. Main is what runs.",
}
