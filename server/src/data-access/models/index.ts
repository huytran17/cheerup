import mongoose from "mongoose";
import userSchema from "../../database/schemas/user";

import IUser from "../../database/interfaces/user";

type IUserModel = IUser & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default Object.freeze({
  UserModel,
});

export { UserModel };
