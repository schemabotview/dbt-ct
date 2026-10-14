import type { Section } from '../types'

// §5.5 — packages, dependency specifications, locks, and provenance.
export const packages: Section = {
  id: 'packages',
  title: 'Packages and locks',
  scene: 'packages',
  focus: 'lock',
  slide: `## Packages and locks

A **package** is someone else's dbt project, installed into yours. \`dbt_utils\` is the best known: surrogate keys, date spines, extra tests.

### Declare, install, lock
- \`packages.yml\` names each package, from the dbt Hub by version range, or from git by revision
- \`dbt deps\` installs them into \`dbt_packages/\`
- It writes \`package-lock.yml\`: the **exact** commit, here \`e164c64…\` for tag \`1.3.0\`

### Commit the lock
With the lock committed, every machine and CI run installs the same code. Without it, a version range can resolve differently tomorrow.

### Upgrading
\`dbt deps --upgrade\` rewrites the lock: review that diff like code.

### Provenance
A package's macros run with **your** warehouse role. Read what you install, and pin it.`,
  narration:
    "A package is simply someone else's dbt project, installed into yours so that you can call its macros, tests and models. The best known is dbt utils, with helpers for surrogate keys, date spines and extra generic tests. Using one takes three steps. First, packages dot y m l names each package, either from the dbt package hub with a version range, or straight from git with a revision. Second, dbt deps downloads them into a dbt packages folder. Third, dbt deps writes a lock file. We installed dbt utils at tag one point three point zero, and the lock records the exact commit that tag pointed to, along with a hash of the whole specification. Commit that lock file. With it, every developer's machine and every CI run installs exactly the same code. Without it, a version range can quietly resolve to a newer release tomorrow, and a build changes without anyone changing the project. To upgrade on purpose, change the range or revision and run dbt deps with dash dash upgrade, which rewrites the lock, and review that diff like code. The installed dbt packages folder itself stays out of git. Finally, think about provenance. A package's macros run with your warehouse role, and can do anything your role can do. Read what you install, prefer well-maintained packages, and pin them.",
}
