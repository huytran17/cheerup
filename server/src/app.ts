import express from "express";
import makeDb from "./data-access/make-db";
import { UserDb } from "./data-access";
import cors from "cors";
import bodyParser from "body-parser";
import appRouter from "./routes";
import passport from "./config/passport";
import { upload } from "./config/middlewares/file-upload-middleware";

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
  if (!user) {
    await UserDb.insert({
      first_name: "Huy",
      last_name: "Tran",
      email: "huytran@gmail.com",
      hash_password: "qwer1234",
    });
  }
});
