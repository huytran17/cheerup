export const state = () => ({
  category: {} as any,
  categories: [] as any[],
});

export type CategoryState = ReturnType<typeof state>;
