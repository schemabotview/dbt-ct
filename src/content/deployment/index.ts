import type { Course } from '../types'
import { pullRequests } from './01-pull-requests'
import { ciTargets } from './02-ci-targets'
import { slimCi } from './03-slim-ci'
import { identitiesAndGrants } from './04-identities-and-grants'
import { orchestration } from './05-orchestration'
import { releaseOrdering } from './06-release-ordering'
import { hostedVsCli } from './07-hosted-vs-cli'
import { packagesAndGovernance } from './08-packages-and-governance'

// Course 8 — plan chapter 8, "Deployment, Collaboration, and Governance". Plan section → section, 1:1.
export const deployment: Course = {
  id: 'deployment',
  title: 'Deployment, Collaboration, and Governance',
  sections: [pullRequests, ciTargets, slimCi, identitiesAndGrants, orchestration, releaseOrdering, hostedVsCli, packagesAndGovernance],
}
