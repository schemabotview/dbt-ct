import type { Section } from '../types'

// §6.3 — unique_key, strategies, and adapter-specific update behaviour. Snowflake-specific.
export const strategies: Section = {
  id: 'strategies',
  title: 'unique_key and strategies',
  scene: 'strategies',
  focus: 'strategy-table',
  slide: `## unique_key and strategies

The **strategy** decides what happens when new rows meet the existing table. These are dbt-snowflake 1.12's.

### The usual choices
- **merge** (the default): rows whose \`unique_key\` already exists are updated, the rest inserted
- **delete+insert**: matching keys deleted first, then everything inserted
- **append**: no matching at all. Fast, and duplicates anything read twice

### Two to read carefully
- **microbatch** rebuilds whole time batches, and needs \`event_time\` on its inputs too
- **insert_overwrite** on Snowflake replaces the **entire table**, not one partition

### \`unique_key\` is a match rule
Not a test, and not a constraint. It never checks that keys are unique: add a \`unique\` test for that.`,
  narration:
    "Once new rows are selected, something has to combine them with the table that is already there. That is the incremental strategy, and this list is specific to the Snowflake adapter we pinned. Merge is the default. Rows whose unique key already exists in the table are updated, and the rest are inserted. Delete plus insert gets a similar result another way: it deletes the matching keys first, then inserts everything. Append does no matching at all. It is fast, but anything read twice is stored twice. Two strategies deserve a careful read. Microbatch rebuilds whole time batches, one day at a time for example, and it needs an event time configured on its inputs too; without that, dbt warns that it cannot filter them and may produce duplicates. And insert overwrite on Snowflake replaces the entire table, not a single partition, which is very different from what the same name does on other warehouses. Finally, be precise about unique key. It is a rule for matching rows during a merge. It is not a test and it is not a constraint. It never checks that keys are actually unique, so add a unique test for that.",
}
