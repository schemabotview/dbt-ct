import type { Scene } from '@graphlearning/flow'
import { twoPaths } from './two-paths'
import { watermark } from './watermark'
import { strategies } from './strategies'
import { lateData } from './late-data'
import { schemaChange } from './schema-change'
import { fullRefresh } from './full-refresh'
import { snapshot } from './snapshot'
import { snapshotLimits } from './snapshot-limits'

// One bundle per course folder, spread into src/scenes/index.ts.
export const incrementalScenes: Scene[] = [twoPaths, watermark, strategies, lateData, schemaChange, fullRefresh, snapshot, snapshotLimits]
