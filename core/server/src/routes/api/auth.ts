import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";
import authenticateUserFacebook from "../../config/middlewares/authenticateUserFacebook";
import authenticateUserGoogle from "../../config/middlewares/authenticateUserGoogle";
import makeValidator from "../../config/middlewares/validator-middleware";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
import {
  signOutRules,
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
  makeValidator(signOutRules),
  makeExpressCallback(signOutController)
);

authRouter.get("/facebook", authenticateUserFacebook());

authRouter.get(
  "/facebook/callback",
  authenticateUserFacebook(),
  function (req, res) {
    res.redirect("/");
  }
);

authRouter.get("/google", authenticateUserGoogle());

authRouter.get(
  "/google/callback",
  authenticateUserGoogle(),
  function (req, res) {
    res.redirect("/");
  }
);

export default authRouter;
