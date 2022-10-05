export const state = () => ({
  gallery: {} as any,
  galleries: [] as any,
  loading: false,
});

export type GalleryState = ReturnType<typeof state>;
