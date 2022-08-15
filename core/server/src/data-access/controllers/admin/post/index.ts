import {
  getPost,
  deletePost,
  updatePost,
  createPost,
  getPosts,
  hardDeletePost,
} from "../../../../use-cases/post";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeDeletePostController from "./delete-post";
import makeUpdatePostController from "./update-post";
import makeCreatePostController from "./create-post";
import makeGetPostsController from "./get-posts";
import makeRestorePostController from "./restore-post";
import makeUploadPostThumbnailController from "./upload-post-thumbnail";
import makeBlockPostCommentController from "./block-post-comment";
import makeUnblockPostCommentController from "./unblock-post-comment";
import makeHardDeletePostController from "./hard-delete-post";

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
};
