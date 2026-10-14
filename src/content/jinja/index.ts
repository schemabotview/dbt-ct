import type { Course } from '../types'
import { jinjaInDbt } from './01-jinja-in-dbt'
import { varsAndLoops } from './02-vars-and-loops'
import { macros } from './03-macros'
import { hiddenDependencies } from './04-hidden-dependencies'
import { packages } from './05-packages'
import { dispatch } from './06-dispatch'
import { sideEffects } from './07-side-effects'
import { pythonModels } from './08-python-models'

// Course 5 — plan chapter 5, "Jinja, Macros, and Reusable Compilation". Plan section → section, 1:1.
export const jinja: Course = {
  id: 'jinja',
  title: 'Jinja, Macros, and Reusable Compilation',
  sections: [jinjaInDbt, varsAndLoops, macros, hiddenDependencies, packages, dispatch, sideEffects, pythonModels],
}
