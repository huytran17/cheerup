import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeSignUpController from "./sign-up";

import { signIn, signUp } from "../../../use-cases/auth";
import { hashPassword, verifyPassword } from "../../../config/password";
import { getUserByEmail } from "../../../use-cases/user";
import { generateAccessToken } from "../../../config/accessTokenManager";
import { logger } from "../../../config/storage/logger";

const signInController = makeSignInController({
  signIn,
  hashPassword,
  getUserByEmail,
  generateAccessToken,
  verifyPassword,
  logger,
});

const signOutController = makeSignOutController({
  getUserByEmail,
});

const signUpController = makeSignUpController({
  signUp,
  getUserByEmail,
  hashPassword,
  logger,
});

export default Object.freeze({
  signInController,
  signOutController,
  signUpController,
});

export { signInController, signOutController, signUpController };
