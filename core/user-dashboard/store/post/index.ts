export const state = () => ({
  post: {} as any,
  post_analys_data: {} as any,
  posts: [] as any[],
});

export type PostState = ReturnType<typeof state>;
