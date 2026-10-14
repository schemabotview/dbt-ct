import type { Scene } from '@graphlearning/flow'
import { eltPipeline } from './elt-pipeline'
import { dbtStack } from './dbt-stack'
import { projectAndProfile } from './project-and-profile'
import { firstModel } from './first-model'
import { commandEffects } from './command-effects'
import { firstBuildResults } from './first-build-results'

// One bundle per course folder, spread into src/scenes/index.ts.
export const firstBuildScenes: Scene[] = [
  eltPipeline,
  dbtStack,
  projectAndProfile,
  firstModel,
  commandEffects,
  firstBuildResults,
]
