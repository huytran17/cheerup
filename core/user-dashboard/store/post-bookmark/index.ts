export const state = () => ({
  post_bookmark: {} as any,
  post_bookmarks: [] as any[],
  post_bookmarks_count: 0,
  loading: false,
  pagination: {
    current_page: 1,
    per_page: 15,
    total_pages: 0,
  },
});

export type PostBookmarkState = ReturnType<typeof state>;
