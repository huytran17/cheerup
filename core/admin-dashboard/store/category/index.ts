export const state = () => ({
  category: {} as any,
  categories: [] as any[],
  category_analys_data: {} as Record<string, unknown>,
});

export type CategoryState = ReturnType<typeof state>;
