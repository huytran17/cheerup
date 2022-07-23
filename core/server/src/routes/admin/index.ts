import express from "express";
import authenticateAdminJWT from "../../config/middlewares/authenticateAdminJWT";

const adminRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";
import categoryRouter from "./category";
import commentRouter from "./comment";
import postRouter from "./post";

adminRouter.use("/user", authenticateAdminJWT(), userRouter);
adminRouter.use("/category", authenticateAdminJWT(), categoryRouter);
adminRouter.use("/comment", authenticateAdminJWT(), commentRouter);
adminRouter.use("/post", authenticateAdminJWT(), postRouter);
adminRouter.use("/auth", authRouter);

export default adminRouter;
