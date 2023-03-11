import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import { AuthorizationRole } from "../../constants/authorization-role";

import { hardDeleteCommentRules } from "../../data-access/controllers/admin/comment/validators";
import {
  hardDeleteCommentController,
  getCommentsController,
} from "../../data-access/controllers/admin/comment";

const commentRouter = express.Router();

commentRouter.delete(
  "/hard-delete/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(hardDeleteCommentRules),
  makeExpressCallback(hardDeleteCommentController)
);

commentRouter.get(
  "/",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeExpressCallback(getCommentsController)
);

export default commentRouter;
