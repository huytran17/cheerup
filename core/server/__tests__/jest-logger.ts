import winston from "winston";
require("winston-mongodb");

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      silent: process.argv.includes("--silent"),
    }),
  ],
});
