import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";
import makeValidator from "../../config/middlewares/validator-middleware";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import {
  signOutRules,
  signInRules,
} from "../../data-access/controllers/admin/auth/validators";
import {
  signOutController,
  signInController,
} from "../../data-access/controllers/admin/auth";

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);

authRouter.post(
  "/sign-out",
  authenticateUserJWT(),
  makeValidator(signOutRules),
  makeExpressCallback(signOutController)
);

export default authRouter;
