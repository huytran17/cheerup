import exportPostPdfRules from "./export-post-pdf";
import getPostBySlugRules from "./get-post-by-slug";
import getPostsPaginatedRules from "./get-posts-paginated";
import getSuggestionPostsRules from "./get-sugesstion-posts";
import increasePostViewsRules from "./increase-post-views";

export default Object.freeze({
  getSuggestionPostsRules,
  getPostsPaginatedRules,
  exportPostPdfRules,
  getPostBySlugRules,
  increasePostViewsRules,
});

export {
  exportPostPdfRules,
  getPostBySlugRules,
  getPostsPaginatedRules,
  getSuggestionPostsRules,
  increasePostViewsRules,
};
