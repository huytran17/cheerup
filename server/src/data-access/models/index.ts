import mongoose from "mongoose";
import userSchema from "../../database/schemas/user";
import adminSchema from "../../database/schemas/admin";
import postSchema from "../../database/schemas/post";

import IUser from "../../database/interfaces/user";
import IAdmin from "../../database/interfaces/admin";
import IPost from "../../database/interfaces/post";

type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;
type IPostModel = IPost & mongoose.Document;

// Models
const UserModel = mongoose.model<IUserModel>("User", userSchema);
const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);
const PostModel = mongoose.model<IPostModel>("Post", postSchema);

export default Object.freeze({
  UserModel,
  AdminModel,
  PostModel,
});

export { UserModel, AdminModel, PostModel };
