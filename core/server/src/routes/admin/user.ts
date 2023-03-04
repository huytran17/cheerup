import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization-middleware";
import { AuthorizationRole } from "../../constants/authorization-role";
import { upload } from "../../config/middlewares/file-upload-middleware";

import {
  getUserRules,
  updateUserRules,
  deleteUserRules,
  createUserRules,
  unblockUserCommentRules,
  blockUserCommentRules,
  uploadUserAvatarRules,
  updateUserPasswordRules,
  restoreUserRules,
  hardDeleteUserRules,
} from "../../data-access/controllers/admin/user/validators";
import {
  getUserController,
  updateUserController,
  getUsersController,
  deleteUserController,
  createUserController,
  blockUserCommentController,
  unblockUserCommentController,
  uploadUserAvatarController,
  updateUserPasswordController,
  restoreUserController,
  hardDeleteUserController,
  getUserAnalysticsController,
} from "../../data-access/controllers/admin/user";

const userRouter = express.Router();

userRouter.get("/analystics", makeExpressCallback(getUserAnalysticsController));

userRouter.delete(
  "/hard-delete/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(hardDeleteUserRules),
  makeExpressCallback(hardDeleteUserController)
);

userRouter.put(
  "/restore/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(restoreUserRules),
  makeExpressCallback(restoreUserController)
);

userRouter.put(
  "/password",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(updateUserPasswordRules),
  makeExpressCallback(updateUserPasswordController)
);

userRouter.post(
  "/upload-avatar/:_id",
  upload.single("file"),
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

userRouter.put(
  "/block-comment/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(unblockUserCommentRules),
  makeExpressCallback(blockUserCommentController)
);

userRouter.put(
  "/un-block-comment/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(blockUserCommentRules),
  makeExpressCallback(unblockUserCommentController)
);

userRouter.delete(
  "/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(deleteUserRules),
  makeExpressCallback(deleteUserController)
);

userRouter.get(
  "/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

userRouter.post(
  "/",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(createUserRules),
  makeExpressCallback(createUserController)
);

userRouter.put(
  "/",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(updateUserRules),
  makeExpressCallback(updateUserController)
);

userRouter.get(
  "/",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeExpressCallback(getUsersController)
);

export default userRouter;
