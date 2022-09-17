import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getEmailVerificationRules,
  deleteEmailVerificationRules,
  createEmailVerificationRules,
  getEmailVerificationByEmailAndVerificationCodeRules,
  getEmailVerificationByEmailRules,
} from "../../data-access/controllers/user/email-verification/validators";
import {
  getEmailVerificationController,
  deleteEmailVerificationController,
  createEmailVerificationController,
  getEmailVerificationByEmailAndVerificationCodeController,
  getEmailVerificationByEmailController,
} from "../../data-access/controllers/user/email-verification";

const emailVerificationRouter = express.Router();

emailVerificationRouter.get(
  "/:verification_code/:email",
  makeValidator(getEmailVerificationByEmailAndVerificationCodeRules),
  makeExpressCallback(getEmailVerificationByEmailAndVerificationCodeController)
);

emailVerificationRouter.get(
  "/by-email/:email",
  makeValidator(getEmailVerificationByEmailRules),
  makeExpressCallback(getEmailVerificationByEmailController)
);

emailVerificationRouter.get(
  "/:_id",
  makeValidator(getEmailVerificationRules),
  makeExpressCallback(getEmailVerificationController)
); // DONE

emailVerificationRouter.delete(
  "/:_id",
  makeValidator(deleteEmailVerificationRules),
  makeExpressCallback(deleteEmailVerificationController)
); // DONE

emailVerificationRouter.post(
  "/",
  makeValidator(createEmailVerificationRules),
  makeExpressCallback(createEmailVerificationController)
); // DONE

export default emailVerificationRouter;
