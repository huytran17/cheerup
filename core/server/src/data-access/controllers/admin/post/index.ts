import {
  getPost,
  deletePost,
  updatePost,
  createPost,
  getPosts,
} from "../../../../use-cases/post";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeDeletePostController from "./delete-post";
import makeUpdatePostController from "./update-post";
import makeCreatePostController from "./create-post";
import makeGetPostsController from "./get-posts";
import makeUploadPostThumbnailController from "./upload-post-thumbnail";

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
});

export {
  getPostController,
  deletePostController,
  updatePostController,
  createPostController,
  getPostsController,
  uploadPostThumbnailController,
};
