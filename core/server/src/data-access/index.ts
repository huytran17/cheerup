import moment from "moment";

import makeUserDb from "./make-user-db";
import makeAdminDb from "./make-admin-db";
import makeCategoryDb from "./make-category-db";
import makeCommentDb from "./make-comment-db";
import makePostDb from "./make-post-db";
import makeFeedbackDb from "./make-feedback-db";
import makeSubscribeDb from "./make-subscribe-db";

import {
  UserModel,
  AdminModel,
  CategoryModel,
  CommentModel,
  PostModel,
  FeedbackModel,
  SubscribeModel,
} from "./models";

const SubscribeDb = makeSubscribeDb({
  subscribeDbModel: SubscribeModel,
  moment,
});
const FeedbackDb = makeFeedbackDb({ feedbackDbModel: FeedbackModel, moment });
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
  FeedbackDb,
  SubscribeDb,
});

export {
  UserDb,
  AdminDb,
  CategoryDb,
  CommentDb,
  PostDb,
  FeedbackDb,
  SubscribeDb,
};
