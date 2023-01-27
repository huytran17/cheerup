import mongoose from "mongoose";
import userSchema from "../../database/schemas/user";
import adminSchema from "../../database/schemas/admin";
import postSchema from "../../database/schemas/post";
import categorySchema from "../../database/schemas/category";
import commentSchema from "../../database/schemas/comment";
import subscriptionSchema from "../../database/schemas/subscription";
import systemConfigurationSchema from "../../database/schemas/system-configuration";
import postBookmarkSchema from "../../database/schemas/post-bookmark";
import gallerySchema from "../../database/schemas/gallery";
import commentLikeSchema from "../../database/schemas/comment-like";

import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISubscription from "../../database/interfaces/subscription";
import IUser from "../../database/interfaces/user";
import IAdmin from "../../database/interfaces/admin";
import IPost from "../../database/interfaces/post";
import ICategory from "../../database/interfaces/category";
import IComment from "../../database/interfaces/comment";
import IPostBookmark from "../../database/interfaces/post-bookmark";
import IGallery from "../../database/interfaces/gallery";
import ICommentLike from "../../database/interfaces/comment-like";

type IPostBookmarkModel = IPostBookmark & mongoose.Document;
type ISystemConfigurationModel = ISystemConfiguration & mongoose.Document;
type ISubscriptionModel = ISubscription & mongoose.Document;
type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;
type IPostModel = IPost & mongoose.Document;
type ICategoryModel = ICategory & mongoose.Document;
type ICommentModel = IComment & mongoose.Document;
type IGalleryModel = IGallery & mongoose.Document;
type ICommentLikeModel = ICommentLike & mongoose.Document;

const CommentLikeModel = mongoose.model<IGalleryModel>(
  "CommentLike",
  commentLikeSchema
);
const GalleryModel = mongoose.model<IGalleryModel>("Gallery", gallerySchema);
const PostBookmarkModel = mongoose.model<IPostBookmarkModel>(
  "PostBookmark",
  postBookmarkSchema
);
const SystemConfigurationModel = mongoose.model<ISystemConfigurationModel>(
  "SystemConfiguration",
  systemConfigurationSchema
);
const SubscriptionModel = mongoose.model<ISubscriptionModel>(
  "Subscription",
  subscriptionSchema
);
const UserModel = mongoose.model<IUserModel>("User", userSchema);
const AdminModel = mongoose.model<IAdminModel>("Admin", adminSchema);
const PostModel = mongoose.model<IPostModel>("Post", postSchema);
const CategoryModel = mongoose.model<ICategoryModel>(
  "Category",
  categorySchema
);
const CommentModel = mongoose.model<ICommentModel>("Comment", commentSchema);

export default Object.freeze({
  UserModel,
  AdminModel,
  PostModel,
  CategoryModel,
  CommentModel,
  SubscriptionModel,
  SystemConfigurationModel,
  PostBookmarkModel,
  GalleryModel,
  CommentLikeModel,
});

export {
  UserModel,
  AdminModel,
  PostModel,
  CategoryModel,
  CommentModel,
  SubscriptionModel,
  SystemConfigurationModel,
  PostBookmarkModel,
  GalleryModel,
  CommentLikeModel,
};
