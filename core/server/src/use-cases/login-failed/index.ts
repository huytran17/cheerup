import { LoginFailedDb } from "../../data-access";
import makeCreateLoginFailed from "./create-login-failed";
import makeGetLoginFailedByAgent from "./get-login-failed-by-agent";
import makeHardDeleteLoginFailed from "./hard-delete-login-failed";
import makeUpdateLoginFailed from "./update-login-failed";

const createLoginFailed = makeCreateLoginFailed({
  loginFailedDb: LoginFailedDb,
});

const getLoginFailedByAgent = makeGetLoginFailedByAgent({
  loginFailedDb: LoginFailedDb,
});

const hardDeleteLoginFailed = makeHardDeleteLoginFailed({
  loginFailedDb: LoginFailedDb,
});

const updateLoginFailed = makeUpdateLoginFailed({
  loginFailedDb: LoginFailedDb,
});

const loginFailedServices = Object.freeze({
  createLoginFailed,
  getLoginFailedByAgent,
  hardDeleteLoginFailed,
  updateLoginFailed,
});

export default loginFailedServices;

export {
  createLoginFailed,
  getLoginFailedByAgent,
  hardDeleteLoginFailed,
  updateLoginFailed,
};
