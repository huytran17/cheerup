import { UserDb } from "../../../data-access";
import { initialAdminNsp, initialClientNsp } from "../nsp";
import makePrivateClientHandler from "./make-private-client-handler";

const privateClientHandler = makePrivateClientHandler({
  userDb: UserDb,
  initialClientNsp,
  initialAdminNsp,
});

export default Object.freeze({
  privateClientHandler,
});

export { privateClientHandler };
