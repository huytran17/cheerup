import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeAuthorization from "../../config/middlewares/authorization";
import makeValidator from "../../config/middlewares/validator";
import { AuthorizationRole } from "../../constants/authorization-role";
import {
  blockUserCommentController,
  createUserController,
  deleteUserController,
  getUserAnalysticsController,
  getUserController,
  getUsersController,
  getUsersPaginatedController,
  hardDeleteUserController,
  resetUserLoginFailedTimesController,
  restoreUserController,
  unblockUserCommentController,
  updateUserController,
  updateUserPasswordController,
  uploadUserAvatarController,
} from "../../data-access/controllers/admin/user";
import {
  blockUserCommentRules,
  createUserRules,
  deleteUserRules,
  getUserRules,
  getUsersPaginatedRules,
  hardDeleteUserRules,
  resetUserLoginFailedTimesRules,
  restoreUserRules,
  unblockUserCommentRules,
  updateUserPasswordRules,
  updateUserRules,
  uploadUserAvatarRules,
} from "../../data-access/controllers/admin/user/validators";

const userRouter = Router();

userRouter.get(
  "/all-paginated",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(getUsersPaginatedRules),
  makeExpressCallback(getUsersPaginatedController)
);

userRouter.put(
  "/reset-user-login-failed-times/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(resetUserLoginFailedTimesRules),
  makeExpressCallback(resetUserLoginFailedTimesController)
);

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
