import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";

import { signUp } from "../../../../use-cases/auth";
import { hashPassword, verifyPassword } from "../../../../config/password";
import { getAdminByEmail } from "../../../../use-cases/admin";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { logger } from "../../../../config/storage/logger";

const signInController = makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
  logger,
});

const signOutController = makeSignOutController({
  getAdminByEmail,
});

export default Object.freeze({
  signInController,
  signOutController,
});

export { signInController, signOutController };
