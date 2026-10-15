import type { Section } from '../types'

// §9.5 — schema, model, package, adapter, and engine upgrades.
export const upgrades: Section = {
  id: 'upgrades',
  title: 'Upgrades',
  scene: 'upgrades',
  focus: 'upgrade-table',
  slide: `## Upgrades

Everything under the project moves: packages, the adapter, the engine. Each upgrade can change what runs.

### A real package upgrade
\`dbt_utils\` 1.x removed \`surrogate_key\`. The call fails to compile, and the message warns that the replacement treats **nulls** differently: keys can change.

### How to upgrade safely
- One thing at a time, in its own pull request
- Read deprecation warnings **before** they become errors
- Compile before and after, and **diff** \`target/compiled/\`
- Run CI, then compare row counts and totals

### Pin, so upgrades are decisions
\`dbt-core~=1.12.0\`, the adapter pin and \`package-lock.yml\` mean nothing moves until you move it. Read the release notes when you do.

### The engine
Moving from 1.12 to dbt v2 is an engine change. Treat it as one: deprecations first, then a full CI build.`,
  narration:
    "Everything underneath your project keeps moving: packages, the adapter, and the engine itself. Each upgrade can change what actually runs. Here is a real package upgrade. dbt utils version one removed the old surrogate key macro. A project still calling it fails to compile, and the message carries a warning worth reading: the replacement treats null values differently to empty strings. So switching macros can change the keys themselves, and anything joined on them. The safe pattern is the same for every kind of upgrade. Change one thing at a time, in its own pull request. Read deprecation warnings while they are still warnings, before a later release turns them into errors, like the arguments warning on generic tests in course four. Compile the project before and after the upgrade, and diff the compiled folder, so you see every line of SQL that changed. Then run CI, and compare row counts and totals. Pinning makes all of this deliberate. The dbt core and adapter pins, and the package lock file, mean nothing moves until you decide to move it, and that is when you read the release notes. The engine is the biggest upgrade of all. Moving from one point twelve to dbt version two is an engine change, so treat it as one: clear the deprecations first, then run a full CI build.",
}
