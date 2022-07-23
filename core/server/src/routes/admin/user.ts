import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getUserRules,
  updateUserRules,
  deleteUserRules,
  createUserRules,
} from "../../data-access/controllers/admin/user/validators";
import {
  getUserController,
  updateUserController,
  getUsersController,
  deleteUserController,
  createUserController,
} from "../../data-access/controllers/admin/user";

const userRouter = express.Router();

userRouter.delete(
  "/delete/:_id",
  makeValidator(deleteUserRules),
  makeExpressCallback(deleteUserController)
);

/**
 * @openapi
 *
 * /admin/user/{_id}:
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
 *     - /admin/user
 */
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
