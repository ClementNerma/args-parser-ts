export type ArgSchema<T> = Readonly<{
  help: string | null
  position: ArgPos
  type: ArgType<T>
  defaultValue: { value: T } | null
}>

export type ArgPos =
  | { type: 'positional' }
  | ({ type: 'flag' } & (
      | { short: string; long: string }
      | { short: null; long: string }
      | { short: string; long: null }
    ))

export type ArgType<T> =
  | (T extends boolean ? { type: 'boolean' } : never)
  | (T extends Array<infer U> ? { type: 'array'; of: ArgCustomType<U> } : never)
  | (T extends null
      ? never
      : {
          type: 'other'
          customArgType: ArgCustomType<T>
        })

export type ArgCustomType<T> = {
  typename: string
  validator: (value: string) => T | Error
}

export type ArgParserError =
  | { type: 'missingFlagName' }
  | { type: 'missingValue'; argName: string; schema: ArgSchema<unknown> }
  | { type: 'boolFlagHasValue'; argName: string; schema: ArgSchema<unknown> }
  | {
      type: 'invalidValueType'
      argName: string
      schema: ArgSchema<unknown>
      expectedTypename: string
      found: string
      message: string
    }
  | {
      type: 'twiceFlag'
      argName: string
      schema: ArgSchema<unknown>
      secondValue: string | null
    }
  | {
      type: 'unknownFlag'
      flag: string
      flagPrefix: string
      value: string | null
    }
  | { type: 'missingArgument'; argName: string; schema: ArgSchema<unknown> }
  | { type: 'tooManyPositionalArguments'; expected: number }

export type ArgParsingResult<T> = { type: 'ok'; args: T } | { type: 'error'; error: ArgParserError }

/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A }, A>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B }, A, B>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C }, A, B, C>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D }, A, B, C, D>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E }, A, B, C, D, E>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F }, A, B, C, D, E, F>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G }, A, B, C, D, E, F, G>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H }, A, B, C, D, E, F, G, H>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I }, A, B, C, D, E, F, G, H, I>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J }, A, B, C, D, E, F, G, H, I, J>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K }, A, B, C, D, E, F, G, H, I, J, K>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L }, A, B, C, D, E, F, G, H, I, J, K, L>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M }, A, B, C, D, E, F, G, H, I, J, K, L, M>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N }, A, B, C, D, E, F, G, H, I, J, K, L, M, N>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
/* prettier-ignore */ export function validate<_K extends string, _O extends { [key in _K]: A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z }, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(schema: { [key in keyof _O]: ArgSchema<_O[key]> }, args: string[]): ArgParsingResult<_O>;
export function validate<_K extends string, _O extends { [key in _K]: _V }, _V>(
  schema: { [key in keyof _O]: ArgSchema<_O[key]> },
  args: string[],
): ArgParsingResult<_O> {
  const flatSchema = Object.entries<ArgSchema<_O[keyof _O]>>(schema)

  const positionals = flatSchema.filter(([_, schema]) => schema.position.type === 'positional')
  const positionalsCount = positionals.length

  const out = new Map<string, unknown>()

  const err = <T>(error: ArgParserError): ArgParsingResult<T> => ({
    type: 'error',
    error,
  })

  const untypedSchema = (schema: ArgSchema<_O[keyof _O]>) => schema as ArgSchema<unknown>

  // Remove fully-empty arguments
  args = args.filter((arg) => arg !== '')

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    // Arguments starting with a dash are always flags
    if (arg.startsWith('-')) {
      const isLongFlag = arg.substring(1, 2)

      const withoutDash = arg.substring(isLongFlag ? 2 : 1)
      const hasValue = arg.indexOf('=') !== -1

      const argName = hasValue ? withoutDash.substring(0, arg.indexOf('=')) : withoutDash

      if (argName.length === 0) {
        return err({ type: 'missingFlagName' })
      }

      const finalArgValue = hasValue ? withoutDash.substring(arg.indexOf('=') + 1) : null

      let subArgs: [string, string | null][]

      if (isLongFlag) {
        subArgs = [[argName, finalArgValue]]
      } else {
        const shortFlags = argName.split('')
        subArgs = shortFlags.map((flag, i) => [flag, i < shortFlags.length - 1 ? null : finalArgValue])
      }

      for (const [flag, value] of subArgs) {
        const relatedArg = flatSchema.find(
          ([_, schema]) =>
            schema.position.type === 'flag' && (schema.position.short === flag || schema.position.long === flag),
        )

        if (!relatedArg) {
          return err({
            type: 'unknownFlag',
            flag,
            flagPrefix: isLongFlag ? '--' : '-',
            value,
          })
        }

        const [argName, typedSchema] = relatedArg
        const { defaultValue, type: argType } = typedSchema
        const schema = untypedSchema(typedSchema)

        const hasPrev = out.has(flag)

        if (hasPrev && argType.type !== 'array') {
          return err({
            type: 'twiceFlag',
            argName,
            schema,
            secondValue: value,
          })
        }

        if (argType.type === 'boolean') {
          if (value !== null) {
            return err({ type: 'boolFlagHasValue', argName, schema })
          }

          out.set(argName, true)
          continue
        }

        let finalArgValue = value

        if (finalArgValue === null) {
          if (i === args.length - 1 || args[++i].startsWith('-')) {
            if (!defaultValue || argType.type === 'array') {
              return err({ type: 'missingValue', argName, schema })
            }

            out.set(argName, defaultValue)
            continue
          }

          finalArgValue = args[i]
        }

        const { typename, validator } = argType.type === 'array' ? argType.of : argType.customArgType

        const parsed = validator(finalArgValue)

        if (parsed instanceof Error) {
          return err({
            type: 'invalidValueType',
            argName,
            schema,
            expectedTypename: typename,
            found: finalArgValue,
            message: parsed.message,
          })
        }

        if (hasPrev && argType.type === 'array') {
          const prev = out.get(argName)

          if (!Array.isArray(prev)) {
            throw new Error('Internal consistency error: array flag not stored as an array')
          }

          prev.push(parsed)
        } else {
          out.set(argName, parsed)
        }
      }

      continue
    }

    // Here we are treating positional arguments

    const relatedArg = positionals.shift()

    if (!relatedArg) {
      return err({ type: 'tooManyPositionalArguments', expected: positionalsCount })
    }

    const [argName, typedSchema] = relatedArg
    const { type } = typedSchema

    if (type.type !== 'other') {
      throw new Error("Internal consistency error: non-'other' type found for positional argument")
    }

    const parsed = type.customArgType.validator(arg)

    if (parsed instanceof Error) {
      return err({
        type: 'invalidValueType',
        argName,
        schema: untypedSchema(typedSchema),
        expectedTypename: type.customArgType.typename,
        found: arg,
        message: parsed.message,
      })
    }

    out.set(argName, parsed)
  }

  for (const [argName, schema] of flatSchema) {
    if (!out.has(argName) && schema.type.type !== 'boolean') {
      if (!schema.defaultValue) {
        return err({
          type: 'missingArgument',
          argName,
          schema: untypedSchema(schema),
        })
      }

      out.set(argName, schema.defaultValue)
    }
  }

  const untypedArgs = Object.fromEntries(out)

  return {
    type: 'ok',
    // @ts-ignore
    args: untypedArgs,
  }
}

export function globalValidate<T>(
  result: ArgParsingResult<T>,
  exit: (code: number) => never,
  chalk: {
    yellowBright: (message: string) => string
    redBright: (message: string) => string
    greenBright: (message: string) => string
    cyanBright: (message: string) => string
    magentaBright: (message: string) => string
  } = {
    yellowBright: (message) => message,
    redBright: (message) => message,
    greenBright: (message) => message,
    cyanBright: (message) => message,
    magentaBright: (message) => message,
  },
): T | never {
  if (result.type === 'ok') {
    return result.args
  }

  const fail = (message: string): never => {
    console.error(chalk.redBright(message))
    exit(1)
  }

  const coloredArg = (name: string, schema: ArgSchema<unknown>): string =>
    schema.position.type === 'positional'
      ? `${chalk.yellowBright(name)} positional argument`
      : `${chalk.yellowBright(
          (schema.position.short !== null ? `-${schema.position.short}` : '') +
            (schema.position.short !== null && schema.position.long !== null ? ' | ' : '') +
            (schema.position.long !== null ? `--${schema.position.long}` : ''),
        )} argument`

  const e = result.error

  switch (e.type) {
    case 'missingFlagName':
      return fail(`A dash (${chalk.yellowBright('-')}) was provided without a flag name`)

    case 'missingValue':
      return fail(`Please provide a value for the ${coloredArg(e.argName, e.schema)}`)

    case 'boolFlagHasValue':
      return fail(`Cannot provide a value for boolean ${coloredArg(e.argName, e.schema)}`)

    case 'invalidValueType':
      return fail(
        `Provided invalid value ${chalk.cyanBright(e.found)} for ${coloredArg(
          e.argName,
          e.schema,
        )}, expected type ${chalk.yellowBright(e.expectedTypename)} (${chalk.magentaBright(e.message)})`,
      )

    case 'twiceFlag':
      return fail(`Cannot provide the ${coloredArg(e.argName, e.schema)} twice`)

    case 'unknownFlag':
      return fail(`Provided unknown flag ${chalk.yellowBright(`${e.flagPrefix}${e.flag}`)}`)

    case 'missingArgument':
      return fail(`Please provide a value for the ${coloredArg(e.argName, e.schema)}`)

    case 'tooManyPositionalArguments':
      return fail(`Too many positional arguments provided, expected only ${chalk.yellowBright(e.expected.toString())}`)
  }
}
