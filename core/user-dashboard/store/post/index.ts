export const state = () => ({
  post: {} as any,
  pagination: {
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
    has_more: true,
  },
  posts: [] as any[],
  suggestion_posts: [] as any[],
  post_search_query: "",
  categories_filters: [] as any[],
  tags_filters: [] as any[],
});

export type PostState = ReturnType<typeof state>;
