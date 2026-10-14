import type { Section } from '../types'

// §8.2 — development and CI targets, isolated schemas, and cleanup.
export const ciTargets: Section = {
  id: 'ci-targets',
  title: 'CI targets and cleanup',
  scene: 'ci-schema',
  focus: 'left-behind',
  slide: `## CI targets and cleanup

CI needs a place to build that is neither yours nor production's: one **schema per pull request**.

### A CI output in the profile
- Its own user, key and role: \`transformer_ci\`
- \`schema: "ci_pr_{{ env_var('PR_NUMBER') }}"\`: PR 123 builds into \`ci_pr_123\`
- Custom schemas follow: \`ci_pr_123_marts\`

### Clean up when the PR closes
- Dropping only \`target.schema\` left \`ci_pr_123_marts\` and the test-audit schema behind
- The macro drops **every** schema with the prefix, and refuses to run on any non-CI target

### Development schemas too
Every developer's \`dbt_<name>\` schemas accumulate old models. Sweep them on a schedule, the same way.

### Why bother
Stale CI schemas cost storage and confuse anyone browsing the warehouse.`,
  narration:
    "CI needs somewhere to build that is neither your schema nor production's. The usual answer is one schema per pull request. The profile gets a CI output, with its own user, its own key and its own role, so CI can never write where production lives. Its schema comes from an environment variable, so pull request one two three builds into ci pr one two three, and custom schemas follow the same prefix, giving ci pr one two three underscore marts. Those schemas must be cleaned up when the pull request closes, and our first attempt taught a lesson. Dropping only the target schema left the marts schema and the test audit schema behind, because each custom schema is a separate schema. So the cleanup macro lists every schema in the database and drops the ones that carry this pull request's prefix, carefully, so that cleaning up pull request one two three never touches one two three four. It also refuses to run on any target that is not CI. Development schemas pile up the same way, full of models nobody has built for months, so sweep those on a schedule too. Why bother? Stale CI schemas cost storage, and they confuse anyone browsing the warehouse for the real tables.",
}
