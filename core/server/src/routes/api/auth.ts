import authenticateUserJWT from "../../config/middlewares/authenticate-user-jwt";
import authenticateUserFacebook from "../../config/middlewares/authenticate-user-facebook";
import authenticateUserGoogle from "../../config/middlewares/authenticate-user-google";
import makeValidator from "../../config/middlewares/validator";
import express from "express";
import makeExpressCallback from "../../config/express-callback";
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
