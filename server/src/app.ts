import express from "express";
import makeDb from "./data-access/make-db";
import { UserDb, AdminDb } from "./data-access";
import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./config/passport";
import { upload } from "./config/middlewares/file-upload-middleware";
import { AdminType } from "./database/interfaces/admin";
import { hashPassword } from "./config/password";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(appRouter);
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
      first_name: "Huy",
      last_name: "Tran",
      email: "huytran@gmail.com",
      hash_password: default_hash_password,
    });
  }

  const admin = await AdminDb.findOne();
  if (!admin) {
    await AdminDb.insert({
      first_name: "Huy",
      last_name: "Tran",
      type: AdminType.Super,
      email: "huytran@gmail.com",
      hash_password: default_hash_password,
    });
  }
});
