import mongoose from "mongoose";
import userSchema from "../../database/schemas/user";
import adminSchema from "../../database/schemas/admin";
import postSchema from "../../database/schemas/post";
import categorySchema from "../../database/schemas/category";
import commentSchema from "../../database/schemas/comment";
import feedbackSchema from "../../database/schemas/feedback";
import subscriptionSchema from "../../database/schemas/subscription";
import systemConfigurationSchema from "../../database/schemas/system-configuration";
import emailVerificationSchema from "../../database/schemas/email-verification";
import postBookmarkSchema from "../../database/schemas/post-bookmark";
import gallerySchema from "../../database/schemas/gallery";

import IEmailVerification from "../../database/interfaces/email-verification";
import ISystemConfiguration from "../../database/interfaces/system-configuration";
import ISubscription from "../../database/interfaces/subscription";
import IUser from "../../database/interfaces/user";
import IAdmin from "../../database/interfaces/admin";
import IPost from "../../database/interfaces/post";
import ICategory from "../../database/interfaces/category";
import IComment from "../../database/interfaces/comment";
import IFeedback from "../../database/interfaces/feedback";
import IPostBookmark from "../../database/interfaces/post-bookmark";
import IGallery from "../../database/interfaces/gallery";

type IPostBookmarkModel = IPostBookmark & mongoose.Document;
type IEmailVerificationModel = IEmailVerification & mongoose.Document;
type ISystemConfigurationModel = ISystemConfiguration & mongoose.Document;
type ISubscriptionModel = ISubscription & mongoose.Document;
type IUserModel = IUser & mongoose.Document;
type IAdminModel = IAdmin & mongoose.Document;
type IPostModel = IPost & mongoose.Document;
type ICategoryModel = ICategory & mongoose.Document;
type ICommentModel = IComment & mongoose.Document;
type IFeedbackModel = IFeedback & mongoose.Document;
type IGalleryModel = IGallery & mongoose.Document;

// Models
const GalleryModel = mongoose.model<IGalleryModel>("Gallery", gallerySchema);
const PostBookmarkModel = mongoose.model<IPostBookmarkModel>(
  "PostBookmark",
  postBookmarkSchema
);
const EmailVerificationModel = mongoose.model<IEmailVerificationModel>(
  "EmailVerification",
  emailVerificationSchema
);
const SystemConfigurationModel = mongoose.model<ISystemConfigurationModel>(
  "SystemConfiguration",
  systemConfigurationSchema
);
const FeedbackModel = mongoose.model<IFeedbackModel>(
  "Feedback",
  feedbackSchema
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
  FeedbackModel,
  SubscriptionModel,
  SystemConfigurationModel,
  EmailVerificationModel,
  PostBookmarkModel,
  GalleryModel,
});

export {
  UserModel,
  AdminModel,
  PostModel,
  CategoryModel,
  CommentModel,
  FeedbackModel,
  SubscriptionModel,
  SystemConfigurationModel,
  EmailVerificationModel,
  PostBookmarkModel,
  GalleryModel,
};
