import express from "express";

import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import requestIp from "request-ip";
import responseTime from "response-time";
import { expressRateLimit } from "./config/express-rate-limit";
import { cors } from "./config/middlewares/access-control";
import { upload } from "./config/middlewares/file-upload";
import passport from "./config/passport";
import appRouter from "./routes";
import { initialServices } from "./utils/initial-services";

const app = express();

console.log(`Worker PID: ${process.pid}.`);

process.env.NODE_ENV === "production" && app.use(expressRateLimit());

app.use(requestIp.mw());
app.use(upload.single("file"));
app.use(cors);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression());
app.use(responseTime());
app.use(
  express.static("public", {
    maxAge: "1d",
    extensions: ["image/*"],
  })
);
app.use(appRouter);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`)
);

initialServices();
