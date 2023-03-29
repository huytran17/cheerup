import {
  getComment,
  hardDeleteComment,
  updateComment,
  createComment,
  getComments,
  getCommentsByPostPaginated,
  replyComment,
  countCommentsByPost,
  getCommentsByParent,
} from "../../../../use-cases/comment";
import {
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
} from "../../../../use-cases/comment-like";
import { getPost } from "../../../../use-cases/post";
import { getUser } from "../../../../use-cases/user";

import makeGetCommentController from "./get-comment";
import makeHardDeleteCommentController from "./hard-delete-comment";
import makeUpdateCommentController from "./update-comment";
import makeCreateCommentController from "./create-comment";
import makeGetCommentsController from "./get-comments";
import makeGetCommentsByPostPaginatedController from "./get-comments-by-post-paginated";
import makeReplyCommentController from "./reply-comment";
import makeCountCommentsByPostController from "./count-comments-by-post";
import makeGetCommentsByParentController from "./get-comments-by-parent";

const getCommentsByParentController = makeGetCommentsByParentController({
  getCommentsByParent,
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
});

const countCommentsByPostController = makeCountCommentsByPostController({
  countCommentsByPost,
  getPost,
});

const replyCommentController = makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
  getUser,
});

const getCommentsByPostPaginatedController =
  makeGetCommentsByPostPaginatedController({
    getCommentsByPostPaginated,
    getPost,
    countCommentLikeByCommentAndType,
    getCommentLikeByUserAndComment,
  });

const getCommentsController = makeGetCommentsController({
  getComments,
});

const createCommentController = makeCreateCommentController({
  createComment,
  getPost,
  getUser,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
});

const getCommentController = makeGetCommentController({
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
});

const hardDeleteCommentController = makeHardDeleteCommentController({
  getComment,
  hardDeleteComment,
  getPost,
  getUser,
});

const updateCommentController = makeUpdateCommentController({
  getComment,
  updateComment,
  getPost,
  getUser,
});

export default Object.freeze({
  getCommentController,
  hardDeleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostPaginatedController,
  replyCommentController,
  countCommentsByPostController,
  getCommentsByParentController,
});

export {
  getCommentController,
  hardDeleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostPaginatedController,
  replyCommentController,
  countCommentsByPostController,
  getCommentsByParentController,
};
