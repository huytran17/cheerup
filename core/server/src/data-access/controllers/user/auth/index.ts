import moment from "moment";
import { generateAccessToken } from "../../../../config/access-token-manager";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/email-manager";
import { logger } from "../../../../config/logs/logger";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { generateQRCode } from "../../../../config/qrcode";
import { randomString } from "../../../../config/randomstring";
import { tfa } from "../../../../config/tfa";
import { getSubscriptionByEmail } from "../../../../use-cases/subscription";
import {
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
} from "../../../../use-cases/two-factor-authentication";
import {
  createUser,
  getUserByEmail,
  getUserTfaSecretByEmail,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
  updateUser,
} from "../../../../use-cases/user";
import makeDisable2FAController from "./disable-2fa";
import makeDisable2FAConfirmationController from "./disable-2fa-confirmation";
import makeEnable2FAController from "./enable-2fa";
import makeEnable2FAConfirmationController from "./enable-2fa-confirmation";
import makeGetMeController from "./get-me";
import makeSignInController from "./sign-in";
import makeSignInWithGoogleController from "./sign-in-with-google";
import makeSignOutController from "./sign-out";
import makeSignUpController from "./sign-up";
import makeVerify2FAController from "./verify-2fa";

const verify2FAController = makeVerify2FAController({
  getUserByEmail,
  getUserTfaSecretByEmail,
  generateAccessToken,
  tfa,
});

const disable2FAController = makeDisable2FAController({
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  moment,
});

const enable2FAController = makeEnable2FAController({
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  generateQRCode,
  tfa,
  moment,
});

const disable2FAConfirmationController = makeDisable2FAConfirmationController({
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  randomString,
  logger,
  moment,
});

const enable2FAConfirmationController = makeEnable2FAConfirmationController({
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  randomString,
  logger,
  moment,
});

const signInWithGoogleController = makeSignInWithGoogleController({
  generateAccessToken,
});

const getMeController = makeGetMeController({
  getSubscriptionByEmail,
  updateUser,
});

const signInController = makeSignInController({
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
});

const signOutController = makeSignOutController();

const signUpController = makeSignUpController({
  createUser,
  getUserByEmail,
  hashPassword,
  logger,
});

export default Object.freeze({
  signInController,
  signOutController,
  signUpController,
  getMeController,
  signInWithGoogleController,
  enable2FAConfirmationController,
  disable2FAConfirmationController,
  enable2FAController,
  disable2FAController,
  verify2FAController,
});

export {
  disable2FAConfirmationController,
  disable2FAController,
  enable2FAConfirmationController,
  enable2FAController,
  getMeController,
  signInController,
  signInWithGoogleController,
  signOutController,
  signUpController,
  verify2FAController,
};
