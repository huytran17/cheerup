import {
  hardDeletePostBookmark,
  getPostBookmarksPaginated,
  createPostBookmark,
  getPostBookmarkByUserAndPost,
  countPostBookmarks,
} from "../../../../use-cases/post-bookmark";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { getUser } from "../../../../use-cases/user";
import { logger } from "../../../../config/logs/logger";
import { readingTimeAnalyzer } from "../../../../config/reading-time";
import moment from "moment";

import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";
import makeCreateOrDeletePostBookmarkController from "./create-or-delete-post-bookmark";
import makeCountPostBookmarkController from "./count-post-bookmarks";

const countPostBookmarkController = makeCountPostBookmarkController({
  countPostBookmarks,
  getUser,
  logger,
});

const createOrDeletePostBookmarkController =
  makeCreateOrDeletePostBookmarkController({
    createPostBookmark,
    hardDeletePostBookmark,
    getPostBookmarkByUserAndPost,
    logger,
    moment,
  });

const getPostBookmarksPaginatedController =
  makeGetPostBookmarksPaginatedController({
    getPostBookmarksPaginated,
    countCommentsByPost,
    readingTimeAnalyzer,
    logger,
  });

export default Object.freeze({
  getPostBookmarksPaginatedController,
  createOrDeletePostBookmarkController,
  countPostBookmarkController,
});

export {
  getPostBookmarksPaginatedController,
  createOrDeletePostBookmarkController,
  countPostBookmarkController,
};
