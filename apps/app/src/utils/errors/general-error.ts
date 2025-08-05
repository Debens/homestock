export class GeneralError extends Error {
  timestamp: string
  private _context: string

  static normalise(err: unknown) {
    if (err instanceof Error) {
      return err.message
    }

    return typeof err === 'string' ? err : JSON.stringify(err, null, 2)
  }

  constructor(error: unknown) {
    super(GeneralError.normalise(error), { cause: error })

    /* NOTE: maintain proper prototype chain (only needed when transpiling to ES5 */
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = this.constructor.name
    this.timestamp = new Date().toISOString()

    /* NOTE: capture stack trace (V8) */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  context(context: string) {
    this._context = context

    return this
  }

  snackbar() {
    /* TODO: configure message */
    return this
  }

  handle() {
    if (__DEV__) {
      // biome-ignore lint/suspicious/noConsole: raising in development
      console.error(this)
    }

    /* TODO: execute and report error */
    return this
  }
}
