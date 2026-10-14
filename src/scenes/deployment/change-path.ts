import type { Scene } from '@graphlearning/flow'

// §8.1 — the path one change takes, and what a reviewer reads at each step.
export const changePath: Scene = {
  id: 'change-path',
  title: 'From a branch to production',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'path-row',
      label: 'One change, end to end',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'path',
          label: 'The path',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'p-branch', label: 'Branch', sub: 'built in your dev schema', pattern: 'service', icon: 'gitbranch' },
            { id: 'p-pr', label: 'Pull request', sub: 'diff, owners, discussion', pattern: 'user', icon: 'users' },
            { id: 'p-ci', label: 'CI build', sub: 'its own schema, tests', pattern: 'service', icon: 'circlecheck' },
            { id: 'p-merge', label: 'Merge', sub: 'main is what prod runs', pattern: 'storage', icon: 'merge' },
            { id: 'p-prod', label: 'Production job', sub: 'service identity, schedule', pattern: 'storage', icon: 'snowflake' },
          ],
          edges: [
            { source: 'p-branch', target: 'p-pr' },
            { source: 'p-pr', target: 'p-ci' },
            { source: 'p-ci', target: 'p-merge' },
            { source: 'p-merge', target: 'p-prod' },
          ],
        },
        {
          id: 'review',
          kind: 'table',
          label: 'What a reviewer reads',
          headers: ['in the PR', 'ask'],
          values: [
            ['the .sql diff', 'did the grain change?'],
            ['the YAML diff', 'tests, contracts, owners'],
            ['the compiled SQL', 'what will actually run?'],
            ['the CI result', 'what did it build — and not?'],
            ['dbt_project.yml', 'a folder-wide change?'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
