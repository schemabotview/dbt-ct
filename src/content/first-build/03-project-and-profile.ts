import type { Section } from '../types'

// §1.3 — project setup, the connection profile, targets, and keeping credentials out of git.
export const projectAndProfile: Section = {
  id: 'project-and-profile',
  title: 'Project and connection profile',
  scene: 'project-and-profile',
  slide: `## Project and profile

A first run needs two files, and only one of them belongs in git.

### \`dbt_project.yml\`: what the project is
- Its name, where models live, folder-level defaults
- Committed and reviewed like any other code

### \`profiles.yml\`: how to connect
- Lives outside the project, by default in \`~/.dbt/\`
- A **target** is one named connection. \`dev\` points at your own schema
- Secrets come from **environment variables**, never the file itself

### Targets keep environments apart
Add a second output, say \`ci\`, and \`dbt build --target ci\` runs the same code into a different schema.

Run \`dbt debug\` to check the connection before anything else.`,
  narration:
    "Before dbt can build anything, it needs two files, and the difference between them is worth getting right on day one. The project file, dbt underscore project dot y m l, says what the project is: its name, where the models live, and default settings for whole folders of them. Here, everything under staging becomes a view and everything under marts becomes a table. That file is committed and reviewed like any other code. The profile is different. It says how to connect: which account, which user, which role and warehouse, and which database and schema to build into. By default it lives outside the project, in a dot dbt folder in your home directory. A profile can hold several targets, each one a named connection. The dev target here builds into a schema of your own, so your experiments never touch anyone else's tables. Add a second output, say one called c i, and passing dash dash target c i runs exactly the same code into a different schema. That is how one project serves development, testing and production. Notice that the account, the user and the key path all come from environment variables. The credentials themselves never sit in a file that could be committed. Once both files are in place, dbt debug checks that the connection actually works.",
}
