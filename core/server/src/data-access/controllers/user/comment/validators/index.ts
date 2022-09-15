import getCommentRules from "./get-comment";
import deleteCommentRules from "./delete-comment";
import updateCommentRules from "./update-comment";
import createCommentRules from "./create-comment";
import dislikeCommentRules from "./dislike-comment";
import likeCommentRules from "./like-comment";
import getCommentsByPostRules from "./get-comments-by-post";
import replyCommentRules from "./reply-comment";

export default Object.freeze({
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostRules,
  likeCommentRules,
  dislikeCommentRules,
  replyCommentRules,
});

export {
  getCommentRules,
  deleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostRules,
  likeCommentRules,
  dislikeCommentRules,
  replyCommentRules,
};
