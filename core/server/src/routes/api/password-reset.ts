import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  createPasswordResetController,
  getPasswordResetByCodeController,
  resetPasswordController,
} from "../../data-access/controllers/user/password-reset";
import {
  createPasswordResetRules,
  getPasswordResetByCodeRules,
  resetPasswordRules,
} from "../../data-access/controllers/user/password-reset/validators";

const passwordResetRouter = Router();

passwordResetRouter.post(
  "/",
  makeValidator(createPasswordResetRules),
  makeExpressCallback(createPasswordResetController)
);

passwordResetRouter.post(
  "/by-code",
  makeValidator(getPasswordResetByCodeRules),
  makeExpressCallback(getPasswordResetByCodeController)
);

passwordResetRouter.put(
  "/reset-password",
  makeValidator(resetPasswordRules),
  makeExpressCallback(resetPasswordController)
);

export default passwordResetRouter;
