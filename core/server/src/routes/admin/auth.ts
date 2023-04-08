import authenticateAdminJWT from "../../config/middlewares/authenticate-admin-jwt";
import makeValidator from "../../config/middlewares/validator";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import {
  signInRules,
  verifyAccessRules,
} from "../../data-access/controllers/admin/auth/validators";
import {
  signOutController,
  signInController,
  getMeController,
  verifyAccessController,
} from "../../data-access/controllers/admin/auth";

const authRouter = express.Router();

authRouter.post(
  "/verify-access",
  makeValidator(verifyAccessRules),
  makeExpressCallback(verifyAccessController)
);

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
