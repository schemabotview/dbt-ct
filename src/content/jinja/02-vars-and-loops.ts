import type { Section } from '../types'

// §5.2 — variables, control flow, loops, and SQL string generation.
export const varsAndLoops: Section = {
  id: 'vars-and-loops',
  title: 'Variables and loops',
  scene: 'loop-pivot',
  focus: 'loop-compiled',
  slide: `## Variables and loops

Writing four near-identical \`sum(case …)\` lines by hand invites a typo. A loop writes them for you.

### The pieces
- \`{% set payment_methods = [...] %}\` holds a list
- \`{% for method in payment_methods %}\` repeats a block per item
- \`loop.last\` drops the comma after the final column

### Values from outside
- \`var('start_date', '2026-01-01')\` reads a project variable, set with \`--vars\`
- \`env_var('NAME')\` reads the environment, as in the profile
- \`{% if target.name == 'dev' %}\` can limit dev builds to recent data

### It is still just text
Jinja builds a **string** of SQL. It does not know SQL: a missing comma only fails when Snowflake runs it. Read the compiled file.`,
  narration:
    "Here is a common job: one column per payment method, each a sum of that method's amounts. Writing four nearly identical sum case lines by hand is tedious, and it invites a typo in exactly one of them. A loop writes them for you. A set statement holds the list of methods. A for loop repeats a block of SQL once per method, and the method's name is printed into both the condition and the column name. loop dot last lets you drop the comma after the final column. Compile it, and the loop has unrolled into four plain columns, and the result is a pivot: order four paid five in bank transfer and seven in gift card. Values can also come from outside the model. var reads a project variable, with a default, which you can override on the command line with dash dash vars. env var reads an environment variable, just as the profile did with credentials. And an if on target dot name can, for example, limit development builds to recent data. One warning. Jinja builds a string of text. It does not understand SQL at all, so a missing comma only fails later, when Snowflake runs the result. That is why reading the compiled file is a habit worth keeping.",
}
