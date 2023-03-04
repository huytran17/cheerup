export const state = () => ({
  comment: {} as any,
  new_comment: {} as any,
  new_reply_comment: {} as any,
  editing_comment: {} as any,
  comments: [] as any[],
  pagination: {
    current_page: 1,
    per_page: 15,
    total_pages: 0,
  },
  comment_count_by_post: 0,
});

export type CommentState = ReturnType<typeof state>;
