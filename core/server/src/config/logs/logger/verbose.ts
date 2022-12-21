import winston from "winston";
import expressWinston from "express-winston";
import {
  makeMongooseErrorLogger,
  makeMongooseErrorFileLogger,
  makeMongooseVerboseLogger,
  makeMongooseVerboseFileLogger,
  formatLog,
} from "./index";
import _ from "lodash";

export default function makeVerboseLogger() {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console({
        levels: winston.config.syslog.levels,
        format: winston.format.simple(),
        level: "verbose",
      }),
      makeMongooseVerboseLogger(),
      makeMongooseVerboseFileLogger(),
    ],
    exitOnError: false,
    exceptionHandlers: [
      makeMongooseErrorLogger(),
      makeMongooseErrorFileLogger(),
    ],
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
