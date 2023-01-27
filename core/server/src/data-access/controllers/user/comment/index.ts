import {
  getComment,
  deleteComment,
  updateComment,
  createComment,
  getComments,
  getCommentsByPostPaginated,
  replyComment,
  countCommentsByPost,
} from "../../../../use-cases/comment";
import {
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
} from "../../../../use-cases/comment-like";
import { getPost } from "../../../../use-cases/post";
import { getUser } from "../../../../use-cases/user";
import { logger } from "../../../../config/logs/logger";

import makeGetCommentController from "./get-comment";
import makeDeleteCommentController from "./delete-comment";
import makeUpdateCommentController from "./update-comment";
import makeCreateCommentController from "./create-comment";
import makeGetCommentsController from "./get-comments";
import makeGetCommentsByPostPaginatedController from "./get-comments-by-post-paginated";
import makeReplyCommentController from "./reply-comment";
import makeCountCommentsByPostController from "./count-comments-by-post";

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
  logger,
});

const deleteCommentController = makeDeleteCommentController({
  getComment,
  deleteComment,
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
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostPaginatedController,
  replyCommentController,
  countCommentsByPostController,
});

export {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostPaginatedController,
  replyCommentController,
  countCommentsByPostController,
};
