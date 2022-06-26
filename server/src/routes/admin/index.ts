import express from "express";
import authenticateAdminJWT from "../../config/middlewares/authenticateAdminJWT";

const adminRouter = express.Router();

import userRouter from "./user";

adminRouter.use("/user", authenticateAdminJWT(), userRouter);

export default adminRouter;
