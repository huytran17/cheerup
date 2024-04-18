import moment from "moment";

import makeAdminDb from "./make-admin-db";
import makeCategoryDb from "./make-category-db";
import makeCommentDb from "./make-comment-db";
import makeCommentLikeDb from "./make-comment-like-db";
import makeConnectDb from "./make-connect-db";
import makeGalleryDb from "./make-gallery-db";
import makeLoginFailedDb from "./make-login-failed-db";
import makePasswordResetDb from "./make-password-reset-db";
import makePostBookmarkDb from "./make-post-bookmark-db";
import makePostDb from "./make-post-db";
import makeSubscriptionDb from "./make-subscription-db";
import makeSystemConfigurationDb from "./make-system-configuration-db";
import makeTwoFactorAuthenticationDb from "./make-two-factor-authentication-db";
import makeUserDb from "./make-user-db";

import {
  AdminModel,
  CategoryModel,
  CommentLikeModel,
  CommentModel,
  GalleryModel,
  LoginFailedModel,
  PasswordResetModel,
  PostBookmarkModel,
  PostModel,
  SubscriptionModel,
  SystemConfigurationModel,
  TwoFactorAuthenticationModel,
  UserModel,
} from "./models";

const connectDb = makeConnectDb();

const TwoFactorAuthenticationDb = makeTwoFactorAuthenticationDb({
  twoFactorAuthenticationDbModel: TwoFactorAuthenticationModel,
});

const PasswordResetDb = makePasswordResetDb({
  passwordResetDbModel: PasswordResetModel,
});

const CommentLikeDb = makeCommentLikeDb({
  commentLikeDbModel: CommentLikeModel,
});

const GalleryDb = makeGalleryDb({
  galleryDbModel: GalleryModel,
});

const PostBookmarkDb = makePostBookmarkDb({
  postBookmarkDbModel: PostBookmarkModel,
});

const SubscriptionDb = makeSubscriptionDb({
  subscriptionDbModel: SubscriptionModel,
  moment,
});

const SystemConfigurationDb = makeSystemConfigurationDb({
  systemConfigurationDbModel: SystemConfigurationModel,
});

const PostDb = makePostDb({ postDbModel: PostModel, moment });

const CommentDb = makeCommentDb({ commentDbModel: CommentModel });

const UserDb = makeUserDb({ userDbModel: UserModel, moment });

const AdminDb = makeAdminDb({ adminDbModel: AdminModel, moment });

const CategoryDb = makeCategoryDb({
  categoryDbModel: CategoryModel,
  moment,
});

const LoginFailedDb = makeLoginFailedDb({
  loginFailedDbModel: LoginFailedModel,
});

export default Object.freeze({
  UserDb,
  AdminDb,
  CategoryDb,
  CommentDb,
  PostDb,
  SubscriptionDb,
  SystemConfigurationDb,
  PostBookmarkDb,
  GalleryDb,
  CommentLikeDb,
  PasswordResetDb,
  TwoFactorAuthenticationDb,
  connectDb,
  LoginFailedDb,
});

export {
  AdminDb,
  CategoryDb,
  CommentDb,
  CommentLikeDb,
  GalleryDb,
  LoginFailedDb,
  PasswordResetDb,
  PostBookmarkDb,
  PostDb,
  SubscriptionDb,
  SystemConfigurationDb,
  TwoFactorAuthenticationDb,
  UserDb,
  connectDb,
};
