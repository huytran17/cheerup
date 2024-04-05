import express from "express";
import authenticateAdminJWT from "../../../config/middlewares/authenticate-admin-jwt";
import { disk_upload } from "../../../config/middlewares/disk-upload-file";

const adminV2Router = express.Router();

import adminRouter from "./admin";

adminV2Router.use("/admin", authenticateAdminJWT(), disk_upload, adminRouter);

export default adminV2Router;
