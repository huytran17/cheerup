import { CommentDb } from "../../data-access";

import makeGetComment from "./get-comment";
import makeHardDeleteComment from "./hard-delete-comment";
import makeUpdateComment from "./update-comment";
import makeGetComments from "./get-comments";
import makeCreateComment from "./create-comment";
import makeGetCommentsByParent from "./get-comments-by-parent";
import makeCountCommentsByPost from "./count-comments-by-post";
import makeGetCommentsByPostPaginated from "./get-comments-by-post-paginated";
import makeReplyComment from "./reply-comment";

const replyComment = makeReplyComment({
  commentDb: CommentDb,
});

const getCommentsByPostPaginated = makeGetCommentsByPostPaginated({
  commentDb: CommentDb,
});

const countCommentsByPost = makeCountCommentsByPost({
  commentDb: CommentDb,
});

const getCommentsByParent = makeGetCommentsByParent({
  commentDb: CommentDb,
});

const createComment = makeCreateComment({
  commentDb: CommentDb,
});

const getComment = makeGetComment({
  commentDb: CommentDb,
});

const hardDeleteComment = makeHardDeleteComment({
  commentDb: CommentDb,
});

const updateComment = makeUpdateComment({
  commentDb: CommentDb,
});

const getComments = makeGetComments({
  commentDb: CommentDb,
});

const commentServices = Object.freeze({
  getComment,
  hardDeleteComment,
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
  hardDeleteComment,
  updateComment,
  getComments,
  createComment,
  getCommentsByParent,
  countCommentsByPost,
  getCommentsByPostPaginated,
  replyComment,
};
