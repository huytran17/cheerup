export const state = () => ({
  me: {} as any,
  has_user: false,
  is_open_2fa_modal: false,
  is_open_2fa_qr_modal: false,
  qr_data: {} as any,
});

export type AuthState = ReturnType<typeof state>;
