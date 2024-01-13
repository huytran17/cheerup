import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";
import makeGetMeController from "./get-me";

import { verifyPassword } from "../../../../config/password";
import { getAdminByEmail } from "../../../../use-cases/admin";
import { generateAccessToken } from "../../../../config/accessTokenManager";

const getMeController = makeGetMeController();

const signInController = makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
});

const signOutController = makeSignOutController();

export default Object.freeze({
  signInController,
  signOutController,
  getMeController,
});

export { signInController, signOutController, getMeController };
