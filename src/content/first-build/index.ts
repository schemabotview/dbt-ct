import type { Course } from '../types'
import { whatDbtDoes } from './01-what-dbt-does'
import { fourLayers } from './02-four-layers'
import { projectAndProfile } from './03-project-and-profile'
import { firstModelAndRef } from './04-first-model-and-ref'
import { compileVsRun } from './05-compile-vs-run'
import { firstResults } from './06-first-results'

// Course 1 — plan chapter 1, "Analytics Engineering and a First Build". Plan section → section, 1:1.
export const firstBuild: Course = {
  id: 'first-build',
  title: 'Analytics Engineering and a First Build',
  sections: [whatDbtDoes, fourLayers, projectAndProfile, firstModelAndRef, compileVsRun, firstResults],
}
