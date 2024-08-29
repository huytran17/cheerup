import { CommentDb } from "../../data-access";
import makeCountCommentsByPost from "./count-comments-by-post";
import makeCreateComment from "./create-comment";
import makeGetComment from "./get-comment";
import makeGetComments from "./get-comments";
import makeGetCommentsByParent from "./get-comments-by-parent";
import makeGetCommentsByPostPaginated from "./get-comments-by-post-paginated";
import makeGetCommentsPaginated from "./get-comments-paginated";
import makeHardDeleteComment from "./hard-delete-comment";
import makeReplyComment from "./reply-comment";
import makeUpdateComment from "./update-comment";

const getCommentsPaginated = makeGetCommentsPaginated({
  commentDb: CommentDb,
});

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
  getCommentsPaginated,
});

export default commentServices;

export {
  countCommentsByPost,
  createComment,
  getComment,
  getComments,
  getCommentsByParent,
  getCommentsByPostPaginated,
  getCommentsPaginated,
  hardDeleteComment,
  replyComment,
  updateComment,
};
