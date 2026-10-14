import type { Scene } from '@graphlearning/flow'

// §5.5 — installing a package. The git form and the lock are a real `dbt deps` on dbt-core 1.12.6
// (the Hub form is shown for reference; hub.getdbt.com was not reachable from the authoring
// environment). The surrogate-key compile is real dbt_utils 1.3.0 output on the local target.
export const packages: Scene = {
  id: 'packages',
  title: 'Packages and locks',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'packages-yml',
      kind: 'code',
      filename: 'packages.yml   (one of these forms)',
      label: `packages:
  - package: dbt-labs/dbt_utils          # from the dbt Package Hub
    version: [">=1.3.0", "<2.0.0"]

  - git: https://github.com/dbt-labs/dbt-utils.git    # straight from git
    revision: 1.3.0`,
    },
    {
      id: 'lock-row',
      label: 'Locked, and what it means',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'lock',
          kind: 'code',
          filename: 'package-lock.yml   (written by dbt deps — commit it)',
          label: `packages:
      - git: https://github.com/dbt-labs/dbt-utils.git
        name: dbt_utils
        revision: e164c645238ca98f21b2ecc558912b94b3d75a9f
    sha1_hash: 30db094c79d09129c86dddea556190135598dcaf`,
        },
        {
          id: 'package-use',
          label: 'What you now depend on',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'macros-in', label: 'Its macros', sub: 'surrogate keys, date spines', pattern: 'service', icon: 'package' },
            { id: 'code-in', label: 'Its code', sub: 'runs with your role', pattern: 'warn', icon: 'shieldcheck' },
            { id: 'pin-in', label: 'Its version', sub: 'pinned by the lock', pattern: 'storage', icon: 'lock' },
          ],
        },
      ],
    },
  ],
  edges: [
    { source: 'packages-yml', target: 'lock-row', label: 'dbt deps' },
  ],
}
