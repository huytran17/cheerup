import blockPostCommentRules from "./block-post-comment";
import createPostRules from "./create-post";
import deletePostRules from "./delete-post";
import getMostPopularPostsAnalysticsRules from "./get-most-popular-posts-analystics";
import getPostRules from "./get-post";
import getPostAnalysticsRules from "./get-post-analystics";
import getPostsPaginatedRules from "./get-posts-paginated";
import hardDeletePostRules from "./hard-delete-post";
import restorePostRules from "./restore-post";
import unBlockPostCommentRules from "./unblock-post-comment";
import updatePostRules from "./update-post";
import uploadPostThumbnailRules from "./upload-post-thumbnail";

export default Object.freeze({
  getPostRules,
  deletePostRules,
  updatePostRules,
  createPostRules,
  uploadPostThumbnailRules,
  restorePostRules,
  blockPostCommentRules,
  unBlockPostCommentRules,
  hardDeletePostRules,
  getMostPopularPostsAnalysticsRules,
  getPostAnalysticsRules,
  getPostsPaginatedRules,
});

export {
  blockPostCommentRules,
  createPostRules,
  deletePostRules,
  getMostPopularPostsAnalysticsRules,
  getPostAnalysticsRules,
  getPostRules,
  getPostsPaginatedRules,
  hardDeletePostRules,
  restorePostRules,
  unBlockPostCommentRules,
  updatePostRules,
  uploadPostThumbnailRules,
};
