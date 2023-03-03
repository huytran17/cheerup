import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeGetMeController from "./get-me";
import makeVerifyAccessController from "./verify-access";

import { verifyPassword } from "../../../../config/password";
import { getAdminByEmail, getAdmin } from "../../../../use-cases/admin";
import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../../config/accessTokenManager";
import { logger } from "../../../../config/logs/logger";

const verifyAccessController = makeVerifyAccessController({
  verifyAccessToken,
});

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
  verifyAccessController,
});

export {
  signInController,
  signOutController,
  getMeController,
  verifyAccessController,
};
