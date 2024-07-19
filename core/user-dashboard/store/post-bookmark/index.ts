export const state = () => ({
  post_bookmark: {} as any,
  post_bookmarks: [] as any[],
  post_bookmarks_count: 0,
  pagination: {
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
    has_more: true,
  },
});

export type PostBookmarkState = ReturnType<typeof state>;
