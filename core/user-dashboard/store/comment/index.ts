export const state = () => ({
  comment: {} as any,
  new_comment: {} as any,
  new_reply_comment: {} as any,
  comments: [] as any[],
  loading: false,
});

export type CommentState = ReturnType<typeof state>;
