import express from "express";
import authenticateAdminJWT from "../../../config/middlewares/authenticate-admin-jwt";
import { disk_upload } from "../../../config/middlewares/disk-upload-file";

const adminV2Router = express.Router();

import adminRouter from "./admin";
import categoryRouter from "./category";
import galleryRouter from "./gallery";
import postRouter from "./post";
import systemConfigurationRouter from "./system-configuration";
import userRouter from "./user";

adminV2Router.use("/admin", authenticateAdminJWT(), disk_upload, adminRouter);
adminV2Router.use("/post", authenticateAdminJWT(), disk_upload, postRouter);
adminV2Router.use("/user", authenticateAdminJWT(), disk_upload, userRouter);
adminV2Router.use(
  "/category",
  authenticateAdminJWT(),
  disk_upload,
  categoryRouter
);
adminV2Router.use(
  "/gallery",
  authenticateAdminJWT(),
  disk_upload,
  galleryRouter
);
adminV2Router.use(
  "/system-configuration",
  authenticateAdminJWT(),
  disk_upload,
  systemConfigurationRouter
);

export default adminV2Router;
