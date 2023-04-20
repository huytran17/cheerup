export const state = () => ({
  category: {} as any,
  categories: [] as any[],
  category_titles: [] as any[],
  pagination: {
    current_page: 1,
    per_page: 15,
    total_pages: 0,
  },
});

export type CategoryState = ReturnType<typeof state>;
