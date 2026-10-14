import type { Scene } from '@graphlearning/flow'

// §3.2 — a fact and a dimension from the shop, joined on customer_id. Both tables are real
// `dbt build` output on dbt-core 1.12.6 (DuckDB target, amounts in currency units).
export const factsAndDimensions: Scene = {
  id: 'facts-and-dimensions',
  title: 'Facts and dimensions',
  flow: 'TB',
  padding: 0.15,
  nodes: [
    {
      id: 'fct',
      kind: 'table',
      label: 'fct_orders — one row per order (an event)',
      headers: ['order_id', 'customer_id', 'order_date', 'status', 'amount'],
      values: [
        ['1', '101', '2026-09-01', 'completed', '10.00'],
        ['2', '102', '2026-09-01', 'shipped', '20.00'],
        ['4', '103', '2026-09-03', 'completed', '12.00'],
        ['5', '104', '2026-09-03', 'placed', '0.00'],
      ],
    },
    {
      id: 'dim',
      kind: 'table',
      label: 'dim_customers — one row per customer (a thing)',
      headers: ['customer_id', 'first_name', 'country', 'order_count', 'lifetime_amount'],
      values: [
        ['101', 'Ana', 'DE', '1', '10.00'],
        ['102', 'Ben', 'UK', '1', '20.00'],
        ['103', 'Chi', 'FR', '1', '12.00'],
        ['104', 'Dev', 'UK', '1', '0.00'],
      ],
    },
    {
      id: 'question',
      label: 'Revenue by country',
      sub: 'fact measures, dimension groups',
      pattern: 'user',
      icon: 'barchart',
    },
  ],
  edges: [
    { source: 'fct', target: 'dim', label: 'customer_id' },
    { source: 'dim', target: 'question' },
  ],
}
