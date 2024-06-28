import express from "express";

import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { createServer } from "http";
import { join } from "path";
import requestIp from "request-ip";
import responseTime from "response-time";
import { expressRateLimit } from "./config/express-rate-limit";
import { cors } from "./config/middlewares/access-control";
import passport from "./config/passport";
import { TServerInstance } from "./config/socket.io";
import appRouter from "./routes";
import { initialServices } from "./utils/initial-services";

const app = express();

console.log(`Worker PID: ${process.pid}.`);

process.env.NODE_ENV === "production" && app.use(expressRateLimit());

app.use(requestIp.mw());
app.use(cors);
app.use(helmet());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(compression());
app.use(responseTime());
app.use(
  "/upload",
  express.static(join(__dirname, "upload"), {
    maxAge: "1d",
    extensions: ["image/*"],
  })
);
app.use(appRouter);

const http_srv: TServerInstance = createServer(app);

http_srv.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
  initialServices({ compression, cookieParser, helmet, http_srv });
});

export type Helmet = typeof helmet;
export type CookieParser = typeof cookieParser;
export type Compression = typeof compression;
