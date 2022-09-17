import {
  getEmailVerificationByEmailAndVerificationCode,
  getEmailVerificationByEmail,
  createEmailVerification,
  getEmailVerification,
  deleteEmailVerification,
} from "../../../../use-cases/email-verification";
import { logger } from "../../../../config/logs/logger";

import makeGetEmailVerificationController from "./get-email-verification";
import makeDeleteEmailVerificationController from "./delete-email-verification";
import makeCreateEmailVerificationController from "./create-email-verification";
import makeGetEmailVerificationByEmailAndVerificationCodeController from "./get-email-verification-by-email-and-verification-code";
import makeGetEmailVerificationByEmailController from "./get-email-verification-by-email";

const getEmailVerificationByEmailAndVerificationCodeController =
  makeGetEmailVerificationByEmailAndVerificationCodeController({
    getEmailVerificationByEmailAndVerificationCode,
    logger,
  });

const getEmailVerificationByEmailController =
  makeGetEmailVerificationByEmailController({
    getEmailVerificationByEmail,
    logger,
  });

const createEmailVerificationController = makeCreateEmailVerificationController(
  {
    createEmailVerification,
    logger,
  }
);

const getEmailVerificationController = makeGetEmailVerificationController({
  getEmailVerification,
  logger,
});

const deleteEmailVerificationController = makeDeleteEmailVerificationController(
  {
    getEmailVerification,
    deleteEmailVerification,
    logger,
  }
);

export default Object.freeze({
  getEmailVerificationController,
  deleteEmailVerificationController,
  createEmailVerificationController,
  getEmailVerificationByEmailAndVerificationCodeController,
  getEmailVerificationByEmailController,
});

export {
  getEmailVerificationController,
  deleteEmailVerificationController,
  createEmailVerificationController,
  getEmailVerificationByEmailAndVerificationCodeController,
  getEmailVerificationByEmailController,
};
