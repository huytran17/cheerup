import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeGetMeController from "./get-me";

import { verifyPassword } from "../../../../config/password";
import { getAdminByEmail, getAdmin } from "../../../../use-cases/admin";
import { generateAccessToken } from "../../../../config/accessTokenManager";
import { logger } from "../../../../config/storage/logger";

const getMeController = makeGetMeController({
  getAdmin,
});

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
  getMeController,
});

export { signInController, signOutController, getMeController };
