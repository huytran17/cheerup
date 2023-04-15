import express from "express";
import authenticateUserJWT from "../../config/middlewares/authenticate-user-jwt";

const apiRouter = express.Router();

import userRouter from "./user";
import authRouter from "./auth";
import categoryRouter from "./category";
import commentRouter from "./comment";
import postRouter from "./post";
import systemConfigurationRouter from "./system-configuration";
import subscriptionRouter from "./subscription";
import postBookmarkRouter from "./post-bookmark";
import commentLikeRouter from "./comment-like";
import passwordResetRouter from "./password-reset";
import seoRouter from "./seo";

apiRouter.use("/user", authenticateUserJWT(), userRouter);
apiRouter.use("/post-bookmark", authenticateUserJWT(), postBookmarkRouter);
apiRouter.use("/subscription", authenticateUserJWT(), subscriptionRouter);
apiRouter.use("/comment-like", authenticateUserJWT(), commentLikeRouter);

apiRouter.use("/seo", seoRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/comment", commentRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/system-configuration", systemConfigurationRouter);
apiRouter.use("/password-reset", passwordResetRouter);

export default apiRouter;
