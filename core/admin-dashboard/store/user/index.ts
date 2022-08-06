export const state = () => ({
  user: {} as any,
  users: [] as any[],
});

export type UserState = ReturnType<typeof state>;
