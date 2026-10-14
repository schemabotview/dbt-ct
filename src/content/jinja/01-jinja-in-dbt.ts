import type { Section } from '../types'

// §5.1 — parsing, compilation, execution, and the Jinja context.
export const jinjaInDbt: Section = {
  id: 'jinja-in-dbt',
  title: 'Jinja in dbt',
  scene: 'jinja-stages',
  focus: 'compile-render',
  slide: `## Jinja in dbt

Every \`{{ ref() }}\` so far was **Jinja**: a templating language dbt renders into plain SQL before Snowflake sees anything.

### Three kinds of tag
- \`{{ … }}\` an **expression**: its value is printed into the SQL
- \`{% … %}\` a **statement**: \`set\`, \`if\`, \`for\`. Prints nothing itself
- \`{# … #}\` a **comment**: removed entirely

### Rendered twice
- At **parse**, to find every \`ref()\` and \`source()\`. \`execute\` is false and there is no database
- At **compile**, to write the final SQL. \`execute\` is true

### What Jinja can read
The target, variables, \`this\`, and every macro.

### Snowflake never sees Jinja
If the compiled SQL is wrong, read \`target/compiled/\` first. That is the code that actually ran.`,
  narration:
    "Every ref you have written so far was already a small piece of Jinja. Jinja is a templating language, and dbt renders it into plain SQL before Snowflake sees anything at all. There are three kinds of tag. Double curly braces are an expression: whatever value is inside gets printed into the SQL, such as the relation a ref resolves to, or the current target's name. Curly brace and percent sign is a statement, such as set, if or for. A statement controls what gets written, but prints nothing itself. And curly brace and hash is a comment, which is removed entirely. Here is the part that explains most Jinja surprises in dbt. Every model is rendered twice. First at parse time, when dbt only wants to find every ref and source to build the graph. At that point a variable called execute is false, and there is no database connection. Then again at compile time, to write the final SQL, with execute set to true. So anything in a model that queries the database has to cope with both renders. Inside those tags, Jinja can read ref and source, the current target, project variables, environment variables, the relation being built, called this, and every macro in your project and its packages. And remember, Snowflake never sees any Jinja. When the result looks wrong, read the compiled SQL in the target folder first, because that is the code that actually ran.",
}
