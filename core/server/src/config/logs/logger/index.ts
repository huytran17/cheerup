import winston from "winston";
import {
  makeDatabaseURL,
  makeLogsDatabaseURL,
} from "../../../data-access/make-db";
require("winston-mongodb");

let mongooseLogger = null,
  mongooseErrorLogger = null,
  mongooseErrorFileLogger = null,
  mongooseFileLogger = null;

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    winston.level === "verbose"
      ? (makeMongooseVerboseLogger(), makeMongooseVerboseFileLogger())
      : (makeMongooseErrorLogger(), makeMongooseErrorFileLogger()),
  ],
  exceptionHandlers: [makeMongooseErrorLogger(), makeMongooseErrorFileLogger()],
  level: "verbose",
  format: formatLog(),
  colorize: true,
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

export function makeMongooseVerboseLogger() {
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

export function makeMongooseVerboseFileLogger() {
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
