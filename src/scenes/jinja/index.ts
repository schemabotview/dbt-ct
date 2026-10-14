import type { Scene } from '@graphlearning/flow'
import { jinjaStages } from './jinja-stages'
import { loopPivot } from './loop-pivot'
import { macros } from './macros'
import { hiddenRef } from './hidden-ref'
import { packages } from './packages'
import { dispatch } from './dispatch'
import { sideEffects } from './side-effects'
import { pythonModel } from './python-model'

// One bundle per course folder, spread into src/scenes/index.ts.
export const jinjaScenes: Scene[] = [jinjaStages, loopPivot, macros, hiddenRef, packages, dispatch, sideEffects, pythonModel]
