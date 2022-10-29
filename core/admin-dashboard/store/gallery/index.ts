export const state = () => ({
  gallery: {} as any,
  galleries: [] as any,
  loading: false,
  pagination: {
    current_page: 1,
    per_page: 15,
    total_pages: 0,
  },
});

export type GalleryState = ReturnType<typeof state>;
