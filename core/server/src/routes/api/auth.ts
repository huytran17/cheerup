import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import authenticateUserGoogle from "../../config/middlewares/authenticate-user-google";
import authenticateUserJWT from "../../config/middlewares/authenticate-user-jwt";
import makeValidator from "../../config/middlewares/validator";
import {
  disable2FAConfirmationController,
  disable2FAController,
  enable2FAConfirmationController,
  enable2FAController,
  getMeController,
  signInController,
  signInWithGoogleController,
  signOutController,
  signUpController,
  verify2FAController,
} from "../../data-access/controllers/user/auth";
import {
  disable2FARules,
  enable2FARules,
  signInRules,
  signUpRules,
  verify2FARules,
} from "../../data-access/controllers/user/auth/validators";

const authRouter = Router();

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
  makeExpressCallback(signInWithGoogleController)
);

authRouter.get(
  "/enable-2fa-confirmation",
  authenticateUserJWT(),
  makeExpressCallback(enable2FAConfirmationController)
);

authRouter.get(
  "/disable-2fa-confirmation",
  authenticateUserJWT(),
  makeExpressCallback(disable2FAConfirmationController)
);

authRouter.post(
  "/enable-2fa",
  authenticateUserJWT(),
  makeValidator(enable2FARules),
  makeExpressCallback(enable2FAController)
);

authRouter.post(
  "/disable-2fa",
  authenticateUserJWT(),
  makeValidator(disable2FARules),
  makeExpressCallback(disable2FAController)
);

authRouter.post(
  "/verify-2fa",
  makeValidator(verify2FARules),
  makeExpressCallback(verify2FAController)
);

export default authRouter;
