import type { Section } from '../types'

// §4.3 — severity, thresholds, stored failures, and build failure/skip behaviour.
export const severityAndFailures: Section = {
  id: 'severity-and-failures',
  title: 'Severity and stored failures',
  scene: 'severity',
  focus: 'warn-log',
  slide: `## Severity and stored failures

Not every failing row deserves a stopped pipeline. Test config decides how loudly to fail.

### Thresholds
- \`warn_if: '>0'\`: any failing row gives a **WARN**
- \`error_if: '>5'\`: more than five gives an **ERROR**
- \`severity: warn\` alone: never an error, whatever the count
- Here, one new status, \`refunded\`, arrived: WARN 1, and the build went on

### What each outcome does in a build
- **WARN**: logged; downstream models still build
- **ERROR**: downstream models are **skipped**

### \`store_failures: true\`
Saves the failing rows to a table in \`<schema>_dbt_test__audit\`, so you can query them after the run.

A warning nobody reads is no test at all. Decide who looks.`,
  narration:
    "Not every failing row deserves to stop the whole pipeline, and test configuration decides how loudly a test fails. Thresholds are the main tool. warn if greater than zero means any failing row produces a warning. error if greater than five means more than five failing rows produce an error. And severity warn on its own means the test can never error, whatever the count. In our run, one order arrived with a brand new status, refunded. That is one failing row: above zero, but not above five, so the test warned, and the build carried on. The difference matters in a build. A warning is logged, and models downstream still build. An error causes everything downstream of that model to be skipped, rather than built on data that failed its checks. There is one more useful setting: store failures. With it turned on, dbt saves the failing rows to a table in an audit schema named after your target schema, so after the run you can query exactly which values failed. Here, it holds one row: refunded, once. A final word of caution. Warnings are easy to configure and even easier to ignore. A warning that nobody reads is no test at all, so decide who looks at them.",
}
