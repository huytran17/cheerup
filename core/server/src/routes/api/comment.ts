import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostRules,
} from "../../data-access/controllers/user/comment/validators";
import {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostController,
} from "../../data-access/controllers/user/comment";

const commentRouter = express.Router();

commentRouter.get(
  "/by-post/:post_id",
  makeValidator(getCommentsByPostRules),
  makeExpressCallback(getCommentsByPostController)
); // DONE

commentRouter.get(
  "/:_id",
  makeValidator(getCommentRules),
  makeExpressCallback(getCommentController)
); // DONE

commentRouter.delete(
  "/:_id",
  makeValidator(deleteCommentRules),
  makeExpressCallback(deleteCommentController)
); // DONE

commentRouter.put(
  "/:_id",
  makeValidator(updateCommentRules),
  makeExpressCallback(updateCommentController)
); // DONE

commentRouter.post(
  "/",
  makeValidator(createCommentRules),
  makeExpressCallback(createCommentController)
); // DONE

commentRouter.get("/", makeExpressCallback(getCommentsController)); // DONE

export default commentRouter;
