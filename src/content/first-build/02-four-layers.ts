import type { Section } from '../types'

// §1.2 — engine, adapter, warehouse and hosted-platform boundaries, and the course's version pin.
export const fourLayers: Section = {
  id: 'four-layers',
  title: 'Engine, adapter, warehouse, platform',
  scene: 'dbt-stack',
  focus: 'engine',
  slide: `## Four things called "dbt"

### What runs where
- **Engine**: reads the project, builds the dependency graph, compiles SQL
- **Adapter**: speaks one warehouse's SQL dialect and holds the connection
- **Warehouse**: Snowflake here. It executes the SQL and stores the results
- **Hosted platform**: optional scheduling and IDE. This course does not need it

### The version this course pins
**dbt Core 1.12** with **dbt-snowflake 1.12**: the Python engine, still fully supported. New installs now default to **dbt v2**, a rebuilt engine; where it differs, we say so.

Both are open source and free to run locally. \`dbt --version\` prints the installed engine and adapter.

Install the pinned pair: \`pip install "dbt-core~=1.12.0" "dbt-snowflake~=1.12.0"\`

Snowflake-only behaviour is always labelled as such.`,
  narration:
    "When people say dbt, they can mean four different things, and it pays to keep them apart. The engine is the program on your machine. It reads your project files, works out which model depends on which, and compiles everything into plain SQL. The adapter is a plug-in for one specific warehouse. It knows that warehouse's SQL dialect and it holds the connection. Inside Snowflake, the role you connect as decides what dbt is allowed to create. The warehouse, Snowflake in this course, is where the SQL actually executes and where the results are stored. And then there is a hosted platform, which can schedule runs and give you a browser-based editor. It is optional, and nothing in this course depends on it. Versions matter here too. This course pins dbt Core one point twelve, with the matching Snowflake adapter. That is the Python engine, and it is still fully supported. A fresh install now defaults to dbt version two, a rebuilt engine, so wherever the two behave differently, we will say so. Both are open source and free to run on your own machine, and dbt dash dash version prints exactly which engine and adapter you have. To get the same versions as the course, install dbt core and dbt snowflake, both pinned to one point twelve. And whenever something is specific to Snowflake rather than true of dbt in general, it will be labelled.",
}
