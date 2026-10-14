import type { Scene } from '@graphlearning/flow'
import { graphOperators } from './graph-operators'
import { testSelection } from './test-selection'
import { artefacts } from './artefacts'
import { stateModified } from './state-modified'
import { defer } from './defer'
import { threads } from './threads'
import { queryEvidence } from './query-evidence'
import { retry } from './retry'

// One bundle per course folder, spread into src/scenes/index.ts.
export const selectionScenes: Scene[] = [graphOperators, testSelection, artefacts, stateModified, defer, threads, queryEvidence, retry]
