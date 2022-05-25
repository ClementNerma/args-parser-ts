import { chalkFallback } from './chalk'
import { ArgSchema } from './schema'
import { ArgParsingResult } from './validator'

export function globalValidate<T>(
  result: ArgParsingResult<T>,
  exit: (code: number) => never,
  chalk = chalkFallback(),
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
