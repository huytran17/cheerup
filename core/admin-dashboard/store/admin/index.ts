export const state = () => ({
  admin: {} as any,
  admins: [] as any[],
});

export type AdminState = ReturnType<typeof state>;
