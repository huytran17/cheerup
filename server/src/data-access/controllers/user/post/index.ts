import {
  getPost,
  deletePost,
  updatePost,
  createPost,
} from "../../../../use-cases/post";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeDeletePost from "./delete-post";
import makeUpdatePost from "./update-post";
import makeCreatePost from "./create-post";

const createPostController = makeCreatePost({
  createPost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  logger,
});

const deletePostController = makeDeletePost({
  getPost,
  deletePost,
  logger,
});

const updatePostController = makeUpdatePost({
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
