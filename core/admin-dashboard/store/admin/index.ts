export const state = () => ({
  admin: {} as any,
  admins: [] as any[],
  admin_analys_data: {} as Record<string, unknown>,
  pagination: {
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
  },
});

export type AdminState = ReturnType<typeof state>;
