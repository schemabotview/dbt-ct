import type { Section } from '../types'

// §2.1 — project layout, dbt_project.yml, properties files, and configuration precedence.
export const projectLayout: Section = {
  id: 'project-layout',
  title: 'Project layout and precedence',
  scene: 'project-layout',
  focus: 'in-file',
  slide: `## Project layout and precedence

A dbt project is a folder of plain files. Where a file sits says what it is.

### Three kinds of file
- **\`dbt_project.yml\`**: one per project. Name, paths, folder-wide config
- **\`.sql\` models**: one \`select\` each, named after the file
- **Properties \`.yml\`**: descriptions, tests and config for the resources beside them
- \`seeds/\`, \`macros/\`, \`snapshots/\`, \`tests/\`: other resource folders, met later

### When settings disagree
- A folder setting in \`dbt_project.yml\` is the broadest
- A model's \`config:\` in properties YAML overrides it
- \`config()\` inside the \`.sql\` overrides both. **The most specific wins**

Keep defaults in the project file and overrides rare: an override buried in one file is easy to miss in review.`,
  narration:
    "A dbt project is nothing more than a folder of plain text files, and where a file sits tells dbt what it is. There is exactly one project file, dbt underscore project dot y m l, holding the project's name, its paths, and settings for whole folders. Each SQL file under models is one model, a single select statement, named after the file. And alongside them sit properties files, YAML files that carry descriptions, tests and configuration for the resources next to them. The underscore at the start of their names is only a habit, to sort them first. Other folders hold seeds, macros, snapshots and tests, which we meet later, and the target folder is generated on every run, so it never goes into git. Now, the same setting can be made in three places, so you need to know who wins. A folder setting in the project file is the broadest. A config block on the model in a properties file overrides it. And a config call inside the SQL file itself overrides both. We checked this directly: a model set to table by its folder, to view in its YAML, and to ephemeral in its own file, came out ephemeral. The most specific setting wins. The practical advice is to keep defaults in the project file, and make overrides rare, because an override buried in one file is very easy to miss in review.",
}
