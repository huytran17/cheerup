export const state = () => ({
  me: {} as any,
  has_user: false,
});

export type AuthState = ReturnType<typeof state>;
