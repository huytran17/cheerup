import authenticateAdminJWT from "../../config/middlewares/authenticateAdminJWT";
import makeValidator from "../../config/middlewares/validator-middleware";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import {
  signOutRules,
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
  makeValidator(signOutRules),
  makeExpressCallback(signOutController)
);

export default authRouter;
