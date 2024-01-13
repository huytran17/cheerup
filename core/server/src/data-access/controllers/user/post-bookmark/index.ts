import moment from "moment";
import { readingTimeAnalyzer } from "../../../../config/reading-time";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { getPost } from "../../../../use-cases/post";
import {
  countPostBookmarks,
  createPostBookmark,
  getPostBookmarkByUserAndPost,
  getPostBookmarksPaginated,
  hardDeletePostBookmark,
} from "../../../../use-cases/post-bookmark";

import makeCountPostBookmarkController from "./count-post-bookmarks";
import makeCreateOrDeletePostBookmarkController from "./create-or-delete-post-bookmark";
import makeGetPostBookmarksPaginatedController from "./get-post-bookmarks-paginated";

const countPostBookmarkController = makeCountPostBookmarkController({
  countPostBookmarks,
});

const createOrDeletePostBookmarkController =
  makeCreateOrDeletePostBookmarkController({
    createPostBookmark,
    hardDeletePostBookmark,
    getPostBookmarkByUserAndPost,
    getPost,
    moment,
  });

const getPostBookmarksPaginatedController =
  makeGetPostBookmarksPaginatedController({
    getPostBookmarksPaginated,
    countCommentsByPost,
    readingTimeAnalyzer,
  });

export default Object.freeze({
  getPostBookmarksPaginatedController,
  createOrDeletePostBookmarkController,
  countPostBookmarkController,
});

export {
  countPostBookmarkController,
  createOrDeletePostBookmarkController,
  getPostBookmarksPaginatedController,
};
