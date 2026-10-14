import type { Scene } from '@graphlearning/flow'

// §3.3 — a current-state dimension rewrites history. ILLUSTRATIVE scenario: Ana moves from the UK to
// Germany after her September order; raw.shop.customers keeps only the current country, so a report
// joined through dim_customers files September's order under DE. Snapshots (course 6) keep history.
export const currentVsHistory: Scene = {
  id: 'current-vs-history',
  title: 'Current versus historical attributes',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      label: "Ana's country over time",
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'order-placed', label: 'Order 1 placed', sub: '1 Sep — lives in UK', pattern: 'service', icon: 'receipt' },
        { id: 'moved', label: 'Ana moves', sub: '20 Sep — now DE', pattern: 'network', icon: 'globe' },
        { id: 'report', label: 'Report runs', sub: '1 Oct — reads raw now', pattern: 'user', icon: 'barchart' },
      ],
      edges: [
        { source: 'order-placed', target: 'moved' },
        { source: 'moved', target: 'report' },
      ],
    },
    {
      id: 'attribution',
      kind: 'table',
      label: 'September revenue by country (illustrative)',
      headers: ['join to', 'order 1 counted under', 'right for'],
      values: [
        ['current dim_customers', 'DE', 'where customers are now'],
        ['country at order time', 'UK', 'where the sale happened'],
      ],
    },
    {
      id: 'snapshot-later',
      label: 'Keep history',
      sub: 'snapshots — course 6',
      pattern: 'storage',
      icon: 'history',
    },
  ],
  edges: [
    { source: 'timeline', target: 'attribution' },
    { source: 'attribution', target: 'snapshot-later', dashed: true },
  ],
}
