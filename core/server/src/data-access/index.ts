import moment from "moment";

import makeUserDb from "./make-user-db";
import makeAdminDb from "./make-admin-db";
import makeCategoryDb from "./make-category-db";
import makeCommentDb from "./make-comment-db";
import makePostDb from "./make-post-db";
import makeSubscriptionDb from "./make-subscription-db";
import makeSystemConfigurationDb from "./make-system-configuration-db";
import makePostBookmarkDb from "./make-post-bookmark-db";
import makeGalleryDb from "./make-gallery-db";
import makeCommentLikeDb from "./make-comment-like-db";
import makePasswordResetDb from "./make-password-reset-db";
import makeTwoFactorAuthenticationDb from "./make-two-factor-authentication-db";

import {
  UserModel,
  AdminModel,
  CategoryModel,
  CommentModel,
  PostModel,
  SubscriptionModel,
  SystemConfigurationModel,
  PostBookmarkModel,
  GalleryModel,
  CommentLikeModel,
  PasswordResetModel,
  TwoFactorAuthenticationModel,
} from "./models";

const TwoFactorAuthenticationDb = makeTwoFactorAuthenticationDb({
  twoFactorAuthenticationDbModel: TwoFactorAuthenticationModel,
});

const PasswordResetDb = makePasswordResetDb({
  passwordResetDbModel: PasswordResetModel,
  moment,
});

const CommentLikeDb = makeCommentLikeDb({
  commentLikeDbModel: CommentLikeModel,
});

const GalleryDb = makeGalleryDb({
  galleryDbModel: GalleryModel,
  moment,
});

const PostBookmarkDb = makePostBookmarkDb({
  postBookmarkDbModel: PostBookmarkModel,
  moment,
});

const SubscriptionDb = makeSubscriptionDb({
  subscriptionDbModel: SubscriptionModel,
  moment,
});

const SystemConfigurationDb = makeSystemConfigurationDb({
  systemConfigurationDbModel: SystemConfigurationModel,
  moment,
});

const PostDb = makePostDb({ postDbModel: PostModel, moment });

const CommentDb = makeCommentDb({ commentDbModel: CommentModel, moment });

const UserDb = makeUserDb({ userDbModel: UserModel, moment });

const AdminDb = makeAdminDb({ adminDbModel: AdminModel, moment });

const CategoryDb = makeCategoryDb({
  categoryDbModel: CategoryModel,
  moment,
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
});

export {
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
};
