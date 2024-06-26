import { Router } from "express";
import authenticateAdminJWT from "../../../config/middlewares/authenticate-admin-jwt";
import { diskUpload, tempUpload } from "../../../config/multer";
import { MimeTypes } from "../../../constants/mime-types";
import adminRouter from "./admin";
import batchAdminRouter from "./batch/admin";
import batchUserRouter from "./batch/user";
import categoryRouter from "./category";
import galleryRouter from "./gallery";
import postRouter from "./post";
import systemConfigurationRouter from "./system-configuration";
import excelSystemConfigurationRouter from "./upload-excel/system-configuration";
import userRouter from "./user";

const adminV2Router = Router();

const disk_upload_image = diskUpload({ mimetypes: MimeTypes.IMAGE }).single(
  "file"
);
const disk_upload_excel = diskUpload({ mimetypes: MimeTypes.EXCEL }).single(
  "file"
);
const temp_upload_excel = tempUpload({ mimetypes: MimeTypes.EXCEL }).single(
  "file"
);

adminV2Router.use(
  "/admin",
  authenticateAdminJWT(),
  disk_upload_image,
  adminRouter
);
adminV2Router.use(
  "/post",
  authenticateAdminJWT(),
  disk_upload_image,
  postRouter
);
adminV2Router.use(
  "/user",
  authenticateAdminJWT(),
  disk_upload_image,
  userRouter
);
adminV2Router.use(
  "/category",
  authenticateAdminJWT(),
  disk_upload_image,
  categoryRouter
);
adminV2Router.use(
  "/gallery",
  authenticateAdminJWT(),
  disk_upload_image,
  galleryRouter
);
adminV2Router.use(
  "/system-configuration",
  authenticateAdminJWT(),
  disk_upload_image,
  systemConfigurationRouter
);
adminV2Router.use(
  "/upload-excel/system-configuration",
  authenticateAdminJWT(),
  disk_upload_excel,
  excelSystemConfigurationRouter
);
adminV2Router.use(
  "/batch/admin",
  authenticateAdminJWT(),
  temp_upload_excel,
  batchAdminRouter
);
adminV2Router.use(
  "/batch/user",
  authenticateAdminJWT(),
  temp_upload_excel,
  batchUserRouter
);

export default adminV2Router;
