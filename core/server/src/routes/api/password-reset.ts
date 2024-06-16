import { Router } from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import {
  hardDeletePasswordResetRules,
  createPasswordResetRules,
  getPasswordResetByCodeRules,
  resetPasswordRules,
} from "../../data-access/controllers/user/password-reset/validators";
import {
  getPasswordResetByCodeController,
  hardDeletePasswordResetController,
  createPasswordResetController,
  resetPasswordController,
} from "../../data-access/controllers/user/password-reset";

const passwordResetRouter = Router();

passwordResetRouter.post(
  "/",
  makeValidator(createPasswordResetRules),
  makeExpressCallback(createPasswordResetController)
);

passwordResetRouter.delete(
  "/hard-delete/:id",
  makeValidator(hardDeletePasswordResetRules),
  makeExpressCallback(hardDeletePasswordResetController)
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
