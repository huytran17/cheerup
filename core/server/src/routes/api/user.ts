import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload-middleware";

import {
  getUserRules,
  updateUserRules,
  deleteUserRules,
  uploadUserAvatarRules,
  updatePasswordRules,
} from "../../data-access/controllers/user/user/validators";
import {
  getUserController,
  updateUserController,
  deleteUserController,
  uploadUserAvatarController,
  updatePasswordController,
} from "../../data-access/controllers/user/user";

const userRouter = express.Router();

userRouter.put(
  "/password",
  makeValidator(updatePasswordRules),
  makeExpressCallback(updatePasswordController)
);

userRouter.post(
  "/upload-avatar/:_id",
  upload.single("file"),
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

userRouter.delete(
  "/delete/:_id",
  makeValidator(deleteUserRules),
  makeExpressCallback(deleteUserController)
);

/**
 * @openapi
 *
 * /api/user/{_id}:
 *  get:
 *     description: Get user by id
 *     parameters:
 *       - name: _id
 *         description: the user's id
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: the user data
 *     tags:
 *     - /api/user
 */
userRouter.get(
  "/:_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

userRouter.put(
  "/",
  makeValidator(updateUserRules),
  makeExpressCallback(updateUserController)
); // DONE

export default userRouter;
