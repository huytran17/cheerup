import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
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
  makeValidator(hardDeleteUserRules),
  makeExpressCallback(hardDeleteUserController)
);

userRouter.put(
  "/restore/:_id",
  makeValidator(restoreUserRules),
  makeExpressCallback(restoreUserController)
);

userRouter.put(
  "/password",
  makeValidator(updateUserPasswordRules),
  makeExpressCallback(updateUserPasswordController)
);

userRouter.post(
  "/upload-avatar/:_id",
  upload.single("file"),
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

userRouter.put(
  "/block-comment/:_id",
  makeValidator(unblockUserCommentRules),
  makeExpressCallback(blockUserCommentController)
);

userRouter.put(
  "/un-block-comment/:_id",
  makeValidator(blockUserCommentRules),
  makeExpressCallback(unblockUserCommentController)
);

userRouter.delete(
  "/:_id",
  makeValidator(deleteUserRules),
  makeExpressCallback(deleteUserController)
);

userRouter.get(
  "/:_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

userRouter.post(
  "/",
  makeValidator(createUserRules),
  makeExpressCallback(createUserController)
);

userRouter.put(
  "/",
  makeValidator(updateUserRules),
  makeExpressCallback(updateUserController)
);

userRouter.get("/", makeExpressCallback(getUsersController));

export default userRouter;
