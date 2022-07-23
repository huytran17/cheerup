import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { CommentDb } from "../../data-access";

import makeGetComment from "./get-comment";
import makeDeleteComment from "./delete-comment";
import makeUpdateComment from "./update-comment";
import makeGetComments from "./get-comments";
import makeCreateComment from "./create-comment";

const createComment = makeCreateComment({
  commentDb: CommentDb,
  redis,
  logger,
});

const getComment = makeGetComment({
  commentDb: CommentDb,
  redis,
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
  redis,
  logger,
});

const commentServices = Object.freeze({
  getComment,
  deleteComment,
  updateComment,
  getComments,
  createComment,
});

export default commentServices;

export { getComment, deleteComment, updateComment, getComments, createComment };
