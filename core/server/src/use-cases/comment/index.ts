import { logger } from "../../config/logs/logger";

import { CommentDb } from "../../data-access";

import makeGetComment from "./get-comment";
import makeDeleteComment from "./delete-comment";
import makeUpdateComment from "./update-comment";
import makeGetComments from "./get-comments";
import makeCreateComment from "./create-comment";
import makeGetCommentsByParent from "./get-comments-by-parent";
import makeCountCommentsByPost from "./count-comments-by-post";
import makeGetCommentsByPostPaginated from "./get-comments-by-post-paginated";
import makeReplyComment from "./reply-comment";

const replyComment = makeReplyComment({
  commentDb: CommentDb,
  logger,
});

const getCommentsByPostPaginated = makeGetCommentsByPostPaginated({
  commentDb: CommentDb,
  logger,
});

const countCommentsByPost = makeCountCommentsByPost({
  commentDb: CommentDb,
  logger,
});

const getCommentsByParent = makeGetCommentsByParent({
  commentDb: CommentDb,
  logger,
});

const createComment = makeCreateComment({
  commentDb: CommentDb,
  logger,
});

const getComment = makeGetComment({
  commentDb: CommentDb,
  logger,
});

const deleteComment = makeDeleteComment({
  commentDb: CommentDb,
});

const updateComment = makeUpdateComment({
  commentDb: CommentDb,
});

const getComments = makeGetComments({
  commentDb: CommentDb,
  logger,
});

const commentServices = Object.freeze({
  getComment,
  deleteComment,
  updateComment,
  getComments,
  createComment,
  getCommentsByParent,
  countCommentsByPost,
  getCommentsByPostPaginated,
  replyComment,
});

export default commentServices;

export {
  getComment,
  deleteComment,
  updateComment,
  getComments,
  createComment,
  getCommentsByParent,
  countCommentsByPost,
  getCommentsByPostPaginated,
  replyComment,
};
