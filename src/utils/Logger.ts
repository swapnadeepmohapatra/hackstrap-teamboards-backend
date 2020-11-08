/* eslint-disable valid-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
export enum LOG_LEVEL {
  ERROR = 1,
  WARN,
  INFO,
}

export interface LoggerConfig {
  LOG_LEVEL?: LOG_LEVEL;
  prefix?: string;
}

export interface RegisterLogConfig {
  code: string;
  msg: string;
  type?: LOG_LEVEL;
}

interface MsgRegistry extends RegisterLogConfig {
  type: LOG_LEVEL;
}

class Logger {
  private LOG_LEVEL: LOG_LEVEL;
  private prefix: string;
  private msg_registry: Record<string, MsgRegistry> = {};

  constructor(config?: LoggerConfig) {
    this.LOG_LEVEL = config?.LOG_LEVEL || LOG_LEVEL.INFO;
    this.prefix = config?.prefix || '';
  }

  /**
   * register registers a log code and its corresponding message
   *
   * These registered messages can then be directly invoked by using log method
   * @param config
   */
  register(config: RegisterLogConfig) {
    this.msg_registry[config.code] = {
      ...config,
      type: config.type || LOG_LEVEL.INFO,
    };
  }

  /**
   * log will log the message corresponding to the given code
   *
   * It will also respect the given LOG_LEVEL in the config
   * @param code msg code
   */
  log(code: string) {
    const msg = this.msg_registry[code];
    if (!msg) {
      this.info(
        `${code} is not a registered code, add it using the register methor or use appropriate method`,
        'INVALID_CODE',
      );

      return;
    }

    switch (msg.type) {
      case LOG_LEVEL.ERROR:
        this.error(msg.msg, msg.code);
        break;
      case LOG_LEVEL.WARN:
        this.warn(msg.msg, msg.code);
        break;
      case LOG_LEVEL.INFO:
        this.info(msg.msg, msg.code);
        break;
      default:
        break;
    }
  }

  /**
   * error will log the error on the console if the log level
   * allows it to
   * @param msg error message
   * @param code error code
   */
  error(msg: string, code?: string) {
    if (this.LOG_LEVEL < LOG_LEVEL.ERROR) return;

    msg = this.addPrefix(msg);
    console.error(code ? `ERROR: ${code}\n${msg}` : msg);
  }

  /**
   * warn will log the warning message on the console
   * if the log level allows it to
   * @param msg warning message
   * @param code warning code
   */
  warn(msg: string, code?: string) {
    if (this.LOG_LEVEL < LOG_LEVEL.WARN) return;

    msg = this.addPrefix(msg);
    console.warn(code ? `WARNING: ${code}\n${msg}` : msg);
  }

  /**
   * info will log the message on the console if the log level
   * allows it to
   * @param msg info message
   * @param code info code
   */
  info(msg: string, code?: string) {
    if (this.LOG_LEVEL < LOG_LEVEL.INFO) return;

    msg = this.addPrefix(msg);
    console.log(code ? `INFO: ${code}\n${msg}` : msg);
  }

  /**
   * addPrefix just formats the given message by adding a prefix to it
   * @param msg
   */
  private addPrefix(msg: string): string {
    return `[${this.prefix}]: ${msg}`;
  }
}

export default Logger;
