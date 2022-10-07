import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";

import {
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostRules,
  likeCommentRules,
  dislikeCommentRules,
  replyCommentRules,
} from "../../data-access/controllers/user/comment/validators";
import {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostController,
  likeCommentController,
  dislikeCommentController,
  replyCommentController,
} from "../../data-access/controllers/user/comment";

const commentRouter = express.Router();

commentRouter.post(
  "/reply",
  authenticateUserJWT(),
  makeValidator(replyCommentRules),
  makeExpressCallback(replyCommentController)
); // DONE

commentRouter.put(
  "/like/:_id",
  authenticateUserJWT(),
  makeValidator(likeCommentRules),
  makeExpressCallback(likeCommentController)
); // DONE

commentRouter.put(
  "/dislike/:_id",
  authenticateUserJWT(),
  makeValidator(dislikeCommentRules),
  makeExpressCallback(dislikeCommentController)
); // DONE

commentRouter.get(
  "/by-post/:post_id",
  makeValidator(getCommentsByPostRules),
  makeExpressCallback(getCommentsByPostController)
); // DONE

commentRouter.get(
  "/:_id",
  authenticateUserJWT(),
  makeValidator(getCommentRules),
  makeExpressCallback(getCommentController)
); // DONE

commentRouter.delete(
  "/:_id",
  authenticateUserJWT(),
  makeValidator(deleteCommentRules),
  makeExpressCallback(deleteCommentController)
); // DONE

commentRouter.put(
  "/:_id",
  authenticateUserJWT(),
  makeValidator(updateCommentRules),
  makeExpressCallback(updateCommentController)
); // DONE

commentRouter.post(
  "/",
  authenticateUserJWT(),
  makeValidator(createCommentRules),
  makeExpressCallback(createCommentController)
); // DONE

commentRouter.get("/", makeExpressCallback(getCommentsController)); // DONE

export default commentRouter;
