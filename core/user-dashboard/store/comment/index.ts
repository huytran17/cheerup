export const state = () => ({
  comment: {} as any,
  new_comment: {} as any,
  comments: [] as any[],
});

export type CommentState = ReturnType<typeof state>;
