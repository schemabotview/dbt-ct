import type { Course } from '../types'
import { graphOperators } from './01-graph-operators'
import { testSelection } from './02-test-selection'
import { artefacts } from './03-artefacts'
import { stateComparison } from './04-state-comparison'
import { deferral } from './05-deferral'
import { threadsAndCost } from './06-threads-and-cost'
import { queryEvidence } from './07-query-evidence'
import { retrySection } from './08-retry'

// Course 7 — plan chapter 7, "Selection, Artefacts, and Efficient Execution". Plan section → section, 1:1.
export const selection: Course = {
  id: 'selection',
  title: 'Selection, Artefacts, and Efficient Execution',
  sections: [graphOperators, testSelection, artefacts, stateComparison, deferral, threadsAndCost, queryEvidence, retrySection],
}
