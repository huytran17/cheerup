import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import { createOrUpdateCommentLikeController } from "../../data-access/controllers/user/comment-like";
import { createOrUpdateCommentLikeRules } from "../../data-access/controllers/user/comment-like/validators";

const commentLikeRouter = Router();

commentLikeRouter.post(
  "/",
  makeValidator(createOrUpdateCommentLikeRules),
  makeExpressCallback(createOrUpdateCommentLikeController)
);

export default commentLikeRouter;
