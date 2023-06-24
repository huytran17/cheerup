import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import authenticateUserJWT from "../../config/middlewares/authenticate-user-jwt";

import {
  getCommentRules,
  hardDeleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  replyCommentRules,
  countCommentsByPostRules,
  getCommentsByParentRules,
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
  getCommentsByParentController,
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
  "/by-parent/:_id",
  authenticateUserJWT(),
  makeValidator(getCommentsByParentRules),
  makeExpressCallback(getCommentsByParentController)
);

commentRouter.get(
  "/by-post-paginated-public",
  makeValidator(getCommentsByPostPaginatedRules),
  makeExpressCallback(getCommentsByPostPaginatedController)
);

commentRouter.get(
  "/by-parent-public/:_id",
  makeValidator(getCommentsByParentRules),
  makeExpressCallback(getCommentsByParentController)
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
