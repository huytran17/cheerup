import express from "express";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";
import categoryRouter from "./category";
import commentRouter from "./comment";
import postRouter from "./post";

apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/category", authenticateUserJWT(), categoryRouter);
apiRouter.use("/comment", authenticateUserJWT(), commentRouter);
apiRouter.use("/post", authenticateUserJWT(), postRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
