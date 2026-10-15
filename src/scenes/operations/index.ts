import type { Scene } from '@graphlearning/flow'
import { monitoring } from './monitoring'
import { diagnosis } from './diagnosis'
import { rerunEffects } from './rerun-effects'
import { missedWindow } from './missed-window'
import { upgrades } from './upgrades'
import { regression } from './regression'
import { runbook } from './runbook'

// One bundle per course folder, spread into src/scenes/index.ts.
export const operationsScenes: Scene[] = [monitoring, diagnosis, rerunEffects, missedWindow, upgrades, regression, runbook]
