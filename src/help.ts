import { chalkFallback } from './chalk'
import { ArgSchema } from './schema'

export function isArgOptional<_>(schema: ArgSchema<_>): boolean {
  return schema.type.type === 'boolean' || schema.defaultValue !== null
}

export function generateHelpText<_K extends string, _O extends { [key in _K]: _V }, _V>(
  schema: {
    [key in keyof _O]: ArgSchema<_O[key]>
  },
  chalk = chalkFallback(),
): string {
  const args = Object.entries<ArgSchema<_O[keyof _O]>>(schema).map(([name, schema]) => ({ name, schema }))

  const positionalArgs = args
    .filter(({ schema }) => schema.position.type === 'positional')
    .sort((a, b) => Number(isArgOptional(a.schema)) - Number(isArgOptional(b.schema)))
    .map(
      ({ name, schema }) =>
        [
          `${isArgOptional(schema) ? '[' : ''}${name}${isArgOptional(schema) ? ']' : ''}${
            schema.type.type !== 'boolean' ? ` ${name.toLocaleUpperCase()}` : ''
          }`,
          schema.help,
        ] as const,
    )

  const _rawFlags = args
    .filter(({ schema }) => schema.position.type === 'positional')
    .map(({ name, schema }) => {
      if (schema.position.type === 'positional') {
        throw new Error('Internal consistency error: filtered argument is not positional in help() function')
      }

      const flags = [schema.position.short, schema.position.long].filter((flag) => flag !== null).join(' | ')

      return {
        isOpt: isArgOptional(schema),
        data: [`${flags}${schema.type.type !== 'boolean' ? ` ${name.toLocaleUpperCase()}` : ''}`, schema.help] as const,
      }
    })

  const requiredFlags = _rawFlags.filter((flag) => !flag.isOpt).map((arg) => arg.data)
  const optionalFlags = _rawFlags.filter((flag) => flag.isOpt).map((arg) => arg.data)

  const categories: Array<[string, Array<readonly [string, string | null]>]> = [
    ['ARGUMENTS', positionalArgs],
    ['FLAGS', requiredFlags],
    ['OPTIONAL FLAGS', optionalFlags],
  ]

  const longestArgTitle = Math.max(...categories.map((c) => c[1].map((arg) => arg[0].length)).flat())

  return categories
    .map(([category, args]) =>
      [
        chalk.yellowBright(`${category}:`),
        ...args.map(([title, help]) => `  ${title.padStart(longestArgTitle, ' ')}  ${help ?? ''}`),
      ].join('\n'),
    )
    .join('\n\n')
}
