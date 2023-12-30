import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { initializeMailer } from "./config/emailManager/mailer";
import { expressRateLimit } from "./config/express-rate-limit";
import accessControlMiddleware from "./config/middlewares/access-control";
import { upload } from "./config/middlewares/file-upload";
import Redis from "./config/redis";
import Storage from "./config/storage";
import TFA from "./config/tfa";
import makeDb from "./data-access/make-db";
import {
  createDefaultAdmin,
  createDefaultSystemConfiguration,
} from "./utils/initial-data";

import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import requestIp from "request-ip";
import passport from "./config/passport";
import appRouter from "./routes";

const app = express();

console.log(`Worker PID: ${process.pid}.`);

process.env.NODE_ENV === "production" && app.use(expressRateLimit());

app.use(requestIp.mw());
app.use(upload.single("file"));
app.use(cors(), accessControlMiddleware);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression());
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
    new TFA();
  })
  .catch((err) => {
    console.error(err);
    process.exit(7);
  });
