import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  updatePasswordController,
  updateUserController,
  uploadUserAvatarController,
} from "../../data-access/controllers/user/user";
import {
  updatePasswordRules,
  updateUserRules,
  uploadUserAvatarRules,
} from "../../data-access/controllers/user/user/validators";

const userRouter = Router();

userRouter.put(
  "/password",
  makeValidator(updatePasswordRules),
  makeExpressCallback(updatePasswordController)
);

userRouter.post(
  "/upload-avatar/:_id",
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

userRouter.put(
  "/",
  makeValidator(updateUserRules),
  makeExpressCallback(updateUserController)
);

export default userRouter;
