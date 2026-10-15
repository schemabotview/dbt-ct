import type { Course } from '../types'
import { sharedDefinitions } from './01-shared-definitions'
import { semanticModels } from './02-semantic-models'
import { alternatives } from './03-alternatives'
import { decisionRecords } from './04-decision-records'
import { continuation } from './05-continuation'

// Course 10 — plan chapter 10, "Metrics, Integrated Design, and Continuation". Plan section → section, 1:1.
export const metrics: Course = {
  id: 'metrics',
  title: 'Metrics, Integrated Design, and Continuation',
  sections: [sharedDefinitions, semanticModels, alternatives, decisionRecords, continuation],
}
