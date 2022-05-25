# TypeScript arguments parser

`args-parser-ts` is an extremely lightweight module (< 500 lines of code) to parse command-line arguments in a strictly-typed way. It works in any environment, Node.js or not, and supports colored output through optional `chalk` dependency.

Usage example:

```typescript
import { positional, typed, string, integer, parseArgs } from 'args-parser-ts'
import * as chalk from 'chalk' // OPTIONAL

const schema = {
  name: positional(typed(string), { help: 'Your name' }),
  age: positional(typed(integer), { help: 'Your age' }),
  repeat: flag({ short: 'r', long: 'repeat' }, typed(integer), { defaultValue: null }),
}

// If you're fine with black-and-white output, you can replace 'chalk' with 'undefined'
const args = parseArgs(schema, process.argv.slice(2), process.exit, chalk)
```

If you check the type of `args`, it will give: `{ name: string, age: number, repeat: number | null }`.

When running your program, if the provided arguments don't match your schema, the program will show an explicit error message and exit safely.

Otherwise, it will return a well-typed object that follows your schema.

## Custom validators

```typescript
const schema = {
  // Custom validation with custom errors and result type
  shortStringLength: positional(
    typed(
      custom('short string length', (value: string) => {
        if (value.length > 10) {
          return new Error('String is too long (max. 10 characters allowed)')
        }

        return value.length
      }),
    ),
  ),

  // String validation (useful for checking formats, file existence, etc.)
  shortString: positional(typed(stringValidator('short string', (value) => value.length < 10))),
}

// Arguments parsed with 'schema' will have type:
//
// {
//     shortStringLength: number;
//     shortString: string;
// }
```

## Parsing arguments outside of Node.js

```typescript
const args = parseArgs(
    schema,
    [ /* your arguments here */ ],
    () => { throw new Error('Failed to validate schema') },
    undefined
)
```

## Parsing arguments without output

```typescript
const result = validateArgs(schema, process.argv.slice(2))

if (result.ok) {
    // Use 'result.args'
} else {
    // Use 'result.error'
}
```
