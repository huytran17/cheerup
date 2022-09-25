import express from "express";

import dotenv from "dotenv";
dotenv.config();

import makeLogger from "./config/logs/logger/verbose";
import makeErrorLogger from "./config/logs/logger/error";
import { expressRateLimit } from "./config/express-rate-limit";
import makeDb from "./data-access/make-db";
import {
  createDefaultAdmin,
  createDefaultSystemConfiguration,
} from "./utils/initial-data";
import { initializeMailer } from "./config/emailManager/mailer";
import { upload } from "./config/middlewares/file-upload-middleware";

import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./config/passport";
import helmet from "helmet";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(expressRateLimit());
}

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(appRouter);
app.use(makeLogger());
app.use(makeErrorLogger());
app.use(upload.single("file"));

app.listen(3000, () => console.log("Server is listening on port 3000"));

makeDb().then(async () => {
  initializeMailer();
  await Promise.all([createDefaultAdmin(), createDefaultSystemConfiguration()]);
});
