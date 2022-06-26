import mongoose from "mongoose";
import userSchema from "../../database/schemas/user";
import adminSchema from "../../database/schemas/admin";

import IUser from "../../database/interfaces/user";
import IAdmin from "../../database/interfaces/admin";

type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);
const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);

export default Object.freeze({
  UserModel,
  AdminModel,
});

export { UserModel, AdminModel };
