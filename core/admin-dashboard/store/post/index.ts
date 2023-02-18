export const state = () => ({
  post: {} as any,
  post_analys_data: {} as any,
  posts: [] as any[],
  most_popular_posts_analys_data: [] as any[],
});

export type PostState = ReturnType<typeof state>;
