export const state = () => ({
  feedback: {} as any,
  feedback_analys_data: {} as any,
  feedbacks: [] as any[],
});

export type FeedbackState = ReturnType<typeof state>;
