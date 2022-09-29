import {
  getEmailVerificationByEmailAndVerificationCode,
  getEmailVerificationByEmail,
  createEmailVerification,
  getEmailVerification,
  deleteEmailVerification,
} from "../../../../use-cases/email-verification";
import { getUser, getUserByEmail } from "../../../../use-cases/user";
import { logger } from "../../../../config/logs/logger";
import { generateOtpCode } from "../../../../config/otp";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";

import moment from "moment";
import makeGetEmailVerificationController from "./get-email-verification";
import makeDeleteEmailVerificationController from "./delete-email-verification";
import makeCreateEmailVerificationController from "./create-email-verification";
import makeGetEmailVerificationByEmailAndVerificationCodeController from "./get-email-verification-by-email-and-verification-code";
import makeGetEmailVerificationByEmailController from "./get-email-verification-by-email";
import makeSendEmailVerificationCodeController from "./send-email-verification-code";

const sendEmailVerificationCodeController =
  makeSendEmailVerificationCodeController({
    getUser,
    getEmailContent,
    renderEmailContent,
    sendEmail,
    generateOtpCode,
    createEmailVerification,
    logger,
    moment,
  });

const getEmailVerificationByEmailAndVerificationCodeController =
  makeGetEmailVerificationByEmailAndVerificationCodeController({
    getUserByEmail,
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
  sendEmailVerificationCodeController,
});

export {
  getEmailVerificationController,
  deleteEmailVerificationController,
  createEmailVerificationController,
  getEmailVerificationByEmailAndVerificationCodeController,
  getEmailVerificationByEmailController,
  sendEmailVerificationCodeController,
};
