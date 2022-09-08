import {
  getPost,
  getPosts,
  getLatestPosts,
  getPostsPaginated,
} from "../../../../use-cases/post";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeGetPostsController from "./get-posts";
import makeGetLatestPostsController from "./get-latest-posts";
import makeGetPostsPaginatedController from "./get-posts-paginated";

const getPostsPaginatedController = makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  logger,
});

const getPostsController = makeGetPostsController({
  getPosts,
  countCommentsByPost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  logger,
});

const getLatestPostsController = makeGetLatestPostsController({
  getLatestPosts,
  logger,
});

export default Object.freeze({
  getPostController,
  getPostsController,
  getLatestPostsController,
  getPostsPaginatedController,
});

export {
  getPostController,
  getPostsController,
  getLatestPostsController,
  getPostsPaginatedController,
};
