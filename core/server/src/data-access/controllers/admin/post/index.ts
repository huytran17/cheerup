import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { logger } from "../../../../config/logs/logger";
import { getAdmin } from "../../../../use-cases/admin";
import {
  createPost,
  deletePost,
  getHighlightPost,
  getPost,
  getPostAnalystics,
  getPosts,
  hardDeletePost,
  updatePost,
} from "../../../../use-cases/post";
import { getActivatingSubscriptions } from "../../../../use-cases/subscription";

import makeBlockPostCommentController from "./block-post-comment";
import makeCreatePostController from "./create-post";
import makeDeletePostController from "./delete-post";
import makeGetPostController from "./get-post";
import makeGetPostAnalysticsController from "./get-post-analystics";
import makeGetPostsController from "./get-posts";
import makeHardDeletePostController from "./hard-delete-post";
import makeHightlightPostController from "./highlight-post";
import makePublishPostController from "./publish-post";
import makeRestorePostController from "./restore-post";
import makeUnHightlightPostController from "./un-highlight-post";
import makeUnPublishPostController from "./un-publish-post";
import makeUnblockPostCommentController from "./unblock-post-comment";
import makeUpdatePostController from "./update-post";
import makeUploadPostThumbnailController from "./upload-post-thumbnail";

const unHightlightPostController = makeUnHightlightPostController({
  getPost,
  updatePost,
  logger,
});

const hightlightPostController = makeHightlightPostController({
  getPost,
  getHighlightPost,
  updatePost,
  logger,
});

const getPostAnalysticsController = makeGetPostAnalysticsController({
  getPostAnalystics,
});

const publishPostController = makePublishPostController({
  getPost,
  updatePost,
  getActivatingSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
});

const unPublishPostController = makeUnPublishPostController({
  getPost,
  updatePost,
  logger,
});

const hardDeletePostController = makeHardDeletePostController({
  getPost,
  hardDeletePost,
  logger,
});

const unblockPostCommentController = makeUnblockPostCommentController({
  getPost,
  updatePost,
  logger,
});

const blockPostCommentController = makeBlockPostCommentController({
  getPost,
  updatePost,
  logger,
});

const restorePostController = makeRestorePostController({
  getPost,
  updatePost,
  logger,
});

const uploadPostThumbnailController = makeUploadPostThumbnailController({
  getPost,
  updatePost,
});

const getPostsController = makeGetPostsController({
  getPosts,
  logger,
});

const createPostController = makeCreatePostController({
  createPost,
  getAdmin,
  getActivatingSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  updatePost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  logger,
});

const deletePostController = makeDeletePostController({
  getPost,
  deletePost,
  logger,
});

const updatePostController = makeUpdatePostController({
  getPost,
  updatePost,
  logger,
});

export default Object.freeze({
  getPostController,
  deletePostController,
  updatePostController,
  createPostController,
  getPostsController,
  uploadPostThumbnailController,
  restorePostController,
  unblockPostCommentController,
  blockPostCommentController,
  hardDeletePostController,
  publishPostController,
  unPublishPostController,
  getPostAnalysticsController,
  hightlightPostController,
  unHightlightPostController,
});

export {
  getPostController,
  deletePostController,
  updatePostController,
  createPostController,
  getPostsController,
  uploadPostThumbnailController,
  restorePostController,
  unblockPostCommentController,
  blockPostCommentController,
  hardDeletePostController,
  publishPostController,
  unPublishPostController,
  getPostAnalysticsController,
  hightlightPostController,
  unHightlightPostController,
};
