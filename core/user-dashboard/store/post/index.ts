export const state = () => ({
  post: {} as any,
  pagination: {
    current_page: 1,
    per_page: 15,
    total_pages: 0,
  },
  posts: [] as any[],
  suggestion_posts: [] as any[],
  post_search_query: "",
  categories_filters: [] as any[],
  tags_filters: [] as any[],
});

export type PostState = ReturnType<typeof state>;
