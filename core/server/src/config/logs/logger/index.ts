import winston from "winston";

export function formatLog() {
  return winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf((entry) => {
      let message = entry.message;
      message &&
        typeof message === "object" &&
        (message = JSON.stringify(message));

      return `${entry.timestamp} ${entry.level}: ${message}`;
    }),
    winston.format.simple(),
    winston.format.align(),
    winston.format.metadata()
  );
}

const verboseLogConsole = new winston.transports.Console({
  level: "verbose",
  format: formatLog(),
});

const errorLogConsole = new winston.transports.Console({
  level: "error",
  format: formatLog(),
});

const verboseLogFile = new winston.transports.File({
  filename: "verbose.log",
  level: "verbose",
  format: formatLog(),
});

const errorLogFile = new winston.transports.File({
  filename: "error.log",
  level: "error",
  format: formatLog(),
});

export const logger = winston.createLogger({
  transports: [
    verboseLogConsole,
    errorLogConsole,
    verboseLogFile,
    errorLogFile,
  ],
});
