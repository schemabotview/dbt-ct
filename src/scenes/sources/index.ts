import type { Scene } from '@graphlearning/flow'
import { projectLayout } from './project-layout'
import { declaringSources } from './declaring-sources'
import { sourceFreshness } from './source-freshness'
import { shopDag } from './shop-dag'
import { referenceSeed } from './reference-seed'
import { modelLayers } from './model-layers'
import { environmentSchemas } from './environment-schemas'
import { docsAndOwnership } from './docs-and-ownership'

// One bundle per course folder, spread into src/scenes/index.ts.
export const sourcesScenes: Scene[] = [
  projectLayout,
  declaringSources,
  sourceFreshness,
  shopDag,
  referenceSeed,
  modelLayers,
  environmentSchemas,
  docsAndOwnership,
]
