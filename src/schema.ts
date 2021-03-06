export type ArgSchema<T> = Readonly<{
  help: string | null
  position: ArgPos
  type: ArgType<T>
  defaultValue: { value: T } | null
}>

export type ArgPos = { type: 'positional' } | ({ type: 'flag' } & ArgFlagCombination)

export type ArgFlagCombination =
  | { short: string; long: string }
  | { short: null; long: string }
  | { short: string; long: null }

export type ArgType<T> =
  | (T extends boolean ? { type: 'boolean' } : never)
  | (T extends Array<infer U> ? { type: 'array'; of: ArgCustomType<U> } : never)
  | {
      type: 'other'
      customArgType: ArgCustomType<T>
    }

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
