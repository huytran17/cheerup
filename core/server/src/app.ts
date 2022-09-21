import express from "express";

import dotenv from "dotenv";
dotenv.config();

import makeLogger from "./config/logs/logger";
import { expressRateLimit } from "./config/express-rate-limit";
import makeDb from "./data-access/make-db";
import { UserDb, AdminDb, SystemConfigurationDb } from "./data-access";
import { initializeMailer } from "./config/emailManager/mailer";
import { upload } from "./config/middlewares/file-upload-middleware";
import { hashPassword } from "./config/password";
import { AdminType } from "./database/interfaces/admin";

import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./config/passport";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(expressRateLimit);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(appRouter);
app.use(makeLogger());
app.use(upload.single("file"));

app.listen(3000, () => console.log("Server is listening on port 3000"));

makeDb().then(async () => {
  const user = await UserDb.findOne();
  const default_hash_password = await hashPassword({
    password: process.env.DEFAULT_APP_PASSWORD,
    password_confirmation: process.env.DEFAULT_APP_PASSWORD,
  });

  if (!user) {
    await UserDb.insert({
      full_name: "Huy Tran",
      email: "huytran@gmail.com",
      hash_password: default_hash_password,
    });
  }

  const admin = await AdminDb.findOne();
  if (!admin) {
    await AdminDb.insert({
      full_name: "Huy Tran",
      type: AdminType.Super,
      email: "huytran@gmail.com",
      hash_password: default_hash_password,
    });
  }

  const system_configuration = await SystemConfigurationDb.findOne();
  if (!system_configuration) {
    await SystemConfigurationDb.insert({
      is_blocked_comment: false,
      is_maintaining: false,
      client_meta: {
        title: "Personal Blog",
        description: "Personal Blog",
        author: "Huy Tran",
        owner: {
          name: "Huy Tran",
          description: "Huy Tran",
          avatar: null,
        },
        keywords: [],
        logo: null,
        favicon: null,
      },
      admin_meta: {
        title: "Personal Blog",
        description: "Personal Blog",
        author: "Huy Tran",
        logo: null,
        favicon: null,
      },
    });
  }

  initializeMailer();
});
