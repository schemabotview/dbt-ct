import type { Scene } from '@graphlearning/flow'
import { changePath } from './change-path'
import { ciSchema } from './ci-schema'
import { slimCi } from './slim-ci'
import { identities } from './identities'
import { orchestration } from './orchestration'
import { releaseOrder } from './release-order'
import { hostedVsCli } from './hosted-vs-cli'
import { governance } from './governance'

// One bundle per course folder, spread into src/scenes/index.ts.
export const deploymentScenes: Scene[] = [changePath, ciSchema, slimCi, identities, orchestration, releaseOrder, hostedVsCli, governance]
