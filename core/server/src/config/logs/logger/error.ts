import winston from "winston";
import expressWinston from "express-winston";
import { makeMongooseErrorLogger } from "./index";
import _ from "lodash";

export default function makeErrorLogger() {
  return expressWinston.errorLogger({
    exitOnError: false,
    transports: [
      makeMongooseErrorLogger(),
      new winston.transports.Console({ level: "error" }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    showStack: true,
    msg: "Error {{ req.clientIp }} {{req.method}} {{req.url}} {{res.statusCode}}",
  });
}
