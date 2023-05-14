import authenticateUserJWT from "../../config/middlewares/authenticate-user-jwt";
import authenticateUserGoogle from "../../config/middlewares/authenticate-user-google";
import makeValidator from "../../config/middlewares/validator";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import makeExpressViewCallback from "../../config/express-view-callback";
import {
  signInRules,
  signUpRules,
  verifyAccessRules,
} from "../../data-access/controllers/user/auth/validators";
import {
  signOutController,
  signInController,
  signUpController,
  getMeController,
  verifyAccessController,
  signInWithGoogleController,
} from "../../data-access/controllers/user/auth";

const authRouter = express.Router();

authRouter.post(
  "/verify-access",
  makeValidator(verifyAccessRules),
  makeExpressCallback(verifyAccessController)
);

authRouter.get(
  "/me",
  authenticateUserJWT(),
  makeExpressCallback(getMeController)
);

authRouter.post(
  "/sign-in",
  makeValidator(signInRules),
  makeExpressCallback(signInController)
);
authRouter.post(
  "/sign-up",
  makeValidator(signUpRules),
  makeExpressCallback(signUpController)
);
authRouter.post(
  "/sign-out",
  authenticateUserJWT(),
  makeExpressCallback(signOutController)
);

authRouter.get("/google", authenticateUserGoogle());

authRouter.get(
  "/google/callback",
  authenticateUserGoogle(),
  makeExpressViewCallback(signInWithGoogleController)
);

export default authRouter;
