import getPostRules from "./get-post";
import getPostsPaginatedRules from "./get-posts-paginated";
import getLatestPostsRules from "./get-latest-posts";

export default Object.freeze({
  getPostRules,
  getLatestPostsRules,
  getPostsPaginatedRules,
});

export { getPostRules, getLatestPostsRules, getPostsPaginatedRules };
