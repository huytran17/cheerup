import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { PostBookmarkDb } from "../../data-access";
import makeCountPostBookmarks from "./count-post-bookmarks";
import makeCreatePostBookmark from "./create-post-bookmark";
import makeGetPostBookmark from "./get-post-bookmark";
import makeGetPostBookmarkByUserAndPost from "./get-post-bookmark-by-user-and-post";
import makeGetPostBookmarksPaginated from "./get-post-bookmarks-paginated";
import makeGetPostBookmarkAnalystics from "./hard-delete-post-bookmark";

const countPostBookmarks = makeCountPostBookmarks({
  postBookmarkDb: PostBookmarkDb,
});

const getPostBookmarkByUserAndPost = makeGetPostBookmarkByUserAndPost({
  postBookmarkDb: PostBookmarkDb,
});

const createPostBookmark = makeCreatePostBookmark({
  postBookmarkDb: PostBookmarkDb,
});

const getPostBookmark = makeGetPostBookmark({
  postBookmarkDb: PostBookmarkDb,
});

const getPostBookmarksPaginated = makeGetPostBookmarksPaginated({
  postBookmarkDb: PostBookmarkDb,
  randomCacheTime,
  redis,
  logger,
});

const hardDeletePostBookmark = makeGetPostBookmarkAnalystics({
  postBookmarkDb: PostBookmarkDb,
});

const subscriptionServices = Object.freeze({
  createPostBookmark,
  getPostBookmarksPaginated,
  hardDeletePostBookmark,
  getPostBookmark,
  getPostBookmarkByUserAndPost,
  countPostBookmarks,
});

export default subscriptionServices;

export {
  countPostBookmarks,
  createPostBookmark,
  getPostBookmark,
  getPostBookmarkByUserAndPost,
  getPostBookmarksPaginated,
  hardDeletePostBookmark,
};
