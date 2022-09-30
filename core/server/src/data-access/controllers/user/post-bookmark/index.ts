import {
  getPostBookmark,
  hardDeletePostBookmark,
  getPostBookmarksPaginated,
  createPostBookmark,
  getPostBookmarkByUserAndPost,
} from "../../../../use-cases/post-bookmark";
import { logger } from "../../../../config/logs/logger";
import { countCommentsByPost } from "../../../../use-cases/comment";

import makeHardDeletePostBookmarkController from "./hard-delete-post-bookmark";
import makeCreatePostBookmarkController from "./create-post-bookmark";
import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";
import makeCreateOrDeletePostBookmarkController from "./create-or-delete-post-bookmark";

const createOrDeletePostBookmarkController =
  makeCreateOrDeletePostBookmarkController({
    createPostBookmark,
    hardDeletePostBookmark,
    getPostBookmarkByUserAndPost,
    logger,
  });

const createPostBookmarkController = makeCreatePostBookmarkController({
  createPostBookmark,
  logger,
});

const hardDeletePostBookmarkController = makeHardDeletePostBookmarkController({
  getPostBookmark,
  hardDeletePostBookmark,
  logger,
});

const getPostBookmarksPaginatedController =
  makeGetPostBookmarksPaginatedController({
    getPostBookmarksPaginated,
    countCommentsByPost,
    logger,
  });

export default Object.freeze({
  getPostBookmarksPaginatedController,
  createPostBookmarkController,
  hardDeletePostBookmarkController,
  createOrDeletePostBookmarkController,
});

export {
  getPostBookmarksPaginatedController,
  createPostBookmarkController,
  hardDeletePostBookmarkController,
  createOrDeletePostBookmarkController,
};
