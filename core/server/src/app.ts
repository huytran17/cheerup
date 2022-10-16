import express from "express";

import dotenv from "dotenv";
dotenv.config();

import makeVerboseLogger from "./config/logs/logger/verbose";
import makeErrorLogger from "./config/logs/logger/error";
import { expressRateLimit } from "./config/express-rate-limit";
import makeDb from "./data-access/make-db";
import {
  createDefaultAdmin,
  createDefaultSystemConfiguration,
} from "./utils/initial-data";
import { initializeMailer } from "./config/emailManager/mailer";
import Scheduler from "./config/scheduler";
import Storage from "./config/storage";
import Redis from "./config/redis";
import { upload } from "./config/middlewares/file-upload-middleware";

import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./config/passport";
import helmet from "helmet";
import requestIp from "request-ip";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(expressRateLimit());
}

app.use(requestIp.mw());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(appRouter);
app.use(makeVerboseLogger());
app.use(makeErrorLogger());
app.use(upload.single("file"));

// app.listen(3000, () => console.log("Server is listening on port 3000"));
app.listen(process.env.SERVER_PORT || 3000);

initializeMailer();

makeDb().then(async () => {
  await Promise.all([createDefaultAdmin(), createDefaultSystemConfiguration()]);
  new Storage();
  new Scheduler();
  new Redis();
});
