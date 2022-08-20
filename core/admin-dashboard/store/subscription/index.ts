export const state = () => ({
  subscription: {} as any,
  subscriptions: [] as any[],
});

export type SubscriptionState = ReturnType<typeof state>;
