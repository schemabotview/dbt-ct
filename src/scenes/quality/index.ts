import type { Scene } from '@graphlearning/flow'
import { genericTests } from './generic-tests'
import { singularTest } from './singular-test'
import { severity } from './severity'
import { unitTest } from './unit-test'
import { exposures } from './exposures'
import { contract } from './contract'
import { modelVersions } from './model-versions'
import { coverage } from './coverage'

// One bundle per course folder, spread into src/scenes/index.ts.
export const qualityScenes: Scene[] = [
  genericTests,
  singularTest,
  severity,
  unitTest,
  exposures,
  contract,
  modelVersions,
  coverage,
]
