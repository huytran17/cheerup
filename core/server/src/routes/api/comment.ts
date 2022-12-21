import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

import {
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  likeCommentRules,
  dislikeCommentRules,
  replyCommentRules,
  countCommentsByPostRules,
} from "../../data-access/controllers/user/comment/validators";
import {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostPaginatedController,
  likeCommentController,
  dislikeCommentController,
  replyCommentController,
  countCommentsByPostController,
} from "../../data-access/controllers/user/comment";

const commentRouter = express.Router();

commentRouter.get(
  "/count-by-post",
  makeValidator(countCommentsByPostRules),
  makeExpressCallback(countCommentsByPostController)
);

commentRouter.post(
  "/reply",
  authenticateUserJWT(),
  makeValidator(replyCommentRules),
  makeExpressCallback(replyCommentController)
);

commentRouter.put(
  "/like/:_id",
  authenticateUserJWT(),
  makeValidator(likeCommentRules),
  makeExpressCallback(likeCommentController)
);

commentRouter.put(
  "/dislike/:_id",
  authenticateUserJWT(),
  makeValidator(dislikeCommentRules),
  makeExpressCallback(dislikeCommentController)
);

commentRouter.get(
  "/by-post-paginated",
  makeValidator(getCommentsByPostPaginatedRules),
  makeExpressCallback(getCommentsByPostPaginatedController)
);

commentRouter.get(
  "/:_id",
  authenticateUserJWT(),
  makeValidator(getCommentRules),
  makeExpressCallback(getCommentController)
);

commentRouter.delete(
  "/:_id",
  authenticateUserJWT(),
  makeValidator(deleteCommentRules),
  makeExpressCallback(deleteCommentController)
);

commentRouter.put(
  "/:_id",
  authenticateUserJWT(),
  makeValidator(updateCommentRules),
  makeExpressCallback(updateCommentController)
);

commentRouter.post(
  "/",
  authenticateUserJWT(),
  makeValidator(createCommentRules),
  makeExpressCallback(createCommentController)
);

commentRouter.get("/", makeExpressCallback(getCommentsController));

export default commentRouter;
