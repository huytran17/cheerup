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
import { logger } from "../../../../config/logs/logger";

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
  logger,
});

const countCommentsByPostController = makeCountCommentsByPostController({
  countCommentsByPost,
  getPost,
  logger,
});

const replyCommentController = makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
  getUser,
  logger,
});

const getCommentsByPostPaginatedController =
  makeGetCommentsByPostPaginatedController({
    getCommentsByPostPaginated,
    getPost,
    countCommentLikeByCommentAndType,
    getCommentLikeByUserAndComment,
    logger,
  });

const getCommentsController = makeGetCommentsController({
  getComments,
  logger,
});

const createCommentController = makeCreateCommentController({
  createComment,
  getPost,
  getUser,
  logger,
});

const getCommentController = makeGetCommentController({
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
  logger,
});

const hardDeleteCommentController = makeHardDeleteCommentController({
  getComment,
  hardDeleteComment,
  getPost,
  getUser,
  logger,
});

const updateCommentController = makeUpdateCommentController({
  getComment,
  updateComment,
  getPost,
  getUser,
  logger,
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
