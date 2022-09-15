import {
  getComment,
  deleteComment,
  updateComment,
  createComment,
  getComments,
  getCommentsByPost,
  replyComment,
} from "../../../../use-cases/comment";
import { getPost } from "../../../../use-cases/post";
import { logger } from "../../../../config/storage/logger";

import makeGetCommentController from "./get-comment";
import makeDeleteCommentController from "./delete-comment";
import makeUpdateCommentController from "./update-comment";
import makeCreateCommentController from "./create-comment";
import makeGetCommentsController from "./get-comments";
import makeDislikeCommentController from "./dislike-comment";
import makeLikeCommentController from "./like-comment";
import makeGetCommentsByPostController from "./get-comments-by-post";
import makeReplyCommentController from "./reply-comment";

const replyCommentController = makeReplyCommentController({
  replyComment,
  getComment,
  updateComment,
  getPost,
  logger,
});

const dislikeCommentController = makeDislikeCommentController({
  getComment,
  updateComment,
  logger,
});

const likeCommentController = makeLikeCommentController({
  getComment,
  updateComment,
  logger,
});

const getCommentsByPostController = makeGetCommentsByPostController({
  getCommentsByPost,
  logger,
});

const getCommentsController = makeGetCommentsController({
  getComments,
  logger,
});

const createCommentController = makeCreateCommentController({
  createComment,
  getPost,
  logger,
});

const getCommentController = makeGetCommentController({
  getComment,
  logger,
});

const deleteCommentController = makeDeleteCommentController({
  getComment,
  deleteComment,
  logger,
});

const updateCommentController = makeUpdateCommentController({
  getComment,
  updateComment,
  logger,
});

export default Object.freeze({
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostController,
  dislikeCommentController,
  likeCommentController,
  replyCommentController,
});

export {
  getCommentController,
  deleteCommentController,
  updateCommentController,
  createCommentController,
  getCommentsController,
  getCommentsByPostController,
  dislikeCommentController,
  likeCommentController,
  replyCommentController,
};
