import { ArgFlagCombination, ArgPos, ArgSchema, ArgType } from './schema'

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

export function positional<T>(type: ArgType<T>, options?: ArgOptions<T>): ArgSchema<T> {
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
