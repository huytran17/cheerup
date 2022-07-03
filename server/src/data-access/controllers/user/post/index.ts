import {
  getPost,
  deletePost,
  updatePost,
  createPost,
} from "../../../../use-cases/post";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeDeletePostController from "./delete-post";
import makeUpdatePostController from "./update-post";
import makeCreatePostController from "./create-post";

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
});

export {
  getPostController,
  deletePostController,
  updatePostController,
  createPostController,
};
