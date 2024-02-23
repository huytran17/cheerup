import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { logger } from "../../../../config/logs/logger";
import {
  createPost,
  deletePost,
  getPost,
  getPostAnalystics,
  getPosts,
  hardDeletePost,
  updatePost,
  getMostPopularPostsAnalystics,
} from "../../../../use-cases/post";
import { getActivatingSubscriptions } from "../../../../use-cases/subscription";

import makeBlockPostCommentController from "./block-post-comment";
import makeCreatePostController from "./create-post";
import makeDeletePostController from "./delete-post";
import makeGetPostController from "./get-post";
import makeGetPostAnalysticsController from "./get-post-analystics";
import makeGetPostsController from "./get-posts";
import makeHardDeletePostController from "./hard-delete-post";
import makeRestorePostController from "./restore-post";
import makeUnblockPostCommentController from "./un-block-post-comment";
import makeUpdatePostController from "./update-post";
import makeUploadPostThumbnailController from "./upload-post-thumbnail";
import makeGetMostPopularPostsAnalysticsController from "./get-most-popular-posts-analystics";

const getMostPopularPostsAnalysticsController =
  makeGetMostPopularPostsAnalysticsController({
    getMostPopularPostsAnalystics,
  });

const getPostAnalysticsController = makeGetPostAnalysticsController({
  getPostAnalystics,
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
});

const createPostController = makeCreatePostController({
  createPost,
  getPost,
  getActivatingSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  updatePost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
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
  getPostAnalysticsController,
  getMostPopularPostsAnalysticsController,
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
  getPostAnalysticsController,
  getMostPopularPostsAnalysticsController,
};
