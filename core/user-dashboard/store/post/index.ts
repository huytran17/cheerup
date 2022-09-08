export const state = () => ({
  post: {} as any,
  pagination: {} as any,
  posts: [] as any[],
  latest_posts: [] as any[],
  post_search_query: "",
  loading: false
});

export type PostState = ReturnType<typeof state>;
