import getPostRules from "./get-post";
import getPostsPaginatedRules from "./get-posts-paginated";
import getSuggestionPostsRules from "./get-sugesstion-posts";
import updatePostRules from "./update-post";
import exportPostPdfRules from "./export-post-pdf";
import getPostBySlugRules from "./get-post-by-slug";
import increasePostViewsRules from "./increase-post-views";

export default Object.freeze({
  getPostRules,
  getSuggestionPostsRules,
  getPostsPaginatedRules,
  updatePostRules,
  exportPostPdfRules,
  getPostBySlugRules,
  increasePostViewsRules,
});

export {
  getPostRules,
  getSuggestionPostsRules,
  getPostsPaginatedRules,
  updatePostRules,
  exportPostPdfRules,
  getPostBySlugRules,
  increasePostViewsRules,
};
