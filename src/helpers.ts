import { ArgCustomType, ArgFlagCombination, ArgPos, ArgSchema, ArgType } from './schema'

export type ArgOptions<T> = { help?: string; defaultValue?: T }

function _argSchema<T>(type: ArgType<T>, position: ArgPos, options: ArgOptions<T> | undefined): ArgSchema<T> {
  return {
    type,
    position,
    help: options?.help ?? null,
    defaultValue: options?.defaultValue !== undefined ? { value: options.defaultValue } : null,
  }
}

function _argFlag<T>(type: ArgType<T>, flags: ArgFlagCombination, options?: ArgOptions<T>): ArgSchema<T> {
  const { short, long } = flags

  if (short !== null && short.length !== 1) {
    throw new Error(`Invalid short flag "${short}" provided, must be exactly 1 character long.`)
  }

  if (long !== null && long.length < 2) {
    throw new Error(`Invalid long flag "${long}" provided, must be at least 2 characters long`)
  }

  return _argSchema(type, { type: 'flag', ...flags }, options)
}

export function positional<T>(type: Extract<ArgType<T>, { type: 'other' }>, options?: ArgOptions<T>): ArgSchema<T> {
  return _argSchema(type, { type: 'positional' }, options)
}

export function shortFlag<T>(flag: string, type: ArgType<T>, options?: ArgOptions<T>): ArgSchema<T> {
  return _argFlag(type, { short: flag, long: null }, options)
}

export function longFlag<T>(flag: string, type: ArgType<T>, options?: ArgOptions<T>): ArgSchema<T> {
  return _argFlag(type, { short: null, long: flag }, options)
}

export function shortLongFlag<T>(
  flag: { short: string; long: string },
  type: ArgType<T>,
  options?: ArgOptions<T>,
): ArgSchema<T> {
  return _argFlag(type, flag, options)
}

export const presential: ArgType<boolean> = { type: 'boolean' }

export function arrayOf<T>(type: ArgCustomType<T>): ArgType<T[]> {
  return { type: 'array', of: type }
}

export function typed<T>(type: ArgCustomType<T>): ArgType<T> {
  return { type: 'other', customArgType: type }
}

export function custom<T>(typename: string, validator: ArgCustomType<T>['validator']): ArgCustomType<T> {
  return { typename, validator }
}

export function stringValidator(typename: string, validator: (arg: string) => boolean): ArgCustomType<string> {
  return custom(typename, (arg) => (validator(arg) ? arg : new Error(`Validation failed`)))
}

export const string: ArgCustomType<string> = stringValidator('string', (_) => true)

export const integer: ArgCustomType<number> = custom('integer', (arg) => {
  const num = parseInt(arg)

  if (Number.isNaN(num)) {
    return new Error('Invalid number provided')
  }

  if (!Number.isSafeInteger(num)) {
    return new Error('Please provide a valid integer')
  }

  return num
})

export const float: ArgCustomType<number> = custom('float', (arg) => {
  const num = parseFloat(arg)
  return Number.isNaN(num) ? new Error('Invalid number provided') : num
})
