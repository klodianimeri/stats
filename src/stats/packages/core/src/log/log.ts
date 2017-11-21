export enum DatabaseLogLevel {
  OFF,
  FATAL,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE,
  ALL,
}

export interface ILogger {
  log(...value: Array<any>): any;
  error(...value: Array<any>): any;
  warn(...value: Array<any>): any;
  info(...value: Array<any>): any;
  debug(...value: Array<any>): any;
  trace(...value: Array<any>): any;
}

export class DatabaseLogger {
  private static _logger: ILogger = console;
  private static _logLevel: DatabaseLogLevel = DatabaseLogLevel.WARN;

  static log(...value: Array<any>) {
    if (this._logLevel === DatabaseLogLevel.OFF) { return; }
    if (this._logLevel > DatabaseLogLevel.OFF) { this._logger.log(value); }
  }

  static error(...value: Array<any>) {
    if (this._logLevel === DatabaseLogLevel.OFF) { return; }

    if (this._logLevel >= DatabaseLogLevel.ERROR) { this._logger.error(value); }
  }

  static warn(...value: Array<any>) {
    if (this._logLevel === DatabaseLogLevel.OFF) { return; }

    if (this._logLevel >= DatabaseLogLevel.WARN) { this._logger.warn(value); }
  }

  static info(...value: Array<any>) {
    if (this._logLevel === DatabaseLogLevel.OFF) { return; }

    if (this._logLevel >= DatabaseLogLevel.INFO) { this._logger.info(value); }
  }

  static debug(...value: Array<any>) {
    if (this._logLevel === DatabaseLogLevel.OFF) { return; }

    if (this._logLevel >= DatabaseLogLevel.DEBUG) { this._logger.debug(value.toString()); }
  }

  static trace(...value: Array<any>) {
    if (this._logLevel === DatabaseLogLevel.OFF) { return; }

    if (this._logLevel >= DatabaseLogLevel.TRACE) { this._logger.trace(value); }
  }

  constructor() {
  }
}
