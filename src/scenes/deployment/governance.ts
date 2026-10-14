import type { Scene } from '@graphlearning/flow'

// §8.8 — packages versus project dependencies. Real dbt-core 1.12.6 behaviour: `dbt deps` ignores a
// `projects:` entry in dependencies.yml, and ref('finance', 'fct_invoices') fails as not found —
// resolving another project's published models is a hosted capability to check. The telemetry flag
// parses; dbt Core attempted usage-tracking connections in the authoring environment until it was set.
export const governance: Scene = {
  id: 'governance',
  title: 'Packages, projects, boundaries',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'deps-table',
      kind: 'table',
      label: 'Depending on other dbt code',
      headers: ['', 'package', 'another project'],
      values: [
        ['declared in', 'packages.yml', 'dependencies.yml → projects:'],
        ['you get', 'its code, built in YOUR project', 'refs to ITS published models'],
        ['in dbt Core 1.12', 'works', 'ref not found — hosted feature'],
        ['governed by', 'the lock file', 'access: public, contracts'],
      ],
    },
    {
      id: 'core-error',
      kind: 'code',
      filename: "dbt parse — ref('finance', 'fct_invoices') in dbt Core",
      label: `Compilation Error
  Model 'model.shop.uses_finance' depends on a node named 'fct_invoices'
  in package or project 'finance' which was not found`,
    },
    {
      id: 'telemetry',
      kind: 'code',
      hug: true,
      filename: 'dbt_project.yml   (a governance setting worth knowing)',
      label: `flags:
  send_anonymous_usage_stats: false`,
    },
  ],
  edges: [
    { source: 'deps-table', target: 'core-error' },
    { source: 'core-error', target: 'telemetry', dashed: true },
  ],
}
