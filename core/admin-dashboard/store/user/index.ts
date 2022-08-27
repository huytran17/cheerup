export const state = () => ({
  user: {} as any,
  user_analys_data: {} as any,
  users: [] as any[],
});

export type UserState = ReturnType<typeof state>;
