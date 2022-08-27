export const state = () => ({
  subscription: {} as any,
  subscription_analys_data: {} as any,
  subscriptions: [] as any[],
});

export type SubscriptionState = ReturnType<typeof state>;
