import makeGetMeController from "./get-me";
import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";

import { generateAccessToken } from "../../../../config/accessTokenManager";
import { verifyPassword } from "../../../../config/password";
import {
  getAdminByEmail,
  increaseLoginFailedTimes,
} from "../../../../use-cases/admin";

const getMeController = makeGetMeController();

const signInController = makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
  increaseLoginFailedTimes,
});

const signOutController = makeSignOutController();

export default Object.freeze({
  signInController,
  signOutController,
  getMeController,
});

export { getMeController, signInController, signOutController };
