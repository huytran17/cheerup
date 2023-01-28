import getCommentRules from "./get-comment";
import hardDeleteCommentRules from "./hard-delete-comment";
import updateCommentRules from "./update-comment";
import createCommentRules from "./create-comment";
import getCommentsByPostPaginatedRules from "./get-comments-by-post-paginated";
import replyCommentRules from "./reply-comment";
import countCommentsByPostRules from "./count-comments-by-post";
import getCommentsByParentRules from "./get-comments-by-parent";

export default Object.freeze({
  getCommentRules,
  hardDeleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  replyCommentRules,
  countCommentsByPostRules,
  getCommentsByParentRules,
});

export {
  getCommentRules,
  hardDeleteCommentRules,
  updateCommentRules,
  createCommentRules,
  getCommentsByPostPaginatedRules,
  replyCommentRules,
  countCommentsByPostRules,
  getCommentsByParentRules,
};
