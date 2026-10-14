import type { Course } from '../types'
import { grainAndFanOut } from './01-grain-and-fan-out'
import { factsAndDimensions } from './02-facts-and-dimensions'
import { timeAndHistory } from './03-time-and-history'
import { viewTableEphemeral } from './04-view-table-ephemeral'
import { dynamicTables } from './05-dynamic-tables'
import { costAndConfig } from './06-cost-and-config'
import { modelInterfaces } from './07-model-interfaces'

// Course 3 — plan chapter 3, "Analytical Models and Materialization Choices". Plan section → section, 1:1.
export const models: Course = {
  id: 'models',
  title: 'Analytical Models and Materialization Choices',
  sections: [
    grainAndFanOut,
    factsAndDimensions,
    timeAndHistory,
    viewTableEphemeral,
    dynamicTables,
    costAndConfig,
    modelInterfaces,
  ],
}
