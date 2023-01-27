import { logger } from "../../config/logs/logger";

import { CommentLikeDb } from "../../data-access";

import makeUpdateCommentLike from "./update-comment-like";
import makeCreateCommentLike from "./create-comment-like";
import makeHardDeleteCommentLike from "./hard-delete-comment-like";
import makeCountAllByComment from "./count-all-by-comment";

const countAllByComment = makeCountAllByComment({
  commentLikeDb: CommentLikeDb,
  logger,
});

const hardDeleteCommentLike = makeHardDeleteCommentLike({
  commentLikeDb: CommentLikeDb,
  logger,
});

const updateCommentLike = makeUpdateCommentLike({
  commentLikeDb: CommentLikeDb,
});

const createCommentLike = makeCreateCommentLike({
  commentLikeDb: CommentLikeDb,
});

const commentLikeServices = Object.freeze({
  updateCommentLike,
  createCommentLike,
  hardDeleteCommentLike,
  countAllByComment,
});

export default commentLikeServices;

export {
  updateCommentLike,
  createCommentLike,
  hardDeleteCommentLike,
  countAllByComment,
};
