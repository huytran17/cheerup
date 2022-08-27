import express from "express";
import authenticateAdminJWT from "../../config/middlewares/authenticateAdminJWT";

const adminRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";
import categoryRouter from "./category";
import commentRouter from "./comment";
import postRouter from "./post";
import adminAdminRouter from "./admin";
import feedbackRouter from "./feedback";
import subscriptionRouter from "./subscription";
import systemConfigurationRouter from "./system-configuration";

adminRouter.use("/auth", authRouter);
adminRouter.use("/user", authenticateAdminJWT(), userRouter);
adminRouter.use("/category", authenticateAdminJWT(), categoryRouter);
adminRouter.use("/comment", authenticateAdminJWT(), commentRouter);
adminRouter.use("/post", authenticateAdminJWT(), postRouter);
adminRouter.use("/admin", authenticateAdminJWT(), adminAdminRouter);
adminRouter.use("/subscription", authenticateAdminJWT(), subscriptionRouter);
adminRouter.use("/feedback", authenticateAdminJWT(), feedbackRouter);
adminRouter.use(
  "/system-configuration",
  authenticateAdminJWT(),
  systemConfigurationRouter
);

export default adminRouter;
