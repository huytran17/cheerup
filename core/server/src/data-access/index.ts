import moment from "moment";

import makeUserDb from "./make-user-db";
import makeAdminDb from "./make-admin-db";
import makeCategoryDb from "./make-category-db";
import makeCommentDb from "./make-comment-db";
import makePostDb from "./make-post-db";
import makeFeedbackDb from "./make-feedback-db";

import {
  UserModel,
  AdminModel,
  CategoryModel,
  CommentModel,
  PostModel,
  FeedbackModel,
} from "./models";

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
});

export { UserDb, AdminDb, CategoryDb, CommentDb, PostDb, FeedbackDb };
