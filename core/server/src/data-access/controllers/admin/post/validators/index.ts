import getPostRules from "./get-post";
import deletePostRules from "./delete-post";
import updatePostRules from "./update-post";
import createPostRules from "./create-post";
import restorePostRules from "./restore-post";
import blockPostCommentRules from "./block-post-comment";
import unBlockPostCommentRules from "./unblock-post-comment";
import uploadPostThumbnailRules from "./upload-post-thumbnail";
import hardDeletePostRules from "./hard-delete-post";

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
};
