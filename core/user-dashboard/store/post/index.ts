export const state = () => ({
  post: {} as any,
  pagination: {} as any,
  posts: [] as any[],
  suggestion_posts: [] as any[],
  post_search_query: "",
  loading: false,
  categories_filters: [] as any[],
});

export type PostState = ReturnType<typeof state>;
