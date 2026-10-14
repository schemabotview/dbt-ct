import type { Section } from '../types'

// §4.5 — documentation, lineage, exposures, and consumer discovery.
export const docsAndExposures: Section = {
  id: 'docs-and-exposures',
  title: 'Exposures and discovery',
  scene: 'exposures',
  focus: 'dashboard',
  slide: `## Exposures and discovery

dbt sees models that \`ref()\` each other. It cannot see the dashboard that reads your mart, unless you declare it.

### An exposure
- Names a consumer: its type, maturity and owner
- Lists what it \`depends_on\`
- \`type\` is one of dashboard, notebook, analysis, ml or application
- Appears in the docs lineage graph, at the end of the chain

### What it buys you
- Before a change: "who reads \`fct_orders\`?" has an answer, with an email
- Selection: \`+exposure:revenue_dashboard\` rebuilds everything it reads

### What it is not
dbt does not query the dashboard, and cannot tell if the exposure is out of date. Keep it in review like any code.`,
  narration:
    "dbt can see every model that refs another, but its view stops at the edge of the project. The dashboard that reads your mart is invisible to it, unless you declare it. That declaration is called an exposure. It names a consumer, here the revenue dashboard: what type of thing it is, how mature, and who owns it, with a contact. The type can be a dashboard, a notebook, an analysis, a machine learning model, or an application. It also lists what it depends on: order facts and the customers dimension. The exposure then appears in the documentation's lineage graph, at the very end of the chain, which is exactly where consumers belong. That buys you two things. Before you change fct orders, the question of who reads it now has an answer, with an email address attached. And it becomes something you can select: dbt build with plus exposure revenue dashboard rebuilds and tests everything that dashboard reads, and nothing else. Be clear about what an exposure is not. dbt does not connect to the dashboard, and it cannot tell whether the declaration is still accurate. It is documentation in code, so keep it in review, like any other code.",
}
