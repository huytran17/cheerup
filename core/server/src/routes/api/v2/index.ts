import express from "express";
import authenticateUserJWT from "../../../config/middlewares/authenticate-user-jwt";

const apiV2Router = express.Router();

import { disk_upload } from "../../../config/middlewares/disk-upload-file";
import userRouter from "./user";

apiV2Router.use("/user", authenticateUserJWT(), disk_upload, userRouter);

export default apiV2Router;
