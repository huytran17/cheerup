import authenticateUserJWT from "../../config/middlewares/authenticateUserJWT";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeSignUpController from "../../data-access/controllers/auth/sign-up";
import makeSignInController from "../../data-access/controllers/auth/sign-in";
import makeSignOutController from "../../data-access/controllers/auth/sign-out";
import express from "express";

const authRouter = express.Router();

authRouter.post("/sign-in", makeValidator, makeSignInController);
authRouter.post("/sign-up", makeValidator, makeSignUpController);
authRouter.post(
  "/sign-out",
  authenticateUserJWT(),
  makeValidator,
  makeSignOutController
);

export default authRouter;
