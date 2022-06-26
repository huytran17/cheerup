import express from "express";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

const apiRouter = express.Router();

import userRouter from "./user";

apiRouter.use("/user", userRouter);

export default apiRouter;
