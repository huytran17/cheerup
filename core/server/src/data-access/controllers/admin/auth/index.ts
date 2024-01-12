import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeGetMeController from "./get-me";

import { verifyPassword } from "../../../../config/password";
import { getAdminByEmail, getAdmin } from "../../../../use-cases/admin";
import { generateAccessToken } from "../../../../config/accessTokenManager";

const getMeController = makeGetMeController({
  getAdmin,
});

const signInController = makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
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
