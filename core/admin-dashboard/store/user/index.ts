export const state = () => ({
  user: {} as any,
  user_analys_data: {} as any,
  users: [] as any[],
  pagination: <IPagination>{
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
    has_more: true,
  },
});

export type UserState = ReturnType<typeof state>;
