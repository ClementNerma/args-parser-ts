import { Chalk } from './chalk'
import { globalValidate } from './global'
import { generateHelpText } from './help'
import { ArgSchema } from './schema'
import { validateArgs } from './validator'

export * from './schema'
export * from './validator'
export * from './global'
export * from './helpers'
export * from './chalk'
export * from './help'

export function parseArgs<_K extends string, _O extends { [key in _K]: _V }, _V>(
  schema: {
    [key in keyof _O]: ArgSchema<_O[key]>
  },
  args: string[],
  exit: (code?: number) => never,
  chalk: Chalk | undefined,
): _O | never {
  if (args.length === 1 && args[0] === '--help') {
    console.info(generateHelpText(schema, chalk))
    return exit()
  }

  return globalValidate(validateArgs(schema, args), exit, chalk)
}
