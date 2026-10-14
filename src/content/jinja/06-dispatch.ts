import type { Section } from '../types'

// §5.6 — dispatch and adapter-specific implementations.
export const dispatch: Section = {
  id: 'dispatch',
  title: 'Dispatch',
  scene: 'dispatch',
  focus: 'on-snowflake',
  slide: `## Dispatch

SQL dialects differ. **Dispatch** lets one macro name have a different body per adapter.

### How it works
- The macro calls \`adapter.dispatch('day_bucket')\`
- dbt looks for \`snowflake__day_bucket\` when running on dbt-snowflake
- Missing that, it falls back to \`default__day_bucket\`
- A \`dispatch:\` entry in \`dbt_project.yml\` sets which namespaces are searched, in order

### Same model, two outputs
- On Snowflake: \`to_date(ordered_at)\`
- On any other adapter: \`date_trunc('day', ordered_at)\`

### Where you meet it
Packages such as \`dbt_utils\` dispatch internally, which is how one package works on many warehouses. You can override a package's implementation for your adapter in your own project.

Most single-warehouse projects never need to write one.`,
  narration:
    "SQL dialects differ between warehouses, and sometimes a macro has to produce different SQL depending on where it runs. dispatch is dbt's answer. The outer macro, day bucket, does nothing except call adapter dot dispatch with its own name. dbt then looks for an implementation named for the current adapter, here snowflake underscore underscore day bucket when running on the Snowflake adapter. If there is none, it falls back to the default underscore underscore version. A dispatch entry in the project file controls which namespaces are searched, and in what order. We compiled the same model on both adapters. On Snowflake, it became to date of ordered at. On another adapter, it became date trunc day. One macro name, one model, two dialects. You will mostly meet dispatch inside packages. dbt utils dispatches internally, which is how a single package works across many warehouses, and dbt lets you override a package's implementation for your adapter from inside your own project, when you need to. If your project only ever runs on Snowflake, you will rarely need to write a dispatched macro yourself. But knowing the pattern explains why the same package call can compile to different SQL in different projects.",
}
