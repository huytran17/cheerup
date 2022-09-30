import { logger } from "../../config/logs/logger";
import { PostBookmarkDb } from "../../data-access";
import makeCreatePostBookmark from "./create-post-bookmark";
import makeGetPostBookmarksPaginated from "./get-post-bookmarks-paginated";
import makeGetPostBookmarkAnalystics from "./hard-delete-post-bookmark";
import makeGetPostBookmark from "./get-post-bookmark";
import makeGetPostBookmarkByUserAndPost from "./get-post-bookmark-by-user-and-post";

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
});

export default subscriptionServices;

export {
  createPostBookmark,
  getPostBookmarksPaginated,
  hardDeletePostBookmark,
  getPostBookmark,
  getPostBookmarkByUserAndPost,
};
