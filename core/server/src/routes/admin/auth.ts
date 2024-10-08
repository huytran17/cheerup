import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import authenticateAdminJWT from "../../config/middlewares/authenticate-admin-jwt";
import makeValidator from "../../config/middlewares/validator";
import {
  getMeController,
  signInController,
  signOutController,
} from "../../data-access/controllers/admin/auth";
import { signInRules } from "../../data-access/controllers/admin/auth/validators";

const authRouter = Router();

authRouter.get(
  "/me",
  authenticateAdminJWT(),
  makeExpressCallback(getMeController)
);

authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);

authRouter.post(
  "/sign-out",
  authenticateAdminJWT(),
  makeExpressCallback(signOutController)
);

export default authRouter;
