import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import makeValidator from "../../config/middlewares/validator";
import { AuthorizationRole } from "../../constants/authorization-role";
import {
  getCommentsController,
  getCommentsPaginatedController,
  hardDeleteCommentController,
} from "../../data-access/controllers/admin/comment";
import {
  getCommentsPaginatedRules,
  hardDeleteCommentRules,
} from "../../data-access/controllers/admin/comment/validators";

const commentRouter = Router();

commentRouter.delete(
  "/all-paginated",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(getCommentsPaginatedRules),
  makeExpressCallback(getCommentsPaginatedController)
);

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
