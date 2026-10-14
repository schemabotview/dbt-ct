import type { Section } from '../types'

// §8.4 — deployment identities, secrets, warehouse grants, and least privilege. Snowflake-specific.
export const identitiesAndGrants: Section = {
  id: 'identities-and-grants',
  title: 'Identities, secrets, grants',
  scene: 'identities',
  focus: 'id-table',
  slide: `## Identities, secrets, grants

Each environment runs as **its own identity**, with only the access it needs.

### Separate roles (Snowflake)
- Developers write only their own \`dbt_<name>\` schemas
- CI writes only \`ci_pr_*\` schemas
- The production job writes production; dashboards only **read** marts

### Secrets
- Never in the repository: \`env_var()\` in the profile, filled by your secret manager
- Key-pair auth, one key per identity, so one can be revoked alone

### Grants as code
\`+grants: {select: ['reporter']}\` on the marts folder: dbt grants access every time it builds them.

A person's own login should never run production: when they leave, production should not.`,
  narration:
    "Each environment should run as its own identity, with only the access that environment needs. On Snowflake, that means separate roles. A developer's role can write only their own development schemas. CI's role can write only the pull request schemas. The production job's role writes production. And dashboards use a reporting role that can only read marts, never raw data and never staging. Secrets follow the same discipline. They never live in the repository. The profile reads them with env var, and your secret manager fills those variables at run time. Key-pair authentication with one key per identity means a single identity can be revoked without disturbing the others. Grants belong in code too. Setting grants, select to reporter, on the marts folder means dbt applies that grant every time it builds a mart, so access never silently disappears after a rebuild. One last rule is easy to break by accident. A person's own login should never run production, because when that person leaves the company, production should not leave with them.",
}
