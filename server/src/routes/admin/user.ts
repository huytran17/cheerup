import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getUserRules,
  // updateUserRules,
  // deleteUserRules,
  // createUserRules,
} from "../../data-access/controllers/admin/user/validators";
import {
  getUserController,
  // updateUserController,
  // getUsersController,
  // deleteUserController,
  // createUserController,
} from "../../data-access/controllers/admin/user";

const userRouter = express.Router();

// userRouter.delete(
//   "/delete/:user_id",
//   makeValidator(deleteUserRules),
//   makeExpressCallback(deleteUserController)
// );

userRouter.get(
  "/:user_id",
  makeValidator(getUserRules),
  makeExpressCallback(getUserController)
);
// userRouter.post(
//   "/",
//   makeValidator(createUserRules),
//   makeExpressCallback(createUserController)
// );

// userRouter.put(
//   "/",
//   makeValidator(updateUserRules),
//   makeExpressCallback(updateUserController)
// ); // DONE

// userRouter.get("/", makeExpressCallback(getUsersController)); // DONE

export default userRouter;
