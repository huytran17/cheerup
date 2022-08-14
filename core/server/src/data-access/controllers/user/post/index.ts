import { getPost, getPosts } from "../../../../use-cases/post";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeGetPostsController from "./get-posts";

const getPostsController = makeGetPostsController({
  getPosts,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  logger,
});

export default Object.freeze({
  getPostController,
  getPostsController,
});

export { getPostController, getPostsController };
