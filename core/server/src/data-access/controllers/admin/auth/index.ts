import { generateAccessToken } from "../../../../config/access-token-manager";
import { verifyPassword } from "../../../../config/password";
import {
  getAdminByEmail,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
} from "../../../../use-cases/admin";
import makeGetMeController from "./get-me";
import makeSignInController from "./sign-in";
import makeSignOutController from "./sign-out";

const getMeController = makeGetMeController();

const signInController = makeSignInController({
  getAdminByEmail,
  generateAccessToken,
  verifyPassword,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
});

const signOutController = makeSignOutController();

export default Object.freeze({
  signInController,
  signOutController,
  getMeController,
});

export { getMeController, signInController, signOutController };
