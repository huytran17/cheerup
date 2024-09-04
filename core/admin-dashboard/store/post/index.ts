export const state = () => ({
  post: {} as any,
  post_analys_data: {} as any,
  posts: [] as any[],
  most_popular_posts_analys_data: [] as any[],
  pagination: <IPagination>{
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
    has_more: true,
  },
});

export type PostState = ReturnType<typeof state>;
