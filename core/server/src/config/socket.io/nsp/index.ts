import { UserDb } from "../../../data-access";
import makeInitialAdminNsp from "./admin";
import makeInitialClientNsp from "./client";

const initialAdminNsp = makeInitialAdminNsp();
const initialClientNsp = makeInitialClientNsp({
  userDb: UserDb,
});

const nsp_services = Object.freeze({
  initialAdminNsp,
  initialClientNsp,
});

export default nsp_services;

export { initialAdminNsp, initialClientNsp };
