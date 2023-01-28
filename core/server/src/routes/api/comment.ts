import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

import {
  getCommentRules,
  hardDeleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  replyCommentRules,
  countCommentsByPostRules,
} from "../../data-access/controllers/user/comment/validators";
import {
  getCommentController,
  hardDeleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostPaginatedController,
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

commentRouter.get(
  "/by-post-paginated",
  authenticateUserJWT(),
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
  "/hard-delete/:_id",
  authenticateUserJWT(),
  makeValidator(hardDeleteCommentRules),
  makeExpressCallback(hardDeleteCommentController)
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
