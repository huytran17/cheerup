import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      silent: process.argv.includes("--silent"),
    }),
  ],
});
