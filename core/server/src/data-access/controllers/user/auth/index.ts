import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeSignUpController from "./sign-up";
import makeGetMeController from "./get-me";
import makeVerifyAccessController from "./verify-access";
import makeSignInWithGoogleController from "./sign-in-with-google";
import makeEnable2FAConfirmationController from "./enable-2fa-confirmation";
import makeDisable2FAConfirmationController from "./disable-2fa-confirmation";
import makeEnable2FAController from "./enable-2fa";

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

const enable2FAController = makeEnable2FAController({
  getUser,
  updateUser,
  getTwoFactorAuthenticationByEmailAndCode,
  hardDeleteTwoFactorAuthentication,
  moment,
});

const disable2FAConfirmationController = makeDisable2FAConfirmationController({
  createTwoFactorAuthentication,
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
};
