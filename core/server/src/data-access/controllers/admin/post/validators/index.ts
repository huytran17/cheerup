import getPostRules from "./get-post";
import deletePostRules from "./delete-post";
import updatePostRules from "./update-post";
import createPostRules from "./create-post";
import restorePostRules from "./restore-post";
import blockPostCommentRules from "./block-post-comment";
import unBlockPostCommentRules from "./unblock-post-comment";
import uploadPostThumbnailRules from "./upload-post-thumbnail";
import hardDeletePostRules from "./hard-delete-post";
import publishPostRules from "./publish-post";
import unPublishPostRules from "./un-publish-post";
import getMostPopularPostsAnalysticsRules from "./get-most-popular-posts-analystics";
import getPostAnalysticsRules from "./get-post-analystics";

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
  publishPostRules,
  unPublishPostRules,
  getMostPopularPostsAnalysticsRules,
  getPostAnalysticsRules,
});

export {
  getPostRules,
  deletePostRules,
  updatePostRules,
  createPostRules,
  uploadPostThumbnailRules,
  restorePostRules,
  blockPostCommentRules,
  unBlockPostCommentRules,
  hardDeletePostRules,
  publishPostRules,
  unPublishPostRules,
  getMostPopularPostsAnalysticsRules,
  getPostAnalysticsRules,
};
