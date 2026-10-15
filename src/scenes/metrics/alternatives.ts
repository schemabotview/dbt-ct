import type { Scene } from '@graphlearning/flow'

// §10.3 — the retail product end to end, with the alternative at each layer and what this course chose.
export const alternatives: Scene = {
  id: 'alternatives',
  title: 'End-to-end alternatives',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'product-row',
      label: 'Layers, alternatives, choices',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'product',
          label: 'The shop’s revenue product',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'a-load', label: 'Ingestion', sub: 'loader, outside dbt', pattern: 'external', icon: 'workflow' },
            { id: 'a-model', label: 'Models', sub: 'staging → marts', pattern: 'service', icon: 'layers' },
            { id: 'a-metric', label: 'Metric', sub: 'revenue, defined once', pattern: 'storage', icon: 'sigma' },
            { id: 'a-use', label: 'Consumers', sub: 'Finance, Sales', pattern: 'user', icon: 'barchart' },
          ],
          edges: [
            { source: 'a-load', target: 'a-model' },
            { source: 'a-model', target: 'a-metric' },
            { source: 'a-metric', target: 'a-use' },
          ],
        },
        {
          id: 'choices',
          kind: 'table',
          label: 'Each layer: an alternative, and our choice',
          headers: ['layer', 'alternative', 'chosen'],
          values: [
            ['modelling', 'one wide table', 'staging → marts'],
            ['persistence', 'all views', 'views, tables, 1 incremental'],
            ['history', 'none', 'customer snapshot'],
            ['orchestration', 'hosted', 'CLI + orchestrator'],
            ['metric', 'sum() per report', 'one metric'],
          ],
        },
      ],
    },
  ],
  edges: [],
}
