export const state = () => ({
  gallery: {} as any,
  galleries: [] as any,
  pagination: {
    current_page: 1,
    from: 0,
    to: 1,
    per_page: 15,
    total: 0,
    total_pages: 0,
    has_more: true,
  },
});

export type GalleryState = ReturnType<typeof state>;
