import moment from "moment";

import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../../config/accessTokenManager";
import { hashPassword } from "../../../../config/password";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { logger } from "../../../../config/logs/logger";
import {
  createPasswordReset,
  getPasswordReset,
  getPasswordResetByCode,
  getPasswordResetByEmail,
  hardDeletePasswordReset,
} from "../../../../use-cases/password-reset";
import { getUserByEmail, updateUser } from "../../../../use-cases/user";
import makeCreatePasswordResetController from "./create-password-reset";
import makeGetPasswordResetByCodeController from "./get-password-reset-by-code";
import makeHardDeletePasswordResetController from "./hard-delete-password-reset";
import makeResetPasswordController from "./reset-password";

const resetPasswordController = makeResetPasswordController({
  getPasswordReset,
  hardDeletePasswordReset,
  getUserByEmail,
  updateUser,
  verifyAccessToken,
  hashPassword,
});

const createPasswordResetController = makeCreatePasswordResetController({
  getUserByEmail,
  createPasswordReset,
  getPasswordResetByCode,
  getPasswordResetByEmail,
  hardDeletePasswordReset,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  moment,
  logger,
});

const hardDeletePasswordResetController = makeHardDeletePasswordResetController(
  {
    getPasswordReset,
    hardDeletePasswordReset,
  }
);

const getPasswordResetByCodeController = makeGetPasswordResetByCodeController({
  getPasswordResetByCode,
  generateAccessToken,
  moment,
});

export default Object.freeze({
  getPasswordResetByCodeController,
  hardDeletePasswordResetController,
  createPasswordResetController,
  resetPasswordController,
});

export {
  getPasswordResetByCodeController,
  hardDeletePasswordResetController,
  createPasswordResetController,
  resetPasswordController,
};
