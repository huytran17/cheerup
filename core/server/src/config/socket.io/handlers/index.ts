import { UserDb, AdminDb } from "../../../data-access";
import { initialAdminNsp, initialClientNsp } from "../nsp";
import makePrivateClientHandler from "./make-private-client-handler";
import makePrivateAdminHandler from "./make-private-admin-handler";

const privateClientHandler = makePrivateClientHandler({
  userDb: UserDb,
  initialClientNsp,
  initialAdminNsp,
});

const privateAdminHandler = makePrivateAdminHandler({
  adminDb: AdminDb,
  initialAdminNsp,
});

export default Object.freeze({
  privateClientHandler,
  privateAdminHandler,
});

export { privateClientHandler, privateAdminHandler };
