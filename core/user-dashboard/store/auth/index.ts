export const state = () => ({
  me: {} as any,
  has_user: false,
  is_open_2fa_modal: false,
});

export type AuthState = ReturnType<typeof state>;
