import authenticateUserJWT from "../../config/middlewares/authenticate-user-jwt";
import authenticateUserGoogle from "../../config/middlewares/authenticate-user-google";
import makeValidator from "../../config/middlewares/validator";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import makeExpressViewCallback from "../../config/express-view-callback";
import {
  signInRules,
  signUpRules,
  enable2FARules,
  disable2FARules,
  verify2FARules,
} from "../../data-access/controllers/user/auth/validators";
import {
  signOutController,
  signInController,
  signUpController,
  getMeController,
  signInWithGoogleController,
  enable2FAConfirmationController,
  disable2FAConfirmationController,
  enable2FAController,
  disable2FAController,
  verify2FAController,
} from "../../data-access/controllers/user/auth";

const authRouter = express.Router();

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

authRouter.get(
  "/enable-2fa-confirmation",
  authenticateUserJWT(),
  makeExpressViewCallback(enable2FAConfirmationController)
);

authRouter.get(
  "/disable-2fa-confirmation",
  authenticateUserJWT(),
  makeExpressViewCallback(disable2FAConfirmationController)
);

authRouter.post(
  "/enable-2fa",
  authenticateUserJWT(),
  makeValidator(enable2FARules),
  makeExpressViewCallback(enable2FAController)
);

authRouter.post(
  "/disable-2fa",
  authenticateUserJWT(),
  makeValidator(disable2FARules),
  makeExpressViewCallback(disable2FAController)
);

authRouter.post(
  "/verify-2fa",
  makeValidator(verify2FARules),
  makeExpressViewCallback(verify2FAController)
);

export default authRouter;
