import express from "express";
import authenticateAdminJWT from "../../config/middlewares/authenticate-admin-jwt";

const adminRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";
import categoryRouter from "./category";
import commentRouter from "./comment";
import postRouter from "./post";
import adminAdminRouter from "./admin";
import subscriptionRouter from "./subscription";
import systemConfigurationRouter from "./system-configuration";
import galleryRouter from "../admin/gallery";
import seoRouter from "../admin/seo";

adminRouter.use("/auth", authRouter);
adminRouter.use("/seo", seoRouter);

adminRouter.use("/user", authenticateAdminJWT(), userRouter);
adminRouter.use("/gallery", authenticateAdminJWT(), galleryRouter);
adminRouter.use("/category", authenticateAdminJWT(), categoryRouter);
adminRouter.use("/comment", authenticateAdminJWT(), commentRouter);
adminRouter.use("/post", authenticateAdminJWT(), postRouter);
adminRouter.use("/admin", authenticateAdminJWT(), adminAdminRouter);
adminRouter.use("/subscription", authenticateAdminJWT(), subscriptionRouter);
adminRouter.use(
  "/system-configuration",
  authenticateAdminJWT(),
  systemConfigurationRouter
);

export default adminRouter;
