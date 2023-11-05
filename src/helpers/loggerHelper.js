const colors = require("console-log-colors");

const LogLevels = {
  Debug: 0,
  Shard: 1,
  Info: 2,
  Success: 3,
  Warn: 4,
  Error: 5,
  Fatal: 6,
};

const prefixes = new Map([
  [LogLevels.Debug, "DEBUG"],
  [LogLevels.Shard, "SHARD"],
  [LogLevels.Info, "INFO"],
  [LogLevels.Success, "SUCCESS"],
  [LogLevels.Warn, "WARN"],
  [LogLevels.Error, "ERROR"],
  [LogLevels.Fatal, "FATAL"],
]);

const noColor = (str) => str;

const colorFunctions = new Map([
  [LogLevels.Debug, colors.gray],
  [LogLevels.Shard, colors.magenta.bold],
  [LogLevels.Info, colors.cyan],
  [LogLevels.Success, colors.green.bold],
  [LogLevels.Warn, colors.yellow],
  [LogLevels.Error, colors.red],
  [LogLevels.Fatal, colors.red.bold.italic],
]);

function logger({ logLevel = LogLevels.Info, name } = {}) {
  function log(level, ...args) {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const logMessage = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) || "DEBUG"),
      name ? `${name} >` : ">",
      ...args,
    ];

    switch (level) {
      case LogLevels.Debug:
        return console.debug(...logMessage);
      case LogLevels.Shard:
        return console.info(...logMessage);
      case LogLevels.Info:
        return console.info(...logMessage);
      case LogLevels.Success:
        return console.info(...logMessage);
      case LogLevels.Warn:
        return console.warn(...logMessage);
      case LogLevels.Error:
        return console.error(...logMessage);
      case LogLevels.Fatal:
        return console.error(...logMessage);
      default:
        return console.log(...logMessage);
    }
  }

  function setLevel(level) {
    logLevel = level;
  }

  function debug(...args) {
    log(LogLevels.Debug, ...args);
  }

  function shard(...args) {
    log(LogLevels.Shard, ...args);
  }

  function info(...args) {
    log(LogLevels.Info, ...args);
  }

  function success(...args) {
    log(LogLevels.Success, ...args);
  }

  function warn(...args) {
    log(LogLevels.Warn, ...args);
  }

  function error(...args) {
    log(LogLevels.Error, ...args);
  }

  function fatal(...args) {
    log(LogLevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    shard,
    info,
    success,
    warn,
    error,
    fatal,
  };
}

module.exports = logger;
