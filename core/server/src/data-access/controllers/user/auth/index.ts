import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeSignUpController from "./sign-up";
import makeGetMeController from "./get-me";
import makeVerifyAccessController from "./verify-access";
import makeSignInWithGoogleController from "./sign-in-with-google";

import { getSubscriptionByEmail } from "../../../../use-cases/subscription";
import { hashPassword, verifyPassword } from "../../../../config/password";
import {
  getUserByEmail,
  getUser,
  createUser,
  updateUser,
} from "../../../../use-cases/user";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../../config/accessTokenManager";
import { logger } from "../../../../config/logs/logger";

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
});

export {
  signInController,
  signOutController,
  signUpController,
  getMeController,
  verifyAccessController,
  signInWithGoogleController,
};
