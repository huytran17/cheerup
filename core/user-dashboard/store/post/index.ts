export const state = () => ({
  post: {} as any,
  posts: [] as any[],
  latest_posts: [] as any[],
});

export type PostState = ReturnType<typeof state>;
