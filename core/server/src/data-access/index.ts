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
} from "./models";

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
};
