import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import { createOrUpdateCommentLikeRules } from "../../data-access/controllers/user/comment-like/validators";
import { createOrUpdateCommentLikeController } from "../../data-access/controllers/user/comment-like";

const commentLikeRouter = express.Router();

commentLikeRouter.post(
  "/",
  makeValidator(createOrUpdateCommentLikeRules),
  makeExpressCallback(createOrUpdateCommentLikeController)
);

export default commentLikeRouter;
