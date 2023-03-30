import winston from "winston";

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  level: "verbose",
  format: formatLog(),
});

export function formatLog() {
  return winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf((entry) => {
      let message = entry.message;
      if (message && typeof message === "object") {
        message = JSON.stringify(message);
      }

      return `${entry.timestamp} [${entry.level}]: ${message}`;
    }),
    winston.format.simple(),
    winston.format.align(),
    winston.format.metadata()
  );
}
