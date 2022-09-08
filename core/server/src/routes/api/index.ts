import express from "express";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";
import categoryRouter from "./category";
import commentRouter from "./comment";
import postRouter from "./post";
import systemConfigurationRouter from "./system-configuration";

apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/comment", authenticateUserJWT(), commentRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/system-configuration", systemConfigurationRouter);

export default apiRouter;
