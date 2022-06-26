import moment from "moment";

import makeUserDb from "./make-user-db";
import makeAdminDb from "./make-admin-db";

import { UserModel, AdminModel } from "./models";

const UserDb = makeUserDb({ userDbModel: UserModel, moment });
const AdminDb = makeAdminDb({ adminDbModel: AdminModel, moment });

export default Object.freeze({
  UserDb,
  AdminDb,
});

export { UserDb, AdminDb };
