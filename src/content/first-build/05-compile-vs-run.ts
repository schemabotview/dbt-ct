import type { Section } from '../types'

// §1.5 — parse, compile, run, test and build: different operations with different effects.
export const compileVsRun: Section = {
  id: 'compile-vs-run',
  title: 'Parse, compile, run, test, build',
  scene: 'command-effects',
  focus: 'compile',
  slide: `## Parse, compile, run, test, build

Five commands, and each one stops at a different point.

### Compiling happens in dbt
- **parse** reads every file and builds the graph. No connection needed
- **compile** turns Jinja into the exact SQL, written to \`target/compiled/\`

### Executing happens in Snowflake
- **run** creates the models; **test** runs queries that look for failing rows
- **build** does both, plus seeds and snapshots, **in dependency order**. A failing test skips everything downstream of it

### Where to look
\`target/compiled/\` holds your rendered \`select\`. \`target/run/\` holds the full statement dbt sent.

Compile is not always read-only: some macros query the warehouse while compiling.`,
  narration:
    "dbt has a handful of commands that sound alike but stop at very different points, and confusing them leads to confusing results. Parse reads every file in the project and builds the dependency graph. It does not need a warehouse connection at all. Compile goes one step further and renders all the Jinja, so you can read the exact SQL that would run. You will find it under target slash compiled. Then the work moves to the warehouse. Run executes the models, which means real views and tables get created. Test runs your data tests, which are queries looking for rows that break a rule. Build does all of it, models and tests, plus seeds and snapshots, which come later in the course, and it does them in dependency order. If a test fails, everything downstream of it is skipped rather than built on bad data. When you want to see exactly what happened, look in the target folder. Compiled holds your rendered select statement, and run holds the full statement dbt actually sent, create table and all. One caution. It is tempting to think of compile as completely harmless, but by default it does connect to the warehouse, and some macros run queries while compiling. Compiling is not the same as having no effect on the warehouse at all.",
}
