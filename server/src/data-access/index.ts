import moment from "moment";
import makeUserDb from "./make-user-db";
import { UserModel } from "./models";

const UserDb = makeUserDb({ userDbModel: UserModel, moment });

export default Object.freeze({
  UserDb,
});

export { UserDb };
