import type { Section } from '../types'

// §4.8 — quality coverage, false confidence, and untested business assumptions; bridge to course 5.
export const coverageAndConfidence: Section = {
  id: 'coverage-and-confidence',
  title: 'Coverage and false confidence',
  scene: 'coverage',
  focus: 'gaps',
  slide: `## Coverage and false confidence

A wall of green checks feels like safety. Ask what each check actually **established**.

### Each tool has an edge
- Data tests: today's rows, not tomorrow's
- Unit tests: the cases you thought of
- Contracts: shape, not values
- Freshness: a load ran, not that it was complete
- Descriptions: an intent, not proof the SQL matches

### Test the risks, not the columns
Start from what would hurt: wrong revenue, missing orders, mixed currencies. Then pick the check that covers it.

### Write the gaps down
"Placed orders count as zero revenue" is an assumption no test proves. Put it in the description, and agree it with the owner.

**Next:** reusing SQL, without hiding what it does.`,
  narration:
    "By now fct orders carries data tests, a singular test, a unit test, a contract and an exposure. It is tempting to look at a wall of green checks and feel safe. Instead, ask what each check actually established. Data tests prove that today's rows obey a rule, not tomorrow's. Unit tests prove the logic handles the cases you thought of, not the ones you did not. Contracts prove names and types, not values. Freshness proves a load ran, not that it was complete. And a description states an intent, without proving that the SQL matches it. So test the risks, not the columns. Start from what would actually hurt: wrong revenue, missing orders, amounts in mixed currencies. Then pick the check that covers each risk, and notice which ones no check covers. Write those gaps down. Placed orders counting as zero revenue is an assumption that no test can prove. Put it in the model's description and agree it with the person who owns the number. Next, we look at reusing SQL with Jinja and macros, without hiding what it does.",
}
