import type { Course } from '../types'
import { projectLayout } from './01-project-layout'
import { declaringSources } from './02-declaring-sources'
import { sourceFreshness } from './03-source-freshness'
import { refAndTheDag } from './04-ref-and-the-dag'
import { seeds } from './05-seeds'
import { modelLayers } from './06-model-layers'
import { targetsAndSchemas } from './07-targets-and-schemas'
import { docsAndOwnership } from './08-docs-and-ownership'

// Course 2 — plan chapter 2, "Sources, Dependencies, and Project Organisation". Plan section → section, 1:1.
export const sources: Course = {
  id: 'sources',
  title: 'Sources, Dependencies, and Project Organisation',
  sections: [
    projectLayout,
    declaringSources,
    sourceFreshness,
    refAndTheDag,
    seeds,
    modelLayers,
    targetsAndSchemas,
    docsAndOwnership,
  ],
}
