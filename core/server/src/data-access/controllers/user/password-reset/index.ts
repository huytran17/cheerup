import moment from "moment";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../../config/access-token-manager";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/email-manager";
import { logger } from "../../../../config/logs/logger";
import { hashPassword } from "../../../../config/password";
import { randomString } from "../../../../config/randomstring";
import {
  createPasswordReset,
  getPasswordReset,
  getPasswordResetByCode,
  getPasswordResetByEmail,
  hardDeletePasswordReset,
} from "../../../../use-cases/password-reset";
import {
  getUserByEmail,
  resetLoginFailedTimes,
  updateUser,
} from "../../../../use-cases/user";
import makeCreatePasswordResetController from "./create-password-reset";
import makeGetPasswordResetByCodeController from "./get-password-reset-by-code";
import makeResetPasswordController from "./reset-password";

const resetPasswordController = makeResetPasswordController({
  getPasswordReset,
  hardDeletePasswordReset,
  getUserByEmail,
  updateUser,
  verifyAccessToken,
  hashPassword,
  resetLoginFailedTimes,
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
  randomString,
  moment,
  logger,
});

const getPasswordResetByCodeController = makeGetPasswordResetByCodeController({
  getPasswordResetByCode,
  generateAccessToken,
  moment,
});

export default Object.freeze({
  getPasswordResetByCodeController,
  createPasswordResetController,
  resetPasswordController,
});

export {
  createPasswordResetController,
  getPasswordResetByCodeController,
  resetPasswordController,
};
