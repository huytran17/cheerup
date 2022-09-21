import winston from "winston";
import expressWinston from "express-winston";
import {
  makeDatabaseURL,
  makeLogsDatabaseURL,
} from "../../../data-access/make-db";
require("winston-mongodb");

export default function makeLogger() {
  const is_silent = process.argv.includes("--silent");

  return expressWinston.logger({
    transports: [
      new winston.transports.Console({
        levels: winston.config.syslog.levels,
        format: winston.format.simple(),
        level: "verbose",
        silent: is_silent,
      }),
      makeMongooseLogger(),
      makeMongooseFileLogger(),
    ],
    exitOnError: false,
    exceptionHandlers: is_silent
      ? []
      : [makeMongooseErrorLogger(), makeMongooseErrorFileLogger()], // ignore with --silent
    format: formatLog(),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: `HTTP {{ req.clientIp }} {{req.method}} {{req.url}} {{res.statusCode}} {{res.error}} {{res.responseTime}}ms`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    metaField: null, //this causes the metadata to be stored at the root of the log entry
    level: "http",
    statusLevels: false,
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  });
}

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    makeMongooseLogger(),
    makeMongooseFileLogger(),
  ],
  exceptionHandlers: [makeMongooseErrorLogger(), makeMongooseErrorFileLogger()],
  level: "verbose",
  format: formatLog(),
  colorize: true,
});

function formatLog() {
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

let mongooseLogger = null;
export function makeMongooseLogger() {
  if (mongooseLogger) {
    return mongooseLogger;
  }

  const transports: any = winston.transports;

  mongooseLogger = new transports.MongoDB({
    exitOnError: false,
    db: makeLogsDatabaseURL(),
    level: process.env.MONGO_LOGGING_LEVEL || "verbose",
    name: "mongodb",
    storeHost: true,
    collection: process.env.MONGO_LOGGING_COLLECTION || "winstonlogs",
    capped: true,
    cappedSize: 80000000,
    decolorize: false,
    tryReconnect: true,
    options: {
      useNewUrlParser: true,
      connectTimeoutMS: 10000,
      useUnifiedTopology: true,
    },
  });

  return mongooseLogger;
}

let mongooseErrorLogger = null;
// FIXME: not working
export function makeMongooseErrorLogger() {
  if (mongooseErrorLogger) {
    return mongooseErrorLogger;
  }

  const transports: any = winston.transports;

  mongooseErrorLogger = new transports.MongoDB({
    db: makeDatabaseURL(),
    level: process.env.MONGO_LOGGING_ERROR_LEVEL || "error",
    name: "mongodb",
    storeHost: true,
    collection: process.env.MONGO_LOGGING_ERROR_COLLECTION || "winstonerrors",
    capped: true,
    cappedSize: 80000000,
    decolorize: true,
    tryReconnect: true,
    handleExceptions: true,
    options: {
      useNewUrlParser: true,
      connectTimeoutMS: 10000,
      useUnifiedTopology: true,
    },
  });

  return mongooseErrorLogger;
}

let mongooseErrorFileLogger = null;
export function makeMongooseErrorFileLogger() {
  if (mongooseErrorFileLogger) {
    return mongooseErrorFileLogger;
  }

  const transports: any = winston.transports;

  mongooseErrorFileLogger = new transports.File({
    filename: process.env.MONGO_LOGGING_ERROR_FILE_NAME || "winston-errors.log",
    level: process.env.MONGO_LOGGING_ERROR_FILE_LEVEL || "error",
  });

  return mongooseErrorFileLogger;
}

let mongooseFileLogger = null;
export function makeMongooseFileLogger() {
  if (mongooseFileLogger) {
    return mongooseFileLogger;
  }

  const transports = winston.transports;

  mongooseFileLogger = new transports.File({
    filename: process.env.MONGO_LOGGING_FILE_NAME || "winston-logs.log",
    level: process.env.MONGO_LOGGING_FILE_LEVEL || "verbose",
  });

  return mongooseFileLogger;
}
