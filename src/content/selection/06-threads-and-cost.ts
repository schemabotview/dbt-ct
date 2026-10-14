import type { Section } from '../types'

// §7.6 — threads, concurrency, warehouse queues, and cost.
export const threadsAndCost: Section = {
  id: 'threads-and-cost',
  title: 'Threads, queues and cost',
  scene: 'threads',
  focus: 't-queue',
  slide: `## Threads, queues and cost

\`threads\` is how many nodes dbt runs **at once**, set in the profile or with \`--threads\`.

### What it changes
- Independent models start together; with 4 threads, ours finished out of order
- A long chain of dependencies still runs one step at a time
- Our profile sets \`threads: 4\`; \`--threads 1\` makes a run easy to follow

### Where the time actually goes
- **dbt**: parsing and compiling, usually seconds
- **Queue**: waiting for the warehouse to accept the query
- **Execution**: Snowflake running the SQL

### More threads is not free
Each thread is another concurrent query. If the warehouse is already busy, extra threads just **queue**, or push you to a larger warehouse and a larger bill.

Measure first: \`execution_time\` includes the queue.`,
  narration:
    "Threads decide how many nodes dbt runs at the same time. You set them in the profile, or with dash dash threads on the command line. With four threads, independent models start together, and you can see it in the log: they finish out of numeric order, the seed first, then staging payments, customers and orders. Our profile sets four, and dash dash threads one makes a run much easier to follow when debugging. What threads cannot do is speed up a long chain of dependencies. Each step still waits for its parent. It helps to know where the time actually goes. dbt itself parses and compiles, usually in seconds. Then each query may wait in a queue, until the warehouse has room to accept it. Then Snowflake executes it. More threads is not free. Every thread is another concurrent query against the same warehouse. If the warehouse is already busy, extra threads simply queue, and teams then reach for a larger warehouse and a larger bill. So measure before changing anything, and remember that the execution time dbt reports for a model includes any time it spent queueing.",
}
