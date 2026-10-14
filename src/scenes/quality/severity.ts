import type { Scene } from '@graphlearning/flow'

// §4.3 — severity, thresholds and stored failures. A real dbt-core 1.12.6 run: a new `refunded`
// status arrived, the test warned (1 > 0 but not > 5), and store_failures wrote the failing value to
// <target schema>_dbt_test__audit (shown here with the Snowflake dev schema name).
export const severity: Scene = {
  id: 'severity',
  title: 'Severity, thresholds, stored failures',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'severity-yml',
      kind: 'code',
      filename: 'models/marts/_marts.yml   (excerpt)',
      label: `          - accepted_values:
              arguments:
                values: ['placed', 'shipped', 'completed']
              config:
                warn_if: '>0'
                error_if: '>5'
                store_failures: true`,
    },
    {
      id: 'warn-log',
      kind: 'code',
      filename: '$ dbt build   (excerpt)',
      label: `WARN 1 accepted_values_fct_orders_status__placed__shipped__completed
Got 1 result, configured to warn if >0
Done. PASS=10 WARN=1 ERROR=0 SKIP=0`,
    },
    {
      id: 'stored',
      kind: 'table',
      label: 'dbt_alice_dbt_test__audit.accepted_values_fct_orders_status…',
      headers: ['value_field', 'n_records'],
      values: [['refunded', '1']],
    },
  ],
  edges: [
    { source: 'severity-yml', target: 'warn-log', label: '1 new status' },
    { source: 'warn-log', target: 'stored', label: 'store_failures' },
  ],
}
