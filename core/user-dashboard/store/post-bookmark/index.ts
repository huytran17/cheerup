export const state = () => ({
  post_bookmark: {} as any,
  post_bookmarks: [] as any[],
  pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
});

export type PostBookmarkState = ReturnType<typeof state>;
