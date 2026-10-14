import type { Scene } from '@graphlearning/flow'
import { fanOut } from './fan-out'
import { factsAndDimensions } from './facts-and-dimensions'
import { currentVsHistory } from './current-vs-history'
import { threeMaterializations } from './three-materializations'
import { dynamicTables } from './dynamic-tables'
import { costAndConfig } from './cost-and-config'
import { modelInterfaces } from './model-interfaces'

// One bundle per course folder, spread into src/scenes/index.ts.
export const modelsScenes: Scene[] = [
  fanOut,
  factsAndDimensions,
  currentVsHistory,
  threeMaterializations,
  dynamicTables,
  costAndConfig,
  modelInterfaces,
]
