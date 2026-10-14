import type { Section } from '../types'

// §4.6 — model contracts, column types, and warehouse constraint enforcement.
export const modelContracts: Section = {
  id: 'model-contracts',
  title: 'Model contracts',
  scene: 'contract',
  focus: 'contract-error',
  slide: `## Model contracts

A **contract** declares a model's shape up front: every column, with its type. dbt refuses to build a model that does not match.

### \`contract: {enforced: true}\`
- Every column must be listed, with a \`data_type\`
- dbt checks the shape **before** it builds
- Cast \`amount\` to text and the build stops: a type mismatch, and downstream tests skip
- A missing or extra column fails too: the **number** of columns is part of the contract

### Constraints are the warehouse's job
On Snowflake, only \`not_null\` is enforced. \`primary_key\`, \`unique\` and \`foreign_key\` are recorded but **not** enforced. Keep the data tests.

### What a contract does not promise
Correct names and types, not correct values. A contracted \`amount\` can still be wrong.`,
  narration:
    "Tests check rows after the fact. A contract works earlier. It declares the shape of a model up front, every column with its type, and dbt refuses to build a model that does not match. You turn it on with contract enforced true. From then on, every column must be listed with a data type, and dbt checks the model's shape before it builds anything. To see it work, we cast the amount column to text. The build stopped immediately, with a table showing the column, the type the model produced, the type the contract promised, and the reason: a data type mismatch. The tests downstream were skipped. Adding or dropping a column fails the same way, because the number of columns is part of the contract too. Contracts can also carry constraints, and here you must know your warehouse, because constraints are enforced by the warehouse, not by dbt. On Snowflake, only not null is enforced. Primary keys, unique keys and foreign keys are recorded as metadata, but Snowflake does not enforce them. So keep your unique and relationship tests. A contract is what makes a breaking change visible, so when the shape really must change, pair it with a new model version, which is next. And be clear about the promise. A contract guarantees names and types. It does not guarantee correct values. A perfectly contracted amount can still be wrong.",
}
