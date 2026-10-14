import type { Section } from '../types'

// §8.7 — hosted dbt platform versus external CLI orchestration. Hosted features need eligibility checks.
export const hostedVsCli: Section = {
  id: 'hosted-vs-cli',
  title: 'Hosted platform or your own',
  scene: 'hosted-vs-cli',
  focus: 'compare',
  slide: `## Hosted platform or your own

Production dbt runs somewhere. Either **your orchestrator** calls the dbt CLI, or a **hosted platform** runs it for you.

### Your own orchestrator
- Airflow, Dagster, CI or cron calls \`dbt build\`
- You store the production manifest, wire retries, manage secrets

### A hosted platform
- Scheduling, IDE, stored state, run history
- Paid, and features depend on plan and engine: **check eligibility** before relying on one

### Choosing
Already orchestrate ingestion? Add dbt to that DAG. Small and starting fresh? Hosted plumbing helps.

### Either way
The project, the warehouse bill, and waiting for ingestion stay **yours**. This course needs no hosted service.`,
  narration:
    "Production dbt has to run somewhere, and there are two broad options. The first is your own orchestrator, such as Airflow, Dagster, a CI runner, or even cron, calling the dbt command line. You then own the plumbing: storing the production manifest for state comparison, wiring retries, and managing secrets. The software is free, but you pay in engineering time. The second is a hosted dbt platform, which runs dbt for you, with scheduling, a browser-based editor, stored state and run history built in. It costs a subscription, and its features vary by plan and by engine, so check the eligibility of any specific feature before you depend on it. How to choose? If you already orchestrate ingestion, adding dbt to that same DAG lets one step wait on the other naturally. A small team starting fresh may value the hosted plumbing more. Some things do not change with the choice. The project is the same repository and the same DAG. The warehouse still does the work, and still sends the bill. And waiting for ingestion is still your responsibility to wire up, whichever tool runs dbt. Everything in this course runs with the free command line and no hosted service at all.",
}
