import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getUserRules,
  updateUserRules,
  deleteUserRules,
  createUserRules,
  unblockUserCommentRules,
  blockUserCommentRules
} from "../../data-access/controllers/admin/user/validators";
import {
  getUserController,
  updateUserController,
  getUsersController,
  deleteUserController,
  createUserController,
  blockUserCommentController,
  unblockUserCommentController
} from "../../data-access/controllers/admin/user";

const userRouter = express.Router();

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
  "/delete/:_id",
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
); // DONE

userRouter.get("/", makeExpressCallback(getUsersController)); // DONE

export default userRouter;
