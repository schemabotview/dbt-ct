import type { Section } from '../types'

// §2.7 — targets, schemas, aliases, and environment isolation.
export const targetsAndSchemas: Section = {
  id: 'targets-and-schemas',
  title: 'Targets, schemas and aliases',
  scene: 'environment-schemas',
  focus: 'landing',
  slide: `## Targets, schemas and aliases

The same code builds into different places. The **target** decides where.

### Custom schemas
- \`+schema: marts\` does not mean "the schema called marts"
- By default dbt appends it to the target schema: \`dbt_alice_marts\` in dev, \`prod_marts\` in prod
- That keeps every developer isolated, even for custom schemas
- Want plain \`marts\` in prod? That takes a macro override, covered in course 5

### Aliases
\`alias:\` changes the relation's name in Snowflake. Other models still use \`ref('fct_orders')\`.

### Before sharing a warehouse
Check where a build will land with \`dbt compile\` or \`dbt ls\`. Many teams override the naming rule with a macro; read theirs first.`,
  narration:
    "One project, many environments. The code does not change between them, the target does. In dev, your target schema is dbt alice. In prod it is prod. Staging models land straight in the target schema. Marts are more interesting, because the marts folder sets a custom schema called marts. And here is the surprise. Plus schema marts does not mean the schema called marts. By default, dbt appends it to the target schema, so marts land in dbt alice underscore marts in dev, and prod underscore marts in prod. We confirmed both from the manifest. If you want plain marts in production, you override that rule with a macro, which we cover in course five. The reason for the default is isolation: if custom schemas ignored the target, every developer would overwrite the same marts. An alias changes the other half of the name. Set alias to orders, and the table in Snowflake is called orders, while every other model still refers to it as ref fct orders. Before you build anything into a shared warehouse, check where it will land. dbt compile or dbt ls will tell you. And look for a generate schema name macro in the project, because many teams override this naming rule, and theirs is the one that applies.",
}
