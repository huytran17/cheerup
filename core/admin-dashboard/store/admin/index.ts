export const state = () => ({
  admin: {} as any,
  admins: [] as any[],
  admin_analys_data: {} as Record<string, unknown>,
});

export type AdminState = ReturnType<typeof state>;
