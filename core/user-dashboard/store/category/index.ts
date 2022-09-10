export const state = () => ({
  category: {} as any,
  categories: [] as any[],
  category_titles: [] as any[],
});

export type CategoryState = ReturnType<typeof state>;
