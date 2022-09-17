import { logger } from "../../config/logs/logger";

import { EmailVerificationDb } from "../../data-access";

import makeGetEmailVerification from "./get-email-verification";
import makeGetEmailVerificationByEmail from "./get-email-verification-by-email";
import makeCreateEmailVerification from "./create-email-verification";
import makeGetEmailVerifications from "./get-email-verifications";
import makeDeleteEmailVerification from "./delete-email-verification";
import makeGetEmailVerificationByEmailAndVerificationCode from "./get-email-verification-by-email-and-verification-code";
import makeHardDeleteEmailVerification from "./hard-delete-email-verification";

const hardDeleteEmailVerification = makeHardDeleteEmailVerification({
  emailVerificationDb: EmailVerificationDb,
  logger,
});

const getEmailVerificationByEmailAndVerificationCode =
  makeGetEmailVerificationByEmailAndVerificationCode({
    emailVerificationDb: EmailVerificationDb,
    logger,
  });

const deleteEmailVerification = makeDeleteEmailVerification({
  emailVerificationDb: EmailVerificationDb,
  logger,
});

const getEmailVerification = makeGetEmailVerification({
  emailVerificationDb: EmailVerificationDb,
  logger,
});

const getEmailVerificationByEmail = makeGetEmailVerificationByEmail({
  emailVerificationDb: EmailVerificationDb,
  logger,
});

const createEmailVerification = makeCreateEmailVerification({
  emailVerificationDb: EmailVerificationDb,
});

const getEmailVerifications = makeGetEmailVerifications({
  emailVerificationDb: EmailVerificationDb,
  logger,
});

const emailVerificationServices = Object.freeze({
  getEmailVerification,
  getEmailVerificationByEmail,
  getEmailVerifications,
  createEmailVerification,
  deleteEmailVerification,
  getEmailVerificationByEmailAndVerificationCode,
  hardDeleteEmailVerification,
});

export default emailVerificationServices;

export {
  getEmailVerification,
  getEmailVerificationByEmail,
  getEmailVerifications,
  createEmailVerification,
  deleteEmailVerification,
  getEmailVerificationByEmailAndVerificationCode,
  hardDeleteEmailVerification,
};
