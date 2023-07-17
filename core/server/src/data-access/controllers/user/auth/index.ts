import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeSignUpController from "./sign-up";
import makeGetMeController from "./get-me";
import makeVerifyAccessController from "./verify-access";
import makeSignInWithGoogleController from "./sign-in-with-google";
import makeEnable2FAConfirmationController from "./enable-2fa-confirmation";
import makeDisable2FAConfirmationController from "./disable-2fa-confirmation";
import makeEnable2FAController from "./enable-2fa";
import makeDisable2FAController from "./disable-2fa";
import makeVerify2FAController from "./verify-2fa";

import { getSubscriptionByEmail } from "../../../../use-cases/subscription";
import { hashPassword, verifyPassword } from "../../../../config/password";
import {
  getUserByEmail,
  getUser,
  createUser,
  updateUser,
} from "../../../../use-cases/user";
import {
  getTwoFactorAuthenticationByEmailAndCode,
  createTwoFactorAuthentication,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
} from "../../../../use-cases/two-factor-authentication";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../../config/accessTokenManager";
import { logger } from "../../../../config/logs/logger";
import moment from "moment";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { generateQRCode } from "../../../../config/qrcode";

const verify2FAController = makeVerify2FAController({
  getUserByEmail,
});

const disable2FAController = makeDisable2FAController({
  getUser,
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  moment,
});

const enable2FAController = makeEnable2FAController({
  getUser,
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  generateQRCode,
  moment,
});

const disable2FAConfirmationController = makeDisable2FAConfirmationController({
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getUser,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
  moment,
});

const enable2FAConfirmationController = makeEnable2FAConfirmationController({
  createTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmail,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getUser,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
  moment,
});

const signInWithGoogleController = makeSignInWithGoogleController({
  getUserByEmail,
  generateAccessToken,
});

const verifyAccessController = makeVerifyAccessController({
  verifyAccessToken,
  getUserByEmail,
});

const getMeController = makeGetMeController({
  getUser,
  getSubscriptionByEmail,
  updateUser,
});

const signInController = makeSignInController({
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
});

const signOutController = makeSignOutController({
  getUserByEmail,
});

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
  verifyAccessController,
  signInWithGoogleController,
  enable2FAConfirmationController,
  disable2FAConfirmationController,
  enable2FAController,
  disable2FAController,
  verify2FAController,
});

export {
  signInController,
  signOutController,
  signUpController,
  getMeController,
  verifyAccessController,
  signInWithGoogleController,
  enable2FAConfirmationController,
  disable2FAConfirmationController,
  enable2FAController,
  disable2FAController,
  verify2FAController,
};
