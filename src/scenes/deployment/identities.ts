import type { Scene } from '@graphlearning/flow'

// §8.4 — three identities, least privilege. SNOWFLAKE-SPECIFIC roles and grants; the `grants` model
// config registers on dbt-core 1.12.6 / dbt-snowflake 1.12.3.
export const identities: Scene = {
  id: 'identities',
  title: 'Identities, secrets, grants',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'id-table',
      kind: 'table',
      label: 'One identity per environment',
      headers: ['who', 'Snowflake role', 'may write', 'reads raw?'],
      values: [
        ['a developer', 'transformer_dev', 'dbt_<name>* only', 'yes'],
        ['CI', 'transformer_ci', 'ci_pr_* only', 'yes'],
        ['production job', 'transformer', 'prod*, snapshots', 'yes'],
        ['dashboards', 'reporter', 'nothing', 'no — marts only'],
      ],
    },
    {
      id: 'id-row',
      label: 'How each is enforced',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'grants-config',
          kind: 'code',
          hug: true,
          filename: 'dbt_project.yml',
          label: `models:
  shop:
    marts:
      +grants:
        select: ['reporter']`,
        },
        {
          id: 'secrets',
          label: 'Secrets',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 's-env', label: 'From the env', sub: 'env_var() in profiles', pattern: 'storage', icon: 'key' },
            { id: 's-key', label: 'Key-pair auth', sub: 'one key per identity', pattern: 'storage', icon: 'lock' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'id-table', target: 'id-row' }],
}
