import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";

import {
  hardDeletePasswordResetRules,
  createPasswordResetRules,
  getPasswordResetByEmailAndCodeRules,
} from "../../data-access/controllers/user/password-reset/validators";
import {
  getPasswordResetByEmailAndCodeController,
  hardDeletePasswordResetController,
  createPasswordResetController,
} from "../../data-access/controllers/user/password-reset";

const postRouter = express.Router();

postRouter.post(
  "/",
  makeValidator(createPasswordResetRules),
  makeExpressCallback(createPasswordResetController)
);

postRouter.delete(
  "/:id",
  makeValidator(hardDeletePasswordResetRules),
  makeExpressCallback(hardDeletePasswordResetController)
);

postRouter.get(
  "/by-email-and-code",
  makeValidator(getPasswordResetByEmailAndCodeRules),
  makeExpressCallback(getPasswordResetByEmailAndCodeController)
);

export default postRouter;
