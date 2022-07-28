export const state = () => ({
  me: {} as any,
  user: {} as any,
});

export type AuthState = ReturnType<typeof state>;
