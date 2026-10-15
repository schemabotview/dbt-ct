import { firstBuild } from './first-build'
import { sources } from './sources'
import { models } from './models'
import { quality } from './quality'
import { jinja } from './jinja'
import { incremental } from './incremental'
import { selection } from './selection'
import { deployment } from './deployment'
import { operations } from './operations'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [firstBuild.id]: firstBuild,
  [sources.id]: sources,
  [models.id]: models,
  [quality.id]: quality,
  [jinja.id]: jinja,
  [incremental.id]: incremental,
  [selection.id]: selection,
  [deployment.id]: deployment,
  [operations.id]: operations,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
