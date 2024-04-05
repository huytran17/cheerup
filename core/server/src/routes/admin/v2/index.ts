import express from "express";
import authenticateAdminJWT from "../../../config/middlewares/authenticate-admin-jwt";
import { disk_upload } from "../../../config/middlewares/disk-upload-file";

const adminV2Router = express.Router();

import adminRouter from "./admin";
import categoryRouter from "./category";

adminV2Router.use("/admin", authenticateAdminJWT(), disk_upload, adminRouter);
adminV2Router.use(
  "/category",
  authenticateAdminJWT(),
  disk_upload,
  categoryRouter
);

export default adminV2Router;
