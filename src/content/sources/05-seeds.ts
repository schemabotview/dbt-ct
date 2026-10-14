import type { Section } from '../types'

// §2.5 — seeds and bounded reference data versus ingestion pipelines.
export const seeds: Section = {
  id: 'seeds',
  title: 'Seeds for reference data',
  scene: 'reference-seed',
  focus: 'seed-or-source',
  slide: `## Seeds for reference data

A **seed** is a CSV file in the project. \`dbt seed\` loads it into a table, and models use it with \`ref()\`, like any model.

### Good seeds
- Small lookups that **people** maintain: payment-method labels, country codes, cost-centre mappings
- Changes go through review, so the history is in git

### Not seeds
- Anything an application produces. That is a source, loaded by ingestion
- Large or fast-growing data: every \`dbt seed\` reloads the whole file
- Personal or sensitive data: a CSV in git is copied to every clone

### Types
Pin inferred types with \`column_types:\`, so a code like \`007\` stays text.

\`dbt build\` loads seeds too, in DAG order, before the models that use them.`,
  narration:
    "Sometimes you need a small table that no system produces. Here, the shop records payment methods as codes like credit card and coupon, and the reports want readable labels and a flag for whether it is a card. That is a seed: a CSV file kept in the project. dbt seed loads it into a table in your schema, four rows in our run, and from then on any model can ref it, exactly like a model. Seeds are good for small lookups that people maintain by hand, such as labels, country codes or cost centre mappings, because every change goes through review and its history lives in git. They are the wrong tool for anything an application produces. That is a source, and loading it is ingestion's job. They are also wrong for large or fast-growing data, because every seed run reloads the whole file. And never put personal or sensitive data in a seed, because a CSV in git is copied onto every machine that clones the project. One practical detail: dbt infers each column's type from the CSV, so a code like double-oh-seven would quietly become the number seven. Pin the types with column types in the seed's YAML config. Finally, you rarely need to run dbt seed by itself. dbt build loads seeds too, in dependency order, before the models that use them.",
}
