import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
} from "../../data-access/controllers/user/comment/validators";
import {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
} from "../../data-access/controllers/user/comment";

const categoryRouter = express.Router();

categoryRouter.get(
  "/:comment_id",
  makeValidator(getCommentRules),
  makeExpressCallback(getCommentController)
); // DONE

categoryRouter.delete(
  "/:comment_id",
  makeValidator(deleteCommentRules),
  makeExpressCallback(deleteCommentController)
); // DONE

categoryRouter.put(
  "/:comment_id",
  makeValidator(updateCommentRules),
  makeExpressCallback(updateCommentController)
); // DONE

categoryRouter.post(
  "/",
  makeValidator(createCommentRules),
  makeExpressCallback(createCommentController)
); // DONE

categoryRouter.get("/", makeExpressCallback(getCommentsController)); // DONE

export default categoryRouter;
