import express from "express";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";

apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
