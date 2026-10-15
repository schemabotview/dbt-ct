import type { Course } from '../types'
import { monitoring } from './01-monitoring'
import { diagnosis } from './02-diagnosis'
import { sideEffects } from './03-side-effects'
import { incrementalRecovery } from './04-incremental-recovery'
import { upgrades } from './05-upgrades'
import { performanceRegression } from './06-performance-regression'
import { runbooks } from './07-runbooks'

// Course 9 — plan chapter 9, "Operations and Safe Evolution". Plan section → section, 1:1.
export const operations: Course = {
  id: 'operations',
  title: 'Operations and Safe Evolution',
  sections: [monitoring, diagnosis, sideEffects, incrementalRecovery, upgrades, performanceRegression, runbooks],
}
