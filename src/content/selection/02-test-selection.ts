import type { Section } from '../types'

// §7.2 — selected resources, indirect test selection, and build ordering.
export const testSelection: Section = {
  id: 'test-selection',
  title: 'Selected resources and tests',
  scene: 'test-selection',
  focus: 'indirect',
  slide: `## Selected resources and tests

Select a model, and its tests come along. Which tests depends on **indirect selection**.

### Selecting \`fct_orders\`
- **eager** (default): every test that touches it, including the relationship to \`dim_customers\`
- **cautious**: only tests whose every parent is selected. The relationship test is left out
- **buildable** and **empty** are the other two settings

### Select tests by kind
\`test_type:unit\` or \`test_type:data\` narrows a selection to one kind of test.

### Order within \`dbt build\`
- A model builds once its parents succeed
- Its tests run right after it
- An error **skips** everything downstream: one typo in \`stg_payments\` skipped 7 nodes

A green partial build says nothing about what you did **not** select.`,
  narration:
    "When you select a model, its tests come along without being named. Which tests, exactly, is decided by a setting called indirect selection. Select fct orders with the default, eager, and you get every test that touches it, including the relationship test that also points at dim customers, even though dim customers itself was not selected. Switch to cautious, and dbt only includes tests whose every parent is selected, so the relationship test is left out. We checked both with dbt ls. There are two more settings, buildable and empty, for the cases in between. You can also narrow a selection by kind of test, with test type unit, or test type data. Ordering inside dbt build follows the graph. A model builds once its parents have succeeded, its tests run right after it, and only then do its children build. When something errors, everything downstream is skipped. We introduced one typo in stg payments, and the build reported one error and seven skipped nodes: the payment models, order facts, customers, and their tests. Remember the boundary of a partial build, too. A green result for the nodes you selected says nothing at all about the ones you did not.",
}
