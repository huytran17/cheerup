import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getUserRules,
  // updateUserRules,
  // deleteUserRules,
} from "../../data-access/controllers/user/user/validators";
import {
  getUserController,
  // updateUserController,
  // getUsersPaginatedController,
  // deleteUserController,
} from "../../data-access/controllers/user/user";

const userRouter = express.Router();

// userRouter.delete(
//   "/delete/:user_id",
//   makeValidator(deleteUserRules),
//   makeExpressCallback(deleteUserController)
// );

/**
 * @openapi
 *
 * /api/user/{user_id}:
 *  get:
 *     description: Get user by id
 *     parameters:
 *       - name: user_id
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
  "/:user_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);

// userRouter.put(
//   "/",
//   makeValidator(updateUserRules),
//   makeExpressCallback(updateUserController)
// ); // DONE

// userRouter.get("/", makeExpressCallback(getUsersPaginatedController)); // DONE

export default userRouter;
