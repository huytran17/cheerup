import { logger } from "../../config/logs/logger";

import { CommentLikeDb } from "../../data-access";

import makeUpdateCommentLike from "./update-comment-like";
import makeCreateCommentLike from "./create-comment-like";
import makeHardDeleteCommentLike from "./hard-delete-comment-like";
import makeCountCommentLikeByCommentAndType from "./count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "./get-comment-like-by-user-and-comment";

const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
  commentLikeDb: CommentLikeDb,
});

const countCommentLikeByCommentAndType = makeCountCommentLikeByCommentAndType({
  commentLikeDb: CommentLikeDb,
});

const hardDeleteCommentLike = makeHardDeleteCommentLike({
  commentLikeDb: CommentLikeDb,
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
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
});

export default commentLikeServices;

export {
  updateCommentLike,
  createCommentLike,
  hardDeleteCommentLike,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
};
