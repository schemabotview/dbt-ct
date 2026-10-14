import type { Course } from '../types'
import { isIncremental } from './01-is-incremental'
import { watermarks } from './02-watermarks'
import { strategies } from './03-strategies'
import { lateData } from './04-late-data'
import { schemaChanges } from './05-schema-changes'
import { fullRefresh } from './06-full-refresh'
import { snapshots } from './07-snapshots'
import { snapshotLimits } from './08-snapshot-limits'

// Course 6 — plan chapter 6, "Incremental Models and Historical State". Plan section → section, 1:1.
export const incremental: Course = {
  id: 'incremental',
  title: 'Incremental Models and Historical State',
  sections: [isIncremental, watermarks, strategies, lateData, schemaChanges, fullRefresh, snapshots, snapshotLimits],
}
