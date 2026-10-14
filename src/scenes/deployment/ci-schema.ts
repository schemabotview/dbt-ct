import type { Scene } from '@graphlearning/flow'

// §8.2 — a schema per pull request, and cleaning it up. Real dbt-core 1.12.6 runs on the local target:
// PR_NUMBER=123 built into ci_pr_123 and ci_pr_123_marts; dropping only target.schema left the
// custom and audit schemas behind, so the macro drops every schema with the prefix.
export const ciSchema: Scene = {
  id: 'ci-schema',
  title: 'CI targets and cleanup',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'ci-profile',
      kind: 'code',
      filename: 'profiles.yml   (the CI output)',
      label: `    ci:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('DBT_CI_USER') }}"
      private_key_path: "{{ env_var('DBT_CI_KEY_PATH') }}"
      role: transformer_ci
      warehouse: transforming_ci
      database: analytics
      schema: "ci_pr_{{ env_var('PR_NUMBER') }}"`,
    },
    {
      id: 'cleanup',
      kind: 'code',
      filename: 'macros/drop_ci_schemas.sql   → dbt run-operation drop_ci_schemas --target ci',
      label: `{% macro drop_ci_schemas() %}
    {% if not target.name.endswith('ci') %}
        {{ exceptions.raise_compiler_error("only on a CI target, not " ~ target.name) }}
    {% endif %}
    {% for schema in list_schemas(target.database).columns[0].values() %}
        {% set s, t = schema.lower(), target.schema.lower() %}
        {% if s == t or s.startswith(t ~ '_') %}       {# not ci_pr_1234 #}
            {% do adapter.drop_schema(api.Relation.create(
                database=target.database, schema=schema)) %}
        {% endif %}
    {% endfor %}
{% endmacro %}`,
    },
    {
      id: 'left-behind',
      kind: 'table',
      label: 'After PR 123: dropping only target.schema',
      headers: ['schema', 'dropped?'],
      values: [
        ['ci_pr_123', 'yes'],
        ['ci_pr_123_marts', 'no — custom schema'],
        ['ci_pr_123_dbt_test__audit', 'no — stored failures'],
      ],
    },
  ],
  edges: [
    { source: 'ci-profile', target: 'cleanup', label: 'after the PR closes' },
    { source: 'cleanup', target: 'left-behind', label: 'why the prefix loop' },
  ],
}
