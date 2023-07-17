import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { expressRateLimit } from "./config/express-rate-limit";
import makeDb from "./data-access/make-db";
import {
  createDefaultAdmin,
  createDefaultSystemConfiguration,
} from "./utils/initial-data";
import { initializeMailer } from "./config/emailManager/mailer";
import Storage from "./config/storage";
import Redis from "./config/redis";
import OTPLib from "./config/tfa";
import { upload } from "./config/middlewares/file-upload";
import accessControlMiddleware from "./config/middlewares/access-control";

import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./config/passport";
import helmet from "helmet";
import requestIp from "request-ip";

const app = express();

process.env.NODE_ENV === "production" && app.use(expressRateLimit());

app.use(requestIp.mw());
app.use(upload.single("file"));
app.use(cors(), accessControlMiddleware);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(appRouter);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`)
);

initializeMailer();

makeDb()
  .then(async () => {
    await Promise.all([
      createDefaultAdmin(),
      createDefaultSystemConfiguration(),
    ]);
    new Storage();
    new Redis();
    new OTPLib();
  })
  .catch((err) => {
    console.error(err);
    process.exit(7);
  });
