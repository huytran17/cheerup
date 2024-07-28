export const state = () => ({
  comment: {} as any,
  new_comment: {} as any,
  new_reply_comment: {} as any,
  editing_comment: {} as any,
  comments: [] as any[],
  pagination: <IPagination>{
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
    has_more: true,
  },
  comment_count_by_post: 0,
});

export type CommentState = ReturnType<typeof state>;
