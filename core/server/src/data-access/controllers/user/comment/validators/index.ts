import getCommentRules from "./get-comment";
import deleteCommentRules from "./delete-comment";
import updateCommentRules from "./update-comment";
import createCommentRules from "./create-comment";
import dislikeCommentRules from "./dislike-comment";
import likeCommentRules from "./like-comment";
import getCommentsByPostPaginatedRules from "./get-comments-by-post-paginated";
import replyCommentRules from "./reply-comment";
import countCommentsByPostRules from "./count-comments-by-post";

export default Object.freeze({
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  likeCommentRules,
  dislikeCommentRules,
  replyCommentRules,
  countCommentsByPostRules,
});

export {
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  likeCommentRules,
  dislikeCommentRules,
  replyCommentRules,
  countCommentsByPostRules,
};
