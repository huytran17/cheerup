import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { hardDeleteCommentRules } from "../../data-access/controllers/admin/comment/validators";
import {
  hardDeleteCommentController,
  getCommentsController,
} from "../../data-access/controllers/admin/comment";

const commentRouter = express.Router();

commentRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteCommentRules),
  makeExpressCallback(hardDeleteCommentController)
);

commentRouter.get("/", makeExpressCallback(getCommentsController));

export default commentRouter;
