import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { CommentDb } from "../../data-access";

import makeGetComment from "./get-comment";
import makeDeleteComment from "./delete-comment";
import makeUpdateComment from "./update-comment";
import makeGetCategories from "./get-comments";

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

const getCategories = makeGetCategories({
  commentDb: CommentDb,
  redis,
  logger,
});

const commentServices = Object.freeze({
  getComment,
  deleteComment,
  updateComment,
  getCategories,
});

export default commentServices;

export { getComment, deleteComment, updateComment, getCategories };
