import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeSignUpController from "./sign-up";
import makeGetMeController from "./get-me";

import { getSubscriptionByEmail } from "../../../../use-cases/subscription";
import { hashPassword, verifyPassword } from "../../../../config/password";
import {
  getUserByEmail,
  getUser,
  createUser,
  updateUser,
} from "../../../../use-cases/user";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { logger } from "../../../../config/logs/logger";

const getMeController = makeGetMeController({
  getUser,
  getSubscriptionByEmail,
  updateUser,
});

const signInController = makeSignInController({
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
  logger,
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
});

export {
  signInController,
  signOutController,
  signUpController,
  getMeController,
};
