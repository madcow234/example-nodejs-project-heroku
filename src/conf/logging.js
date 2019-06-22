import * as path from "path";
import { error } from "console";
import { createLogger, format, transports } from "winston";

const { combine, label, timestamp, printf } = format;

const combinedLogFilename = path.resolve("./logs", "combined.log");
const errorLogFilename = path.resolve("./logs", "error.log");
const testLogFilename = path.resolve("./logs", "test.combined.log");

const logFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} ${level.toUpperCase()} [${label}]: ${message}`;
});

const loggerFormat = callerFilename => {
  return combine(
    label({
      label: path.relative("dist", callerFilename)
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    logFormat
  );
};

module.exports = callerFilename => {
  if (process.env.NODE_ENV === "production") {
    // TODO: Create the logger required for the production environment
  } else if (process.env.NODE_ENV === "development") {
    // Print warnings and errors to console
    // Print all log levels to a file named "combined.log"
    // Print only errors to a file named "error.log"
    return createLogger({
      format: loggerFormat(callerFilename),
      transports: [
        new transports.Console({
          level: "warn"
        }),
        new transports.File({
          filename: combinedLogFilename
        }),
        new transports.File({
          filename: errorLogFilename,
          level: "error"
        })
      ]
    });
  } else if (process.env.NODE_ENV === "test") {
    // When running unit tests, log to a file named "test.combined.log"
    return createLogger({
      format: loggerFormat(callerFilename),
      transports: [
        new transports.File({
          filename: testLogFilename
        })
      ]
    });
  } else {
    error("Cannot determine current Node environment!");
    error("Switching to console logging...");
    return createLogger({
      format: loggerFormat(callerFilename),
      transports: [new transports.Console()]
    });
  }
};
