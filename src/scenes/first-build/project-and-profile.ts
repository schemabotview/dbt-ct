import type { Scene } from '@graphlearning/flow'

// §3 — the two files a first run needs, side by side: what the project IS (committed) and how to
// CONNECT (not committed). The `profile:` key is the join between them. Both parse under dbt-core
// 1.12.6 / dbt-snowflake 1.12.3.
export const projectAndProfile: Scene = {
  id: 'project-and-profile',
  title: 'Project file and connection profile',
  flow: 'TB',
  padding: 0.17,
  nodes: [
    {
      id: 'project-yml',
      kind: 'code',
      filename: 'dbt_project.yml  (in git)',
      label: `name: shop
version: '1.0.0'
profile: shop          # which profile to use

model-paths: ["models"]

models:
  shop:
    staging:
      +materialized: view
    marts:
      +materialized: table`,
    },
    {
      id: 'profile-yml',
      kind: 'code',
      filename: '~/.dbt/profiles.yml  (never in git)',
      label: `shop:
  target: dev            # default target
  outputs:
    dev:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      private_key_path: "{{ env_var('SNOWFLAKE_KEY_PATH') }}"
      role: transformer
      warehouse: transforming
      database: analytics
      schema: dbt_alice    # your dev schema
      threads: 4`,
    },
  ],
  edges: [{ source: 'project-yml', target: 'profile-yml', label: 'profile: shop' }],
}
