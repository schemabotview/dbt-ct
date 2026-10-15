import type { Scene } from '@graphlearning/flow'
import { twoRevenues } from './two-revenues'
import { semanticModel } from './semantic-model'
import { alternatives } from './alternatives'
import { decisionRecord } from './decision-record'
import { continuation } from './continuation'

// One bundle per course folder, spread into src/scenes/index.ts.
export const metricsScenes: Scene[] = [twoRevenues, semanticModel, alternatives, decisionRecord, continuation]
