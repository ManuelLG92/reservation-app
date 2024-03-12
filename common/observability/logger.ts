import * as log from "log";

enum logLevels {
  info = "info",
  debug = "debug",
  error = "error",
  warning = "warn",
}

export type LoggerInterface = {
  [key in keyof typeof logLevels]: (
    message: string,
    metadata?: Record<string, unknown>,
  ) => void;
};

export class Logger implements LoggerInterface {
  constructor() {
    log.setup({
      handlers: {
        default: new log.ConsoleHandler("DEBUG", {
          formatter: log.formatters.jsonFormatter,
          useColors: true,
        }),
      },
    });
  }

  info(message: string, metadata?: Record<string, unknown>) {
    this.appLog(logLevels.info, message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>) {
    this.appLog(logLevels.error, message, metadata);
  }

  warning(message: string, metadata?: Record<string, unknown>) {
    this.appLog(logLevels.warning, message, metadata);
  }
  debug(message: string, metadata?: Record<string, unknown>) {
    this.appLog(logLevels.debug, message, metadata);
  }

  appLog(
    level: logLevels,
    message: string,
    metadata?: Record<string, unknown>,
  ) {
    log[level](message, metadata ?? {});
  }
}
