import {
  hardDeletePostBookmark,
  getPostBookmarksPaginated,
  createPostBookmark,
  getPostBookmarkByUserAndPost,
} from "../../../../use-cases/post-bookmark";
import { logger } from "../../../../config/logs/logger";
import { countCommentsByPost } from "../../../../use-cases/comment";
import moment from "moment";

import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";
import makeCreateOrDeletePostBookmarkController from "./create-or-delete-post-bookmark";

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
    logger,
  });

export default Object.freeze({
  getPostBookmarksPaginatedController,
  createOrDeletePostBookmarkController,
});

export {
  getPostBookmarksPaginatedController,
  createOrDeletePostBookmarkController,
};
