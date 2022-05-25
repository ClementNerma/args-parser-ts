export type Chalk = {
  yellowBright: (message: string) => string
  redBright: (message: string) => string
  greenBright: (message: string) => string
  cyanBright: (message: string) => string
  magentaBright: (message: string) => string
}

export function chalkFallback(): Chalk {
  return {
    yellowBright: (message) => message,
    redBright: (message) => message,
    greenBright: (message) => message,
    cyanBright: (message) => message,
    magentaBright: (message) => message,
  }
}
