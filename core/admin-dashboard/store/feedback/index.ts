export const state = () => ({
  feedback: {} as any,
  feedbacks: [] as any[],
});

export type FeedbackState = ReturnType<typeof state>;
