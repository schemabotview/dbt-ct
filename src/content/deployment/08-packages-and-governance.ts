import type { Section } from '../types'

// §8.8 — packages, multi-project dependencies, and governance boundaries; bridge to course 9.
export const packagesAndGovernance: Section = {
  id: 'packages-and-governance',
  title: 'Packages, projects, boundaries',
  scene: 'governance',
  focus: 'deps-table',
  slide: `## Packages, projects, boundaries

Two ways to depend on other dbt work. They are easy to confuse.

### A package
Someone's **code**, installed and built **inside** your project, pinned by the lock file.

### Another project
Its **published models**, referenced with \`ref('finance', 'fct_invoices')\`. In dbt Core 1.12, \`dbt deps\` ignores a \`projects:\` entry, and the ref fails: **not found**. Resolving it is a hosted capability to check.

### Boundaries that hold either way
- \`access: public\` and contracts mark what others may use
- Groups and owners say who answers for it
- \`flags: send_anonymous_usage_stats: false\` stops dbt's usage tracking, if your policy requires

**Next:** keeping all of this running.`,
  narration:
    "There are two ways to depend on dbt work done by someone else, and they are easy to confuse. A package is someone's code, installed into your project and built inside it, pinned by the lock file, as in course five. Depending on another project is different. You want its published models, built and owned by that team, referenced as ref finance, fct invoices. In dbt Core one point twelve, that does not work on its own. dbt deps ignores a projects entry in dependencies dot y m l, and the reference fails with not found. Resolving another project's published models is a capability of a hosted platform, so check its eligibility for your plan. Some boundaries hold either way. Access set to public, together with a contract, marks exactly what other teams may build on. Groups and owners say who answers for each model. And one governance setting is worth knowing about: dbt Core sends anonymous usage statistics by default, and a project flag, send anonymous usage stats false, turns that off if your policy requires it. Next, we look at keeping all of this running.",
}
