import winston from "winston";
require("winston-mongodb");

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      // NOTE: disabled logging for unit testing purposes only
      silent: process.argv.includes("--silent"),
    }),
  ],
});
