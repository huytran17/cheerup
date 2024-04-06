import express from "express";
import authenticateAdminJWT from "../../../config/middlewares/authenticate-admin-jwt";
import { disk_upload } from "../../../config/middlewares/disk-upload-file";

const adminV2Router = express.Router();

import adminRouter from "./admin";
import categoryRouter from "./category";
import galleryRouter from "./gallery";

adminV2Router.use("/admin", authenticateAdminJWT(), disk_upload, adminRouter);
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

export default adminV2Router;
