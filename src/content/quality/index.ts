import type { Course } from '../types'
import { genericTests } from './01-generic-tests'
import { singularTests } from './02-singular-tests'
import { severityAndFailures } from './03-severity-and-failures'
import { unitTests } from './04-unit-tests'
import { docsAndExposures } from './05-docs-and-exposures'
import { modelContracts } from './06-model-contracts'
import { versionsAndAccess } from './07-versions-and-access'
import { coverageAndConfidence } from './08-coverage-and-confidence'

// Course 4 — plan chapter 4, "Tests, Documentation, and Model Contracts". Plan section → section, 1:1.
export const quality: Course = {
  id: 'quality',
  title: 'Tests, Documentation, and Model Contracts',
  sections: [
    genericTests,
    singularTests,
    severityAndFailures,
    unitTests,
    docsAndExposures,
    modelContracts,
    versionsAndAccess,
    coverageAndConfidence,
  ],
}
